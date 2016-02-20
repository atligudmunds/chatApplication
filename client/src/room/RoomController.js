"use strict";

angular.module("chatApp").controller("RoomController",
	function RoomController($scope, $routeParams, ChatResource) {

		var id = $routeParams.id;

		var joinObj = {};
		joinObj.room = id;
		joinObj.pass = "";
		ChatResource.joinRoom(joinObj);

		$scope.roomName = id;

		ChatResource.onUpdateUsers(function(room, users, ops) {
			console.log("room: " + room);
			$scope.userList = users;
			
			Object.keys(users).forEach(function (key) {
			    var val = users[key];
			    console.log(val);
			});
			//console.log("users: " + Object.values(users));
			console.log("ops: " + ops);
		});


		ChatResource.onUpdateChat(function(room, messages) {
			console.log("-------chat--------");
			console.log("room: " + room);
			$scope.message = messages;
			$scope.$apply();

			
			Object.keys(messages).forEach(function (key) {
			    var val = messages[key];
			    console.log(val);
			});
		});

		ChatResource.onServerMessage(function(join, room, user) {
			console.log("------Server-Message------");
			  $scope.joinMessage =  "User " + user +" has joined the " + room;

			
			if(join === "join") {
				console.log("user: " + user + " joined " + room);
			}

		});

		$scope.sendMessage = function sendMessage() {

			var msgObject = {};
			msgObject.roomName = id;
			msgObject.msg = $scope.messageBox;
			ChatResource.sendMessage(msgObject);
			$scope.messageBox = "";
			//$scope.$apply();
		}

		$scope.onEnter = function onEnter(e) {
			if(e.which == 13) {
				$scope.sendMessage();
			}
		}

	});