<?php

//CONEXION A LA BASE DE DATOS
class Connection extends \PDO{
    private $host = 'localhost';
    private $tipeDB = 'mysql';
    private $nameDB = '';
    private $user = 'root';
    private $password = '';
    private $link;

    public function __construct(){
        try{
            $this->link = parent::__construct("{$this->tipeDB}:dbname={$this->nameDB};host={$this->host};charset=utf8", $this->user, $this->password);
        }catch(\PDOException $e){
            echo 'Connection failed: ' . $e->getMessage();
        }

    }

    public function makeQuery($query,$select=false){
        $connection = mysqli_connect($this->host, $this->user,$this->password, $this->nameDB);
        $result = mysqli_query($connection, $query);

        if(true == $select){
            while($row = mysqli_fetch_assoc($result)){
                $response[] = $row;
            }
            return $response;
        }
    }
} 