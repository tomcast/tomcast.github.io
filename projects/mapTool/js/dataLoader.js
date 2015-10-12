// File takes in data manifest file and loads datasets.
// Must be loaded after the data modal is created.

function loadPointDataToModal (layerName, layerDisplayName, layerType) {
	// Takes a layer name and layer type (points/poly/etc)
	// and adds it to the data selection modal to be used.

	modal = document.getElementsByClassName('dataList')[0];
	modalString = '<li><div id="' + layerName + 'Toggle" class="dataLayer">' + layerDisplayName + '</div></li>';

	modal.innerHTML += modalString;
}


function fix_handler (layerName, layer) {
	//Takes in a layer and layer name and affixes the handling for it
	$('#' + layerName + 'Toggle').click( function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			map.removeLayer(layer);
		} else {
			$(this).addClass('active');
			layer.addTo(map);
		}
	});

}


//Load the data via Leaflet AJAX plugin
var wayneMiTacoBell = new L.GeoJSON.AJAX("data/wayne_tacobell.json", {
	onEachFeature: function(feature, layer) {
		layer.bindPopup(feature.properties.streetAddr + "</br>" + feature.properties.city + ", " +
		feature.properties.state + " " + feature.properties.postalCode);
	}
});


var cairoDistrictLayer = new L.GeoJSON.AJAX("data/cairo_districts.json", {
	style: function(feature) {
		return {color: getRandomColor(),
				weight: 2,
				opacity: 1};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h4>" + feature.properties.Name + "</h4></br>" + "Population: " + feature.properties.Pop2006);
	}
});


var cairoPopLayer = new L.GeoJSON.AJAX("data/cairo_districts.json", {
	style: function(feature) {
		return {color: popColor(feature.properties.Pop2006),
				weight: 2,
				opacity: 1};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h4>" + feature.properties.Name + "</h4></br>" + "Population: " + feature.properties.Pop2006);
	}
});

var cairoWealthLayer = new L.GeoJSON.AJAX("data/cairo_districts_wealth.json", {
	style: function(feature) {
		return {color: wealthColor(feature.properties.Wealth_Cla),
				weight: 2,
				opacity: 1};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h4>" + feature.properties.Name + "</h4></br>" + "Wealth Level: " + feature.properties.Wealth_Cla);
	}
});

var wayneMi_CensusTracts = new L.GeoJSON.AJAX("data/wayneCensusTracts.json", {
	style: function(feature) {
		return {color: getRandomColor(),
			weight: 2,
			opacity: 1};
	}
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//Load loaded data to the data controlling modal via function
loadPointDataToModal('wayneMiTacoBell', "Wayne Taco Bell", "point");
loadPointDataToModal('wayneMiCensusTracts', "Wayne Census Tracts", "polygon");
loadPointDataToModal('cairoDistricts', "Cairo Districts", "polygon");
loadPointDataToModal('cairoDistrictWealth', "Cairo Wealth", "polygon");
loadPointDataToModal('cairoDistrictPop', "Cairo Population", "polygon");
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//Add connection between layer and data modal via jquery
fix_handler('wayneMiTacoBell',wayneMiTacoBell);
fix_handler('wayneMiCensusTracts', wayneMi_CensusTracts);
fix_handler('cairoDistricts', cairoDistrictLayer);
fix_handler('cairoDistrictWealth', cairoWealthLayer);
fix_handler('cairoDistrictPop', cairoPopLayer);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////