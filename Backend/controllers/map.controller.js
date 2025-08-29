const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");

module.exports.getCoordinates = async (req, res) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;  

  try {
    const coordinates = await mapsService.getAddressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Failed to fetch coordinates" });
  }
};
