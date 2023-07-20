<?php

require_once('../model/User.php');
require_once('../etc/Connection.php');

$connection = new Connection();

$user = new User($connection);
$data = [
    'id' => $_POST['id'],
    'name' => $_POST['name'],
    'lastName' => $_POST['LastName'],
    'email' => $_POST['Email'],
    'password' => base64_encode($_POST['Password']),
];
$user->update($data);

echo 'Cuenta actualizada con exito <br>';
header("Location: https://localhost/nodejs/task-man_test/view/usuarios.php");
exit();
?>