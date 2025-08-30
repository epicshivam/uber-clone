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

module.exports = { getCoordinates, getDistanceTime, getAutoCompleteSuggestions };
