const convertToKebabCase = (string) => {
    return string.replace(/\s+/g, '-').toLowerCase();
}
document.addEventListener('DOMContentLoaded', async () => {
    const eventsContainer = document.getElementById('events-container');

    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');
    const month = urlParams.get('month');
    const year = urlParams.get('year');

    try {
        // Alle Events abrufen
        const response = await fetch('getAllEvents.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const allEvents = await response.json();

        // Events für den spezifischen Tag filtern
        const filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.timestamp);
            return (
                eventDate.getDate() === parseInt(day, 10) &&
                eventDate.getMonth() === getMonthNumber(month) &&
                eventDate.getFullYear() === parseInt(year, 10)
            );
        });

        // Events anzeigen
        eventsContainer.innerHTML = ''; // Clear loading message

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<p>Keine Events gefunden.</p>';
        } else {
            filteredEvents.forEach(async event =>{
                const eventElement = document.createElement('div');
                eventElement.id = event.id;
                eventElement.className = 'event';
                eventElement.innerHTML = `
                    <h2>${event.title}</h2>
                    <p><strong>Datum:</strong> ${new Date(event.timestamp).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}, ${event.time}</p>
                    <p>${event.description}</p>
                    <p>${event.dauer} Minuten</p>
                `;
                if(await check()){
                    eventElement.innerHTML = `
                    <h2>${event.title}</h2>
                    <p><strong>Datum:</strong> ${new Date(event.timestamp).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}, ${event.time}</p>
                    <p>${event.description}</p>
                    <p>${event.dauer} Minuten</p>
                    <button id="delete" onclick=deleteB(${event.id})>Delete</button>
                    <button id="change" onclick="showChangeForm(${event.id})">Change</button>`;
                }
                eventsContainer.appendChild(eventElement);
            });
        }
    } catch (error) {
        eventsContainer.innerHTML = `<p>Fehler beim Laden der Events: ${error.message}</p>`;
    }
});

// Hilfsfunktion zur Umwandlung des Monatsnamens in eine Zahl (0-11)
function getMonthNumber(monthName) {
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    return months.indexOf(monthName);
}

function deleteB(id){
    window.location.href = 'deleteEvent.php?id=' + id; 
}
async function showChangeForm(eventID) {
    const res = await fetch('getAllEvents.php');
    const data = await res.json();
    data.forEach(object => {
        if(object.id == eventID){
            const description = convertToKebabCase(object.description);
            const title = convertToKebabCase(object.title);
            window.location.href = "updateEvent.php?title="+ title + "&description=" + description + "&time=" + object.time + "&dauer=" + object.dauer + "&id=" + eventID;
        }
    })
    
}

