exports.getJoinTemplate = (req, res, next) => {
	res.status(200).render("join", {
		title: "Join Chat",
	});
};

exports.getChatTemplate = (req, res, next) => {
	const { room } = req.params;
	const { username } = req.query;

	console.log(room, username);

	res.status(200).render("chat", {
		title: "Chat",
	});
};
