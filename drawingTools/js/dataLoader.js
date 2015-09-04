function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var districtLayer = new L.GeoJSON.AJAX("data/districts.json", {
	style: function(feature) {
		return {color: getRandomColor(),
				weight: 2,
				opacity: .25};
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.Name + "</h3></br>" + "Pop: " + feature.properties.Pop2006);
	}
}).addTo(map);