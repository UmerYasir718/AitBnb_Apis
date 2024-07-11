const express = require("express");
const cors = require("cors");
const router = express.Router();
const addHostel = require("../Models/AddHostel");
const cloudinary = require("../Cloudinary/Cloudinary");
const GetHostel = require("../Models/AddHostel");
module.exports.UpdateHostel = async (req, res) => {
  const {
    hostelName,
    hostelContact,
    hostelLocation,
    hostelPrice,
    hostelDescription,
  } = req.body;
  if (
    !hostelName ||
    !hostelContact ||
    !hostelLocation ||
    !hostelPrice ||
    !hostelDescription
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const updatedHostel = req.params.id;
  try {
    await GetHostel.findByIdAndUpdate(
      updatedHostel,
      {
        hostelName,
        hostelContact,
        hostelLocation,
        hostelPrice,
        hostelDescription,
      },
      { new: true }
    );

    if (!updatedHostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    res.json({ message: "Hostel updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
