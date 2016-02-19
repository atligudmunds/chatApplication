"use strict";

angular.module("chatApp").factory("ChatResource",
	function ChatResource() {
		var socket;
		return {
			connect: function connect() {
				socket = io.connect("http://localhost:8080");
			},

			login: function login(user, callback) {
				socket.emit("adduser", user, callback);
			},
			getRoomList: function getRoomList(callback) {
				socket.emit("rooms");

				socket.on("roomlist", callback);
			}
		}
	});