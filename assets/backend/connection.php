<?php

$db_hostname = "localhost";
$db_database = "mytask";
$db_username = "root";
$db_password = "";

$con = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
