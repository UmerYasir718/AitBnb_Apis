const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const OwnerData = require("../Models/OwnerRegistration");
const bcrypt = require("bcrypt");
module.exports.OwnerLogin = async (req, res) => {
  try {
    const { ownerEmail, ownerPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!ownerEmail || !ownerPassword) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if the owner with the provided email exists
    const existingOwner = await OwnerData.findOne({ ownerEmail: ownerEmail });

    if (!existingOwner) {
      // Owner with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Account not exists" });
    }
    if (existingOwner) {
      const isPasswordMatch = await bcrypt.compare(
        ownerPassword,
        existingOwner.ownerPassword
      );
      const ownerName = existingOwner.ownerName;
      const ownerCnic = existingOwner.ownerCnic;
      const ownerImage = existingOwner.ownerImage;
      const ownerData = { ownerEmail, ownerName, ownerCnic, ownerImage };
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credential " });
      } else {
        const token = jwt.sign({ ownerData }, process.env.SecretKey, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        // const ownerName = existingOwner.ownerName;
        // const ownerCnic = existingOwner.ownerCnic;
        // const ownerData = { ownerEmail, ownerName, ownerCnic };
        res.json({
          success: true,
          token,
          message: "Login successful",
          ownerData,
        });
      }
    }
    // const isPasswordMatch = ownerPassword === existingOwner.ownerPassword;

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
