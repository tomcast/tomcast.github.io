function popColor ( pop ) {
	return  pop > 500000 ? '#800026':
			pop > 100000 ? '#FD8D3C':
						   '#FFEDA0';
}

$( "#population" ).click(function() {
	districtLayer.setStyle(
		function(feature) {
			return {color: popColor(feature.properties.Pop2006)};
		})
});


$( "#ford" ).click(function() {
  
});


$( "#dcs" ).click(function() {

});