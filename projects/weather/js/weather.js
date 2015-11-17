function toTitleCase(string)
{
    // \u00C0-\u00ff for a happy Latin-1
    return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
        return initial.toUpperCase();
    }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
        return match.toLowerCase();
    });
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function processWeather(weatherData) {
	var weatherJSON = JSON.parse(weatherData);
	latlon = [weatherJSON.coord.lat, weatherJSON.coord.lon];
	makeMap(latlon, weatherJSON.name, weatherJSON.weather[0].icon);
	decorate(weatherJSON);

	$(".temp").append(Math.floor(weatherJSON.main.temp * 9/5 - 459.67) + '°F (' + Math.floor(weatherJSON.main.temp - 273.15) + '°C)</br>');
	$(".desc").append(weatherJSON.weather[0].description + '</br>');
	$(".cloud").append(weatherJSON.clouds.all + '%</br>');
	$(".humid").append(weatherJSON.main.humidity + '%</br>');
	$(".press").append(weatherJSON.main.pressure + ' hPa</br>');
	$(".wDeg").append(weatherJSON.wind.deg + '</br>');
	$(".wSpd").append((weatherJSON.wind.speed * 0.621371).toFixed(2) + ' mph</br>');
	
}

function makeMap(latlon, name, icon) {
	//does nothing but put a smile in console for now...
	var map = L.map('map', {zoomControl: false}).setView(latlon, 10);
	// var iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
	// var weatherIcon = L.icon({
	// 	iconurl:
	// })

	var locationMarker = L.marker(latlon, {
		icon: L.icon({
			iconUrl: 'http://openweathermap.org/img/w/' + icon + '.png',
			iconAnchor: [20,10]})}).addTo(map).bindPopup(toTitleCase(name));

	var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});

	osmLayer.addTo(map);
}

function decorate(weatherJSON){
	$('title').text(toTitleCase(weatherJSON.name) + " Weather");
	$('#favicon').attr('href','http://openweathermap.org/img/w/' + weatherJSON.weather[0].icon + '.png')
}

var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?id=5015599&appid=285a2fd06760934042c5d08af1e8e008';
httpGetAsync(weatherUrl, processWeather);