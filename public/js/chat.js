const socket = io();
const userList = document.querySelector("#user-list");
const usersMsg = document.querySelector("#users-msg");
const formMsg = document.querySelector("#form-msg");

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

if (window.location.href.includes("chat")) {
	socket.on("connect", function () {
		//Preciso do emit para que as mensagens sejam enviadas
		socket.emit("joinRoom");
		//const data = `<p>${}</p>`;
		//userList.insertAdjacentHTML("beforeend", data);
	});

	//mgs do arquivo server.js  socket.broadcast.emit("msg", user + " entrou na sala!");
	socket.on("joinRoom", function (msg) {
		const data = `<p>${msg}</p>`;
		userList.insertAdjacentHTML("beforeend", data);
	});

	//envio de mensagem para o evento chatMessage
	formMsg.addEventListener("submit", function (e) {
		e.preventDefault();
		const msgToBeSend = document.querySelector("#input-msg");
		socket.emit("chatMessage", msgToBeSend.value);
		msgToBeSend.value = "";
	});

	//message é referente ao io.emit("message", msg) from server.js
	socket.on("message", (data) => {
		console.log(data);
		const html = ` 
			<div class="" role="alert" aria-live="assertive" aria-atomic="true" style="display=flex">
				<div class="tr">
					<small class="me-auto">${data.user} |</small>
					<small>11 mins ago</small>
				</div>
				<div class="">
					${data.msg}
				</div>
			</div>
		`;
		usersMsg.insertAdjacentHTML("beforeend", html);
	});
}