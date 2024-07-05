const GetHostel = require("../Models/AddHostel");
module.exports.GetHostel = async (req, res) => {
  try {
    const hostels = await GetHostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
