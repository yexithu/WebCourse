var socketAddress = 'https://wall.cgcgbcbc.com/';
var historyAddress = 'https://wall.cgcgbcbc.com/api/messages?num=3';

var socket = io.connect(socketAddress);

socket.on('connect', function () {
    console.log('connected');
});

socket.on('new message', function (message) {
    console.log('new message');
    console.log(message);
});

socket.on('admin', function (message) {
  	console.log('admin');
  	console.log(message);
});

$('body').on('keydown', function (e) {
    if (e.keyCode == 13) {
        $.get(historyAddress, function(data, status){
        console.log('Status: ' + status);
        console.log(data);
        });
    }
});