(function(){
	'use strict';
	var app = require('express')();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var robot = require('robotjs');


	robot.setMouseDelay(0);

	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/views/index.html'));
	});

	app.get('/log', function(req, res){
		res.sendFile(path.join(__dirname + '/views/log.html'));
	});
	
	io.on('connection', function(socket){
		console.log('connection');
		console.log('centering mouse on screen');
		//robot.moveMouse();

		socket.on('pointerPosition', function(data){
			robot.moveMouse(data.pointerPosition.x, data.pointerPosition.y);
		});

		socket.on('buttonClick', function(data){
			robot.mouseClick(data.buttonPress);
		});
	});
	
	server.listen(process.env.PORT || 3000, function(){
		console.log('server IP address: ' + server.address());
		console.dir(server);
	});
	
})();
