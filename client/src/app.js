"use strict";

// Býr til module
angular.module("chatApp", ['ngRoute' , 'btford.socket-io']).
config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "login/login.html",
		controller: "LoginController"
	}).when("/rooms", {
		templateUrl: "roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/rooms/:id", {
		templateUrl: "room/room.html",
		controller: "RoomController"
	}).when("/msgWindow" , {
		templateUrl: "msg/msgWindow.html" ,
		controller: "MsgController"
	});
});