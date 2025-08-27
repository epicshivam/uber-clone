import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
            props.setFinishRidePanel(false);
        }} className='flex flex-row-reverse relative -top-3 font-bold'><i className="ri-arrow-down-wide-line text-xl text-gray-900"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Finish this ride </h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                <h2 className='text-lg font-medium'>Harsh Patel</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between items-center flex-col'>
            {/* <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" /> */}
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, TimbakTu</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, TimbakTu</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 w-full">
                    <Link to='/captain-home' className='flex justify-center w-full mt-5 bg-green-500 text-white text-lg font-semibold p-2 rounded-lg'>Finish Ride</Link>

                    <p className='mt-10 text-xs'>Click on finish ride button if you have completed the payment</p>
            </div>
        </div>
    </div>
  )
}

export default FinishRide
