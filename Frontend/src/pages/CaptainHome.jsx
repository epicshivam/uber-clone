import { Link } from "react-router-dom";
import axios from "axios";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

// leaflet import
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const [ride, setRide] = useState(null);

  useEffect(() => {
    if (!captain?._id) return;

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: coords,
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain?._id]);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      console.log(data);
      setRide(data);
      setRidePopupPanel(true);
    });
  }, [socket]);

  async function confirmRide() {
    if (!ride?._id || !captain?._id) return;

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP animations for bottom sheets
  useGSAP(
    function () {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Top Navbar */}
      <div className="flex items-center justify-between fixed p-3 top-0 w-screen z-20">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

{/* Live Map Section (65% height) */}
<div className='h-[65%]'>
  <LiveTracking role="captain" socket={socket} captain={captain} />
</div>

{/* Captain Details Section (35% height) */}
<div className='h-[35%] p-4'>
  <CaptainDetails />
</div>

      {/* Ride Popup (70% height bottom sheet) */}
      <div
        ref={ridePopupPanelRef}
        className="fixed left-0 right-0 bottom-0 z-50 bg-white px-3 py-6 
                  translate-y-full h-[70%] overflow-y-auto rounded-t-2xl shadow-lg"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup (70% height bottom sheet) */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed left-0 right-0 bottom-0 z-50 bg-white px-3 py-6 
                  translate-y-full h-[70%] overflow-y-auto rounded-t-2xl shadow-lg"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
