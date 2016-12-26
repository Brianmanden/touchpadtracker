(function(){
	var app = require('express')();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var robot = require('robotjs');

	robot.setMouseDelay(2);


	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/views/index.html'));
	});

	app.get('/log', function(req, res){
		res.sendFile(path.join(__dirname + '/views/log.html'));
	});
	
	io.on('connection', function(socket){
		socket.on('pointerPosition', function(data){
			console.log(data.pointerPosition.x + ", " + data.pointerPosition.y);
			robot.moveMouse(data.pointerPosition.x, data.pointerPosition.y);
		});
	});
	
	server.listen(process.env.PORT || 3000, function(){
		console.log("server IP address: " + server.address());
	});
	
})();
