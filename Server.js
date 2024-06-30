const express = require("express");
const PORT = 8000;
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv/config");
require("./DataBase/DataBase");
app.use(express.json());
// require("./Controllers/EmailSender");
const UserRoutes = require("./Routes/Users");
app.use("/", UserRoutes);

const UserLoginVerification = require("./Middleware/UserLoginVerification");
app.use("/", UserLoginVerification);

app.listen(PORT, () => {
  console.log(`Server IS RUNNING ON PORT ${PORT}`);
});
