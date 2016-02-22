"use strict";

angular.module("chatApp").controller("MsgController",
	function MsgController($scope, $rootScope, $routeParams, ChatResource) {
		console.log("MsgController CALLED!!!");

		$rootScope.displayRcvMessage = false;
		$scope.privateMsgArray = ChatResource.getPrivateMsgArray();
		
		$rootScope.$on("privateMsgReceived", function() {
			$rootScope.displayRcvMessage = false;
			$rootScope.$apply();
			$scope.privateMsgArray = ChatResource.getPrivateMsgArray();
			$scope.$apply();
		});

		$scope.MsgRecipient = "";

		function getAllUsers() {
			ChatResource.getAllUsers(function(userlist) {
				$scope.theOutput = userlist;
				$scope.$apply();
			});
		}

		$scope.getAllUsers = getAllUsers();
		getAllUsers();

		$scope.chooseMsgRecipient = function chooseMsgRecipient(recipient) {
			$scope.MsgRecipient = recipient;
		};

		$scope.sendPrivateMsg = function sendPrivateMsg() {
			if($scope.MsgRecipient !== "") {
				var msgObj = {};
				msgObj.nick = $scope.MsgRecipient;
				msgObj.message = $scope.privateMsgBox;

				ChatResource.sendPrivateMsg(msgObj, function(status) {
					if(status === true) {
						console.log("message was sent to " + msgObj.nick);
					}
				});
			}
		};
	});