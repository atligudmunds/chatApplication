"use strict";

angular.module("chatApp").controller("HomeController",
	function HomeController($scope, $rootScope, $location, ChatResource) {
		console.log("HomeController CALLED!!!");
		ChatResource.connect();

		$scope.getAllUsers = function getAllUsers() {
			ChatResource.getAllUsers(function(userlist) {
				$scope.theOutput = userlist;
				$scope.$apply();
			});
		};

		$scope.sendMsgWindow = function sendMsgWindow(x) {
			$location.url("/sendMsg/" + x);
			//$scope.$apply();
		};

		$rootScope.$on("usernameReceived", function() {
			$scope.displayButton = true;
		});
		

		//ChatResource.receiveMessages();
		//rcvMessages
		ChatResource.receiveMessages( function(username, rcvMessage) {
			//$scope.rcvMessageList = rcvMessage;
			console.log("---received private msg---");
			console.log("user: " + username);
			console.log("msg: " + rcvMessage);
			//alert("user: " + username + "\nmsg: " + rcvMessage);
			//$scope.$apply();
		});
});