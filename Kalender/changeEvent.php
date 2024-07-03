<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

include ("database.php");

$id = $_GET['id'];
$title = $_POST['title'];
$time = $_POST['time'];
$dauer = $_POST['dauer'];
$description = $_POST['description'];

$sql = $pdo->prepare('UPDATE events SET title = :title, time = :time, dauer = :dauer, description = :description WHERE id = :id');
$sql->bindParam(':id', $id, PDO::PARAM_INT);
$sql->bindParam(':title', $title, PDO::PARAM_STR);
$sql->bindParam(':time', $time);
$sql->bindParam(':dauer', $dauer, PDO::PARAM_INT);
$sql->bindParam(':description', $description, PDO::PARAM_STR);

if ($sql->execute()) {
    header('Location: index.php');
}

