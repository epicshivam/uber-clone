const express = require('express');
const router = express.Router();
const {query,body} = require('express-validator')
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car', 'motorcycle']).withMessage('Invalid Vehicle'),
    rideController.createRide,
)

router.post('/get-fare',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),  
    rideController.getFare);


module.exports = router;