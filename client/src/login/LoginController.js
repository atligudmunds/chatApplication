"use strict";

// sækir module (býr það EKKI til)
angular.module("chatApp").controller("LoginController",
	function LoginController($scope) {
		//ChatResource
		$scope.errorMessage = "Hey Hey!!!";
		console.log("LoginController var keyrður");
		
		var socket = io.connect("http://localhost:8080");

		socket.emit("adduser", "atli", function(availabe) {
			if(availabe) {
				$scope.errorMessage = "Löglegt nafn";
			}
			else {
				$scope.errorMessage = "ERROR ekki leyfilegt nafn";
			}
		});
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