"use strict";

angular.module("chatApp").factory("ChatResource",
	function ChatResource() {
		var socket;
		var myUsername;
		return {
			connect: function connect() {
				socket = io.connect("http://localhost:8080");
			},

			isInputValid: function isInputValid(inputText) {
				return !((inputText === undefined) || (inputText === "") || (inputText === null));
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
			},

			onUpdateChat: function onUpdateChat(callback) {
				socket.on("updatechat", callback);
			},

			onServerMessage: function onServerMessage(callback) {
				socket.on("servermessage", callback);
			},

			sendMessage: function sendMessage(data) {
				socket.emit("sendmsg", data);
			},

			leaveRoom: function leaveRoom(room) {
				socket.emit("partroom", room);
			},

			getAllUsers: function getAllUsers(callback) {
				socket.on("userlist", callback);
				socket.emit("users");
			},

			sendPrivateMsg: function sendPrivateMsg(msgObj, callback) {
				socket.emit("privatemsg", msgObj, callback);
			},

			receiveMessages: function receiveMessages(callback) {
				socket.on("recv_privatemsg", callback);
			},

			kickUser: function kickUser(kickObj, callback) {
				socket.emit("kick", kickObj, callback);
			},

			getKicked: function getKicked(callback) {
				socket.on("kicked", callback);
			},

			banUser: function banUser(banObj, callback) {
				socket.emit("ban", banObj, callback);
			},

			getBanned: function getBanned(callback) {
				socket.on("banned", callback);
			}

		}
	});