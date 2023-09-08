import React from "react";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


let BASE_URL = `${process.env.REACT_APP_API}/sensors/get_sensor/`

const Sensor = () => {
    const { name } = useParams()
    const { sensor } = useParams()
    const [Sensor, SetSensor] = useState([])
    const [error, setError] = useState([])
    const [isPending, setIsPending] = useState(true)


    const getSensor = async () => {
        const res = await fetch (`${BASE_URL}sensor=${sensor}&device=${name}`)
        console.log(res)
        if (!res.ok){
            setError([res.url,res.status])
        }else {
            const data = await res.json()
            SetSensor(data)
        }

        setIsPending(false)
    }

    useEffect(() => {getSensor(name)}, []);

    return(
        <Layout>
        {isPending && <div className='bg-red-500 w-full text-white h-10 text-lg'>
        <h2>Loading Sensor...</h2>
        </div>}


      {error && <ul className='flex flex-col mx-auto text-cente'>
        {error && error.map(
          (el, index)=>(
            <li key={index} className='my-2 p-1 border-2 border-red-700 max-w-md mx-auto'>{el}</li>

          )
        )}
        </ul>}

        {Sensor && <div>
          
          <div className='flex flex-col items-center font-normal text-lg'>
          <div className="font-sembold text-red-600 txt-xl">{name}</div>  
          
          <div>Unit: {Sensor.unit}</div>
          <div>Device ID: {Sensor.device_id}</div>
          <div>Sensor Name: {Sensor.sensor_name}</div>
          <div>User ID: {Sensor.user_id}</div>
          <div>Is Private: {Sensor.private ? "Yes":"No"}</div>
          </div>



          </div>}
        </Layout>
    )
}

export default Sensor;
