import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
          props.setVehicleFound(false)
        }} className='flex flex-row-reverse relative -top-3 font-bold'><i className="ri-arrow-down-wide-line text-xl text-gray-900"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>
        <div className='flex gap-2 justify-between items-center flex-col'>
            <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.pickUp}</h3>
                        {/* <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, TimbakTu</p> */}
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-1'>
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.destination}</h3>
                        {/* <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, TimbakTu</p> */}
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.farePrice?.[props.selectVehicle]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LookingForDriver