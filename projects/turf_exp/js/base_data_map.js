// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

//Create base map in basicMap div
var basicMap = L.map('basicMap').setView([42.46, -83.18], 9);;

//Load basemap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(basicMap);


//Load location data with popup
var locations = new L.GeoJSON.AJAX("data/Locations.geojson", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.City + "</br>" + feature.properties.Address + ", " +
		feature.properties.State + " " + feature.properties.ZIP);
	}
}).addTo(basicMap);


//Load and display the base geographic areas
var areas = new L.GeoJSON.AJAX("data/areas.geojson", {
	style: function (feature,layer) { return {
		fillColor: getColor(feature.properties.pop_TOTAL),
		fillOpacity: .7,
		weight: 1,
		color: 'white'}
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("Tract: " + feature.properties.GEOID + "</br> Population: " + feature.properties.pop_TOTAL);
	}
}).addTo(basicMap);

