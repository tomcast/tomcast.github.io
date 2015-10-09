// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

//Initiate Map, Zoom control disabled so we can custom place it and fullscreen controls later.
var map = L.map('map', {zoomControl: false}
         ).setView([0.0, 0.0], 2);


var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osmBWLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

var osmHOTLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
});

var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

//Initiate a basemap on load, OSM for default, and set it as our default activeLayer
osmLayer.addTo(map);

var baseMaps = {
  "Openstreet Map": osmLayer,
  "Day Transit": Here_DayTransit,
  "Satellite": Here_SatHybrid,
  "Openstreet Map Black and White": osmBWLayer,
  "Openstreet HOT": osmHOTLayer,
  "Stamen TonerLite": Stamen_TonerLite,
  "Topographic": Esri_WorldTopoMap
};


//Add layer control and user controls to the map
L.control.layers(baseMaps).addTo(map);
L.control.fullscreen({ position: 'topleft' }).addTo(map);
new L.Control.Zoom({ position: 'topleft' }).addTo(map);


var featureGroup = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
  edit: {
      featureGroup: featureGroup
    }
}).addTo(map);

map.on('draw:created', function(e) {
  featureGroup.addLayer(e.layer);
});