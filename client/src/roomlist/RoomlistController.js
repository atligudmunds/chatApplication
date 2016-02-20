"use strict";

angular.module("chatApp").controller("RoomlistController",
	function RoomlistController($scope, ChatResource) {

		ChatResource.getRoomList(function(TheRoomList){
			console.log(TheRoomList)
			$scope.TheRoomList = TheRoomList;
			
		});
	});