<?php
session_start();
if ($_SESSION['loggedIn']) {
    echo json_encode(array('loggedIn', $_SESSION['loggedIn']));
} else {
    $response = ["message" => "forbidden"];
    echo json_encode($response);
}

