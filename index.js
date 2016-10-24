(function(){
	var app = require('express')();
	var path = require('path');
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/views/index.html'));
	});

	app.get('/log', function(req, res){
		res.sendFile(path.join(__dirname + '/views/log.html'));
	});
	
	io.on('connection', function(socket){
		socket.on('mouseTracked', function(data){
			//console.dir(data);
			var res = socket.emit('dataLogged', { hello: 'world'} );
			console.log(data);
		});
	});
	
	server.listen(process.env.PORT || 3000, function(){
		console.log("server IP address: " + server.address());
		console.dir(server);
		console.log("server running on port: " + process.env.PORT || 3000);
		console.log('opened server on', server.address().address);
	});
	
})();