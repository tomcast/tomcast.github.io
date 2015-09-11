var districtLayer = new L.GeoJSON.AJAX("data/districts.json", {
	style: function(feature) {
		return {color: getRandomColor(),
				weight: 2,
				opacity: 1};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.Name + "</h3></br>" + "Pop: " + feature.properties.Pop2006);
	}
});

var wealthLayer = new L.GeoJSON.AJAX("data/WealthPolygons.json", {
	style: function(feature) {
		return {color: wealthColor(feature.properties.Wealth_Cla),
				weight: 2,
				opacity: 1};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.Name + "</h3></br>" + "Wealth Level: " + feature.properties.Wealth_Cla);
	}
});