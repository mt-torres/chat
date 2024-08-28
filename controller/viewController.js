exports.getJoinTemplate = (req, res, next) => {
	res.status(200).render("join", {
		title: "Join Chat",
	});
};

exports.getChatTemplate = (req, res, next) => {
	const { room, username } = req.query;

	const data = {
		room,
		username,
	};
	//console.log(room, username);

	res.status(200).render("chat", {
		title: "Chat",
		data,
	});
};
