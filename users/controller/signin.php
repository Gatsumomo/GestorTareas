<?php

require_once('../model/User.php');
require_once('../etc/Connection.php');

$connection = new Connection();

$user = new User($connection);
$data = [
    'name' => $_POST['name'],
    'lastName' => $_POST['LastName'],
    'email' => $_POST['Email'],
    'password' => base64_encode($_POST['Password']),
];
$user->register($data);

echo 'Cuenta creada con exito <br>';
?>