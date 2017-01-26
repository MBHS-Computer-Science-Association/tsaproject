var	socket = io();

io.emit('getGroups', function(){
	// puts initial groups down
});

io.emit('getAnnouncements', function(){
	// puts initial announcements down
});

socket.on('groupMessage', function(user, group, message){
	// put down group message
});

socket.on('announcement', function(user, announcement){
	// put down annoucement
});

socket.on('newGroup', function(newGroup){
	// put down new group
});

//sends message to server
function sendMessage(user, group, messages){
	io.emit('groupMessage', user, group, messsage);
}

//sends announcement to server
function sendAnnouncement(user, announcement){
	io.emit('announcement', user, announcement);
}

function getNewUser(user, pass){
	return io.emit('newUser', user, pass, function(user){
		return user;
	});
}

function createNewGroup(user, groupName){
	io.emit('newGroup', user, groupName);
}

function getUsers(){
	io.emit('getUsers', function(userList){
		return userList;
	});
}
