const express = require("express");
const {
	getJoinTemplate,
	getChatTemplate,
} = require("../controller/viewController");
const router = express.Router();

router.get("/", getJoinTemplate);
router.get("/chat", getChatTemplate);

module.exports = router;
