async function anmeldung() {
  // Formulardaten für Teilnehmer
  const formDataTeilnehmer = new FormData();
  formDataTeilnehmer.append("name", document.querySelector("#name").value);
  formDataTeilnehmer.append("email", document.querySelector("#email").value);

  // Fetch-Anfrage für Teilnehmerdaten
  try {
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
  } catch (error) {
    console.error("Fehler beim Senden der Teilnehmerdaten:", error);
    return; // Hier kannst du die Funktion abbrechen oder weitere Maßnahmen ergreifen
  }
}
