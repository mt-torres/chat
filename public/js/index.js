import { chat } from "./chat.js";
import { joinForm } from "./JoinChat.js";
import { menuHamburguer } from "./mobile.js";
import { userList } from "./users.js";

const joinFormElement = document.querySelector("#join-form");
const menuHamburguerElement = document.querySelector("#hambuguer-menu");
const userListElement = document.querySelector("#user-list");

if (joinFormElement) {
	joinForm(joinFormElement);
}

if (menuHamburguerElement) {
	menuHamburguer(menuHamburguerElement);
}

if (userListElement) {
	userList(userListElement);
}

if (window.location.href.includes("chat")){
	chat()
}