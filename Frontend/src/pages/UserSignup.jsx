import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userData, setUserData] = useState("")

    const navigate = useNavigate();

    const {user,setUser} = React.useContext(UserDataContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullName : {
                firstName:firstName,
                lastName:lastName
            },
            password:password,
            email:email
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);

        if(response.status === 201){
            const data = response.data;

            setUser(data.user);                      localStorage.setItem('token', data.token);
            navigate('/home');
        }

        setEmail("");
        setPassword("");
        setfirstName("");
        setLastName("");

    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>{
        onSubmitHandler(e)
      }}>
        <h3 className='text-base font-medium mb-2'>Whats your name</h3>
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
        <h3 className='text-base font-medium mb-2'>Whats your email</h3>
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
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
        
        <p className='text-center'>Already have an account ? <Link to='/login' className='mb-3 text-blue-600'>Login here</Link></p>
      </form>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by auatomated means, from Uber and its affiliates to the number provided.</p>
        </div>
    </div>
  )
}

export default UserSignup
