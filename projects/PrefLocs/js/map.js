// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.


var mapOne = L.map('mapOne', {zoomControl: false}
         ).setView([42.3, -83.15], 10);

var mapTwo = L.map('mapTwo', {zoomControl: false}
         ).setView([42.3, -83.15], 10);

var mapThree = L.map('mapThree', {zoomControl: false}
         ).setView([42.3, -83.15], 10);

var mapFour = L.map('mapFour', {zoomControl: false}
         ).setView([42.3, -83.15], 10);

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osmLayer2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osmLayer3 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osmLayer4 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


osmLayer.addTo(mapOne);
osmLayer2.addTo(mapTwo);
osmLayer3.addTo(mapThree);
osmLayer4.addTo(mapFour);