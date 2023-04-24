<?php
require_once 'product.php';

class DVD extends Product
{
    private $megabyte;

    public function __construct($sku, $name, $price, $megabyte)
    {
        parent::__construct($sku, $name, $price, "DVD");
        $this->megabyte = $megabyte;
    }

    public function getMegabyte()
    {
        return $this->megabyte;
    }

    public function setMegabyte($megabyte)
    {
        $this->megabyte = $megabyte;
    }
}
