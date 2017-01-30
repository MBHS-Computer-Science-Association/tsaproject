var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require(database);

var port = process.env.PORT || 80;

app.get(/^(.+)$/, function(req, res){
	res.sendFile(__dirname + '/html' + req.params[0]);
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});

var groups = new Array(); // Array of Group

var nextGroupID = 1; // id to serve to next new group

var announcements = new Array(); // Array of Message

/**
	List of Users
	key: id-Integer
**/
var users = new Array();
var nextUserID = 1; // id to serve to next new user

// Load the database into groups, announcements and users
function loadDB(){
	users = db.readData('\'SELECT * name FROM Groups WHERE id=\'\'\'');
	groups = db.readData('\'SELECT * name FROM Users WHERE id=\'\'\'');

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
					db.insertData();
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
		callback(users);
	});

	socket.on('setStatus', function(user, status){

	});

	socket.on('', function(user){
	});


});

/**
	gets the user object from the db
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
