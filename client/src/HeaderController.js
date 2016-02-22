"use strict";

angular.module("chatApp").controller("HeaderController",
	function HeaderController($scope, $rootScope, $location, ChatResource) {
		//$scope.displayUsername = "";
		ChatResource.connect();

		//$rootScope.privateMsgArray = [];
		//$rootScope.privateMsgArray.push("Crazy nut!");
		//console.log("MsgArray: " + $rootScope.privateMsgArray);
		$rootScope.displayRcvMessage = false;

		$rootScope.$on("usernameReceived", function() {
			$scope.displayWelcome = "Welcome, ";
			$scope.displayUsername = ChatResource.myUsername;
		});


		$scope.msgWindow = function msgWindow() {
			$location.url("/msgWindow");
			//$scope.$apply();
		};

		ChatResource.receiveMessages( function(username, rcvMessage) {
			//$scope.rcvMessageList = rcvMessage;
			console.log("---received private msg---");
			console.log("user: " + username);
			console.log("msg: " + rcvMessage);
			//alert("user: " + username + "\nmsg: " + rcvMessage);
			var privateMsgObj = {};
			privateMsgObj.user = username;
			privateMsgObj.message = rcvMessage;
			//$rootScope.privateMsgArray.push(privateMsgObj);
			ChatResource.addPrivateMsgToArray(privateMsgObj);
			$rootScope.$broadcast("privateMsgReceived");
			$rootScope.displayRcvMessage = true;
			$scope.$apply();
			//$scope.$apply();
		});
	});