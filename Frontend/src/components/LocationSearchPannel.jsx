import React from 'react'

const LocationSearchPannel = (props) => {

    const location = [`24B, Near Kapoor's Cafe, Shivam Public School, Bulandshahr`,`24B, Near Mallhotra's Cafe, Shivam Public School, Bulandshahr`,`24B, Near Singhaniya's Cafe, Shivam Public School, Bulandshahr`,]

  return (
    <div className='p-5'>

        {
            props.suggestions.map((elem,index) => (
                <div onClick={()=>{
                    props.setValue(elem.name || elem)
                    props.setVehiclePannel(true)
                    props.setPanelOpen(false)
                }} key={index} className='flex  gap-4 border-2 p-3 rounded-xl border-gray-100 active:border-black items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
        <h4 className='font-medium'>{elem.name || elem}</h4>
      </div>
            ))
        }
    </div>
  )
}

export default LocationSearchPannel
