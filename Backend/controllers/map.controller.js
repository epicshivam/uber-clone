const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");

module.exports.getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const originCoords = await mapsService.getCoordinates(origin);
    const destCoords = await mapsService.getCoordinates(destination);

    if (!originCoords || !destCoords) {
      return res.status(400).json({ message: "Invalid address" });
    }

    const distanceTime = await mapsService.getDistanceTime(
      originCoords,
      destCoords
    );

    return res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
