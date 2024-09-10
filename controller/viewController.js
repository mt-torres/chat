const path = require("path");

exports.getJoinTemplate = (req, res, next) => {
	res.render("join", {
		title: "Join Chat",
	});
};

exports.getChatTemplate = (req, res, next) => {
	const { room, username } = req.query;

	const data = {
		room,
		username,
	};

	res.status(200).render("chat", {
		title: "Chat",
		data,
	});
};
