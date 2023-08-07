import { Link } from "react-router-dom";

const Card = ({device}) => {
    
    let {name, building_name, id, type} = device

    return (
        <Link to={`/devices/${id}`}>
        <div className="shadow-lg p-5 flex flex-col bg-FarmWhite rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
            <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{name}</span></div>
            <div>id: {id}</div>
            <div>Device Name: {name}</div>
            <div>Building: {building_name}</div>
            <div>type: {type}</div>
        </div>
        </Link>
    )
}

export default Card;
