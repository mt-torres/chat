exports.joinRoom = (req, res, next) => {
	const { name, room } = req.body;
	console.log(name, room);

	res.redirect(`/chat/${room}?username=${name}`);
	// res.status(200).json({
	// 	status: "Success",
	// });
};
