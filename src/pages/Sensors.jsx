import React from 'react'
import SensorCard from '../components/CardSensors'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'


const Sensors = () => {
  const [sensors, setSensors] = useState([])
  const [sensorName, setName] = useState('')
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    fetch('http://193.166.139.12:8000/sensors/get/?skip=0&limit=100')
    .then(response => response.json())
    .then(json => {
      setSensors(json)
      setIsPending(false)
    })
    }, [sensorName])
  
  return (
    <Layout>
      <h2>List of Sensors</h2>
      {isPending}
          <div className='grid gid-cols-2 gap-3 lg:grid-cols-4'>
            {sensors.map((item) => {
                return (
                <SensorCard key={item.name} sensor = {item}/>
                )
            })}
              
          </div>
      
    </Layout>
  )
}

export default Sensors;