const UserData = require("../Models/UserRegistration");

module.exports.UserRegistration = async (req, res) => {
  try {
    const { userName, userCNIC, userEmail, userPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userEmail || !userPassword || !userName || !userCNIC) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const UserNameUnique = await UserData.findOne({ userName: userName });
    if (UserNameUnique) {
      // User already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "UserName already exits" });
    }
    const existingUser = await UserData.findOne({ userEmail: userEmail });

    if (existingUser) {
      // Email already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const UserCnicUnique = await UserData.findOne({ userCnic: userCNIC });

    if (UserCnicUnique) {
      // CNIC already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "CNIC already exists" });
    }
    let newUser = await UserData.create({
      userName: userName,
      userEmail: userEmail,
      userCnic: userCNIC,
      userPassword: userPassword,
    });
    console.log(newUser);
    res.json({ success: true, message: "Account Created successful", newUser });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
