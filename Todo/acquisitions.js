import './node_modules/chart.js/dist/chart.umd.js';

fetch('time.php')
    .then(response => response.json())
    .then(data => {
        console.log('Received Data:', data); // Debug-Ausgabe der empfangenen Daten

        // Arrays für jeden Monat initialisieren
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthData = months.map(() => ({ late: [], onTime: [], earlier: [] }));
        console.log(monthData);

        // Daten nach Monat sortieren und in Arrays einfügen
        data.forEach(row => {
            const date = new Date(row.date);
            const monthIndex = date.getMonth(); // 0 for January, 1 for February, etc.

            monthData[monthIndex].late.push(row.late);
            monthData[monthIndex].onTime.push(row.onTime);
            monthData[monthIndex].earlier.push(row.earlier);
        });

        // Daten für das Diagramm vorbereiten
        const count1Data = monthData.map(m => m.late.reduce((a, b) => a + b, 0));
        const count2Data = monthData.map(m => m.onTime.reduce((a, b) => a + b, 0));
        const count3Data = monthData.map(m => m.earlier.reduce((a, b) => a + b, 0));

        // Diagramm erstellen
        new Chart(
            document.getElementById('acquisitions'),
            {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'late',
                            data: count1Data,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            fill: false,
                            tension: 0.1
                        },
                        {
                            label: 'onTime',
                            data: count2Data,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            fill: false,
                            tension: 0.1
                        },
                        {
                            label: 'earlier',
                            data: count3Data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            fill: false,
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );
    })
    .catch(error => console.error('Error fetching suggestions:', error));
