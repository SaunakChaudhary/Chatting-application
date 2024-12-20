const userModel = require("../Model/user.model");

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const allUserExceptLoggedIn = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select("-password");

    return res.status(200).json(allUserExceptLoggedIn);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error : " + error });
  }
};

const getUsers = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User Id is required" });
    }

    const userDetails = await userModel.findById(id);
    if (!userDetails) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res.status(200).json({userDetails})
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error : " + error });
  }
};

module.exports = { getUserForSidebar, getUsers };
