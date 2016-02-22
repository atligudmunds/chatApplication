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

		ChatResource.receiveMessages( function(username, rcvMessage) {
			//$scope.rcvMessageList = rcvMessage;
			console.log("---received private msg---");
			console.log("user: " + username);
			console.log("msg: " + rcvMessage);
			alert("user: " + username + "\nmsg: " + rcvMessage);
			//$scope.$apply();
		});
	});