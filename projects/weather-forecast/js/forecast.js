function toTitleCase (string) {
    // \u00C0-\u00ff for a happy Latin-1
    return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
        return initial.toUpperCase();
    }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
        return match.toLowerCase();
    });
}


function windDir (bearing) {
    if(bearing > 315 && bearing <= 45) {
        return "N"
    }
    else if (bearing > 45 && bearing <= 135) {
        return "E"
    }
    else if (bearing > 135 && bearing <= 225) {
        return "S"
    }
    else if (bearing > 225 && bearing <= 315) {
        return "W"
    }
    else{
        return "?"
    }
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


function getLatLon() {
    return navigator.geolocation.getCurrentPosition(processLatLon);
}


function processLatLon(position) {
    var lat = position.coords.latitude.toFixed(2);
    var lon = position.coords.longitude.toFixed(2);
    httpGetAsync('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=285a2fd06760934042c5d08af1e8e008', processForecast);
}

function processForecast (forecastData) {
    var forecastJSON = JSON.parse(forecastData);

    $('title').text(toTitleCase(forecastJSON.city.name) + " 5-Day Forecast");
    $('#header').text(toTitleCase(forecastJSON.city.name) + " 5-Day Forecast");

    table = document.getElementById("forecastTable");
    for (var i = forecastJSON.list.length - 1; i >= 0; i--) {
        var row = table.insertRow(0);
        var cellDate = row.insertCell(0);
        var cellTemp = row.insertCell(1);
        var cellCloud = row.insertCell(2);
        var cellHum = row.insertCell(3);
        var cellPres = row.insertCell(4);
        var cellCond = row.insertCell(5);
        var cellIcon = row.insertCell(6);
        var cellWind = row.insertCell(7);
        var cellWindDir = row.insertCell(8);
        cellDate.innerHTML = forecastJSON.list[i].dt_txt;
        theTemp = forecastJSON.list[i].main.temp;
        cellTemp.innerHTML = Math.floor(theTemp * 9/5 - 459.67) + ' (' + Math.floor(theTemp - 273.15) + ')';
        cellHum.innerHTML = forecastJSON.list[i].main.humidity;
        cellPres.innerHTML = forecastJSON.list[i].main.pressure;
        cellCloud.innerHTML = forecastJSON.list[i].clouds.all;
        cellCond.innerHTML = toTitleCase(forecastJSON.list[i].weather[0].description);
        cellIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastJSON.list[i].weather[0].icon + ".png'>";
        cellWind.innerHTML = (forecastJSON.list[i].wind.speed * 0.621371).toFixed(2);
        cellWindDir.innerHTML = windDir(forecastJSON.list[i].wind.deg);
    };
}

getLatLon();