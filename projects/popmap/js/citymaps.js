function popColor (popClass) {
	return  popClass == '5,000,000 and greater' ? '#01665E':
			popClass == '1,000,000 to 4,999,999' ? '#5AB4AC':
			popClass == '500,000 to 999,999' ? '#C7EAE5':
			popClass == '250,000 to 499,999' ? '#F5F5F5':
			popClass == '100,000 to 249,999' ? '#F6E8C3':
			popClass == '50,000 to 99,999' ? '#D8B365':
											 '#8C510A';
}

var cityLayer = new L.GeoJSON.AJAX("data/worldCityPop.json", {
	pointToLayer: function( feature, latlng) {
		return L.circleMarker( latlng, {
			radius: Math.log(feature.properties.POP)*.5,
			color: popColor(feature.properties.POP_CLASS),
			opacity: 10
		})
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup(
		"<h3>" + feature.properties.CITY_NAME + ", " + feature.properties.CNTRY_NAME + "</h3>" + 
		"</br> City Type: " + feature.properties.STATUS +
		"</br>Population: " + feature.properties.POP);
	}
}).addTo(map);