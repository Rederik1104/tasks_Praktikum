<?php
session_start();
header('Content-Type: application/json');

// Überprüfen, ob Rohdaten empfangen wurden
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$id = $_SESSION['authID'];
$idPost = isset($data['idGet']) ? $data['idGet'] : null;


if ($id == $idPost) {
    echo json_encode(array('loggedIn' => true));
} else {
    echo json_encode(array('loggedIn' => false));
}