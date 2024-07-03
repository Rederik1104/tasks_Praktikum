<?php
session_start();
include ("database.php");
$password = $_POST["password"];
$username = $_POST["username"];


$sql = $pdo->query("SELECT * FROM login");
while ($row = $sql->fetch()) {
    $passwordHash = $row["password"];
    $usernameDB = $row["username"];
    if (password_verify($password, $passwordHash) && $username == $usernameDB) {
        $_SESSION['loggedIn'] = true;
        $_SESSION["authID"] = bin2hex(random_bytes(32));
        header("Location: index.php");
        exit();
    }
}
echo json_encode(array("error" => "Password or email incorrect"));
header("Location: index.php");
exit();

