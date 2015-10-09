//Creates the Add Data button for the data control modal

var addDataButton = L.control({position: 'bottomright'});

addDataButton.onAdd = function (map) {

	var div = L.DomUtil.create('a', 'button radius alert tiny addData')
	div.innerHTML = 'Add Data';
	return div;

};


addDataButton.addTo(map);
