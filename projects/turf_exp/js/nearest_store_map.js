// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

//Create base map in basicMap div
var distMap = L.map('distanceMap').setView([42.46, -83.18], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(distMap);