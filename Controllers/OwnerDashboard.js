const express = require("express");
const router = express.Router();
const BookingData = require("../Models/BookingHostel");
const Hostels = require("../Models/AddHostel");
module.exports.DashBoardOwner = async (req, res) => {
  try {
    const { ownerName } = req.body;
    console.log(req.body);
    // const totalHostel = await Hostels.countDocuments();
    // const ownerNameFilter = ownerName ? { ownerName } : {};
    const filteredHostels = await Hostels.countDocuments({ owner: ownerName });
    const totalBoysHostels = await Hostels.countDocuments({
      owner: ownerName,
      hostelType: "1",
    });
    const totalGirlsHostels = await Hostels.countDocuments({
      owner: ownerName,
      hostelType: "2",
    });
    console.log(filteredHostels, totalBoysHostels, totalGirlsHostels);
    res.json({ filteredHostels, totalBoysHostels, totalGirlsHostels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
