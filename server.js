const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
	socket.on("joinRoom", (msg) => {
		console.log("msg from server.js: ", msg);
		const user = socket.handshake.headers.referer
			.split("=")[1]
			.split("?")[0];
		const room = socket.handshake.headers.referer.split("=")[2];
		console.log("msg from server.js | room: ", room);
		console.log("msg from server.js | user: ", user);

		//
		socket.emit(
			"joinRoom",
			`Olá ${user}, bem vindo a sala ${room}`
		);

		//msg enviada a todos da sala, menos p user q entrou na sala
		socket.broadcast.emit("joinRoom", user + " entrou na sala!");
	});

	socket.on("chatMessage", (msg) => {
		io.emit("message", msg);
	});
});

http.listen(3000, function () {
	console.log("Running on port 3000");
});

//const port = 8000 || 3000;
// const server = app.listen(port, () => {
// 	console.log(`Chat running on port ${port}...`);
// });
