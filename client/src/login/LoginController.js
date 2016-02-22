"use strict";

// sækir module (býr það EKKI til)
angular.module("chatApp").controller("LoginController",
	function LoginController($scope, $rootScope, $location, ChatResource) {
		//$scope.errorMessage = "Hey Hey!!!";
		//ChatResource.connect();
		$scope.displayUsername = "";
		
		$scope.onLogin = function onLogin() {
			if(ChatResource.isInputValid($scope.user)) {
				ChatResource.login($scope.user, function(available) {
					if(available === true) {
						console.log("true!!!");
						ChatResource.myUsername = $scope.user;
						console.log("your username is: " + ChatResource.myUsername);
						$rootScope.$broadcast("usernameReceived");
						//$scope.displayUsername = $scope.user;
						$location.url("/rooms");
						$scope.$apply();
					} else {
						console.log("false!!!");
						$scope.errorMessage = "ERROR: ekki leyfilegt nafn";
						$scope.$apply();
					}
				});
			} else {
				$scope.errorMessage = "Verdur ad stimpla inn notandanafn";
				//$scope.$apply();
			}
		};

		$scope.onEnterIndex = function onEnterIndex(e) {
			if(e.which == 13) {
				$scope.onLogin();
			}
		};
});