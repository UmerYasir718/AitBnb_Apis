const mongoose = require("mongoose");
const AddHostelSchema = new mongoose.Schema({
  owner: String,
  hostelName: String,
  hostelPrice: String,
  hostelLocation: String,
  hostelContact: String,
  hostelDescription: String,
  hostelType: String,
  image: String,
  model: String,
});
module.exports = mongoose.model("AddHostel", AddHostelSchema);
