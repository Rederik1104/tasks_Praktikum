document.querySelector("#search").addEventListener('input', autocomplete);

function autocomplete(){
    let input = document.querySelector("#search");
    let val = String(input.value.toLowerCase()).trim();

    console.log(val);

    fetch('get-suggestions.php')
    .then(response => response.json())
    .then(suggestions => {
        let filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.trim().toLowerCase().includes(val.toLowerCase())
        );
        let filteredSuggestionsL = filteredSuggestions.map(v => v.toLowerCase());

        console.log('filteredSuggestionsL:', filteredSuggestionsL); // Debug-Ausgabe
        let allTasks = document.querySelectorAll('.todo-element');
        allTasks.forEach(element => {
            let taskText = element.querySelector('#tasK').textContent.toLowerCase();
            let taskSplit = taskText.split(": ");
            console.log(taskSplit[1]); // Debug-Ausgabe
            if (filteredSuggestionsL.includes(taskSplit[1]) || (val === "")) {
                element.style.display = 'block';
            } else if(!(val === "")) {
                element.style.display = 'none';
            }
        });
    })
    .catch(error => console.error('Error fetching suggestions:', error));

}
