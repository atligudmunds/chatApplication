"use strict";

angular.module("chatApp").controller("RoomController",
	function RoomController($scope, $routeParams, ChatResource, $location) {

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

		// The Message board when new user joins the chat
		ChatResource.onServerMessage(function(join, room, user) {
			console.log("------Server-Message------");
			  
			
			if(join === "join") {
				$scope.joinMessage =  "User " + user +" has joined the " + room;
			 	 $scope.$apply();

			}

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



		$scope.sendMessage = function sendMessage() {
			if(ChatResource.isInputValid($scope.messageBox)) {
				var msgObject = {};
				msgObject.roomName = id;
				msgObject.msg = $scope.messageBox;
				ChatResource.sendMessage(msgObject);
				$scope.messageBox = "";
			}
		}

		$scope.onEnter = function onEnter(e) {
			if(e.which == 13) {
				$scope.sendMessage();
			}
		}

		$scope.leaveRoom = function leaveRoom() {
				ChatResource.leaveRoom(id);
				$location.url("/rooms");
				$scope.$apply();
		}

		$scope.kickUser = function kickUser(kickedUser) {
			var kickObj = {};
			kickObj.user = kickedUser;
			kickObj.room = id;
			ChatResource.kickUser(kickObj, function(status) {
				if(status === true) {
					console.log(kickedUser + " was kicked from room " + id);
				}
			});
		}

		ChatResource.getKicked (function(room, user, asshole) {

			if(user === ChatResource.myUsername) {
				if(room === id) {
					$location.url("/rooms");
					$scope.$apply();					
				}
				alert("You've been kicked out of room " + room + " because " + asshole + " didn't like you ");
			}

		}); 

	});