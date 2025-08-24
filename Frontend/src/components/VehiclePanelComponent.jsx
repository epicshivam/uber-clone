import React from 'react'

const VehiclePanelComponent = (props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vechicle</h3>
        <h5 onClick={()=>{
          props.setVehiclePannel(false)
        }} className='flex flex-row-reverse relative -top-3 font-bold'><i className="ri-arrow-down-wide-line text-xl text-gray-900"></i></h5>
        </div>
        <div onClick={()=>{
          props.setConfirmedRidePanel(true);
        }} className='flex border-2 border-transparent active:border-black rounded-xl mb-2 w-full items-center justify-between p-3'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193.20</h2>
        </div>

        <div onClick={()=>{
          props.setConfirmedRidePanel(true);
        }} className='flex border-2 border-transparent active:border-black rounded-xl mb-2 w-full items-center justify-between p-3'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65.20</h2>
        </div>

         <div onClick={()=>{
          props.setConfirmedRidePanel(true);
        }} className='flex border-2 border-transparent active:border-black rounded-xl mb-2 w-full items-center justify-between p-3'>
          <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s" alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹118.68</h2>
        </div>
    </div>
  )
}

export default VehiclePanelComponent
