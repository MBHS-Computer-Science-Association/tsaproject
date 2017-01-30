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


// Sets a user to the given status
function setOnline(user){
	io.emit('setStatus', "online");
}

var app = angular.module('projectApp', []);

// Controller for updating the Userlist on the client side
app.controller('usersCtrl', function($scope) {
		window.usersCtrl_scope = $scope;

// Holds User list, including state, updated by server
    $scope.users = [];
//Sets users in list
    $scope.setUserList = function(userList) {
      $scope.users = userList;
			console.log('set the scope in angular');
    }
//Generates the iconography for the user based on their state
    $scope.getUserColor = function(user) {
    	switch(user.status){
    		case "online":
    			return "green";
    		case "offline":
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



function getUsers(){
	io.emit('getUsers', function(userList){
		var scope = angular.element('[ng-controller=usersCtrl]').scope();
		scope.setUserList(userList);
		scope.$apply();
	});
}
