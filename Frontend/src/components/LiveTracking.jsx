import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default Leaflet Marker Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LiveTracking = ({ role = "user", socket, captain, user }) => {
  const [position, setPosition] = useState(null); // null initially

  useEffect(() => {
    if (role === "captain" && captain?._id) {
      // Captain joins socket room
      socket.emit("join", {
        userId: captain._id,
        userType: "captain"
      });

      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(coords);

          // Send location to backend via socket
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: coords
          });
        });
      };

      updateLocation();
      const intervalId = setInterval(updateLocation, 5000); // update every 5s
      return () => clearInterval(intervalId);
    }

    if (role === "user") {
      // For user, just fetch their current location (not emitting socket)
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
      });
    }
  }, [role, socket, captain?._id]);

  if (!position) return <p>Fetching location...</p>;

  return (
    <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Popup>
          {role === "captain" ? "Captain's Location 🚖" : "You are here 📍"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveTracking;
