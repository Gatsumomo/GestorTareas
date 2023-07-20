<?php

interface UsersInterface{
    public function setName(string $name);
    public function getName(): string;
    public function setLastName(string $lastName);
    public function getLastName(): string;
    public function setEmail(string $email);
    public function getEmail(): string;
    public function setPassword(string $password);
    public function getPassword(): string;
}