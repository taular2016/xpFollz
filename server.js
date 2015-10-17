var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;
var path = '/public';

app.use(express.static(__dirname + path));
app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});