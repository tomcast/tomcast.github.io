//Load existing and potential datasets and put them into their associated maps

var existing = new L.GeoJSON.AJAX("data/Locations.json", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.City + "</br>" + feature.properties.Address + ", " +
		feature.properties.state + " " + feature.properties.ZIP);
	}
});

existing.addTo(map);