import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
      <div className='h-1/2'>
         <img className='h-full w-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>
      <div className='h-1/2 p-4'>
         <div className='flex items-center justify-between'>
            <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Shivam</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP13 AB 1234</h4>
                <p className='text-sm text-gray-600'>BMW M5</p>
            </div>
        </div>
        <div className='flex gap-2 justify-between items-center flex-col'>
            <div className='w-full mt-5'>
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
        </div>
        <button className='w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding
