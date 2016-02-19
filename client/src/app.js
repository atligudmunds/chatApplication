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
	});
});