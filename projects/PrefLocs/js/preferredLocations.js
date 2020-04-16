// Functions involved in this file require turfjs to be loaded prior.

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


function getRandomNums (numberOfNums, maxValue) {
	/*
		Returns a set of numbers to use for picking random
		locations out of the potential locations
	*/

	var randomNums = [];
	while(randomNums.length < numberOfNums){
		var rand = Math.floor(Math.random() * (maxValue));
		if(randomNums.indexOf(rand) === -1) {
			randomNums.push(rand)
		}
	}
	
	return randomNums;
}


function pickRandomPoints (existingArray, randomNums) {
	/*
		Takes in two arrays, one of points and one of random numbers,
		and picks the random numbers out of the existing array, and 
		returns them in a separate array
	*/

	var randomPoints = [];
	for (var i = 0; i < randomNums.length; i++) {
		randomPoints.push(existingArray[randomNums[i]]);
	};

	return randomPoints;
}


function centroidDistance (polygons, points) {
	/*
		Takes in polygons, finds the centroids, and calculates distance
		from point locations.

		var tractGeo = tracts.toGeoJSON();
		var centroidPt = turf.centroid(tractGeo.features[0].geometry.geometries[1]) 
		centroidDistance (tractGeo.features[0].geometry.geometries, existing)
	*/

	var centIterate = 0
	var centroidArray = []

	for (var i = 0; i < polygons.length; i++) {
		var centroidPt = turf.centroid(polygons[i]);
		var pointDist = 100000000;


		for (var q = 0; q < points.length; q++) {
			var calcDist = turf.distance(centroidPt, points[q], "miles");
			if (calcDist < pointDist) {
				pointDist = calcDist;
			};
			centIterate++;

		};

		centroidPt.properties["distance"] = pointDist;
		centroidPt.properties["demand"] = 1;
		centroidArray.push(centroidPt);
	};

	return centroidArray;
}