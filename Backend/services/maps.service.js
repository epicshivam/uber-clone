const axios = require("axios");

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

module.exports = { getCoordinates, getDistanceTime };
