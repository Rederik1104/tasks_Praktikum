<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="index.css">
    <title>Todo</title>
</head>

<body>
    <div class="container mt-5">
        <h1>Formular</h1>
        <form action="add_task.php" method="POST" class="mb-4">
            <div class="mb-3">
                <label for="task" class="form-label">Add your task</label>
                <input type="text" class="form-control" id="task" name="task" placeholder="Your task">
            </div>
            <div class="mb-3">
                <label for="fDate" class="form-label">When does your task have to be finished?</label>
                <input type="text" class="form-control" id="fDate" name="fDate" placeholder="Finish (Date)">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <div class="Todos">
            <h1>Todos:</h1>
            <?php
            include ("database.php");
            $sql = $pdo->query("SELECT * FROM todo");
            while ($row = $sql->fetch()) {
                ?>
                <form action="finish.php?id=<?php echo htmlspecialchars($row['id']); ?>" method="POST" class="mb-3">
                    <div id="task_<?php echo $row['id'] ?>" class="todo-element block p-3 border rounded">
                        <p>Task: <?php echo htmlspecialchars($row['task']); ?></p>
                        <p>Created: <?php echo htmlspecialchars($row['date_created']); ?></p>
                        <p id="fDateP">Finish:<?php echo htmlspecialchars($row['date_finished']); ?></p>
                        <button type="submit" class="btn btn-success">Finish</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            data-task-id="<?php echo htmlspecialchars($row['id']); ?>"
                            data-task="<?php echo htmlspecialchars($row['task']); ?>"
                            data-fdate="<?php echo htmlspecialchars($row['date_finished']); ?>">Change</button>
                    </div>
                </form>
                <?php
            }
            ?>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm" action="" method="POST">
                        <input type="hidden" id="editTaskId" name="task_id">
                        <div class="mb-3">
                            <label for="editTask" class="form-label">Task</label>
                            <input type="text" class="form-control" id="editTask" name="task">
                        </div>
                        <div class="mb-3">
                            <label for="editFDate" class="form-label">Finish Date</label>
                            <input type="text" class="form-control" id="editFDate" name="fDate">
                        </div>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="index.js"></script>
    <script>
        var exampleModal = document.getElementById('exampleModal')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget
            var taskId = button.getAttribute('data-task-id')
            var task = button.getAttribute('data-task')
            var fDate = button.getAttribute('data-fdate')

            var modalTitle = exampleModal.querySelector('.modal-title')
            var editTaskId = exampleModal.querySelector('#editTaskId')
            var editTask = exampleModal.querySelector('#editTask')
            var editFDate = exampleModal.querySelector('#editFDate')

            modalTitle.textContent = 'Edit Task ' + taskId
            editTaskId.value = taskId
            editTask.value = task
            editFDate.value = fDate

            modalTitle.textContent = 'Edit Task ' + taskId
            editTaskId.value = taskId
            editTask.value = task
            editFDate.value = fDate

            // Set the action attribute dynamically
            editForm.action = 'change.php?id=' + taskId
        })

    </script>

</body>

</html>