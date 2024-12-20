const express = require("express");
const router = express.Router();
const messageController = require("../Controller/message.controller");
const authMiddleware = require("../Middleware/authmiddleware");

router.route("/send/:id").post(authMiddleware, messageController.sendMessage);
router.route("/:id").get(authMiddleware, messageController.getMessage);

module.exports = router;
