const captainModel = require("../models/captain.model");



module.exports.createCaptain = async ({
    firstName,lastName, email, password, color, model, plate, capacity, vehicleType
}) => {
    if(!firstName || !lastName || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}