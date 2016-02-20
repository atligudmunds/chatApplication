"use strict";

angular.module("chatApp").controller("RoomlistController",
	function RoomlistController($scope, ChatResource) {

		ChatResource.getRoomList(function(TheRoomList){
			console.log(TheRoomList)
			$scope.TheRoomList = TheRoomList;
			$scope.$apply();
		});

		$scope.sendRoom2 = function sendRoom2() {
			ChatResource.sendRoom("room1");
		}
	});