"use strict";

angular.module("chatApp").controller("RoomlistController",
	function RoomlistController($scope, $location, ChatResource) {

		ChatResource.getRoomList(function(TheRoomList){
			console.log(TheRoomList)
			$scope.TheRoomList = TheRoomList;
			$scope.$apply();
		});

		$scope.createRoom = function createRoom() {
			console.log($scope.roomId);
			if(ChatResource.isInputValid($scope.roomId)) {
				$location.url("/rooms/" + $scope.roomId);
			} else {
				console.log("EMPTY!!!");
			}
		}
		
	});