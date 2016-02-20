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

			sendRoom: function sendRoom(roomId) {
				var joinObj = {};
				joinObj.room = roomId;
				joinObj.pass = "12345";
				socket.emit("joinroom", joinObj, function(success, reason) {
					console.log("ANSWER: " + success);
				});
			}
		}
	});