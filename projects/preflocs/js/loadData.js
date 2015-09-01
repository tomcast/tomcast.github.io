/*
This file loads Taco Bell locations for Wayne County, then loads Wayne County census Tracts
*/
console.log('Loading Data...');

var polygonData = {
	"Wayne CT": {
		setName: "Wayne Census Tracts", 
		setLoc: 'wayne_ct_7_13_15.json',
		type: 'Demographic'
	}
};

var pointData = {
	"Taco Bell": {
		setName: "Wayne Taco Bell",
		setLoc: 'tacobell_7_13_15.json',
		type: 'Competitive Location'
	}
};

for (dataset in pointData){
	var points = new L.GeoJSON.AJAX("data/" + pointData[dataset].setLoc);
	points.addTo(map);
};

for (dataset in polygonData){
	var polys = new L.GeoJSON.AJAX("data/" + polygonData[dataset].setLoc);
	polys.addTo(map);
};

console.log('Data loading complete!')