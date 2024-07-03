<?php

//ini_set('display_errors', '1');
//ini_set('display_startup_errors', '1');
//error_reporting(E_ALL);

// Verbindung zur Datenbank herstellen
$dsn = "mysql:dbname=admin;host=localhost";
$username = "root";
$password = "";
try {
    $pdo = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    exit();
}

$title = $_GET['title'];
$time = $_GET['time'];
$description = $_GET['desc'];
$timestamp = $_GET['timestamp'];
$dauer = $_GET['dauer'];


// SQL-Abfrage zum Einfügen des Events
$sql = "INSERT INTO events (title, time, description, timestamp, dauer) VALUES (:title, :time, :description, :timestamp, :dauer)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":title", $title);
$stmt->bindParam(":time", $time);
$stmt->bindParam(":description", $description);
$stmt->bindParam(":timestamp", $timestamp);
$stmt->bindParam(":dauer", $dauer);

if ($stmt->execute()) {
    header("Location: index.php");
    exit();
}
