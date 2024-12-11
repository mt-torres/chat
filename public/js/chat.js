import toast from "./toast.js";

// export const socket = io("http://localhost:4000/", {
// 	transports: ["websocket", "polling"],
// });

export const socket = io("https://chat-websocket-server-5vlc.onrender.com/", {
	transports: ["websocket", "polling"],
});


export function chat() {
	const usersMsg = document.querySelector("#users-msg");
	const formMsg = document.querySelector("#form-msg");
	const chatHeader = document.querySelector("#users-available");
	const inputMessage = document.querySelector("#input-msg");
	const loadFlip = document.querySelector(".connection-alert__flip");
	const loadText = document.querySelector(".connection-alert__text");
	const containerToast = document.querySelector(".container-toast");
	
	//desativando as mensagens durante a conexão com o servidor 
	document.querySelectorAll("form>*").forEach(i => i.disabled = true)

	const params = new URLSearchParams(window.location.search);
	const username = params.get("username");
	const room = params.get("room");

	const userData = {username, room }


	//verificando se o server está on
	socket.on("connect", () => {
		loadFlip.classList.toggle("connection-alert__connected--show");
		loadText.innerHTML = "";
		loadText.innerHTML = "Conectado com sucesso!";
		//ativando o formulario
		document.querySelectorAll("form>*").forEach(i => i.disabled = false)

		//remover o modal
		document.querySelector(".connection-alert").classList.add(
			"connection-alert--remove"
		);
	});

	//envia os dados do usuario para o socket server
	socket.emit("joinRoom", userData);

	//mostrar mensagens de quem entra na sala
	socket.on("joinRoom", function (msg) {
		toast(containerToast, msg);
	});

	//Mostrar mensagem de quem saiu da sala
	socket.on("leftRoom", function (msg) {
		toast(containerToast, msg);
	});

	//envio de mensagem para o evento chatMessage
	formMsg.addEventListener("submit", function (e) {
		e.preventDefault();

		if(inputMessage.value == "") return

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

			if(inputMessage.value == "") return

			socket.emit("chatMessage", {
				userData,
				msgToBeSend: inputMessage.value,
			});
	
			inputMessage.value = "";
		}
	});

	//Scroll automatico mensagens
	const observer = new MutationObserver(() => {
		const lastMessage = usersMsg.lastElementChild;
		if(lastMessage) lastMessage.scrollIntoView({ behavior: 'smooth' });
	})
	observer.observe(usersMsg, { childList: true });

	//message é referente ao io.emit("message", msg) from server.js
	socket.on("message", (data) => {
		const userId = socket.id
		const message = data.msgToBeSend.replace("\n", "<br>");
		const html = ` 
			<div class="display-message__container  ${
				data.userId == userId
					? "display-message__container--sender"
					: ""
			}">
				<div class="display-message__message ${
					data.userId == userId
						? "display-message__message--sender"
						: ""
				}">

					<div class=${data.userId != userId? "display-message__message-info--receiver": "display-message__message-info"}>
						<span class="display-message__user-name">${data.username}</small>
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

