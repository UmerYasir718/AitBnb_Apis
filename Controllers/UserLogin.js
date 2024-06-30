const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserData = require("../Models/UserRegistration");
const bcrypt = require("bcrypt");
module.exports.UserLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if the user with the provided email exists
    const existingUser = await UserData.findOne({ userEmail: userEmail });

    if (!existingUser) {
      // User with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Account not exists" });
    }
    if (existingUser) {
      const isPasswordMatch = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );
      const userName = existingUser.userName;
      const userCnic = existingUser.userCnic;
      const userData = { userEmail, userName, userCnic };
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credential " });
      } else {
        const token = jwt.sign({ userData }, process.env.SecretKey, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        // const userName = existingUser.userName;
        // const userCnic = existingUser.userCnic;
        // const userData = { userEmail, userName, userCnic };
        res.json({
          success: true,
          token,
          message: "Login successful",
          userData,
        });
      }
    }
    // const isPasswordMatch = userPassword === existingUser.userPassword;

    // if (!isPasswordMatch) {
    //   // Passwords do not match, return an error response
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Wrong Password" });
    // }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
