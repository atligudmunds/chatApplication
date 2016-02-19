"use strict";

// sækir module (býr það EKKI til)
angular.module("chatApp").controller("LoginController",
	function LoginController($scope, $location) {
		//ChatResource
		//$scope.errorMessage = "Hey Hey!!!";
		//console.log("LoginController var keyrður");
		
		var socket = io.connect("http://localhost:8080");

		$scope.onLogin = function onLogin() {
			socket.emit("adduser", $scope.user, function(available) {
				if(available === true) {
					console.log("true!!!");
					
					$location.url("/rooms");
					$scope.$apply();
					
					$scope.errorMessage = "ACCEPTED!!!";
					// TODO: $location("slóð");
				} else {
					console.log("false!!!");
					$scope.errorMessage = "ERROR ekki leyfilegt nafn";
				}
			});
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