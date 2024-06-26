<?php
include ("database.php");

header('Content-Type: application/json');

// Turn off error reporting to avoid any PHP notices or warnings in the response
error_reporting(0);

try {
    // Fetch all rows from the table 'time'
    $sql = $pdo->query("SELECT * FROM time");
    $rows = $sql->fetchAll(PDO::FETCH_ASSOC);

    // Echo the JSON-encoded rows
    echo json_encode($rows);
} catch (Exception $e) {
    // If there's an error, echo the error message as JSON
    echo json_encode(["error" => $e->getMessage()]);
}
?>