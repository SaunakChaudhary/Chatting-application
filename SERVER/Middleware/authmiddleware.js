const jwt = require("jsonwebtoken");
const userModel = require("../Model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const decode = await jwt.verify(token, process.env.JWT_Token);
    const user = await userModel.findById(decode._id);
    if (!user) { return res.status(404).json({ message: "User not found" }); }
    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " + error });
  }
};

module.exports = authMiddleware;
