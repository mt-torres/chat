exports.joinRoom = (req, res, next) => {
	const { name, room } = req.body;

	res.redirect(`/chat/${room}?username=${name}&room=${room}`);
	// res.status(200).json({
	// 	status: "Success",
	// });
};
