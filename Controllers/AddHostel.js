const express = require("express");
const cors = require("cors");
const router = express.Router();
const addHostel = require("../Models/AddHostel");
const cloudinary = require("../Cloudinary/Cloudinary");
module.exports.AddHostel = async (req, res) => {
  try {
    const {
      owner,
      hostelName,
      hostelContact,
      hostelLocation,
      hostelPrice,
      hostelType,
      hostelDescription,
    } = req.body;
    // console.log(page);
    // Simple validation, ensure all fields are provided
    if (
      !owner ||
      !hostelName ||
      !hostelContact ||
      !hostelLocation ||
      !hostelPrice ||
      !hostelType ||
      !hostelDescription
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const uploadedImage = req.files.image;
    const uploadedModel = req.files.model;
    if (!uploadedImage) {
      return res.status(400).send("No Picture uploaded.");
    }
    if (!uploadedModel) {
      return res.status(400).send("No Model uploaded.");
    }
    console.log(uploadedImage);
    const img = await cloudinary.uploader.upload(uploadedImage.tempFilePath);
    const model = await cloudinary.uploader.upload(uploadedModel.tempFilePath);

    const imageUrl = img.url;
    const modelUrl = model.url;
    let picture = await addHostel.create({
      owner: owner,
      hostelName: hostelName,
      hostelPrice: hostelPrice,
      hostelLocation: hostelLocation,
      hostelContact: hostelContact,
      hostelDescription: hostelDescription,
      hostelType: hostelType,
      image: imageUrl,
      model: modelUrl,
    });
    res.send(picture);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.DeleteHostel = async (req, res) => {
  const countryId = req.params.id;

  try {
    await addHostel.findByIdAndDelete(countryId);
    res.json({ message: "Hostel deleted successfully" });
  } catch (error) {
    res.json({ error: "Error deleting item" });
  }
};
