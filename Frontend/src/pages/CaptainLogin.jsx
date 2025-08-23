import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const {captain, setCaptain} = React.useContext(CaptainDataContext);


    const onSubmitHandler = async (e)=> {
        e.preventDefault();
        const captain = {
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);

        if(response.status === 200){
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
        }


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
