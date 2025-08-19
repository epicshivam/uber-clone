import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const CaptainSingup = () => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [firstName, setfirstName] = useState("")
      const [lastName, setLastName] = useState("")
      const [userData, setUserData] = useState("")
  
      const onSubmitHandler = (e) => {
          e.preventDefault();
          setUserData({
              fullName : {
                  firstName:firstName,
                  lastName:lastName
              },
              password:password,
              email:email
          })
          setEmail("");
          setPassword("");
          setfirstName("");
          setLastName("");
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
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Signup</button>
        
        <p className='text-center'>Already have an account ? <Link to='/captain-login' className='mb-3 text-blue-600'>Login here</Link></p>
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
