const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserData = require("../Models/UserRegistration");
const bcrypt = require("bcrypt");
const sendBookingEmail = require("./EmailSender");
module.exports.ForgetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userEmail) {
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
      const id = existingUser._id;
      const token = jwt.sign({ id }, process.env.SecretKey, {
        expiresIn: "30M",
      });
      //   res.cookie("token", token, { httpOnly: true });
      const subject = `Reset Password of AirBnd `;
      const resetLink = `http://localhost:3000/reset-Password/${id}/${token}`;
      const body = `
Dear ${existingUser.userName},
This email is to reset your password for your Airbnb account.
Click on the link below to reset your password. This link is valid for 5 minutes:
<a href="${resetLink}">Reset Link</a>
If you have any questions, please don't hesitate to contact us.
Thanks,
The Airbnb Team
`;

      existingUser
        ? sendBookingEmail(existingUser.userEmail, subject, body)
        : console.log("Hostel is Not Booking");
      res.json({
        success: true,
        token,
        message: "Reset Link Send Successfully to Email address",
      });
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
