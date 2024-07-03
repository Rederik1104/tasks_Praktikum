var loggedInB = false;
async function getData(){
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let response = await fetch('/Kalender/admin.php',{
        body: formData,
        method: "post"
    }
    )
    
    const LI = await fetch('verify.php');
    const bool = await LI.json();

    console.log(bool[1]);

    loggedIn(bool[1]);
}

async function loggedIn(data){
    if(data == true){
        $('#exampleModal').modal('hide');
        $('#loggedIn').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>');
        const res = await fetch('sessionID.php');
        const id = await res.json();
        
        localStorage.setItem("loggedIn", id.id);
    }else{
        alert("Incorrect password or email adress!");
        $('#loggedIn').html('');
        localStorage.setItem("loggedIn", false)
    }
}

async function setIcon(){
    if(await check() == true){
        $('#loggedIn').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>');
    }else{
        $('#loggedIn').html(''); 
    }
}

// Warten, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', (event) => {
    setIcon();
    // Alle Elemente mit der Klasse 'clickable' auswählen
    
});

// Einen Event-Listener für jedes dieser Elemente hinzufügen


const targetNode = document.body;

// Konfiguriere die Optionen für den Observer
const config = {
  childList: true,      // Überwache direkte Kinder
  subtree: true,        // Überwache den gesamten Unterbaum
  attributes: true,     // Überwache Attribut-Änderungen
  characterData: true   // Überwache Textänderungen
};

// Erstelle eine Callback-Funktion, die ausgeführt wird, wenn eine Mutation festgestellt wird
const callback = function(mutationsList, observer) {
    const clickableElements = document.querySelectorAll('.kalendertag');
    clickableElements.forEach(element => {
        element.addEventListener('click', async (event) => {
            // Textinhalt des geklickten Elements ausgeben
            if(await check()){
                let day = event.target.textContent;
                let dateMY = document.querySelector('.caption').textContent;
                let dateMYSplit = dateMY.split(" ");
                let month = dateMYSplit[0];
                let year = dateMYSplit[1];
                window.location.href = "addevent.html?day="+day+"&month="+month+"&year="+year;
            }
            else{
                let day = event.target.textContent;
                let dateMY = document.querySelector('.caption').textContent;
                let dateMYSplit = dateMY.split(" ");
                let month = dateMYSplit[0];
                let year = dateMYSplit[1];
                window.location.href = "allEvents.php?day="+day+"&month="+month+"&year="+year;
            }
        });
    });
};

// Erstelle einen Observer-Instanz und übergebe die Callback-Funktion
const observer = new MutationObserver(callback);

// Beginne die Überwachung des Ziel-Elements mit den konfigurierten Optionen
observer.observe(targetNode, config);


function logout(){
    localStorage.setItem("loggedIn", false);
    setIcon();
}

async function check(){

    const idGet = localStorage.getItem("loggedIn");

    if (!idGet) {
        console.error("Kein Wert im localStorage für 'loggedIn' gefunden");
        return;
    }

    try {
        const response = await fetch('checkSessionID.php', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idGet })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        if (data && data.loggedIn !== undefined) {
            const dataB = data.loggedIn;
            return dataB;
        } else {
            console.error('Unerwartete Antwortstruktur:', data);
            return null;
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Sitzung:', error);
        return null;
    }
}




