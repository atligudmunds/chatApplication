"use strict";

angular.module("chatApp").controller("HeaderController",
	function HeaderController($scope, $rootScope, $location, ChatResource) {
		//$scope.displayUsername = "";

		$rootScope.$on("usernameReceived", function() {
			$scope.displayWelcome = "Welcome, ";
			$scope.displayUsername = ChatResource.myUsername;
		});
	});