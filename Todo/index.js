function startChecking(){
    setInterval(function(){
        let elements = document.querySelectorAll('.todo-element');
        elements.forEach(function(element){
            let elementID = element.id.split('_')[1];
            fDate(elementID);
        });
    },500);
}

async function fDate(elementID){
    // Annahme: Du hast ein Element mit der ID 'fDate' in deinem HTML, das den Text "Finish: 2024-06-03" enthält
     // Hole den Textinhalt des Elements
    let element = document.getElementById('task_' + elementID);
    let finishText = element.querySelector('#fDateP').textContent;
    let datePart = finishText.split(":")[1]; // Trenne den Teil nach dem ": "

    // Überprüfen, ob das Datum im richtigen Format ist (YYYY-MM-DD)
    if (datePart) {
        let dateObject = new Date(datePart);
        let currentTime = new Date();
        let oneDayAhead = new Date();
        oneDayAhead.setDate(currentTime.getDate() + 1);
        const timestampOneDayAhead = Math.floor(oneDayAhead.getTime() / 1000);
        const timestampdateObject = Math.floor(dateObject.getTime() / 1000);
        const timestampCurrenTime = Math.floor(currentTime.getTime() / 1000);
        const timeDiff = timestampOneDayAhead - timestampdateObject;
        const oneDayUnix = 24 * 60 * 60;

        if (isNaN(dateObject.getTime())) {
            console.error("Invalid date:", datePart); // Ausgabe einer Fehlermeldung, wenn das Datum ungültig ist
        } else {
            if (timeDiff < oneDayUnix && !(timeDiff < 0)) {
                document.querySelector("#task_"+elementID).querySelector('#fDateP').style.color = "orange";
            }else if (timestampdateObject > timestampCurrenTime) {
            } else if (timestampdateObject < timestampCurrenTime && !(dateObject.getDay() == currentTime.getDay())) {
                document.querySelector("#task_"+elementID).querySelector('#fDateP').style.color = "red";
            }else {
                document.querySelector("#task_"+elementID).querySelector('#fDateP').style.color = "blue";
            }
        }
    } else {
        console.error("Date string not found."); // Ausgabe einer Fehlermeldung, wenn der Teil nach ": " nicht gefunden wird
    }



    
}
document.addEventListener('DOMContentLoaded', function(){
    startChecking();
})

