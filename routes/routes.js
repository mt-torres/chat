const express = require("express");
const {
	getJoinTemplate,
	getChatTemplate,
} = require("../controller/viewController");
const { joinRoom } = require("../controller/serverController");
const router = express.Router();

router.get("/", getJoinTemplate);

router.post("/chat", joinRoom);

router.get("/chat/:room", getChatTemplate);

module.exports = router;
