<?php
include 'connection.php';
if (isset($_GET['addProduct']) == "addProduct") {
  $sku = $_GET['sku'];
  $name = $_GET['name'];
  $price = $_GET['price'];
  $size = $_GET['size'];
  $weight = $_GET['weight'];
  $length = $_GET['length'];
  $width = $_GET['width'];
  $height = $_GET['height'];
  $finalType = $_GET['finalType'];

  $query = "INSERT INTO `productlist`(`sku`, `name`, `price`, `type`, `size`, `weight`, `length`, `width`, `height`) VALUES ('$sku','$name','$price','$finalType','$size','$weight','$length','$width','$height');";
  $result = mysqli_query($con, $query);
}

if (isset($_GET['showProductList']) == "showProductList") {
  $ProductLists = new stdClass();
  $dataDVD = array();
  $dataBook = array();
  $dataFurniture = array();
  $query = "SELECT * FROM `productlist`;";
  $result = mysqli_query($con, $query);

  while ($row = mysqli_fetch_assoc($result)) {

    $type = $row['type'];
    if ($type == 'DVD') {
      $dataDVD[] = $row;
    } else if ($type == 'Book') {
      $dataBook[] = $row;
    } else if ($type == 'Furniture') {
      $dataFurniture[] = $row;
    }
  }
  $ProductLists->dataDVD = $dataDVD;
  $ProductLists->dataBook = $dataBook;
  $ProductLists->dataFurniture = $dataFurniture;
  echo json_encode($ProductLists);
}

if (isset($_POST['deleteAction']) == "deleteAction") {
  $checkedBoxes = $_POST['checkedBoxes'];
  foreach ($checkedBoxes as $sku) {
    $query = "DELETE FROM `productlist` WHERE `sku`= '$sku';";
    $result = mysqli_query($con, $query);
  }
}
if (isset($_GET['checkSKU']) == "checkSKU") {
  $s = false;
  $status = new stdClass();
  $sku = $_GET['sku'];
  $query = "SELECT * FROM `productlist` WHERE `sku` = '$sku';";
  $result = mysqli_query($con, $query);
  if (mysqli_num_rows($result) == 1) {
    $s = true;
  }
  $status->ss  = $s;
  echo json_encode($status);
}
