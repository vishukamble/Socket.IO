var socket = io();

socket.on('connection', function () 
{
	console.log('Conncted to socket.io server!');
});

socket.on('message', function(data)
{
	console.log(data);
});