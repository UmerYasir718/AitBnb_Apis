// const UserData = require("../Models/UserRegistration");
// const secretKey = process.env.SecretKey;
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// module.exports.ResetPassword = async (req, res) => {
//   const { id, token } = req.params;
//   const { userPassword } = req.body;
//   jwt.verify(token, secretKey, async (err, decoded) => {
//     // if (err) {
//     //   return res
//     //     .status(401)
//     //     .json({ success: false, message: "Timeout Invalid Link" });
//     // }
//     // else {
//     const decodedToken = jwt.verify(token, secretKey);
//     if (decodedToken) {
//       const hashedPassword = await bcrypt.hash(userPassword, 12);
//       const updatedUser = await UserData.findByIdAndUpdate(
//         id,
//         { userPassword: hashedPassword },
//         { new: true }
//       );
//     } else {
//       console.log("Invalid Token");
//     }
//     //   bcrypt.hash(userPassword, 12).then((hash) => {
//     //     UserData.findByIdAndUpdate({ _id: id }, { userPassword: hash }).then(
//     //       (u) => res.send({ Status: "Success" })
//     //     );
//     //   });
//     // }
//     // Token is valid
//     // res.json({ success: true, userData: decoded.userData });
//   });
// };
// // jwt.verify(token, "jwt_secret_key", (err, decoded) => {
// //      if (err) {
// // })
// // return res.json({Status: "Error with token"})
// // } else {
// // }

// // .then(hash => {
// // }) I
// // UserModel.findByIdAndUpdate({_id: id}, {password: hash}) .then(u=> res.send({Status: "Success"}))
// // .catch(err=> res.send({Status: err}))
// // .catch(err => res.send({Status: err})}]
const UserData = require("../Models/UserRegistration");
const secretKey = process.env.SecretKey;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { userPassword } = req.body;
  console.log(req.params);
  try {
    const decoded = jwt.verify(token, secretKey);

    // Token is valid, proceed with password reset
    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const updatedUser = await UserData.findByIdAndUpdate(
      id,
      { userPassword: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
