async function amSonntagAktiv() {
  // Aktuelles Datum und Wochentag erhalten
  let heute = new Date();
  let wochentag = heute.getDay(); // Sonntag ist 0, Montag ist 1, ..., Samstag ist 6

  console.log(wochentag);

  // Prüfen, ob heute Sonntag ist (wochentag == 0)
  if (wochentag === 0) {
    console.log("Es ist Sonntag!");

    try {
      // Fetch-Anfrage für Veranstaltungsdaten
      const responseEvents = await fetch("getAllEvents.php");
      if (!responseEvents.ok) {
        throw new Error(
          "Fehler beim Abrufen der Veranstaltungsdaten: " +
            responseEvents.status
        );
      }
      const events = await responseEvents.json();

      let useFullEvents = [];
      let today = new Date();
      let nextWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );

      events.forEach((element) => {
        let eventDate = new Date(element.timestamp);
        if (eventDate >= today && eventDate <= nextWeek) {
          useFullEvents.push(element);
        }
      });

      console.log(useFullEvents);

      const responseTeilnehmer = await fetch("getAllTeilnehmer.php");
      if (!responseTeilnehmer.ok) {
        throw new Error(
          "Fehler beim Abrufen der Teilnehmerdaten: " +
            responseTeilnehmer.status
        );
      }
      const emails = await responseTeilnehmer.json();

      console.log(emails);

      // E-Mails an Teilnehmer versenden
      for (let email of emails) {
        const jsonEvents = JSON.stringify({
          email: email,
          events: useFullEvents,
        });

        try {
          const responseMail = await fetch("nMail.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonEvents,
          });

          if (!responseMail.ok) {
            throw new Error(
              "Fehler beim Senden der E-Mail: " + responseMail.status
            );
          }

          const responseData = await responseMail.json();
          console.log("E-Mail erfolgreich gesendet an:", email, responseData);
        } catch (error) {
          console.error("Fehler beim Senden der E-Mail an:", email, error);
        }
      }
    } catch (error) {
      console.error(
        "Fehler beim Senden der Anfrage oder Verarbeiten der Daten:",
        error
      );
    }

    clearInterval(interval);
  } else {
    console.log(
      "Heute ist leider kein Sonntag. Warten wir auf den nächsten Sonntag."
    );
  }
}

amSonntagAktiv();
