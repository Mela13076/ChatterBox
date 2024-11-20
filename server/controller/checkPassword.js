const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;

    const user = await UserModel.findById(userId);

    //Check if hashed password is the same
    const verifyPassword = await bcryptjs.compare(password, user.password);

    //If password is wrong
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
        error: true,
      });
    }
    //prepares the data to include in JWT
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    //signs tokenData with the secret key and sets the token experation
    const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });
    //options for the cookie to make it secure over https
    const cookieOptions = {
      http: true,
      secure: true,
    };
    //sets the jwt in a cookie and returs a response
    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
