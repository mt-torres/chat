const socket = io();
const userList = document.querySelector("#user-list");

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

if (window.location.href.includes("chat")) {
	socket.on("connect", function () {
		//Preciso do emit para que as mensagens sejam enviadas
		socket.emit("msg");
		//const data = `<p>${}</p>`;
		//userList.insertAdjacentHTML("beforeend", data);
	});

	//mgs do arquivo server.js  socket.broadcast.emit("msg", user + " entrou na sala!");
	socket.on("msg", function (msg) {
		const data = `<p>${msg}</p>`;
		userList.insertAdjacentHTML("beforeend", data);
	});
}
