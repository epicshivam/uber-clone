import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const CaptainLogin = () => {

    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
    
    const onSubmitHandler = (e)=> {
        e.preventDefault();
        setCaptainData({
            email:email,
            password:password
        })
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://banner2.cleanpng.com/20180330/adq/avixdes2w.webp" alt="" />
      <form onSubmit={(e)=>{
        onSubmitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>Whats your email</h3>
        <input 
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" 
            required 
            placeholder='email@example.com'
        />
        <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
        <input 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" 
            required 
            placeholder='password'
        />
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        
        <p className='text-center'>Join a fleet ? <Link to='/captain-signup' className='mb-3 text-blue-600'>Register as a captain</Link></p>
      </form>
        </div>
        <div>
            <Link to="/login" className=' flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
