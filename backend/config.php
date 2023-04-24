<?php

class Config extends PDO
{
    private $host = "localhost";
    private $dbName = "scandiweb_test_task";
    private $username = "root";
    private $password = "";

    public function __construct()
    {
        parent::__construct('mysql:host=' . $this->host . ';dbname=' . $this->dbName, $this->username, $this->password);
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
}
