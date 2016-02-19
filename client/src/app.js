"use strict";

// Býr til module
angular.module("chatApp", []).
config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	});
	/*.when("/rooms", {
		templateUrl: "src/roomlist/roomlist.hmtl"
		controller: "RoomlistController"
	})*/
});