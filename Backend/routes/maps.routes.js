const express = require('express');
const router = express.Router();
const authMiddleware  = require('../middlewares/auth.middleware');
const mapController = require("../controllers/map.controller")
const {query} = require('express-validator');
const { getCoordinates } = require('../controllers/map.controller');


router.get(
  '/get-coordinates',
  authMiddleware.authUser,
  [
    query('address').notEmpty().withMessage('Address is required'),
  ],
  mapController.getCoordinates
);


module.exports = router; 