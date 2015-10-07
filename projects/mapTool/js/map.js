// File to handle the background map and toggle background map layers on and off.
// Does not work with other data outside of background map.

//Initiate Map, Zoom control disabled so we can custom place it and fullscreen controls later.
var map = L.map('map', {zoomControl: false}
         ).setView([0.0, 0.0], 2);


var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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


//Initiate a basemap on load, OSM for default, and set it as our default activeLayer
osmLayer.addTo(map);

var baseMaps = {
  "Openstreet Map": osmLayer,
  "Day Transit": Here_DayTransit,
  "Satellite": Here_SatHybrid
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