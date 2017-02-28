var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get(/^(.+)$/, function(req, res){
	res.sendFile(__dirname + '/html' + req.params[0]);
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});

var groups = new Array();

var nextGroupID = 1;

var announcements = new Array();

var users = [];
var nextUserID = 1;

function loadDB(){
	var num = db.queryDB("SELECT count(*) from Users");
	while(num-- > 0){
		
	}
	users.push({
		id: 0,
		nick: "Bismarck",
		pass: "password",
		status: "online"
	});

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


	users.push({
		id: nextUserID++,
		nick: "Leo X",
		pass: "passwd",
		status: "online"
	});

	groups.push({
		id: 0,
		messages: [],
		name: "Group Name"
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
		console.log(group);
		if(auth(user)){
			for (var i = 0; i<groups.length; i++){
				if(group.id==groups[i].id){
					groups[i].messages.push(message);
					// db.insertData();
				}
			}

			io.emit('groupMessage',user, group, message);
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
		io.emit('newGroup', groups);
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
		callback(getStrippedUsers());
	});

	socket.on('setStatus', function(user, status){
		if(auth(user)){
			getUserObject(user).status = "online";
		}
		socket.emit('updateUserList', getStrippedUsers());
	});

	socket.on('setNickname', function(user, nick){
		if(auth(user)){
			getUserObject(user).nick = nick;
		}
		socket.emit('updateUserList', getStrippedUsers());
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
		if(users[i].id == user.id){
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

// returns users stripped on passowrks
function getStrippedUsers(){
	// SECURITY: strip users of passwords before sending to client
	var clientList = [];
	users.forEach(function(user) {
		clientList.push({nick: user.nick, status: user.status});
	});
	return clientList;
}
