exports.joinRoom = (req, res, next) => {
	const { userName, room } = req.body;

	res.redirect(`/chat/${room}?username=${userName}&room=${room}`);
};
