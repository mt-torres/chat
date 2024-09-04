const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = {};

io.on("connection", (socket) => {
	socket.on("joinRoom", () => {
		const user = socket.handshake.headers.referer
			.split("=")[1]
			.split("?")[0]
			.split("&")[0];
		const room = socket.handshake.headers.referer.split("=")[2];
		console.log("msg from server.js | room: ", room);
		console.log("msg from server.js | user: ", user);

		//Armazena o usuário com base no ID do socket
		users[socket.id] = { user, room };

		socket.join(room);
		socket.emit(
			"joinRoom",
			`Olá ${user}, bem vindo a sala ${room}`
		);

		//msg enviada a todos da sala, menos p user q entrou na sala
		socket.broadcast
			.to(room)
			.emit("joinRoom", user + " entrou na sala!");

		//envia a informação dos usuarios disponiveis
		const usersInRoom = getUsersInRoom(room);
		io.to(room).emit("roomUsers", usersInRoom);
	});

	socket.on("chatMessage", (msg) => {
		const user = socket.handshake.headers.referer
			.split("=")[1]
			.split("?")[0]
			.split("&")[0];
		const room = socket.handshake.headers.referer.split("=")[2];

		io.to(room).emit("message", { user, msg });
	});

	socket.on("disconnect", () => {
		const user = users[socket.id];

		console.log(user);
		if (user) {
			const room = user.room;
			delete users[socket.id];

			// Envia uma mensagem de saída para outros usuários na sala
			socket.to(room).emit(
				"leftRoom",
				`${user.user} saiu da sala.`
			);

			// Atualiza a lista de usuários na sala
			const usersInRoom = getUsersInRoom(room);
			io.to(room).emit("roomUsers", usersInRoom);
		}
	});
});

function getUsersInRoom(room) {
	return Object.values(users).filter((i) => i.room == room);
}

http.listen(3000, function () {
	console.log("Running on port 3000");
});

//const port = 8000 || 3000;
// const server = app.listen(port, () => {
// 	console.log(`Chat running on port ${port}...`);
// });
