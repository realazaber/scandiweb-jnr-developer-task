<?php
require_once 'product.php';

class DVD extends Product
{
    private $megabytes;

    public function __construct($id, $sku, $name, $price, $megabytes)
    {
        parent::__construct($id, $sku, $name, $price, 'DVD');
        $this->megabytes = $megabytes;
    }

    public function toArray()
    {
        $array = parent::toArray();
        $this->addProductSpecificProperties($array);
        return $array;
    }

    protected function addProductSpecificProperties(&$array)
    {
        $array['megabytes'] = $this->megabytes;
    }

    public function getMegabytes()
    {
        return $this->megabytes;
    }

    public function setMegabytes($megabytes)
    {
        $this->megabytes = $megabytes;
    }
}
