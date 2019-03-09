var serverIP = location.hostname;
var serverPort = location.port;
//var socket = io.connect('http://' + serverIP + ':' + serverPort);
var socket = io();
var prevCoordinates = {};
var touchStartTime;		
var tracker = document.getElementById('tracker');
var output = document.getElementById('output');
var buttons = document.getElementById('buttons');

tracker.addEventListener('touchstart', function(e){
    touchStartTime = new Date().getTime();
    prevCoordinates.x = Math.round(e.touches[0].pageX);
    prevCoordinates.y = Math.round(e.touches[0].pageY);
}, false);

tracker.addEventListener('touchend', function(e){
    var currX = Math.round(e.changedTouches[0].pageX);
    var currY = Math.round(e.changedTouches[0].pageY);
    var timeDiff = (new Date().getTime() - touchStartTime) / 125;
    
    var timeAdjustedDeltaX = (currX - prevCoordinates.x) / timeDiff;
    var timeAdjustedDeltaY = (currY - prevCoordinates.y) / timeDiff;

    socket.emit('pointerMove', { "deltaX": timeAdjustedDeltaX, "deltaY": timeAdjustedDeltaY	});
}, false);

tracker.addEventListener('click', function(e){
    socket.emit('buttonClick', { buttonPress: 'left' });
});		

tracker.addEventListener('dblclick', function(e){
    socket.emit('buttonDblClick', { buttonPress: 'left' });
});

buttons.addEventListener('click', function(e){
    socket.emit('buttonClick', { buttonPress: e.target.value });
});