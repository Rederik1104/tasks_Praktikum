<?php
    include("database.php");
    $id = $_GET['id'];
    $sql = $pdo->prepare("DELETE FROM todo WHERE id = :id");
    $sql->bindParam(":id", $id);
    if($sql->execute()){
        header("Location:index.php");
    }
