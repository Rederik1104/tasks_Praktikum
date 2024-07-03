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




