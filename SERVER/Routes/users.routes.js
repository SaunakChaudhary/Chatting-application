const express = require("express");
const authMiddleware = require("../Middleware/authmiddleware");
const { getUserForSidebar,getUsers } = require("../Controller/users.controller");

const router = express.Router();

router.get("/", authMiddleware, getUserForSidebar);
router.post("/getUsers",getUsers);

module.exports = router;
