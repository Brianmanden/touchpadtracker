(function(){
	var app = require('express')();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/views/index.html'));
	});
	
	io.on('connection', function(socket){
		socket.on('mouseTracked', function(data){
			console.dir(data);
		});
	});
	
	server.listen(3000, function(){
		console.log("server running on port: 3000");
	});
	
})();