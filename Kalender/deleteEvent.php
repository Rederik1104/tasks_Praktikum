<?php
include ("database.php");
$id = $_GET['id'];
$id = intval($id);
$sql = $pdo->prepare("DELETE FROM events WHERE id = :id");
$sql->bindParam(":id", $id);
if ($sql->execute()) {
    header("index.php");
}