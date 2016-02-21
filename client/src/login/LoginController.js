"use strict";

// sækir module (býr það EKKI til)
angular.module("chatApp").controller("LoginController",
	function LoginController($scope, $location, ChatResource) {
		//$scope.errorMessage = "Hey Hey!!!";
		ChatResource.connect();
		
		$scope.onLogin = function onLogin() {
			ChatResource.login($scope.user, function(available) {
				if(available === true) {
					console.log("true!!!");
					
					$location.url("/rooms");
					$scope.$apply();
					
					$scope.errorMessage = "ACCEPTED!!!";
				} else {
					console.log("false!!!");
					$scope.errorMessage = "ERROR ekki leyfilegt nafn";
				}
			});
		}

		$scope.onEnterIndex = function onEnterIndex(e) {
			if(e.which == 13) {
				$scope.onLogin();
			}
		}
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