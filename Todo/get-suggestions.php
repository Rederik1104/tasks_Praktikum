<?php
include ("database.php");

header('Content-Type: application/json');

// Turn off error reporting to avoid any PHP notices or warnings in the response
error_reporting(0);

try {
    $sql = $pdo->query("SELECT task FROM todo");
    $suggestions = $sql->fetchAll(PDO::FETCH_COLUMN);

    // Echo the JSON-encoded suggestions
    echo json_encode($suggestions);
} catch (Exception $e) {
    // If there's an error, echo the error message as JSON
    echo json_encode(["error" => $e->getMessage()]);
}
