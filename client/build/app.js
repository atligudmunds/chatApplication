"use strict";angular.module("chatApp").controller("HeaderController",function(a,b,c,d){d.connect(),b.displayRcvMessage=!1,b.$on("usernameReceived",function(){a.displayWelcome="Welcome, ",a.displayUsername=d.myUsername,a.displayMsgButton=!0}),a.msgWindow=function(){c.url("/msgWindow")},d.receiveMessages(function(c,e){console.log("---received private msg---"),console.log("user: "+c),console.log("msg: "+e);var f={};f.user=c,f.message=e,d.addPrivateMsgToArray(f),b.$broadcast("privateMsgReceived"),b.displayRcvMessage=!0,a.$apply()})}),angular.module("chatApp",["ngRoute","btford.socket-io","luegg.directives"]).config(function(a){a.when("/",{templateUrl:"login/login.html",controller:"LoginController"}).when("/rooms",{templateUrl:"roomlist/roomlist.html",controller:"RoomlistController"}).when("/rooms/:id",{templateUrl:"room/room.html",controller:"RoomController"}).when("/msgWindow",{templateUrl:"msg/msgWindow.html",controller:"MsgController"})}),angular.module("chatApp").controller("LoginController",function(a,b,c,d){a.displayUsername="",a.onLogin=function(){d.isInputValid(a.user)?d.login(a.user,function(e){e===!0?(console.log("true!!!"),d.myUsername=a.user,console.log("your username is: "+d.myUsername),b.$broadcast("usernameReceived"),c.url("/rooms"),a.$apply()):(console.log("false!!!"),a.errorMessage="ERROR: ekki leyfilegt nafn",a.$apply())}):a.errorMessage="Verdur ad stimpla inn notandanafn"},a.onEnterIndex=function(b){13==b.which&&a.onLogin()}}),angular.module("chatApp").controller("HomeController",function(a,b,c,d){console.log("HomeController CALLED!!!"),d.connect(),a.getAllUsers=function(){d.getAllUsers(function(b){a.theOutput=b,a.$apply()})},a.sendMsgWindow=function(a){c.url("/sendMsg/"+a)},b.$on("usernameReceived",function(){a.displayButton=!0}),d.receiveMessages(function(a,b){console.log("---received private msg---"),console.log("user: "+a),console.log("msg: "+b)})}),angular.module("chatApp").controller("MsgController",function(a,b,c,d){function e(){d.getAllUsers(function(b){a.theOutput=b,a.$apply()})}console.log("MsgController CALLED!!!"),b.displayRcvMessage=!1,a.privateMsgArray=d.getPrivateMsgArray(),b.$on("privateMsgReceived",function(){b.displayRcvMessage=!1,b.$apply(),a.privateMsgArray=d.getPrivateMsgArray(),a.$apply()}),a.MsgRecipient="",a.getAllUsers=e(),e(),a.chooseMsgRecipient=function(b){a.MsgRecipient=b},a.sendPrivateMsg=function(){if(""!==a.MsgRecipient){var b={};b.nick=a.MsgRecipient,b.message=a.privateMsgBox,d.sendPrivateMsg(b,function(a){a===!0&&console.log("message was sent to "+b.nick)})}}}),angular.module("chatApp").factory("ChatResource",function(){var a,b=[],c=[];return{connect:function(){a=io.connect("http://localhost:8080")},isInputValid:function(a){return!(void 0===a||""===a||null===a)},login:function(b,c){a.emit("adduser",b,c)},onRoomList:function(b){a.on("roomlist",b)},requestRoomList:function(b){a.emit("rooms")},joinRoom:function(b){a.emit("joinroom",b,function(a,b){console.log("ANSWER: "+a)})},onUpdateUsers:function(b){a.on("updateusers",b)},onUpdateChat:function(b){a.on("updatechat",b)},onServerMessage:function(b){a.on("servermessage",b)},sendMessage:function(b){a.emit("sendmsg",b)},leaveRoom:function(b){a.emit("partroom",b)},getAllUsers:function(b){a.on("userlist",b),a.emit("users")},sendPrivateMsg:function(b,c){a.emit("privatemsg",b,c)},receiveMessages:function(b){a.on("recv_privatemsg",b)},kickUser:function(b,c){a.emit("kick",b,c)},getKicked:function(b){a.on("kicked",b)},banUser:function(b,c){a.emit("ban",b,c)},getBanned:function(b){a.on("banned",b)},addToBanned:function(a){console.log("----------IMPORTANT!!----------"),console.log("Adding room: "+a),b[b.length]=a,console.log("Array contents: "+b)},getBannedList:function(){return b},addPrivateMsgToArray:function(a){c[c.length]=a},getPrivateMsgArray:function(){return c}}}),angular.module("chatApp").controller("RoomController",function(a,b,c,d){var e=b.id,f={};f.room=e,f.pass="",c.joinRoom(f),a.roomName=e,c.onUpdateUsers(function(b,c,d){console.log("users were updated in room: "+b),b===e&&(a.opList=d,a.userList=c,a.$apply()),Object.keys(c).forEach(function(a){var b=c[a];console.log(b)}),console.log("ops: "+d)}),c.onServerMessage(function(b,c,d){console.log("------Server-Message------"),c===e&&("join"===b?(a.roomBannerMessage="User "+d+" has joined "+c,a.$apply()):"part"===b&&(a.roomBannerMessage="User "+d+" has left "+c,a.$apply()))}),c.onUpdateChat(function(b,c){console.log("-------chat--------"),console.log("room: "+b),b===e&&(a.message=c,a.$apply()),Object.keys(c).forEach(function(a){var b=c[a];console.log(b)})}),a.sendMessage=function(){if(c.isInputValid(a.messageBox)){var b={};b.roomName=e,b.msg=a.messageBox,c.sendMessage(b),a.messageBox=""}},a.onEnter=function(b){13==b.which&&a.sendMessage()},a.leaveRoom=function(){c.leaveRoom(e),d.url("/rooms"),a.$apply()},a.kickUser=function(a){var b={};b.user=a,b.room=e,c.kickUser(b,function(b){b===!0&&console.log(a+" was kicked from room "+e)})},c.getKicked(function(b,f,g){f===c.myUsername?b===e&&(d.url("/rooms"),a.$apply()):b===e&&(a.roomBannerMessage=g+" kicked "+f+" from "+b,a.$apply())}),a.banUser=function(a){var b={};b.user=a,b.room=e,c.banUser(b,function(b){b===!0&&console.log(a+" was banned from room "+e)})},c.getBanned(function(b,f,g){f===c.myUsername?(b===e&&(d.url("/rooms"),a.$apply()),c.addToBanned(b),console.log("BannedArray: "+c.getBannedList()),alert("You've been banned from room "+b+" because "+g+" didn't like you")):b===e&&(a.roomBannerMessage=g+" banned "+f+" from "+b,a.$apply())})}),angular.module("chatApp").controller("RoomlistController",function(a,b,c){c.onRoomList(function(b){console.log(b),a.TheRoomList=b,a.$apply()}),c.requestRoomList(),a.joinRoom=function(a){var d=c.getBannedList();-1===d.indexOf(a)?b.url("/rooms/"+a):alert("You were banned from "+a)},a.createRoom=function(){console.log(a.roomId),c.isInputValid(a.roomId)?b.url("/rooms/"+a.roomId):console.log("EMPTY!!!")}}),angular.module("chatApp").controller("HomeController",function(a,b){console.log("HomeController CALLED!!!"),a.getAllUsers=function(){b.getAllUsers(function(b){a.theOutput=b,a.$apply()})}});