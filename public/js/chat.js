const socket = io("https://chat-websocket-server-5vlc.onrender.com/", {
	transports: ["websocket", "polling"],
});

const usersMsg = document.querySelector("#users-msg");
const formMsg = document.querySelector("#form-msg");
const chatHeader = document.querySelector("#users-available");
const mainChat = document.querySelector(".chat");
const inputMessage = document.querySelector("#input-msg");
const loadFlip = document.querySelector(".connection-alert__flip");
const loadText = document.querySelector(".connection-alert__text");

const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

if (window.location.href.includes("chat")) {
	const userData = JSON.parse(localStorage.getItem("userData"));
	//verificando se o server está on
	socket.on("connect", () => {
		console.log("Conectado ao servidor WebSocket");
		loadFlip.classList.toggle("connection-alert__connected--show");
		loadText.innerHTML = "";
		loadText.innerHTML = "Conectado com sucesso!";

		//remover o modal
		document.querySelector(".connection-alert").classList.add(
			"connection-alert--remove"
		);
	});

	socket.emit("joinRoom", userData);

	//envio de mensagem para o evento chatMessage
	formMsg.addEventListener("submit", function (e) {
		e.preventDefault();

		socket.emit("chatMessage", {
			userData,
			msgToBeSend: inputMessage.value,
		});
		inputMessage.value = "";
	});

	//envio de mensagem para o evento chatMessage
	inputMessage.addEventListener("keydown", function (e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			socket.emit("chatMessage", {
				userData,
				msgToBeSend: inputMessage.value,
			});
			inputMessage.value = "";
		}
	});
	//message é referente ao io.emit("message", msg) from server.js
	socket.on("message", (data) => {
		const message = data.msgToBeSend.replace("\n", "<br>");
		const html = ` 
			<div class="display-message__container  ${
				data.userName == username
					? "display-message__container--sender"
					: ""
			}">
				<div class="display-message__message ${
					data.userName == username
						? "display-message__message--sender"
						: ""
				}">
					<div class="display-message__message-info">
						<span class="display-message__user-name">${data.userName}</small>
						<span class="display-message__user-date"> 11 mins ago</small>
					</div>
					<p class="display-message__message-data">
						${message}
					</p>
				</div>
			</div>
		`;
		usersMsg.insertAdjacentHTML("beforeend", html);
	});

	//contabiliza a quantidade de usuarios na sala
	socket.on("roomUsers", (users) => {
		document.querySelectorAll(".chat-messages__users").forEach(
			(i) => i.remove()
		);
		const html = `
			<span class="chat-messages__users"> ${users.length} ${
			users.length == 1 ? "usuário ativo" : "usuários ativos"
		} </span>`;
		chatHeader.insertAdjacentHTML("beforeend", html);
	});
}
