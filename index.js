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
		console.log("connected");
		socket.on('mouseTracked', function(data){
			//var res = socket.emit('dataLogged', { hello: 'world'} );
			console.dir(data);
			//robot.moveMouse(data.touchX, data.touchY);
		});
	});
	
	server.listen(process.env.PORT || 3000, function(){
		console.log("server IP address: " + server.address());
	});
	
})();
