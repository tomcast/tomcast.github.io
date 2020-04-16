//Load existing and potential datasets and put them into their associated maps

var existing = new L.GeoJSON.AJAX("data/tacobell.json", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.streetAddr + "</br>" + feature.properties.city + ", " +
		feature.properties.state + " " + feature.properties.postalCode);
	}
});

var potential = new L.GeoJSON.AJAX("data/potential.json", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup("ID: " + feature.properties.Id);
	}
});

var tracts = new L.GeoJSON.AJAX("data/wayneCensusTracts.json");

existing.addTo(mapOne);
potential.addTo(mapTwo);
tracts.addTo(mapOne);