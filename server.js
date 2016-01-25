var moment = require('moment');
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket)
{
	console.log('User connected via socket.io');
	//Sends a notification if someone disconnects
	socket.on('disconnect', function()
	{
		var userData = clientInfo[socket.id];
		if(typeof userData !== 'undefined')
		{
			socket.leave(userData.room);
			io.to(userData.room).emit('message',
			{
				name: 'System',
				text: userData.name+' has left the room',
				timestamp: moment().valueOf()
			});
			delete userData;
		}
	});

	//Sends a msg to everyone in room when new user joins
	socket.on('joinRoom', function(req)
	{
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',
		{
			name: 'System',
			text: req.name+' has joined the room',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message)
	{
		console.log('Message recieved '+message.text);
		
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	socket.emit('message', 
	{
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
}); //listen to events


http.listen(PORT, function() 
{
	console.log('Server starting....');
});
