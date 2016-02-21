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
		controller: "RoomController",
		css: ["room/room.css" , 'room/room2.css']

	}).when("/sendMsg/:id", {
		templateUrl: "msg/msg.html",
		controller: "MsgController"
	});
});