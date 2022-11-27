// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

var map = L.map('map').setView([42.46, -83.18], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var existing = new L.GeoJSON.AJAX("data/Locations.geojson", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.City + "</br>" + feature.properties.Address + ", " +
		feature.properties.state + " " + feature.properties.ZIP);
	}
}).addTo(map);

var areas = new L.GeoJSON.AJAX("data/areas.geojson", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup("Tract: " + feature.properties.GEOID + "</br> Population: " + feature.properties.pop_TOTAL);
	}
}).addTo(map);