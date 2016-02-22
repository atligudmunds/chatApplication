"use strict";

angular.module("chatApp").controller("RoomlistController",
	function RoomlistController($scope, $location, ChatResource) {

		ChatResource.onRoomList(function(TheRoomList){
			console.log(TheRoomList)
			$scope.TheRoomList = TheRoomList;
			$scope.$apply();
		});

		ChatResource.requestRoomList();

		$scope.joinRoom = function joinRoom(room) {
			var tempBannedList = ChatResource.getBannedList();
			if(tempBannedList.indexOf(room) === -1) {
				$location.url("/rooms/" + room);
				//$scope.$apply();
			} else {
				alert("You were banned from " + room);
			}
		}

		$scope.createRoom = function createRoom() {
			console.log($scope.roomId);
			if(ChatResource.isInputValid($scope.roomId)) {
				$location.url("/rooms/" + $scope.roomId);
			} else {
				console.log("EMPTY!!!");
			}
		}
		
	});