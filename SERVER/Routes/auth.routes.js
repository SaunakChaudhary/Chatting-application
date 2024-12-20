const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth.controller");
const authMiddleware = require("../Middleware/authmiddleware");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/get-user").get(authMiddleware, authController.getUser);

module.exports = router;
