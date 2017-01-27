var	socket = io();

socket.emit('getGroups', function(){
	// puts initial groups down
});

socket.emit('getAnnouncements', function(){
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

socket.on('setStateUser', function(user, state){
	setStateUser(user, state);
});

//sends message to server
function sendMessage(user, group, messages){
	io.emit('groupMessage', user, group, messsage);
}

//sends announcement to server
function sendAnnouncement(user, announcement){
	io.emit('announcement', user, announcement);
}

// creates and returns a new user
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

// Sets a user to the given status
function setOnline(user){
	io.emit('setStatus', "online");
}

// Sets the state of a different user in the list.
function setStateUser(user, state) {
  var scope = angular.element($("#userList")).scope();
  scope.setStateUser(user, state);
  scope.$apply();
}

var app = angular.module('projectApp', []);

// Controller for updating the Userlist on the client side
app.controller('usersCtrl', function($scope) {
// Holds User list, including state, updated by server
    $scope.users = [
    	{
    		name: "Lars Memmington",
    		state: "Active"
    	},
    	{
    		name: "Zelaniaa",
    		state: "Disabled"
    	}
    ];
//Adds User to list
    $scope.addUser = function(user) {
      $scope.users.push(user);
    }
//Sets a user's state
    $scope.setStateUser = function(user, state) {
    	console.log('not implemented');
    }
//Generates the iconography for the user based on their state
    $scope.getColorFromState = function(state) {
    	switch(state){
    		case "Active":
    			return "green";
    		case "Disabled":
    			return "light grey";
    	}
    }
});

app.controller('messageCtrl', function($scope) {
	$scope.messages = [
		{
			username: "Zelanias",
			content: "This is a first testing of the message."
		},
		{
			username: "Jarodd",
			content: "Hey, Zelanius."
		}
	];
});
