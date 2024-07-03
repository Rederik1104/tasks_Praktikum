const apiKey = "7cd6cda54d9a423998c2f6a89c13bf12";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

fetch(proxyUrl + apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
