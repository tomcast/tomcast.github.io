$(document).ready( function() {

	//Dynamically add villagers to dropdown
	$.each(villagers, function( key, value ) {
		$('#vilSelect')
			.append($('<option>', { value: key})
			.text(villagers[key].Villager));
	});
	
});

//Comment
function getCoffee () {

	$('#CoffeeResult').remove();
	
	var e = document.getElementById("vilSelect");
	var selVal = e.options[e.selectedIndex].value;

	var Name = villagers[selVal].Villager
	var Beans = villagers[selVal].Beans
	var Milk = villagers[selVal].Milk
	var Sugar = villagers[selVal].Sugar

	$('#content').append("<div class='row'><div class='large-12 columns' id='CoffeeResult'>" +
		"Villager: " + Name + " </br> " +
		"Beans: " + Beans +" </br> " +
		"Milk: " + Milk +" </br> " +
		"Sugar: " + Sugar +
	"</div></div>");
};