<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("config.php");
require("./classes/book.php");
require("./classes/dvd.php");
require("./classes/furniture.php");

class ProductAPI
{
    private $pdo;
    private $baseUrl;

    public function __construct()
    {
        $this->pdo = new Config();
        $this->baseUrl = "/projects/scandiweb-jnr-developer-task/backend";
    }

    public function handleRequest()
    {
        $request_method = $_SERVER['REQUEST_METHOD'];
        $request_uri = $_SERVER['REQUEST_URI'];

        switch ("$request_method $request_uri") {
            case "GET {$this->baseUrl}/products":
                $this->getProducts();
                break;
            case "POST {$this->baseUrl}/products":
                $this->addProduct();
                break;
            case "DELETE {$this->baseUrl}/products":
                $this->deleteProduct();
                break;
            default:
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Invalid API endpoint'));
        }
    }

    private function getProducts()
    {
        header('Content-Type: application/json');


        try {
            $stmt = $this->pdo->query("SELECT * FROM products");
            $products = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $product = null;
                switch ($row['type']) {
                    case 'DVD':
                        $product = new DVD($row['id'], $row['sku'], $row['name'], $row['price'], $row['megabytes']);
                        break;
                    case 'book':
                        $product = new Book($row['id'], $row['sku'], $row['name'], $row['price'], $row['weight']);
                        break;
                    case 'furniture':
                        $product = new Furniture($row['id'], $row['sku'], $row['name'], $row['price'], $row['width'], $row['depth'], $row['height']);
                        break;
                }

                if ($product) {
                    $products[] = $product->toArray();
                }
            }
            http_response_code(200);
            echo json_encode(array('success' => true, 'data' => $products));
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array('success' => false, 'message' => 'Error retrieving products: ' . $e->getMessage()));
        }
    }

    private function addProduct()
    {
        // Get request body
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);

        // Check if all required fields are present
        if (!isset($data['sku']) || !isset($data['name']) || !isset($data['price']) || !isset($data['type'])) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Missing required fields'));
            return;
        }

        // Check if product with same SKU already exists
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM products WHERE sku = ?");
        $stmt->execute([$data['sku']]);
        $count = $stmt->fetchColumn();
        if ($count > 0) {
            http_response_code(409);
            echo json_encode(array('success' => false, 'message' => 'Product with same SKU already exists'));
            return;
        }

        // Create new product instance based on product type
        switch ($data['type']) {
            case 'DVD':
                if (!isset($data['megabytes'])) {
                    http_response_code(400);
                    echo json_encode(array('success' => false, 'message' => 'Megabytes is blank'));
                    return;
                }
                $product = new DVD(null, $data['sku'], $data['name'], $data['price'], $data['megabytes']);
                break;
            case 'book':
                if (!isset($data['weight'])) {
                    http_response_code(400);
                    echo json_encode(array('success' => false, 'message' => 'Weight is blank'));
                    return;
                }
                $product = new Book(null, $data['sku'], $data['name'], $data['price'], $data['weight']);
                break;
            case 'furniture':
                if (!isset($data['width']) || !isset($data['depth']) || !isset($data['height'])) {
                    http_response_code(400);
                    echo json_encode(array('success' => false, 'message' => 'Dimension fields are blank'));
                    return;
                }
                $product = new Furniture(null, $data['sku'], $data['name'], $data['price'], $data['width'], $data['depth'], $data['height']);
                break;
            default:
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Invalid product type'));
                return;
        }

        // Insert product into database
        try {
            $stmt = $this->pdo->prepare("INSERT INTO products (sku, name, price, type, megabytes, weight, width, depth, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            if ($product instanceof DVD) {
                $stmt->execute([$product->getSku(), $product->getName(), $product->getPrice(), $product->getType(), $product->getMegabytes(), null, null, null, null]);
            } elseif ($product instanceof Book) {
                $stmt->execute([$product->getSku(), $product->getName(), $product->getPrice(), $product->getType(), null, $product->getWeight(), null, null, null]);
            } elseif ($product instanceof Furniture) {
                $stmt->execute([$product->getSku(), $product->getName(), $product->getPrice(), $product->getType(), null, null, $product->getWidth(), $product->getDepth(), $product->getHeight()]);
            } else {
                http_response_code(400);
                echo json_encode(array('success' => false, 'message' => 'Invalid product type'));
                return;
            }

            http_response_code(201);
            echo json_encode(array('success' => true, 'data' => $product->toArray()));
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array('success' => false, 'message' => 'Error adding product: ' . $e->getMessage()));
        }
    }


    private function deleteProduct()
    {
        // Get request body
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);

        // Check if the SKU field is present
        if (!isset($data['sku'])) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'message' => 'Missing required field: SKU'));
            return;
        }

        // Delete the product with the given SKU from the database
        try {
            $stmt = $this->pdo->prepare("DELETE FROM products WHERE sku = ?");
            $stmt->execute([$data['sku']]);
            $count = $stmt->rowCount();
            if ($count == 0) {
                http_response_code(404);
                echo json_encode(array('success' => false, 'message' => 'Product not found'));
                return;
            }
            http_response_code(200);
            echo json_encode(array('success' => true, 'message' => 'Product deleted successfully'));
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array('success' => false, 'message' => 'Error deleting product: ' . $e->getMessage()));
        }
    }
}

$productAPI = new ProductAPI();
$productAPI->handleRequest();
