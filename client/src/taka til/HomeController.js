"use strict";

angular.module("chatApp").controller("HomeController",
	function HomeController($scope, ChatResource) {
		console.log("HomeController CALLED!!!");

		$scope.getAllUsers = function getAllUsers() {
			ChatResource.getAllUsers(function(userlist) {
				$scope.theOutput = userlist;
				$scope.$apply();
			});
		}
});