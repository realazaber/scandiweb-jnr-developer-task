<?php

class Config
{
    private $host = "localhost";
    private $dbName = "scandiweb_test_task";
    private $username = "root";
    private $password = "";
    private $connection;

    public function connect()
    {

        $this->connection = null;
        try {
            $this->connection = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->dbName, $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected";
        } catch (PDOException $error) {
            echo 'Database error: ' . $error;
        }

        return $this->connection;
    }
}
