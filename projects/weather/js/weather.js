function toTitleCase (string) {
    // \u00C0-\u00ff for a happy Latin-1
    return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
        return initial.toUpperCase();
    }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
        return match.toLowerCase();
    });
}

function unixToDate (unix_timestamp) {
	var date = new Date(unix_timestamp*1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

function httpGetAsync (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function windDir (bearing) {
	if(bearing > 315 && bearing <= 45) {
		return "(N)"
	}
	else if (bearing > 45 && bearing <= 135) {
		return "(E)"
	}
	else if (bearing > 135 && bearing <= 225) {
		return "(S)"
	}
	else if (bearing > 225 && bearing <= 315) {
		return "(W)"
	}
	else{
		return "(?)"
	}
}


function processWeather(weatherData) {
	var weatherJSON = JSON.parse(weatherData);

	$('title').text(toTitleCase(weatherJSON.name) + " Weather");
	$('#mapHeader').text(toTitleCase(weatherJSON.name) + " Weather");
	$('#favicon').attr('href','http://openweathermap.org/img/w/' + weatherJSON.weather[0].icon + '.png')

	latlon = [weatherJSON.coord.lat, weatherJSON.coord.lon];
	makeMap(latlon, weatherJSON.name, weatherJSON.weather[0].icon);

	$(".temp").append(Math.floor(weatherJSON.main.temp * 9/5 - 459.67) + '°F (' + Math.floor(weatherJSON.main.temp - 273.15) + '°C)</br>');
	$(".desc").append(toTitleCase(weatherJSON.weather[0].description) + '</br>');
	$(".cloud").append('Cloud cover: '+ weatherJSON.clouds.all + '%</br>');
	$(".humid").append('Humidity: ' + weatherJSON.main.humidity + '%</br>');
	$(".press").append('Pressure: ' + weatherJSON.main.pressure + ' hPa</br>');
	$(".wDeg").append('Wind Bearing: ' + weatherJSON.wind.deg + ' ' + windDir(weatherJSON.wind.deg) +'</br>');
	$(".wSpd").append('Wind Speed: ' + (weatherJSON.wind.speed * 0.621371).toFixed(2) + ' mph</br>');
	$(".time").append('Last Update: ' + unixToDate(weatherJSON.dt));
	
}

function makeMap(latlon, name, icon) {

	var map = L.map('map', {zoomControl: false}).setView(latlon, 11);

	var locationMarker = L.marker(latlon, {
		icon: L.icon({
			iconUrl: 'http://openweathermap.org/img/w/' + icon + '.png',
			iconAnchor: [20,10],
			iconSize: [60,60]})}).addTo(map).bindPopup(toTitleCase(name));

	var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Weather data from <a href="http://openweathermap.org/about">OpenWeatherMap</a>'});

	osmLayer.addTo(map);

	var info = L.control();
	info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'weatherInfo');
    this.update();
    return this._div;
	};

	info.update = function () {
		this._div.innerHTML = '<div class="temp"></div><div class="desc"></div><div class="cloud"></div><div class="humid"></div><div class="press"></div><div class="wDeg"></div><div class="wSpd"></div><div class="time"></div>';
	}

	info.addTo(map);
}

function getLatLon() {
	return navigator.geolocation.getCurrentPosition(processLatLon);

}

function processLatLon(position) {
	var lat = position.coords.latitude.toFixed(2);
	var lon = position.coords.longitude.toFixed(2);
	httpGetAsync('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=285a2fd06760934042c5d08af1e8e008', processWeather)
}



getLatLon();