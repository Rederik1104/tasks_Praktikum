var d = new Date();
var dm = d.getMonth() + 1;
var dj = d.getFullYear();

function changeMonth(direction) {
    if (direction == "-") {
        dm -= 1;
        if (dm < 1) {
            dm = 12;
            dj -= 1;
        }
    } else if (direction == "+") {
        dm += 1;
        if (dm > 12) {
            dm = 1;
            dj += 1;
        }
    }
    Kalender(dm, dj);
}

Kalender(dm, dj);

function Kalender(Monat, Jahr) {
    var Monatsname = ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"];
    var Tag = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    // aktuelles Datum für die spätere Hervorhebung ermitteln
    var jetzt = new Date();
    var DieserMonat = jetzt.getMonth() + 1;
    var DiesesJahr = jetzt.getFullYear();
    var DieserTag = jetzt.getDate();

    // ermittle Wochentag des ersten Tags im Monat halte diese Information in Start fest
    var Zeit = new Date(Jahr, Monat - 1, 1);
    var Start = Zeit.getDay();

    if (Start > 0) {
        Start--;
    } else {
        Start = 6;
    }

    // die meisten Monate haben 31 Tage...
    var Stop = 31;

    // ...April (4), Juni (6), September (9) und November (11) haben nur 30 Tage...
    if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --Stop;

    // ...und der Februar nur 28 Tage...
    if (Monat == 2) {
        Stop = Stop - 3;
        // ...außer in Schaltjahren
        if (Jahr % 4 == 0) Stop++;
        if (Jahr % 100 == 0) Stop--;
        if (Jahr % 400 == 0) Stop++;
    }

    var tabelle = document.getElementById('table');

    // Entferne alle Zeilen der bestehenden Tabelle
    while (tabelle.rows.length > 0) {
        tabelle.deleteRow(0);
    }

    // schreibe Tabellenüberschrift
    var Monatskopf = Monatsname[Monat - 1] + " " + Jahr;
    $('.caption').html('<h3>' + Monatskopf + '</h3>');

    // schreibe Tabellenkopf
    var row = tabelle.insertRow(0);
    for (var i = 0; i <= 6; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = Tag[i];
    }

    // ermittle Tag und schreibe Zeile
    var Tageszahl = 1;

    for (var i = 0; i <= 5; i++) {
        var row = tabelle.insertRow(1 + i);

        for (var j = 0; j <= 6; j++) {
            // Zellen vor dem Start-Tag in der ersten Zeile und Zeilen nach dem Stop-Tag werden leer aufgefüllt
            if (((i == 0) && (j < Start)) || (Tageszahl > Stop)) {
                var cell = row.insertCell(j);
                cell.innerHTML = ' ';
            } else {
                // normale Zellen werden mit der Tageszahl befüllt und mit der Klasse Kalendertag markiert
                var cell = row.insertCell(j);
                cell.innerHTML = Tageszahl;
                cell.className = 'kalendertag';

                // und der aktuelle Tag (heute) wird noch einmal speziell mit der Klasse "heute" markiert
                if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
                    cell.className = cell.className + ' heute';
                }

                Tageszahl++;
            }
        }
    }
    $('.heute').css('border', 'solid blue');
}



