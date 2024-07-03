<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include './vendor/autoload.php';

// Setze den Content-Type auf application/json
header('Content-Type: application/json');

// Empfange das JSON-Post-Body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$response = [
    'status' => 'error',
    'message' => 'Unbekannter Fehler'
];

if ($json === false) {
    $response['message'] = 'Fehler beim Lesen der Eingabedaten';
    echo json_encode($response);
    exit();
}

if (is_array($data) && isset($data['email']) && isset($data['events'])) {
    $targetEmail = $data['email'];
    $events = $data['events'];

    $mail = new PHPMailer(true);

    try {
        // Servereinstellungen
        $mail->SMTPDebug = 0;                      // Kein Debug-Output
        $mail->isSMTP();                           // Setzt den Mailer auf Verwendung von SMTP
        $mail->Host = 'mail.gmx.net';              // SMTP-Server
        $mail->SMTPAuth = true;                    // Aktiviert die SMTP-Authentifizierung
        $mail->Username = 'rederik1104@gmx.de';    // SMTP-Benutzername
        $mail->Password = 'stefanie.mattias';      // SMTP-Passwort
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Verschlüsselung (z.B. 'ssl' oder 'tls')
        $mail->Port = 587;                         // TCP-Port für die Verbindung

        // Empfänger
        $mail->setFrom('rederik1104@gmx.de', 'Newsletter');
        $mail->addAddress($targetEmail);           // Hinzufügen eines Empfängers

        // Inhalt
        $mail->isHTML(true);                       // Setzt den Email-Format auf HTML
        $mail->Subject = 'Neue Events';

        // Erstelle den HTML-Body mit allen Events
        $bodyContent = '<html><body>';
        $bodyContent .= '<h1>Neue Events:</h1>';
        foreach ($events as $event) {
            $bodyContent .= '<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd;">';
            $bodyContent .= '<h2>' . htmlspecialchars($event['title']) . '</h2>';
            $bodyContent .= '<p><strong>Zeit:</strong> ' . htmlspecialchars($event['time']) . '</p>';
            $bodyContent .= '<p><strong>Datum:</strong> ' . date('d.m.Y', $event['timestamp'] / 1000) . '</p>';
            $bodyContent .= '<p><strong>Dauer:</strong> ' . htmlspecialchars($event['dauer']) . ' Minuten</p>';
            $bodyContent .= '<p><strong>Beschreibung:</strong> ' . nl2br(htmlspecialchars($event['description'])) . '</p>';
            $bodyContent .= '</div>';
        }
        $bodyContent .= '</body></html>';

        $mail->Body = $bodyContent;
        $mail->AltBody = 'Neue Events:\n';

        foreach ($events as $event) {
            $mail->AltBody .= "Titel: " . $event['title'] . "\n";
            $mail->AltBody .= "Zeit: " . $event['time'] . "\n";
            $mail->AltBody .= "Datum: " . date('d/m/Y', intval($event['timestamp'] / 1000)) . "\n";
            $mail->AltBody .= "Dauer: " . $event['dauer'] . " Minuten\n";
            $mail->AltBody .= "Beschreibung: " . $event['description'] . "\n\n";
        }

        $mail->send();
        $response['status'] = 'success';
        $response['message'] = $events;
    } catch (Exception $e) {
        $response['message'] = "Nachricht konnte nicht gesendet werden. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    $response['message'] = 'Fehler: Ungültige Daten';
}

echo json_encode($response);
?>