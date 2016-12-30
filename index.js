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
		console.log('connection');
		console.log('centering mouse on screen');
		centerPointer(hostScreen);

		socket.on('pointerPosition', function(data){
			robot.moveMouse(data.pointerPosition.x, data.pointerPosition.y);
		});

		socket.on('pointerMove', function(data){
			robot.moveMouseSmooth(robot.getMousePos().x + data.deltaX, robot.getMousePos().y + data.deltaY);
		});

		socket.on('buttonClick', function(data){
			if(data.buttonPress == 'center'){
				centerPointer(hostScreen);
			}else{
				robot.mouseClick(data.buttonPress);
			}
		});

		socket.on('buttonDblClick', function(data){
			if(data.buttonPress == 'left'){
				robot.mouseClick(data.buttonPress, true);
			}
		});

		socket.on('cmdSend', function(data){
			console.log(data.cmd);
			exec(data.cmd);
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
