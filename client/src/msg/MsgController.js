"use strict";

angular.module("chatApp").controller("MsgController",
	function MsgController($scope, $routeParams, ChatResource) {
		console.log("MsgController CALLED!!!");

		var receiverId = $routeParams.id;

		$scope.sendPrivateMsg = function sendPrivateMsg() {

			var msgObj = {};
			msgObj.nick = receiverId;
			msgObj.message = $scope.privateMsgBox;

			ChatResource.sendPrivateMsg(msgObj, function(status) {
				if(status === true) {
					console.log("message was sent to " + receiverId);
				}
			});
		}
	}
);