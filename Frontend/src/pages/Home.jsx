import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import {gsap} from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanelComponent from '../components/VehiclePanelComponent';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
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

  const [waitingForDriver, setWaitingForDriver] = useState(false);




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

  return (
    <div className='h-screen position-relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen top-0 absolute w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
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
          }} 
          value={destination}
          onChange={(e)=>{
            setDestination(e.target.value);
          }} 
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" 
          placeholder='Enter your destination'
          />
        </form>
        </div>
        <div ref={pannelRef} className='opacity-0 h-[0%] bg-white'>
          <LocationSearchPannel setVehiclePannel={setVehiclePannel}
          setPanelOpen={setPanelOpen}/>
        </div>
      </div>

      <div ref={vehiclePannelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <VehiclePanelComponent 
        setConfirmedRidePanel={setConfirmedRidePanel}
        setVehiclePannel={setVehiclePannel}/>
      </div>

      <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel}
        setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
