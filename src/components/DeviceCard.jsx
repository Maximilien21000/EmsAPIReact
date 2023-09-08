import React from 'react'
import { Link } from "react-router-dom";

const DeviceCard = ({device}) => {
  let {id, name, location, type, Eta_ACDC, Eta_DCAC, Eta_DCDC, P_nom} = device
  
  
    return (
      <Link to={`sensors`} >
        <div className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
        <div className="flex flex-col items-center font-normal text-lg">
        <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{name}</span></div>
        
        <div>ID: <span className="font-semibold text-orange-600 text-xl">{id}</span></div>
        <div>Location: {location}</div>
        <div>Type: {type}</div>
        <div>Eta_ACDC: {Eta_ACDC}</div>
        <div>Eta_DCDC: {Eta_DCDC}</div>
        <div>Eta_DCAC: {Eta_DCAC}</div>
        <div>P_nom: {P_nom}</div>
        
    </div>
    </div>
    </Link>
  )
}

export default DeviceCard