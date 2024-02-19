"use strict"

//Skapar Leaflet karta
const map = L.map('map').setView([59.3251172, 18.0710935], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 
// Event för sökknappen för att köra igång sökning
document.getElementById("searchButton").addEventListener("click", searchLocation);

// Tar platsnamn från sökfältet och skickar det med i länken
function searchLocation(){
    let locationValue = document.getElementById("search").value;
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${locationValue}`;
    fetchLocation(url);
}

//Ajax anrop för att hämta koordinater
async function fetchLocation(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        let lat = data[0].lat;
        let lon = data[0].lon;

          // Uppdatera Leaflet kartan med lat & lon
        map.setView([lat, lon], 13);

          // Skapar markör
          let marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(data[0].name).openPopup();
       
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
} 



   

