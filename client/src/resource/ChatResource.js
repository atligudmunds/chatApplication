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
				socket.on("roomlist", callback);
				socket.emit("rooms");
			},

			joinRoom: function joinRoom(joinObj) {
				socket.emit("joinroom", joinObj, function(success, reason) {
					console.log("ANSWER: " + success);
				});
			},

			onUpdateUsers: function onUpdateUsers(callback) {
				socket.on("updateusers", callback);
			}
		}
	});