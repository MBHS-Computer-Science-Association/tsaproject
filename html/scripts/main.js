var	socket = io();

var groupList = [];
var userList = [];
var tabcount = groupList.length;

var thisUser = {id: 0, nick: "Bismarck", pass: "password", status: "online"};

getNewUser("Default", "hunter2");

socket.emit('getGroups', function(groups){
	// puts initial groups down
	groupList = groups;
	tabcount = groupList.length;
	updateGroups(groupList);
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
	console.log(message);
	displayGroupMessage(user, group, message);
});

socket.on('newGroup', function(newGroupList){
	console.log('New Group');
	groupList = newGroupList;
	updateGroups(groupList);
});

//sends message to server
function sendMessage(group, message){
	console.log(thisUser);
	socket.emit('groupMessage', thisUser, group, thisUser.nick + ': ' + message);
	console.log("Message Sent!");
}

// creates and returns a new user
function getNewUser(name, pass){
	socket.emit('newUser', name, pass, function(user){
		thisUser = user;
	});
}

function createNewGroup(user, groupName){
	console.log('creation of new group');
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
function updateGroups(grp){
	console.log(grp);
	for(i = 0; i<grp.length;i++){
		if(i==0){
			$("#menu").append('<a class="active item" data-tab="tab-'+grp[i].id+'">'+grp[i].name+'</a>');
			$("#tabbingwut").append('<div id="tab-'+grp[i].id+'" class="ui attached tab segment active" data-tab="tab-'+grp[i].id+'" style="overflow-y: scroll; height: 70vh ; float:left; width:80vw">');
			$('.menu .item')
			.tab();
		}else{
		$("#menu").append('<a class="item" data-tab="tab-'+grp[i].id+'">'+grp[i].name+'</a>');
		$("#tabbingwut").append('<div id="tab-'+grp[i].id+'" class="ui attached tab segment" data-tab="tab-'+grp[i].id+'" style="overflow-y: scroll; height: 70vh ; float:left; width:80vw">');
		$('.menu .item')
		.tab();}
	}

}
function displayGroupMessage(user, group, message) {
	var s = '#tab-'+group+'-spot';
	var outline = '<div class= \"ui bottom attached purple text segment\">' + message + "</div>"
	$('#tab-'+group).append(outline);
}
function addTab(){
	tabcount = tabcount+1;
	$("#menu").append('<a class="item" data-tab="tab-'+tabcount+'">'+$("#createTab").val()+'</a>');
	$("#tabbingwut").append('<div id="tab-'+tabcount+'" class="ui attached tab segment" data-tab="tab-'+tabcount+'" style="overflow-y: scroll; height: 70vh ; float:left; width:80vw">');
	$('.menu .item')
	.tab();
}

function uploadfile(file){
	console.log(file.name);
	socket.emit('uploadFile', file.name, file);	
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
	// $scope.groups = [];
	$scope.messages = [];
	 $scope.messages[1] = [];
	 $scope.messages[2] = [];
	 $scope.messages[3] = [];
	// Updates the scope's array that represents all of the messages.
	$scope.displayGroupMessage = function(usr, grp, msg) {
		console.log('Displaying group message in the scope.' + grp);
			$scope.messages[2].push({user: usr, group: grp, message: msg});
	}
});
