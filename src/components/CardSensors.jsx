import { Link } from "react-router-dom";

const SensorCard = ({sensor}) => {
    
    let {sensor_name, device_name, unit, priv, owner} = sensor

    return (
        <Link to={`/devices/${sensor_name}`}>
        <div className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
            <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{sensor_name}</span></div>
            <div>device_name: {device_name}</div>
            <div>Unit: {unit}</div>
            <div>Private?: {priv ? 'true': 'Yes'}</div>
            <div>Owner: {owner ? 'nerc': 'NERC'}</div>
        </div>
        </Link>
    )
}

export default SensorCard;