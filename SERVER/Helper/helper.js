const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const bcryptedPassword = async (password, hashedPsw) => {
  return bcrypt.compare(password, hashedPsw);
};

const getToken = async (username, _id, email) => {
  return await jwt.sign(
    {
      username: username,
      _id: _id,
      email: email,
    },
    process.env.JWT_Token,
    { expiresIn: "24h" }
  );
};

module.exports = { hashedPassword, bcryptedPassword, getToken };
