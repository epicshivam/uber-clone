import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finsihRidePanel, setFinishRidePanel] = useState(false);

    const finsihRidePanelRef = useRef(null);

     useGSAP(function(){
    if(finsihRidePanel){
      gsap.to(finsihRidePanelRef.current,{
      transform:'translateY(0)'
    })
    } else {
      gsap.to(finsihRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [finsihRidePanel])

  return (
    <div className='h-screen relative'>
        <div className="flex items-center justify-between fixed p-3 top-0 w-screen">
          <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className='h-4/5'>
         <img className='h-full w-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between bg-yellow-400' onClick={()=>{
        setFinishRidePanel(true);
      }}>
      <h5 onClick={()=>{}} className='flex flex-row-reverse relative -top-3 font-bold'><i className="ri-arrow-down-wide-line text-xl text-gray-900"></i></h5> 
        <h4 className='text-xl font-semibold '>4 KM away</h4>
        <button className=' mt-5 bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finsihRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding
