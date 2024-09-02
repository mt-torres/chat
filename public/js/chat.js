const socket = io();
const usersMsg = document.querySelector("#users-msg");
const formMsg = document.querySelector("#form-msg");
const chatHeader = document.querySelector(".header-chat__details");

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

if (window.location.href.includes("chat")) {
	socket.on("connect", function () {
		//Preciso do emit para que as mensagens sejam enviadas
		socket.emit("joinRoom");
	});

	//mgs do arquivo server.js  socket.broadcast.emit("msg", user + " entrou na sala!");
	socket.on("joinRoom", function (msg) {
		const data = `<p>${msg}</p>`;
		//userList.insertAdjacentHTML("beforeend", data);
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
		const html = ` 
			<div class="container-message  ${
				data.user == username
					? "container-message--sender"
					: ""
			}">
				<div class="message ${data.user == username ? "message--sender" : ""}">
					<div class="message__info">
						<small class="message__user-name">${data.user} |</small>
						<small class="message__user-date">11 mins ago</small>
					</div>
					<div class="message__data">
						${data.msg}
					</div>
				</div>
			</div>
		`;
		usersMsg.insertAdjacentHTML("beforeend", html);
	});
	//contabiliza a quantidade de usuarios na sala
	socket.on("roomUsers", (users) => {
		document.querySelectorAll(".header-chat__users").forEach((i) =>
			i.remove()
		);
		const html = `
			<span class="header-chat__users"> ${users.length} ${
			users.length == 1 ? "usuário ativo" : "usuários ativos"
		} </span>`;
		chatHeader.insertAdjacentHTML("beforeend", html);
	});
}
