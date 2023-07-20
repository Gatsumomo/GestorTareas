<?php
require_once('../users/model/User.php');
require_once('../users/etc/Connection.php');

$idUser = $_GET['idUser'];
$conection = new Connection();
$user = new User($conection);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <title>Home con Bootstrap</title>
</head>
<div id="header"></div>
<body>
    <div class="container">
        <div class="row">
          <div class="col-3">
            <div class="card" style="width: 10rem;">
                <img class="card-img-top" src="../view\media\GitHub-Logo.png" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
          </div>
          <div class="col">
            <div class="text-center">
              <p class="response"><p>
            </div>
            <?php
                foreach($user->getUserById($idUser) as $item){
            ?>
                <form id="update" action="../Controller/UpdateUser.php" method="post">
                    <input type="hidden" name="id" value="<?php echo $item['id'] ?>">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="Name" name="Name" value="<?php echo $item['nombre'] ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="LastName">Last Name</label>
                            <input type="text" class="form-control" id="LastName" name="LastName" value="<?php echo $item['apellido'] ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Email">Email</label>
                            <input type="email" class="form-control" id="Email" name="Email" value="<?php echo $item['correo'] ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Password">Password</label>
                            <input type="text" class="form-control" id="Password" name="Password" value="<?php echo base64_decode($item['password']) ?>" placeholder="Password" required>
                        </div>
                    </div>
                    <button type="submit" id="updating" name="updating" class="btn btn-primary">Update</button>
                </form>
            <?php
                }
            ?>
          </div>
        </div>
    </div>
    
</body>
<script src="https://code.jquery.com/jquery-2.2.2.min.js"></script>
<script> 
  $(function(){
    $("#footer").load("Footer.html"); 
  });
  $(function(){
    $("#header").load("Header.html"); 
  });
  </script>
  <script>
   var pressedButton = document.getElementsByTagName("button")[0];
   pressedButton.addEventListener("click", function (event) {
      alert("Usuario actualizado Correctamente!")
   })
</script>
<div id="footer"></div>