"use strict";

// Býr til module
angular.module("chatApp", ['ngRoute' , 'btford.socket-io']).
config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "login/login.html",
		controller: "LoginController"
	});


	
	/*.when("/rooms", {
		templateUrl: "src/roomlist/roomlist.hmtl"
		controller: "RoomlistController"
	})*/
});