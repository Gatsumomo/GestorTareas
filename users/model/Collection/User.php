<?php

class User{
    protected $connection;

    public function __construct($connection){
        $this->connection = $connection;
    }

    public function getLIstUser(){
        return $this->connection->makeQuery("SELECT * FROM usuario", true);
    }
}