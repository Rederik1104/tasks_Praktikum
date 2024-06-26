<?php
include ("database.php");

// Check if the form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = $_POST['task'];
    $fDate = $_POST['fDate'];

    // Check if the ID is passed via GET
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Prepare the SQL statement
        $sql = $pdo->prepare('UPDATE todo SET task = :task, date_finished = :fDate WHERE id = :id');
        $sql->bindParam(":task", $task);
        $sql->bindParam(":fDate", $fDate);
        $sql->bindParam(":id", $id);

        // Execute the statement
        if ($sql->execute()) {
            // Redirect to index.php
            header("Location: index.php");
            exit();
        } else {
            echo "Error: Could not execute the query.";
        }
    } else {
        echo "Error: Task ID is missing.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>