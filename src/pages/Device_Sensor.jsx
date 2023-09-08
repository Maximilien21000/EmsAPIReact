import React from 'react'
import SensorCard from '../components/CardSensors'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from "react-router-dom";


const DevicesSensors = () => {
  
  const { devicename } = useParams()
  console.log(devicename)
  const [sensors, setSensors] = useState([])
  const [sensorName, setName] = useState('')
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sensors/get_device_sensor/${devicename}`)
    .then(response => response.json())
    .then(json => {
      setSensors(json)
      setIsPending(false)
    })
    }, [sensorName])
  console.log(sensors)
  return (
    <Layout>
      {isPending}
          <div className='grid gid-cols-2 gap-3 lg:grid-cols-4'>
            {sensors.map((item) => {
                item.device_name = devicename
                return (
                <SensorCard key={item.id} sensor = {item}/>
                )
            })}
              
          </div>
      
    </Layout>
  )}

export default DevicesSensors;