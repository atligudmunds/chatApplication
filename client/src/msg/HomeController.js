"use strict";

angular.module("chatApp").controller("HomeController",
	function HomeController($scope, $location, ChatResource) {
		console.log("HomeController CALLED!!!");

		$scope.getAllUsers = function getAllUsers() {
			ChatResource.getAllUsers(function(userlist) {
				$scope.theOutput = userlist;
				$scope.$apply();
			});
		}

		$scope.sendMsgWindow = function sendMsgWindow(x) {
			$location.url("/sendMsg/" + x);
			//$scope.$apply();
		}

		//rcvMessages
		ChatResource.rcvMessages(function(rcvMessage) {
			$scope.rcvMessageList = rcvMessage;
			//$scope.$apply();
		});
});