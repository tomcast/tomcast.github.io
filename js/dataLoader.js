var MichPoints = new L.GeoJSON.AJAX("data/michigan.json", 
	{onEachFeature: function (feature, layer) {
		layer.bindPopup(feature.properties.Station + " - " + feature.properties.Temp + "F");
	}
});