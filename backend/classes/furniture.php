<?php
require_once 'Product.php';

class Furniture extends Product
{
    private $width;
    private $height;
    private $depth;

    public function __construct($sku, $name, $price, $width, $height, $depth)
    {
        parent::__construct($sku, $name, $price, "Furniture");
        $this->width = $width;
        $this->height = $height;
        $this->depth = $depth;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getDepth()
    {
        return $this->depth;
    }

    public function setDepth($depth)
    {
        $this->depth = $depth;
    }
}
