function cityStyling (feature) {
	return {color: '#0000FF',
			radius: 8}
};

var cityLayer = new L.GeoJSON.AJAX("data/worldCityPop.json", {
	style: function(feature) {
		return cityStyling(feature);
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup(
		"<h3>" + feature.properties.CITY_NAME + ", " + feature.properties.CNTRY_NAME + "</h3>" + 
		"</br> City Type: " + feature.properties.STATUS +
		"</br>Population: " + feature.properties.POP);
	}
}).addTo(map);