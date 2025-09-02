const axios = require("axios");
const captainModel = require("../models/captain.model")

// Address -> Coordinates
async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await axios.get(url);
  if (response.data.length === 0) return null;

  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
}

// Distance & Time
async function getDistanceTime(originCoords, destCoords) {
  const url = `http://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`;
  const response = await axios.get(url);

  const data = response.data.routes[0];
  return {
    distance_km: (data.distance / 1000).toFixed(2),
    duration_min: (data.duration / 60).toFixed(2),
  };
}

async function getAutoCompleteSuggestions(input) {
if(!input) {
    throw new Error("Address is required");
  }

  const url = `https://photon.komoot.io/api/?q=${input}`

  try {
    
    const response = await axios.get(url);
    if(response.status === 200) {
        return response.data.features.map(f => ({
        name: f.properties.name,
        city: f.properties.city,
        country: f.properties.country,
        coordinates: f.geometry.coordinates
      }));
    } else {
        throw new Error("Unable to fetch suggestions")
    }

  } catch (error) {
    console.log(error);
    throw error;
  }

}

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





module.exports = { getCoordinates, getDistanceTime, getAutoCompleteSuggestions, getCaptainsInTheRadius };
