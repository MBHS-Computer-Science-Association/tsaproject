var	socket = io();

var groupList = [];
var userList = [];


var thisUser = {id: 0, nick: "Bismarck", pass: "password", status: "online"};

socket.emit('getGroups', function(groups){
	// puts initial groups down
	groupList = groups;
});

socket.emit('getUsers', function(users){
	// grabs initial users
	userList = users;
});

socket.on('updateUserList', function(newUserList){
	userList = newUserList;
	updateUserDisplay();
});

socket.on('groupMessage', function(user, group, message){
	// put down group message
	displayGroupMessage(user, group, message);
});

socket.on('newGroup', function(newGroup){
	// put down new group
});

//sends message to server
function sendMessage(group, message){
	socket.emit('groupMessage', thisUser, group, message);
}

// creates and returns a new user
function getNewUser(user, pass){
	return socket.emit('newUser', user, pass, function(user){
		return user;
	});
}

function createNewGroup(user, groupName){
	socket.emit('newGroup', user, groupName);
}

// Sets a user to the given status
function setOnline(user){
	socket.emit('setStatus', "online");
}

//Sets nickname to user
function changeNickname(name){
	thisUser.nick=name;
	socket.emit('setNickname',thisUser, name);
}

// Grabs the users from the server and updates AngularJS with them
function getUsers(){
	socket.emit('getUsers', function(newUserList){
		userList = newUserList;
		updateUserDisplay();
	});
}

function updateUserDisplay(){
	var scope = angular.element('[ng-controller=usersCtrl]').scope();
	scope.setUserList(userList);
	scope.$apply();
}

function displayGroupMessage(user, group, message) {
	var scope = angular.element('[ng-controller=messageCtrl]').scope();
	scope.displayGroupMessage(user, group, message);
	scope.$apply();
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
    };
//Generates the iconography for the user based on their state
    $scope.getUserColor = function(user) {
    	switch(user.status){
    		case "online":
    			return "green";
    		case "offline":
    			return "light grey";
    	}
    };
});

app.controller('messageCtrl', function($scope) {
	$scope.messages = [];

	// Updates the scope's array that represents all of the messages.
	$scope.displayGroupMessage = function(usr, grp, msg) {
		console.log('Displaying group message in the scope.');
		$scope.messages.push({user: usr, group: grp, message: msg});
	}
});
