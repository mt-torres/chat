const express = require("express");
const app = express();

const { createServer } = require("node:http");

const { Server } = require("socket.io");

//const http = require("http").createServer(app);
const server = createServer(app);

//const io = require("socket.io")(http);
const io = new Server(server);
const viewRouter = require("../routes/routes");
const path = require("path");

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "../public"))); //servidos arquivos estático para o pug

//preciso pesquisar para q servem esses dois, sei q apos add o o body começou a ser lido
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "..", "views"));

app.set("view engine", "pug");

app.use("/", viewRouter);
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

server.listen(3000, function () {
	console.log("Running on port 3000");
});

// http.listen(3000, function () {
// 	console.log("Running on port 3000");
// });

// app.listen(3000, () => {
// 	console.log("Running on port 3000");
// });

module.exports = app;

//const port = 8000 || 3000;
// const server = app.listen(port, () => {
// 	console.log(`Chat running on port ${port}...`);
// });
