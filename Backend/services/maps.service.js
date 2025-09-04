require('dotenv').config();
const axios = require("axios");
const captainModel = require("../models/captain.model");

// User-Agent from .env
const headers = {
  'User-Agent': `${process.env.APP_NAME}/1.0 (${process.env.USER_EMAIL})`
};

// Address -> Coordinates
async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await axios.get(url, { headers });
  if (response.data.length === 0) return null;

  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
}

// Distance & Time
async function getDistanceTime(originCoords, destCoords) {
  const url = `http://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`;
  const response = await axios.get(url, { headers });

  const data = response.data.routes[0];
  return {
    distance_km: (data.distance / 1000).toFixed(2),
    duration_min: (data.duration / 60).toFixed(2),
  };
}

// AutoComplete Suggestions
async function getAutoCompleteSuggestions(input) {
  if (!input) {
    throw new Error("Address is required");
  }

  const url = `https://photon.komoot.io/api/?q=${input}`;
  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      return response.data.features.map(f => ({
        name: f.properties.name,
        city: f.properties.city,
        country: f.properties.country,
        coordinates: f.geometry.coordinates
      }));
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Captains in Radius
async function getCaptainsInTheRadius(lat, lon, radiusInKm) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.log("Invalid lat/lon:", lat, lon);
    return [];
  }

  const earthRadiusInKm = 6378.1; 
  const radiusInRadians = radiusInKm / earthRadiusInKm;

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radiusInRadians]
      }
    }
  });

  console.log("Query center:", [longitude, latitude], "Radius:", radiusInRadians);
  console.log("Found captains:", captains);
  return captains;
}

module.exports = { 
  getCoordinates, 
  getDistanceTime, 
  getAutoCompleteSuggestions, 
  getCaptainsInTheRadius 
};
