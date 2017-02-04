(function(){
	'use strict';

	var express = require('express');
	var app = express();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var robot = require('robotjs');
	var exec = require('child_process').exec;
	var hostScreen = robot.getScreenSize();

	app.set('view options', { layout: false } );
	app.use(express.static( __dirname + '/views' ) );

	robot.setMouseDelay(1);

	app.get('/', function(req, res){
		res.render('/views/index');
	});

	io.on('connection', function(socket){
		console.log('Connected');

		socket.on('pointerMove', function(data){
			const moveToPosX = robot.getMousePos().x + data.deltaX < 0 ? 0 : robot.getMousePos().x + data.deltaX;
			const moveToPosY = robot.getMousePos().y + data.deltaY < 0 ? 0 : robot.getMousePos().y + data.deltaY;
			console.log('Moving mouse to: ', moveToPosX, moveToPosY);
			robot.moveMouseSmooth(moveToPosX, moveToPosY);
		});

		socket.on('buttonClick', function(data){
			console.log('Button clicked: ', data.buttonPress);
			if(data.buttonPress == 'center'){
				centerPointer(hostScreen);
			}else{
				robot.mouseClick(data.buttonPress);
			}
		});

		socket.on('buttonDblClick', function(data){
			console.log('Button double-clicked: ', data.buttonPress);
			if(data.buttonPress == 'left'){
				robot.mouseClick(data.buttonPress, true);
			}
		});
		
		socket.on("disconnect", function () {
			console.log("Disconnected");
		});
	});

	function centerPointer(hostScreen){
		console.log('Centering mouse');
		robot.moveMouse(hostScreen.width/2, hostScreen.height/2);
	}

	server.listen(process.env.PORT || 3000, function(){
		console.log('Server ready');
	});
	
})();
