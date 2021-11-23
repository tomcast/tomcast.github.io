//This script is for testing on a local machine only.

var express = require('express');
var app = express();

app.use(express.static('./'));

app.listen(8080, function() {
	console.log('App running on port 8080. Not secure.\nCtrl + c to quit.');
});