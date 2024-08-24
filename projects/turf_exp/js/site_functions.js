//Collection of functions used in the turf experiments
function changePageTitle() {
    potentialArray = [
        "went to the moon",
        "is reading your emails",
        "is not from Earth",
        "is wondering if you notice this",
        "likes ducks",
        "is playing Animal Crossing",
        "doesn't like Kyle Busch",
        "doesn't like you",
        "loves Red Bull",
        "is not James Acaster",
        "says you should hit F5",
        "is actually Toast",
        "is a simulation",
        "is an AI",
        "loves 🤘death metal🤘",
        "is a fan of grapes",
        "has roid rage 🏋️‍♂️"];

    newPageTitle = "Tom Cast " + potentialArray[Math.floor(Math.random() * potentialArray.length)]
    document.title = newPageTitle;
}


function getColor(d) {
    /*
		Creates the style for the basemap areas
	*/
	return d > 5555 ? '#b30000' :
		d > 3969  ? '#e34a33' :
		d > 2647  ? '#fc8d59' :
		d > 1174  ? '#fdcc8a' :
				   '#fef0d9' ;
}


function getNearestStore (point, locations){
	/*
		Takes in a point and returns the nearest location
		from a list of potential locations
	*/

	return "2"
}


function weightedAve (toBeAvg) {
	/* takes an array of json objects in the form of:
	toBeAvg = [
		{
			"id": 1,
			"distance": 10,
			"demand": 25
		},
		{
			"id": 2,
			"distance": 20,
			"demand": 35
		}

	]
	*/

	var sumWeightedValue = 0;
	var sumDistance = 0;
	var sumDemand = 0;

	for (var i = 0; i < toBeAvg.length; i++) {
	  sumDistance += toBeAvg[i].distance;
	  sumDemand += toBeAvg[i].demand;
	  sumWeightedValue += toBeAvg[i].distance * toBeAvg[i].demand;

	}

	return sumWeightedValue/sumDemand;
}