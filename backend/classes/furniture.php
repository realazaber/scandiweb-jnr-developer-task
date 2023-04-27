<?php
require_once 'product.php';

class Furniture extends Product
{
    private $width;
    private $depth;
    private $height;

    public function __construct($id, $sku, $name, $price, $width, $depth, $height)
    {
        parent::__construct($id, $sku, $name, $price, 'furniture');
        $this->width = $width;
        $this->depth = $depth;
        $this->height = $height;
    }

    public function toArray()
    {
        $array = parent::toArray();
        return $array;
    }

    protected function addProductSpecificProperties(&$array)
    {
        $array['width'] = $this->width;
        $array['depth'] = $this->depth;
        $array['height'] = $this->height;
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
