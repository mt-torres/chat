const express = require("express");
const { getTemplate } = require("../controller/viewController");
const router = express.Router();

router.get("/", getTemplate);

module.exports = router;
