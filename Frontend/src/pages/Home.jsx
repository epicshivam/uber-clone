import React, { useContext, useEffect, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import {gsap} from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanelComponent from '../components/VehiclePanelComponent';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {

  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [farePrice, setFarePrice] = useState(null);

  const [activeInput, setActiveInput] = useState('');

  const [selectVehicle, setSelectVehicle] = useState(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const ConfirmedRidePanelRef = useRef(null);
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [VehiclePannel, setVehiclePannel] = useState(false);
  const vehiclePannelRef = useRef(null);
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [ride,setRide] = useState(null);

  const navigate = useNavigate();

  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);

 useEffect(() => {
    if (user && user._id) {
        socket.emit("join", { userType: "user", userId: user._id });
    }
}, [user]);
  
  
  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })


  const fetchSuggestions = async (input) => {
    if(input.length < 3) {
      return;
    }

    try {
      
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${input}`, {
      headers : {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });

      const data = response.data;
      return data;

    } catch (error) {
      
      console.log(error);

    }
  }

  const fetchFare = async (pickUp,destination) => {
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
      {
        pickup : pickUp,
        destination
      },
      {
        headers : {
          "Authorization" : "Bearer " + localStorage.getItem('token')
        }
      });

      setFarePrice(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  }


  const fetchCreateRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup : pickUp,
        destination,
        vehicleType : selectVehicle
      },
      {
        headers : {
          "Authorization" : "Bearer " + localStorage.getItem('token')
        }
      }
    )

    console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      const suggestions = await fetchSuggestions(pickUp);
      setPickUpSuggestions(suggestions || []);
    }, 300);

    return () => clearTimeout(timer);
  }, [pickUp]);


    useEffect(()=>{
    const timer = setTimeout(async ()=>{
      const suggestions = await fetchSuggestions(destination);
      setDestinationSuggestions(suggestions || []);
    }, 300);

    return () => clearTimeout(timer);
  }, [destination]);


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(pannelRef.current,{
      height:'70%',
      opacity:1
    })
    gsap.to(pannelCloseRef.current,{
      opacity:1
    })
    }else{
      gsap.to(pannelRef.current,{
      height:'0%',
      opacity:0,
    })
    gsap.to(pannelCloseRef.current,{
      opacity:0
    })
    }
  }, [panelOpen])

  useGSAP(function(){
    if(VehiclePannel){
      gsap.to(vehiclePannelRef.current,{
      transform:'translateY(0)'
    })
    } else {
      gsap.to(vehiclePannelRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [VehiclePannel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    })
    } else {
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [vehicleFound])

    useGSAP(function(){
    if(ConfirmedRidePanel){
      gsap.to(ConfirmedRidePanelRef.current,{
      transform:'translateY(0)'
    })
    } else {
      gsap.to(ConfirmedRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [ConfirmedRidePanel])

    useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
    })
    } else {
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [waitingForDriver])


  function findTrip() {
    setVehiclePannel(true)
    setPanelOpen(false)
  }

  return (
    <div className='h-screen position-relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen relative'>
        {/* <img className='h-full w-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" /> */}
        <div className="absolute inset-0 z-0">
          <LiveTracking role="user"  />
        </div>
      </div>
      <div className='flex flex-col justify-end h-screen top-0 absolute w-full'>
        <div className='h-[30%] p-5 bg-white relative mb-6'>
          <h5 ref={pannelCloseRef} onClick={()=>{
            setPanelOpen(false);
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=> {
          submitHandler(e)
        }}>
          <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
          <input
          onClick={()=>{
            setPanelOpen(true);
            setActiveInput('pickup');
          }} 
          value={pickUp}
          onChange={(e)=>{
            setPickUp(e.target.value);
          }}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' 
          type="text" 
          placeholder='Add a pick-up location'
          />
          <input
          onClick={()=>{
            setPanelOpen(true);
            setActiveInput('destination')
          }} 
          value={destination}
          onChange={(e)=>{
            setDestination(e.target.value);
            }} 
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" 
            placeholder='Enter your destination'
            />
          </form>
          <button onClick={()=>{
            findTrip();
            fetchFare(pickUp,destination);
          }} className="bg-black text-white px-4 py-2 rounded mt-4 w-full">Find Trip</button>
          </div>
          <div ref={pannelRef} className='opacity-0 h-[0%] bg-white'>
            {/* <LocationSearchPannel type="pickup" setVehiclePannel={setVehiclePannel}
            setPanelOpen={setPanelOpen} suggestions={pickUpSuggestions} setValue={setPickUp}/> */}

          <LocationSearchPannel value={activeInput === 'pickup' ? pickUp : destination}
            setValue={activeInput === 'pickup' ? setPickUp : setDestination}
            suggestions={activeInput === 'pickup' ? pickUpSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} setVehiclePannel={setVehiclePannel}
          />
        </div>
      </div>

      <div ref={vehiclePannelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <VehiclePanelComponent 
        setConfirmedRidePanel={setConfirmedRidePanel}
        setVehiclePannel={setVehiclePannel}
        farePrice={farePrice}
        selectVehicle={setSelectVehicle}
        />
      </div>

      <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <ConfirmedRide
        pickUp={pickUp}
        destination={destination} 
        farePrice={farePrice}
        fetchCreateRide={fetchCreateRide}
        setConfirmedRidePanel={setConfirmedRidePanel}
        setVehicleFound={setVehicleFound}
        selectVehicle={selectVehicle}
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <LookingForDriver
        pickUp={pickUp}
        destination={destination} 
        farePrice={farePrice}
        selectVehicle={selectVehicle}
        setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6'>
        <WaitingForDriver 
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}
        waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
