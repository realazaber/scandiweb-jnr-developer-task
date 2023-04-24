<?php

$baseUrl = "/projects/scandiweb-jnr-developer-task/backend";

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === $baseUrl . '/products') {
    header('Content-Type: application/json');
    $response = array('message' => 'Hello, world!');
    echo json_encode($response);
}
