const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: location.lat,
                lng: location.lon,
                display_name: location.display_name
            };
        } else {
            throw new Error(`No results found for address: ${address}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error;
    }
};
