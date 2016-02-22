"use strict";

angular.module("chatApp").controller("HeaderController",
	function HeaderController($scope, $rootScope, $location, ChatResource) {
		//$scope.displayUsername = "";
		ChatResource.connect();

		$rootScope.$on("usernameReceived", function() {
			$scope.displayWelcome = "Welcome, ";
			$scope.displayUsername = ChatResource.myUsername;
		});


		$scope.msgWindow = function msgWindow(){
			$location.url("/msgWindow");
			//$scope.$apply();
		}
	});