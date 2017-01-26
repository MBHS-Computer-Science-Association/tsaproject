// Sets the state of a different user in the list.
function setStateUser(user, state) {
  var scope = angular.element($("#userList")).scope();
  scope.setStateUser(user, state);
  scope.$apply();
}

var app = angular.module('projectApp', []);
app.controller('usersCtrl', function($scope) {

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

    $scope.addUser = function(user) {
      $scope.users.push(user);
    }

    $scope.setStateUser = function(user, state) {
    	console.log('not implemented');
    }

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
