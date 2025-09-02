const rideService = require("../services/ride.service");
const { validationResult } = require('express-validator');

const mapService = require("../services/maps.service")


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // 1. Pickup coordinates
        const pickupCoordinates = await mapService.getCoordinates(pickup);
        console.log("Pickup coords:", pickupCoordinates);

        if (!pickupCoordinates) {
            return res.status(400).json({ message: "Invalid pickup address" });
        }

        // 2. Find nearby captains (2 miles radius)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.lat,
            pickupCoordinates.lon,
            15,
        );

        console.log("Nearby captains:", captainsInRadius);

        // 3. Create ride
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        // 4. Send response with ride + captains
        return res.status(201).json({ ride, nearbyCaptains: captainsInRadius });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports.getFare = async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {pickup, destination} = req.body;

    try {
        const fare = await rideService.getFare(pickup,destination);

        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}