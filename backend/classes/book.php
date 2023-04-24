<?php
require_once 'product.php';

class Book extends Product
{
    private $weight;

    public function __construct($id, $sku, $name, $price, $weight)
    {
        parent::__construct($id, $sku, $name, $price, 'book');
        $this->weight = $weight;
    }

    public function toArray()
    {
        $array = parent::toArray();
        $array['weight'] = $this->weight;
        return $array;
    }

    protected function addProductSpecificProperties(&$array)
    {
        $array['weight'] = $this->weight;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }
}
