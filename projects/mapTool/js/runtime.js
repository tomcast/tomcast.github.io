$( document ).ready(function() {
	// connect modal button with the modal itself
    var modalHandle = document.getElementsByClassName('addData')[0]
	modalHandle.setAttribute('data-reveal-id','AddDataModal');

	// remove documentation for secret mode
	document.getElementsByClassName('leaflet-control-attribution')[0].remove();
});