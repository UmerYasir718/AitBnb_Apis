const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const cookieParser = require("cookie-parser");
const router = express.Router();
const secretKey = process.env.SecretKey;
router.use(cors());
router.use(express.json());
router.use(cookieParser());
// Verify token route
router.get("/userVerify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // const authHeader = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not Found" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "TimeOut Please Login Again" });
    }
    const userData = jwtDecode(token);
    console.log(userData);
    // Token is valid
    res.json({ success: true, userData });
  });
});
module.exports = router;

// function authVerfiy(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == undefined) {
//     return res.sendStatus(401);
//   } else {
//     jwt.verify(token, process.env.PRIVATE_KEY, (err, email) => {
//       if (err) return res.sendStatus(403);
//       req.user = email;
//       next();
//     });
//   }
// }
