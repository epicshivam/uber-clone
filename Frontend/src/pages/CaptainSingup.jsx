import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSingup = () => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [firstName, setfirstName] = useState("")
      const [lastName, setLastName] = useState("")

      const [vehicleColor, setVehicleColor] = useState("");
      const [vehiclePlate, setVehiclePlate] = useState("");
      const [vehicleCapacity, setVehicleCapacity] = useState("");
      const [vehicleType, setVehicleType] = useState("");

      const {captain, setCaptain} = React.useContext(CaptainDataContext)
  
      const onSubmitHandler = async (e) => {
          e.preventDefault();
          const captainData = {
              fullName : {
                  firstName:firstName,
                  lastName:lastName
              },
              password:password,
              email:email,
              vehicle : {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
              }
          }

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);

          if(response.status === 201){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
          }

          setEmail("");
          setPassword("");
          setfirstName("");
          setLastName("");
          setVehicleColor("");
          setVehiclePlate("");
          setVehicleCapacity("");
          setVehicleType("");
      }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>{
        onSubmitHandler(e)
      }}>
        <h3 className='text-base w-full font-medium mb-2'>Whats our captains name</h3>
       <div className='flex gap-4 mb-5'>
         <input 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
            type="text" 
            required 
            placeholder='First Name'
            value={firstName}
            onChange={(e)=>{setfirstName(e.target.value)}}
        />
         <input 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
            type="text" 
            required 
            placeholder='Last Name'
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
        />
       </div>
        <h3 className='text-base font-medium mb-2'>Whats our captains email</h3>
        <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            type="email" 
            required 
            placeholder='email@example.com'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
        />
        <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
        <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            type="password" 
            required 
            placeholder='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
        />

        <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
        <div className='grid grid-cols-2 gap-2 mb-2'>
          <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            type="text" 
            required 
            placeholder='Vechicle Color'
            value={vehicleColor}
            onChange={(e)=>{setVehicleColor(e.target.value)}}
        />
        <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            type="text" 
            required 
            placeholder='Vechicle Plate'
            value={vehiclePlate}
            onChange={(e)=>{setVehiclePlate(e.target.value)}}
        />
        <input 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            type="number" 
            required 
            placeholder='Vechicle Capacity'
            value={vehicleCapacity}
            onChange={(e)=>{setVehicleCapacity(e.target.value)}}
        />
        <select 
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            required 
            value={vehicleType}
            onChange={(e)=>{setVehicleType(e.target.value)}}
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">MotorCycle</option>
          <option value="bicycle">Bicycle</option>
        </select>
        </div>
        <button className='bg-[#111] text-white font-semibold mb-10 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
        
        <p className='text-center mt-6'>Already have an account ? <Link to='/captain-login' className='mb-3 text-blue-600'>Login here</Link></p>
      </form>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>The site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
    </div>
  )
}

export default CaptainSingup
