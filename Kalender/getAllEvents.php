<?php
include ("database.php");

// SQL-Abfrage, um alle Events abzurufen
$sql = "SELECT * FROM events ORDER BY time";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$events = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $events[] = $row;
}

// JSON-Ausgabe für alle Events
header('Content-Type: application/json');
echo json_encode($events);
?>