"use strict";

// sækir module (býr það EKKI til)
angular.module("chatApp").controller("LoginController",
	function LoginController($scope) {
		//ChatResource
		$scope.errorMessage = "Hey Hey!!!";
		console.log("LoginController var keyrður");
		/*$scope.onLogin = function onLogin() {
			ChatResource.login($scope.user, $scope.pass, function(success) {
				if(!success) {
					$scope.errorMessage = "Innskráning mistókts";
				} else {
					// Senda annað
				}
			});
		}*/
});