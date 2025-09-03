import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking'; // import added

const CaptainRiding = () => {
  const [finsihRidePanel, setFinishRidePanel] = useState(false);
  const finsihRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (finsihRidePanel) {
      gsap.to(finsihRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finsihRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finsihRidePanel]);

  return (
    <div className='h-screen relative'>
      {/* Header */}
      <div className="flex items-center justify-between fixed p-3 top-0 w-screen z-20">
        <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map as background */}
      <div className='h-4/5 relative z-0'>
        <LiveTracking />
      </div>

      {/* Bottom ride info */}
      <div
        className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative z-10'
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5 className='flex flex-row-reverse relative -top-3 font-bold'>
          <i className="ri-arrow-down-wide-line text-xl text-gray-900"></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className='mt-5 bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>
          Complete Ride
        </button>
      </div>

      {/* Slide up panel */}
      <div
        ref={finsihRidePanelRef}
        className='fixed w-full z-30 bottom-0 bg-white px-3 py-6 translate-y-full'
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  )
}

export default CaptainRiding
