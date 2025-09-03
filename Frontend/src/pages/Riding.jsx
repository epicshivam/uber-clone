import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {} // Retrieve ride data
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return;

    socket.on("ride-ended", () => {
      navigate('/home')
    })

    return () => {
      socket.off("ride-ended")
    }
  }, [socket, navigate])

  if (!ride) {
    return <div className="h-screen flex items-center justify-center">Loading ride details...</div>
  }

  return (
    <div className='h-screen relative'>
      {/* LiveTracking as background */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Home button */}
      <Link
        to='/home'
        className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-20 shadow'
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Bottom panel */}
      <div className='absolute bottom-0 w-full h-1/2 bg-white p-4 z-10 rounded-t-2xl shadow-lg'>
        <div className='flex items-center justify-between'>
          <img
            className='h-12 rounded-md'
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>
              {ride?.captain?.fullname?.firstName || "Captain"}
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>
              {ride?.captain?.vehicle?.plate || "N/A"}
            </h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{ride?.fare || "0"}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding
