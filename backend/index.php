<?php

require_once("config.php");

$connection = new Config();
$connection->connect();

$baseUrl = "/projects/scandiweb-jnr-developer-task/backend";

//Get products URL
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === $baseUrl . '/products') {
    header('Content-Type: application/json');
    $response = array('message' => 'Get products');
    echo json_encode($response);
}

//Add product URL
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === $baseUrl . '/products') {
    header('Content-Type: application/json');
    $response = array('message' => 'Add product');
    echo json_encode($response);
}

//Delete products URL
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $_SERVER['REQUEST_URI'] === $baseUrl . '/products') {
    header('Content-Type: application/json');
    $response = array('message' => 'Delete product');
    echo json_encode($response);
}
