var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 88;

app.get(/^(.+)$/, function(req, res){ 
	res.sendFile(__dirname + '/html' + req.params[0]); 
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});

/**
	Group Object
	name-String: Name of group
	messages-Array: List of messages
**/
var groups = new Array() // Array of Group

var announcements = new Array() // Array of Message


/**
	List of Users
	
**/
var users = {}


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
			io.emit('groupMessage',user,group,message);
		}
	});

	/**
		send announcements to entire group
	**/  
	socket.on('announcement', function(user, announcement){
		if(auth(user) && isAdmin(user)){
			io.emit('announcement',user, announcement);
 		}
	});

	/**
		gets groups and messages under it
	**/
	socket.on('getGroups', function(callback){
		callback(groups);
	});

	/**
		gets announcements
	**/
	socket.on('getAnnouncements', function(callback){
		callback(announcements);
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
