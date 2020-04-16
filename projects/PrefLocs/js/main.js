var testingLocations = L.geoJson();
var selectedLocations = L.geoJson();
var finalLocations = L.geoJson();
var finalStatoids = {}

$("#randPt").click( function () {
	if (
		mapThree.hasLayer(testingLocations)) {
		mapThree.removeLayer(testingLocations)
	};

	var RandNums = getRandomNums(8, 22);
	var Features = potential.toGeoJSON().features;
	var RandPoints = pickRandomPoints(Features, RandNums);

	testingLocations = L.geoJson(RandPoints).addTo(mapThree);

});

$("#calc").click(function () {
	if (
		mapFour.hasLayer(finalLocations)) {
		mapFour.removeLayer(finalLocations)
	};

	var q = 0;
	var weightedAverageValue = 1000000000;

	while(q < 200){

		var RandNums = getRandomNums(8, 22);
		var Features = potential.toGeoJSON().features;
		var RandomLocations = pickRandomPoints(Features, RandNums);

		var tractGeo = tracts.toGeoJSON().features[0].geometry.geometries;

		var distanceArray = centroidDistance(tractGeo, RandomLocations);

		wdArray = []
		for (var i = 0; i < distanceArray.length; i++) {
			wdArray.push({'id': i, 'distance': distanceArray[i].properties.distance, 'demand': distanceArray[i].properties.demand});
		};

		var setWeightedAve = weightedAve(wdArray);

		if (setWeightedAve < weightedAverageValue) {
			finalStatoids['WeightedAve'] = setWeightedAve;
			finalLocations = L.geoJson(RandomLocations);
		};

		if(q%100 == 0) {
			console.log('Iteration: ' + q);
		}

		q++;
		
	}


	finalLocations.addTo(mapFour);
	console.log('Final Weighted Ave: ' + finalStatoids.WeightedAve)

});

