// File takes in data manifest file and loads datasets.
// Must be loaded after the data modal is created.

function loadPointDataToModal (layerName, layerDisplayName, layerType) {
	// Takes a layer name and layer type (points/poly/etc)
	// and adds it to the data selection modal to be used.

	modal = document.getElementsByClassName('dataList')[0];
	modalString = '<li><div id="' + layerName + 'Toggle" class="dataLayer">' + layerDisplayName + '</div></li>';

	modal.innerHTML += modalString;
}

//Load the data via Leaflet AJAX plugin
var wayneMiTacoBell = new L.GeoJSON.AJAX("data/wayne_tacobell.json", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.streetAddr + "</br>" + feature.properties.city + ", " +
		feature.properties.state + " " + feature.properties.postalCode);
	}
});

//Load loaded data to the data controlling modal via function
loadPointDataToModal('wayneMiTacoBell', "Wayne Taco Bell", "point");


//Add connection between layer and data modal via jquery
$('#wayneMiTacoBellToggle').click( function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		map.removeLayer(wayneMiTacoBell);
	} else {
		$(this).addClass('active');
		wayneMiTacoBell.addTo(map);
	}
});
