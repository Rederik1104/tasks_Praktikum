async function anmeldung() {
  var eqaulEmails = 0;
  // Formulardaten für Teilnehmer
  const formDataTeilnehmer = new FormData();
  formDataTeilnehmer.append("name", document.querySelector("#name").value);
  formDataTeilnehmer.append("email", document.querySelector("#email").value);

  // Fetch-Anfrage für Teilnehmerdaten
  try {
    const teilnehmer = await fetch("getAllTeilnehmer.php");
    const AllEmails = await teilnehmer.json();

    AllEmails.forEach((email) => {
      if (email == document.querySelector("#email").value) {
        eqaulEmails = +1;
      }
    });

    if (eqaulEmails != 0) {
      alert("Die Email gibt es schon");
    } else {
      const responseTeilnehmer = await fetch("teilnehmer.php", {
        method: "POST",
        body: formDataTeilnehmer,
      });

      if (!responseTeilnehmer.ok) {
        throw new Error(
          "Fehler beim Hinzufügen von Teilnehmerdaten: " +
            responseTeilnehmer.status
        );
      }
      console.log("Teilnehmerdaten erfolgreich gesendet.");
      window.location.href = "index.php";
    }
  } catch (error) {
    console.error("Fehler beim Senden der Teilnehmerdaten:", error);
    return; // Hier kannst du die Funktion abbrechen oder weitere Maßnahmen ergreifen
  }
}
