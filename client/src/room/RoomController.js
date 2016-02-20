"use strict";

angular.module("chatApp").controller("RoomController",
	function RoomController($scope, $routeParams, ChatResource) {

		var id = $routeParams.id;

		var joinObj = {};
		joinObj.room = id;
		joinObj.pass = "";
		ChatResource.joinRoom(joinObj);

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

			
			Object.keys(message).forEach(function (key) {
			    var val = message[key];
			    console.log(val);
			});
		});

	});