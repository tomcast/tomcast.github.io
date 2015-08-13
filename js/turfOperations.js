
//Creates a hexagon grid and adds it to the map
// var bbox = [-96,31,-84,40];
// var cellWidth = 50;
// var units = 'miles';
//
// var hex = turf.hexGrid(bbox, cellWidth, units);
// var hexes = new L.geoJson(hex);
// hexes.addTo(map);


//Creates Isolines over breakpoints using a set of point data
// var isoBreaks = [];
// for (var i = -110; i < 115; i = i+5) {
// 	isoBreaks.push(i);
// };

function addIsoLines () {

	var isoPoints = MichPoints.toGeoJSON();
	var breaks = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
	var isolined = turf.isolines(isoPoints, 'Temp', 25, breaks);
	var isos = new L.geoJson(isolined);
	isos.addTo(map);

}