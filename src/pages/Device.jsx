import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import DeviceCard from '../components/DeviceCard'


let BASE_URL = "http://193.166.139.12:8000/devices/get_details/?List_device="

const Device = () => {
  const { name } = useParams();
  const [device, setDevice] = useState([])
  const [building, setBuilding] = useState(null);
  const [error, setError] = useState([]);
  const [isPending, setIsPending] = useState(true)


  const getDevice = async() => {
    const res = await fetch(`${BASE_URL}${name}`)
    console.log(res)
    
    if (!res.ok){
      setError([res.url, res.status])
      
  } else {
      const data = await res.json()
      setDevice(data)
      setBuilding(data.location)
      console.log(data)
  }
    setIsPending(false)
  }

useEffect(() => {getDevice(name)},[])

  return (
    <Layout>
      
      
      {isPending && <div className='bg-red-500 w-full text-white h-10 text-lg'>
        <h2>Loading Device...</h2>
        </div>}


      {error && <ul className='flex flex-col mx-auto text-cente'>
        {error && error.map(
          (el, index)=>(
            <li key={index} className='my-2 p-1 border-2 border-red-700 max-w-md mx-auto'>{el}</li>

          )
        )}
        </ul>}

        {device && <div>
          <div className='flex flex-col items-center font-normal text-lg'>
            
            {device.map((el) => {
              return (
                <DeviceCard key={el.id} device = {el} />
            )
            })}
            
            
            
          </div>



          </div>}
    </Layout>
  )
}

export default Device
