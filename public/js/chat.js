const socket = io();
const userList = document.querySelector("#user-list");

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

if (window.location.href.includes("chat")) {
	socket.on("connect", function () {
		console.log(socket.id);
		const data = `<p>${username} Welcome to the room ${room}</p>`;
		userList.insertAdjacentHTML("beforeend", data);
		socket.emit("msg", "Im connected " + socket.id);
	});

	socket.on("msg", function (msg) {
		const data = `<p>${msg}</p>`;
		userList.insertAdjacentHTML("beforeend", data);
	});
}
