var socket = io();

socket.on('connection', function () 
{
	console.log('Conncted to socket.io server!');
});

socket.on('message', function(data)
{
	console.log(data);
});
var $form = jQuery('#message-form');

$form.on('submit', function (event) 
{
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', 
	{
		text: $message.val()
	});

	$message.val('');
});