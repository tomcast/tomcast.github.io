var weatherActive = false;
var isoActive = false;
var hexActive = false;
var tinActive = false;

var isos = new L.geoJson();
var hexesGrid = new L.geoJson();
var tinGrid = new L.geoJson();


function addWeatherStations () {
	if (weatherActive === false) {	
		MichPoints.addTo(map);
		weatherActive = true;
	} else {
		map.removeLayer(MichPoints);
		weatherActive = false;
	}
}


function addIsoLines () {
	if(isoActive === false) {

		var isoPoints = MichPoints.toGeoJSON();
		var breaks = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
		var isolined = turf.isolines(isoPoints, 'Temp', 25, breaks);
		isos = new L.geoJson(isolined);
		isos.addTo(map);

		isoActive = true;
	} else {
		map.removeLayer(isos);
		isoActive = false;
	}
}


function addHexGrid () {
	if (hexActive === false) {
		var minX = MichPoints.getBounds().getSouthWest().lng;
		var minY = MichPoints.getBounds().getSouthWest().lat;
		var maxX = MichPoints.getBounds().getNorthEast().lng;
		var maxY = MichPoints.getBounds().getNorthEast().lat;

		var bbox = [minX,minY,maxX,maxY];
		var cellWidth = 50;
		var units = 'miles';

		var hex = turf.hexGrid(bbox, cellWidth, units);
		hexesGrid = new L.geoJson(hex);
		hexesGrid.addTo(map);

		hexActive = true;
	} else {
		map.removeLayer(hexesGrid);
		hexActive = false;
	}
}


function addTinGrid () {
	if (tinActive === false) {
		var tinPoints = MichPoints.toGeoJSON();
		var tin = turf.tin(tinPoints, "Temp");
		tinGrid = new L.geoJson(tin, {style: style});
		tinGrid.addTo(map);

		tinActive = true;
	} else {
		map.removeLayer(tinGrid);
		tinActive = false;
	}
}

function getColor(d) {
    return d > 100 ? '#800026' :
       d > 90  ? '#BD0026' :
       d > 80  ? '#E31A1C' :
       d > 70  ? '#FC4E2A' :
       d > 60   ? '#FD8D3C' :
       d > 50   ? '#FEB24C' :
       d > 40   ? '#FED976' :
                  '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.b),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}