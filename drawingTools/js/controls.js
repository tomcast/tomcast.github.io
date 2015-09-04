function popColor ( pop ) {
	return  pop > 525035 ? '#b30000':
			pop > 322318 ? '#e34a33':
			pop > 161947 ? '#fc8d59':
			pop > 78123  ? '#fdcc8a':
						   '#fc8d59';
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