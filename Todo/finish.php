<?php
include ("database.php");
$id = $_GET['id'];
$finished = $_GET['finished'];
$sql = $pdo->prepare("DELETE FROM todo WHERE id = :id");
$sql->bindParam(":id", $id);

if ($sql->execute()) {
    $date = date("Y-m-d");
    echo $date;
    echo $finished;
    if ($date > $finished) {
        $stmt = $pdo->prepare("INSERT INTO time (late, date, onTime, earlier) VALUES (true, :dateF, false, false)");
        $stmt->bindParam(":dateF", $date);
    } else if ($date == $finished) {
        $stmt = $pdo->prepare("INSERT INTO time (late, date, onTime, earlier) VALUES (false, :dateF, true, false)");
        $stmt->bindParam(":dateF", $date);
    } else if ($date < $finished) {
        $stmt = $pdo->prepare("INSERT INTO time (late, date, onTime, earlier) VALUES (false, :dateF, false, true)");
        $stmt->bindParam(":dateF", $date);
    }

    if ($stmt->execute()) {
        header("Location:index.php");
    }

}
