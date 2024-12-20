const helper = require("../Helper/helper");
const userModel = require("../Model/user.model");

const signup = async (req, res) => {
  const { username, email, password, gender } = req.body;

  //   Validations
  if (!username || !email || !password || !gender) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  // Check User Exist or not
  const isExist = await userModel.findOne({
    $or: [{ email, username }],
  });

  if (isExist) {
    return res.status(400).json({ message: "User Already Exist" });
  }

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const hashedPassword = await helper.hashedPassword(password);

  try {
    const users = await userModel.create({
      username,
      email,
      password: hashedPassword,
      gender,
      avatarUrl: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    const token = await helper.getToken(users.username, users._id, users.email);

    return res.status(200).json({ message: "User Created ", users, token });
  } catch (error) {
    return res.status(500).json("Internal Server Error : " + error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   Validations
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    // Check User Exist or not
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Inavalid Credentials" });
    }

    const result = await helper.bcryptedPassword(password, user.password);
    if (!result)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = await helper.getToken(user.username, user._id, user.email);

    res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    return res.status(500).json("Internal Server Error : " + error);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      message: "User has been loggged out successfully!",
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error : " + error);
  }
};

const getUser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json("Internal Server Error : " + error);
  }
};

module.exports = { signup, login, logout, getUser };
