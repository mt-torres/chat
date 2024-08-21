exports.getTemplate = (req, res, next) => {
	res.status(200).render("join", {
		title: "Join Chat",
	});
};
