import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {

    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const {user, setUser} = useContext(UserDataContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e)=> {
        e.preventDefault();
        
        const userData = {
          email:email,
          password:password
        } 

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);

        if(response.status === 200){
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token', data.token);
          navigate('/home');
        }

        setEmail('');
        setPassword('');
    }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
        
        <p className='text-center'>New here ? <Link to='/signup' className='mb-3 text-blue-600'>Create New Account</Link></p>
      </form>
        </div>
        <div>
            <Link to="/captain-login" className=' flex items-center justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
