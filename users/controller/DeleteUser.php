<?php
    require_once('../model/Collection/User.php');
    require_once('../etc/Connection.php');

    $connection = new Connection();

    $user = new User($connection);
    $idUser = $_GET['idUser'];
    $user->deleteByUserId($idUser);

    echo 'Cuenta eliminada correctamente <br>';
    header("Location: https://localhost/nodejs/task-man_test/view/usuarios.php");
?>