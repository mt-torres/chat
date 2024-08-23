const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
	socket.on("msg", (msg) => {
		console.log("msg from server.js//", msg);
		const user =
			socket.handshake.headers.referer.split("username=")[1];

		console.log(user);
		socket.broadcast.emit("msg", user + " connected");
	});
});

http.listen(3000, function () {
	console.log("Running on port 3000");
});

//const port = 8000 || 3000;
// const server = app.listen(port, () => {
// 	console.log(`Chat running on port ${port}...`);
// });
