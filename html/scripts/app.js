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
