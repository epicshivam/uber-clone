const rideModel = require("../models/ride.model")
const mapService = require("./maps.service");
const crypto = require('crypto');

async function getFare(pickup, destination){

    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }

    const pickupCordinates = await mapService.getCoordinates(pickup);
    const destinationCordinates = await mapService.getCoordinates(destination);
    const distanceTime = await mapService.getDistanceTime(pickupCordinates,destinationCordinates);

//     console.log("Pickup coordinates:", pickupCordinates);
// console.log("Destination coordinates:", destinationCordinates);
// console.log("Distance & time data:", distanceTime);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 5,
        car: 8,
        motorcycle: 4
    };

    const perMinuteRate = {
        auto: 1,
        car: 1.5,
        motorcycle: 0.5
    }

    const distanceInKm = distanceTime.distance_km;

    const timeInMinutes = distanceTime.duration_min;

    const fare = {
    auto: Number((baseFare.auto + perKmRate.auto * distanceInKm + perMinuteRate.auto * timeInMinutes).toFixed(2)),
    car: Number((baseFare.car + perKmRate.car * distanceInKm + perMinuteRate.car * timeInMinutes).toFixed(2)),
    motorcycle: Number((baseFare.motorcycle + perKmRate.motorcycle * distanceInKm + perMinuteRate.motorcycle * timeInMinutes).toFixed(2))
    };

    // console.log(fare);

    return fare;

}

function getOTP(num) {
    const min = Math.pow(10, num - 1); 
    const max = Math.pow(10, num);
    const otp = crypto.randomInt(min, max).toString();
    return otp;
}


module.exports.getFare = getFare;


module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are requried");
    }

    const fare = await getFare(pickup,destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOTP(6),
        fare: fare[vehicleType]
    })

    return ride;
}


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}


module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}


