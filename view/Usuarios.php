<?php
require_once('../model/Collection/User.php');
require_once('../etc/Connection.php');

$connection = new Connection();
$collection = new User($connection);
?>

<!DOCTYPE html>
<html lang="es-ES">
    <head>
        <meta charset="UTF-8">
        <title>Usuarios</title>
        <link rel="stylesheet" href="../css/usuarios.css">
    </head>
    <div id="header"></div>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            foreach($collection->getLIstUser() as $item){
                                ?>
                                <tr>
                                    <th scope="row"><?php echo $item['id'] ?></th>
                                    <td><?php echo $item['nombre'] ?></td>
                                    <td><?php echo $item['apellido'] ?></td>
                                    <td><?php echo $item['correo'] ?></td>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
    <script src="https://code.jquery.com/jquery-2.2.2.min.js"></script>
    <script>
        $(function(){
            $("#header").load("../view/templates/header.html");
        });
        $(function(){
            $("#footer").load("../view/templates/footer.html");
        });
    </script>
    <div id="footer"></div>
</html>