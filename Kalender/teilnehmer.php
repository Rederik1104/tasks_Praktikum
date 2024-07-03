<?php
// Debugging: POST-Daten ausgeben
var_dump($_POST);

// Überprüfen, ob Name und E-Mail gesendet wurden
if (isset($_POST['name']) && isset($_POST['email'])) {
    // POST-Daten erhalten und bereinigen (optional)
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);

    // Einbinden der Datenbankverbindung
    include ("database.php");

    try {
        // Vorbereiten und Ausführen des SQL-Statements
        $sql = $pdo->prepare("INSERT INTO teilnehmer (name, email) VALUES (:name, :email)");
        $sql->bindParam(":name", $name);
        $sql->bindParam(":email", $email);

        $sql->execute();

        // Erfolgsmeldung zurückgeben
        echo json_encode(array('message' => 'Daten erfolgreich eingefügt'));
    } catch (PDOException $e) {
        // Fehlerbehandlung bei Datenbankfehlern
        http_response_code(500); // Interner Serverfehler
        echo json_encode(array('error' => 'Datenbankfehler: ' . $e->getMessage()));
    }
} else {
    // Fehlermeldung, wenn Name oder E-Mail nicht gesendet wurden
    http_response_code(400); // Bad Request
    echo json_encode(array('error' => 'Name und E-Mail sind erforderlich'));
}
?>