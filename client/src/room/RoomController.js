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
			console.log("users were updated in room: " + room);
			if(room === id) {
				$scope.opList = ops;
				$scope.userList = users;
				$scope.$apply();
			}
			
			Object.keys(users).forEach(function (key) {
			    var val = users[key];
			    console.log(val);
			});
			//console.log("users: " + Object.values(users));
			console.log("ops: " + ops);
		});

		// The Message board when new user joins the chat
		ChatResource.onServerMessage(function(status, room, user) {
			console.log("------Server-Message------");
			  
			if(room === id) {
				if(status === "join") {
					$scope.roomBannerMessage =  "User " + user + " has joined " + room;
				 	$scope.$apply();
				}
				else if(status === "part") {
					$scope.roomBannerMessage =  "User " + user + " has left " + room;
				 	$scope.$apply();
				}
			}

		});

		ChatResource.onUpdateChat(function(room, messages) {
			console.log("-------chat--------");
			console.log("room: " + room);
			
			if(room === id) {
				$scope.message = messages;
				$scope.$apply();
			}
			
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
				alert("You've been kicked out of room " + room + " because " + asshole + " didn't like you");
			}
			else if(room === id) {
				$scope.roomBannerMessage =  asshole + " kicked " + user + " from " + room;
				$scope.$apply();
			}
		});


		$scope.banUser = function banUser(bannedUser) {
			var banObj = {};
			banObj.user = bannedUser;
			banObj.room = id;
			ChatResource.banUser(banObj, function(status) {
				if(status === true) {
					console.log(bannedUser + " was banned from room " + id);
				}
			});
		}

		ChatResource.getBanned(function(room, user, asshole) {
			if(user === ChatResource.myUsername) {
				if(room === id) {
					$location.url("/rooms");
					$scope.$apply();					
				}
				ChatResource.addToBanned(room);
				console.log("BannedArray: " + ChatResource.getBannedList());
				alert("You've been banned from room " + room + " because " + asshole + " didn't like you");
			}
			else if(room === id) {
				$scope.roomBannerMessage =  asshole + " banned " + user + " from " + room;
				$scope.$apply();
			}
		});

	});