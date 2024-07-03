<?php
include ("database.php");

// Setze den Content-Type auf application/json
header('Content-Type: application/json');

try {
    // Abfrage der E-Mail-Adressen aus der Datenbank
    $stmt = $pdo->query("SELECT email FROM teilnehmer");
    $emails = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Gib die E-Mails als JSON zurück
    echo json_encode($emails);
} catch (Exception $e) {
    // Falls ein Fehler auftritt, gib eine JSON-Fehlermeldung zurück
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Abrufen der Teilnehmerdaten: ' . $e->getMessage()
    ]);
}
?>