<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $time = time();
    include("database.php");

    $task = $_POST['task'];
    $fDate = $_POST['fDate'];
    $cDate = date("Y-m-d",$time);

    $sql = $pdo->prepare("INSERT INTO todo (task, date_created, date_finished) VALUES (:task, :cDate, :fDate)");
    $sql->bindParam(":task", $task);
    $sql->bindParam(":fDate", $fDate);
    $sql->bindParam(":cDate", $cDate);

    if($sql->execute()){
        header("Location:index.php");
        exit();
    }

