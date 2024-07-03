<?php
session_start();
echo json_encode(array('id' => $_SESSION['authID']));