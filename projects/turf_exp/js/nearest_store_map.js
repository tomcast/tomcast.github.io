// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

//Create base map in basicMap div

var distMap = L.map('distanceMap').setView([42.46, -83.18], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(distMap);


var locations = new L.GeoJSON.AJAX("data/Locations.geojson", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.City + "</br>" + feature.properties.Address + ", " +
		feature.properties.State + " " + feature.properties.ZIP);
	}
}).addTo(distMap);


var areas = new L.GeoJSON.AJAX("data/areas.geojson", {
    onEachFeature: function(feature) {
		feature.properties.NearestStore = "2"
	},
    onEachFeature: function(feature, layer) {
		layer.bindPopup("Tract: " + feature.properties.GEOID + "</br> Population: " + feature.properties.pop_TOTAL + " </br> Nearest Store: " + feature.properties.NearestStore);
	},
	style: function (feature,layer) { return {
		fillColor: getColor(feature.properties.NearestStore),
		fillOpacity: .7,
		weight: 1,
		color: 'white'}
	},
}).addTo(distMap);

