<?php

require_once('../etc/Connection.php');
require_once('../api/UserInterface.php');

class User implements UsersInterface{
    const MAIN_TABLE = 'usuario';
    private connection $connection;
    private string $name;
    private string $lastName;
    private string $email;
    private string $password;

    public function __construct(Connection $connection){
        $this->connection = $connection;
    }
    
    public function register($data){
        $query = "INSERT INTO" . self::MAIN_TABLE . "(nombre, apellido, correo, password) VALUES ('" . $data['name'] . "', '" . $data['lastName'] . "', '" . $data['email'] . "', '" . $data['password'] . "')";
        $this->connection->makeQuery($query);
    }

    public function update($data){
        $query = "UPDATE " . self::MAIN_TABLE . " SET nombre = '" . $data['name'] . "', apellido = '" . $data['lastName'] . "', correo = '" . $data['email'] . "', password = '" . $data['password'] . "' WHERE id = '" . $data['id'] . "'";
    }

    public function deleteByUserId($idUser){
        $query = "DELETE FROM" . self::MAIN_TABLE . " WHERE id = '" . $idUser . "'";
        $this->connection->makeQuery($query);
    }

    public function getUserById($idUser){
        $query = "SELECT * FROM" . self::MAIN_TABLE . " WHERE id = '" . $idUser . "'";
        return $this->connection->makeQuery($query);
    }
    
    public function setName(string $name){
        $this->name = $name;
        //$this->connection->insert("INSERT INTO" . self::MAIN_TABLE) . "(nombre) VALUES ('" . $name . "')";
    }

    public function getName(): string{
        return $this->name;
    }

    public function setLastName(string $lastName){
        $this->lastName = $lastName;
    }

    public function getLastName(): string{
        return $this->lastName;
    }

    public function setEmail(string $email){
        $this->email = $email;
    }

    public function getEmail(): string{
        return $this->email;
    }

    public function setPassword(string $password){
        $this->password = $password;
    }

    public function getPassword(): string{
        return $this->password;
    }
}