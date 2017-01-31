var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 80;

app.get(/^(.+)$/, function(req, res){
	res.sendFile(__dirname + '/html' + req.params[0]);
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});

/**
	Group Object
	id-Int: id of group
	name-String: Name of group
	messages-Array: List of messages
**/
var groups = new Array(); // Array of Group

var nextGroupID = 1; // id to serve to next new group

var announcements = new Array(); // Array of Message

/**
	Message Object
	text-String: text of message
	username-String: username of author
**/

/**
	User Object
	id-Integer: The id of the the user
	nick-String: The nickname of the user
	pass-String: The hash of the user's password
	status-String: status of user, "online" or "offline"
**/

/**
	List of Users
	key: id-Integer
**/
var users = new Array();
var nextUserID = 1; // id to serve to next new user

// Load the database into groups, announcements and users
function loadDB(){
	// load the groups announcements users nextGroupID, and nextUserID from the db

	// Database mock
	// remove when database code is working
	users.push({
		id: nextUserID++,
		nick: "Nicholas",
		pass: "passwd",
		status: "online"
	});

	users.push({
		id: nextUserID++,
		nick: "Charles",
		pass: "passwd",
		status: "offline"
	});

	users.push({
		id: nextUserID++,
		nick: "Lars",
		pass: "passwd",
		status: "offline"
	});

	users.push({
		id: nextUserID++,
		nick: "Roth",
		pass: "passwd",
		status: "offline"
	});
}

loadDB();


// User connection
io.on('connection', function(socket){
	console.log('User Connected');

	socket.on('disconnect', function(){
		console.log('User Disconnected');
	});

	/**
		send message to groups
	**/
	socket.on('groupMessage', function(user, group, message){
		if(auth(user)){


			for (var i = 0; i<groups.length; i++){
				if(group.id==groups[i].id){
					group[i].messages.push(message);
					// Write to DB
				}
			}

			io.emit('groupMessage',user,group,message);
		}
	});

	/**
		send announcements to entire group
	**/
	socket.on('announcement', function(user, announcement){
		if(auth(user) && isAdmin(user)){

			announcements.push(announcement);
			// Write to DB

			io.emit('announcement',user, announcement);
 		}
	});

	socket.on('newGroup', function(user, groupName){
		var newGroup;
		newGroup.id = nextGroupID++;
		newGroup.name = groupName;
		newGroup.messages = new Array();
		// write to DB
		groups.push(newGroup);
		io.emit('newGroup', newGroup);
	});

	/**
		creates a new user
	**/
	socket.on('newUser', function(name, pass, callback){
		var newUser;
		newUser.name = name;
		newUser.pass = pass;
		newUser.id =nextUserID++;
		users.push(newUser);
		// write to DB
		callback(user);
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

	/**
		gets list of users that are online
	**/
	socket.on('getUsers', function(callback){
		// SECURITY: strip users of passwords before sending to client
		// var serverList = users;
		// var clientList = new Array();
		// serverList.forEach(function(user) {
		// 	clientList.push({nick: user.nick, status: user.status});
		// });
		// callback(clientList);
		callback(users);
	});

	socket.on('setStatus', function(user, status){

	});

	socket.on('', function(user){
	});


});

/**
	gets the user object from the db
	param: userId
**/
function getUserObject(user){
	for(var i =0; i<users.length; i++){
		if(users[i].id = user.id){
			return users[i];
		}
	}
}

/**
	determines if the user is an authenticated
	return: Boolean
**/
function auth(user){
	if(getUserObject(user).password === user.password){
		return true;
	}
	return false;
}

/**
	determines if the user is an administrator
	return: Boolean
**/
function isAdmin(user){
	return getUserObject(user).isAdmin;
}
