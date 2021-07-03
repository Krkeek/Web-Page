<?php
include 'assets/backend/connection.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Task</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="assets/scripts/jScript.js" defer></script>
    <link rel="stylesheet" href="assets/styles/style.css?<? echo time(); ?>">
    <link rel="shortcut icon" type="image/png" href="assets/images/favicon.png">
</head>

<body>
    <header class="border-bottom">
        <nav class="navbar navbar-expand-sm navbar-light sticky-top">
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav Font">
                    <li class="nav-item">
                        <h2 id="the_header">Product List</h2>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li>
                        <a href="addproduct.php" class="btn btn-primary">ADD</a>
                        <a href="#" id="delete-product-btn" class="btn btn-danger">MASS DELETE</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div id="product_list_container" class="d-flex align-content-start flex-wrap">



    </div>
    <footer class="bg-light text-center text-lg-start navbar-fixed-bottom">
        <div class="text-center p-3 border-top">
            Scandiweb Test assignment
        </div>
    </footer>



    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>