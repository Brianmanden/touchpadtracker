(function(){
	'use strict';

	var express = require('express');
	var app = express();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var robot = require('robotjs');
	var hostScreen = robot.getScreenSize();

	app.set('view options', { layout: false } );
	app.use(express.static( __dirname + '/views' ) );

	robot.setMouseDelay(0);

	app.get('/', function(req, res){
		res.render('/views/index');
	});

	io.on('connection', function(socket){
		console.log('connection');
		console.log('centering mouse on screen');
		centerPointer(hostScreen);

		socket.on('pointerPosition', function(data){
			robot.moveMouse(data.pointerPosition.x, data.pointerPosition.y);
		});

		socket.on('buttonClick', function(data){
			if(data.buttonPress == 'center'){
				centerPointer(hostScreen);
			}else{
				robot.mouseClick(data.buttonPress);
			}
		});
	});

	function centerPointer(hostScreen){
		robot.moveMouse(hostScreen.width/2, hostScreen.height/2);
	}

	server.listen(process.env.PORT || 3000, function(){
		console.log('Server IP address: ' + server.address());
		console.log();
	});
	
})();
