// Functions for setting colors on symbology, load before
// loading any data!

function popColor ( pop ) {
	return  pop > 525035 ? '#b30000':
			pop > 322318 ? '#e34a33':
			pop > 161947 ? '#fc8d59':
			pop > 78123  ? '#fdcc8a':
						   '#fc8d59';
}

function wealthColor ( wealth ) {
	return  wealth == '1' ? '#8B4513':
			wealth == '2' ? '#FFFF00':
			wealth == '3' ? '#FF8C00':
			wealth == '4' ? '#87CEFA':
			wealth == '5' ? '#00FF00':
						   '#AEAFB0';
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}