<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Event</title>
    <link rel="stylesheet" href="addevent.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <h1>Change Event</h1>
        <form id="eventForm" action="changeEvent.php?id=<?php echo $_GET['id'] ?>" method="post">
            <div class="form-group">
                <label for="eventTitle">Event Titel</label>
                <input type="text" class="form-control" id="eventTitle" name="title" required
                    value="<?php echo $_GET['title'] ?>">
            </div>
            <div class="form-group">
                <label for="eventTime">Uhrzeit</label>
                <input type="time" class="form-control" id="eventTime" name="time" required
                    value="<?php echo $_GET['time'] ?>">
            </div>
            <div class="form-group">
                <label for="eventTime">Dauer</label>
                <input type="int" class="form-control" id="eventDauer" name="dauer" required placeholder="in Minuten"
                    value="<?php echo $_GET['dauer'] ?>">
            </div>
            <div class="form-group">
                <label for="eventDescription">Beschreibung</label>
                <textarea class="form-control" id="eventDescription" name="description" rows="3"
                    required><?php echo htmlspecialchars($_GET['description']); ?></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Event Bearbeiten</button>
        </form>
    </div>
    <script>
        // JavaScript-Beispiel, um den Wert des Textareas zu ändern
        const convertFromKebabCase = (string) => {
            return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        const eventDescriptionTextarea = document.getElementById('eventDescription');
        const description = "<?php echo $_GET['description']; ?>";
        eventDescriptionTextarea.value = convertFromKebabCase(description);

        const titleArea = document.querySelector('#eventTitle');
        const title = "<?php echo $_GET['title'] ?>";
        titleArea.value = convertFromKebabCase(title);

    </script>
</body>

</html>