"use strict";

angular.module("chatApp").controller("RoomlistController",
	function RoomlistController($scope, ChatResource) {

		ChatResource.getRoomList(function(TheRoomList){
			console.log(TheRoomList)
			$scope.TheRoomList = TheRoomList;
			$scope.$apply();
		});

		$scope.joinRoom = function joinRoom() {
			ChatResource.sendRoom($scope.roomId);
		}
	});