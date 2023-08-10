import React from 'react'

const SensorCard = ({Sensor}) => {
    let {id, unit, device_id, sensor_name, user_id} = Sensor

  return (
    <div className="flex flex-col items-center font-normal text-lg">
        <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{sensor_name}</span></div>
        
        <div>ID: <span className="font-semibold text-orange-600 text-xl">{id}</span></div>
        <div>Unit: {unit}</div>
        <div>Device ID: {device_id}</div>
        <div>Sensor Name: {sensor_name}</div>
        <div>User ID: {user_id}</div>
        
    </div>
  )
}

export default SensorCard