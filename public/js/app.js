var socket = io();
var name = getQueryVariable('name');
var room = getQueryVariable('room');

console.log(name+" wants to join "+room);

socket.on('connect', function () 
{
	console.log('Conncted to socket.io server!');
});

socket.on('message', function (data) 
{
	var momentTimestamp = moment.utc(data.timestamp);
	var $message = jQuery('.messages');

	console.log('New message:');
	console.log(data.text);

	$message.append('<p><strong>'+data.name + ' '+momentTimestamp.local().format('h:mm a') + ': </strong></p>' );
	$message.append('<p>'+data.text+'</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) 
{
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', 
	{
		name: name,
		text: $message.val()
	});

	$message.val('');
});