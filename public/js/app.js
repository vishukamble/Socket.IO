var socket = io();

socket.on('connection', function () 
{
	console.log('Conncted to socket.io server!');
});

socket.on('message', function(data)
{
	console.log(data);
	console.log(data.text);

	jQuery('.messages').append('<p>'+ data.text +'</p>')
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