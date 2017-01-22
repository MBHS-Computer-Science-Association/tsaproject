function addNotification(notif) {
  var scope = angular.element($("#feed")).scope();
  scope.addNotif(notif);
  scope.$apply();
}

angular.module('project', [])
  .controller('NotifController', ['$scope', function($scope) {

    $scope.notifs = [];

    $scope.addNotif = function(notif) {
      $scope.notifs.push(notif);
    }

  }]);
