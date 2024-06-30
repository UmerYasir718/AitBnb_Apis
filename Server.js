const express = require("express");
const PORT = 8000;
const app = express();
const cors = require("cors");

require("dotenv/config");
require("./DataBase/DataBase");
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// require("./Controllers/EmailSender");
const UserRoutes = require("./Routes/Users");
app.use("/", UserRoutes);

const UserLoginVerification = require("./Middleware/UserLoginVerification");
app.use("/", UserLoginVerification);

app.listen(PORT, () => {
  console.log(`Server IS RUNNING ON PORT ${PORT}`);
});
