// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.


var map = L.map('map', {zoomControl: false}
         ).setView([10, 0], 2);


var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osmBW = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Here_SatHybrid = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/hybrid.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
  //attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
  subdomains: '1234',
  mapID: 'newest',
  app_id: 'Y8m9dK2brESDPGJPdrvs',
  app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
  base: 'aerial',
  maxZoom: 20
});

var Here_DayTransit = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.transit/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
  //attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
  subdomains: '1234',
  mapID: 'newest',
  app_id: 'Y8m9dK2brESDPGJPdrvs',
  app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
  base: 'base',
  maxZoom: 20
});

var Thunderforest_TransportDark = L.tileLayer('http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png', {
	// attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	maxZoom: 19
});

//Initiate a basemap on load, OSM for default, and set it as our default activeLayer
Thunderforest_TransportDark.addTo(map);

var featureGroup = L.featureGroup().addTo(map);

var baseMaps = {
  "OpenStreetMap": osmLayer,
  "Day Transit": Here_DayTransit,
  "Satellite": Here_SatHybrid,
  "OpenStreetMap B & W": osmBW,
  "ThunderForest Dark": Thunderforest_TransportDark
  };

//Add layer control and user controls to the map
L.control.layers(baseMaps).addTo(map);
L.control.fullscreen({ position: 'topright' }).addTo(map);
new L.Control.Zoom({ position: 'topright' }).addTo(map);