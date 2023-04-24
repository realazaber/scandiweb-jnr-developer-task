<?php

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
                        $product = new DVD($row['sku'], $row['name'], $row['price'], $row['megabytes']);
                        break;
                    case 'book':
                        $product = new Book($row['sku'], $row['name'], $row['price'], $row['weight']);
                        break;
                    case 'furniture':
                        $product = new Furniture($row['sku'], $row['name'], $row['price'], $row['width'], $row['depth'], $row['height']);
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
        // TODO: implement addProduct method
        http_response_code(501);
        echo json_encode(array('success' => false, 'message' => 'Not implemented'));
    }

    private function deleteProduct()
    {
        // TODO: implement deleteProduct method
        http_response_code(501);
        echo json_encode(array('success' => false, 'message' => 'Not implemented'));
    }
}

$productAPI = new ProductAPI();
$productAPI->handleRequest();
