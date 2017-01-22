var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 88

app.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
});

app.get(/^(.+)$/, function(req, res){ 
	res.sendFile(__dirname + '/html' + req.params[0]); 
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});

// User connection
io.on('connection', function(socket){
	console.log('User Connected');
  
	socket.on('disconnect', function(){
		console.log('User Disconnected');
	});
  
	/**
		User Object
		nick-String: The nickname of the user
		pin-Integer: The unique pin number of the user
		pass-String: The hash of the user's password
	**/

	/**
		send message to groups
	**/  
	socket.on('groupMessage', function(user, group, message){
		if(auth(user)){

		}
	});

	/**
		send announcements to entire group
	**/  
	socket.on('announcement', function(user, announcement){
		if(auth(user) && isAdmin(user)){

 		}
	});

	/**
		gets groups and messages under it
	**/
	socket.on('getGroups', function(callback){
	});

	/**
		gets announcements
	**/
	socket.on('', function(callback){
	});

	socket.on('', function(user){
	});
});

/**
	determines if the user is an authenticated
	return: Boolean
**/
function auth(user){

}

/**
	determines if the user is an administrator
	return: Boolean
**/
function isAdmin(user){

}
