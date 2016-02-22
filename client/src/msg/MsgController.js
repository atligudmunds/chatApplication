"use strict";

angular.module("chatApp").controller("MsgController",
	function MsgController($scope, $routeParams, ChatResource) {
		console.log("MsgController CALLED!!!");

		//var receiverId = $routeParams.id;
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
		}

		/*$scope.sendMsgWindow = function sendMsgWindow(x) {
			$location.url("/sendMsg/" + x);
			//$scope.$apply();
		}*/

		/*$rootScope.$on("usernameReceived", function() {
			$scope.displayButton = true;
		});*/
		

		//ChatResource.receiveMessages();
		//rcvMessages
		/*ChatResource.receiveMessages( function(username, rcvMessage) {
			//$scope.rcvMessageList = rcvMessage;
			console.log("---received private msg---");
			console.log("user: " + username);
			console.log("msg: " + rcvMessage);
			alert("user: " + username + "\nmsg: " + rcvMessage);
			//$scope.$apply();
		});*/

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
		}
	});