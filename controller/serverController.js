exports.joinRoom = (req, res, next) => {
	const { userName, room } = req.body;

	if (!userName) {
		return res.status(404).json({
			status: "failed",
			message: "Por favor, insira o nome do usuário.",
		});
	}
	if (!room) {
		return res.status(404).json({
			status: "failed",
			message: "Por favor, selecione uma sala.",
		});
	} else {
		res.redirect(`/chat/${room}?username=${userName}&room=${room}`);
	}
};
