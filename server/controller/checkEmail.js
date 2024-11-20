const UserModel = require("../models/UserModel");

async function checkEmail(req, res) {
  try {
    const { email } = req.body;

    //remove password from returning it.
    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return res.status(400).json({
        message: "User with Email Does Not Exist",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User Exist with Valid Email",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
