import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import React from 'react'
import MeasurementChart from '../components/MeasurementChart.tsx'
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "../App.css";
import useAuth from '../hooks/UseAuth';
import zoomPlugin from 'chartjs-plugin-zoom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";



Chart.register(zoomPlugin);


Chart.register(CategoryScale);

let BASE_URL= `${process.env.REACT_APP_API}`

const Plots = () => {
    const [dataDevice, setDataDevice] = useState(null)
    const [devices, setDevices] = useState([])
    const [sensors, setSensors] = useState([])
    const [listsensorname, setListSensorName] = useState([])
    const date_now = new Date();
    const [startdate, setStartdate] = useState(new Date(Date.UTC(date_now.getUTCFullYear(), date_now.getUTCMonth(), date_now.getDate()) - 7 * 24 * 60 * 60000));
    const [enddate, setEnddate] = useState(new Date(Date.UTC(date_now.getUTCFullYear(), date_now.getUTCMonth(), date_now.getDate())));
    let starttime_str = encodeURIComponent(startdate.toISOString());
    let endtime_str = encodeURIComponent(enddate.toISOString());
    const [starttime, setStarttime]  = useState(starttime_str);
    const [endtime, setEndtime] = useState(endtime_str);
    const { auth } = useAuth();
    const token = auth.token;


    const getDevices = async () => {
        const res = await fetch(`${process.env.REACT_APP_API}/devices/get`)
        const data = await res.json()
        let list_devices = data.map(device => <option key={device.name}>{device.name}</option>)
        setDevices(list_devices)
    };
    useEffect(() => {getDevices()}, []);

    const list_sensors = listsensorname.map((sensorname, pos) => {
        return (
            <>
                <li key={pos}>
                    <select value={sensorname} onChange={(event) => handleSensorChange(event, pos)}>{sensors}</select>
                    <button onClick={() => handleSensorDelete(pos)}> - </button>
                </li>
            </>
        );
    });

    const handleDevChange = async (event) => {
        const device = event.target.value
        setDataDevice(device)
        const res = await fetch(`${process.env.REACT_APP_API}/sensors/get_device_sensor/${device}`)
        const data = await res.json()
        let list_sensors = data.map(sensor => <option key={sensor.sensor_name}>{sensor.sensor_name}</option>)
        setSensors(list_sensors)
    };
    const handleSensorChange = (event, i) => {
        const listsensorname_copy = [...listsensorname]
        listsensorname_copy[i] = event.target.value
        setListSensorName(listsensorname_copy)
    };

    const handleSensorDelete = async (i) => {
        const listsensorname_copy = listsensorname.filter((item,pos) => pos !==i);
        setListSensorName(listsensorname_copy)
    }

    const handleAddSensorClick = async () => {
        const listsensorname_copy = [...listsensorname]
        listsensorname_copy.push(null)
        setListSensorName(listsensorname_copy)
    }

    const handleChangeStarttime = (date) => {
        setStartdate(date)
        setStarttime(encodeURIComponent(date.toISOString()));
    };

    const handleChangeEndTime = (date) => {
        setEnddate(date)
        setEndtime(encodeURIComponent(date.toISOString()));
    };


    const handlePerformRequest = async () => {
        var url_req = `${process.env.REACT_APP_API}/measurements/get/?download=csv&device_name=${dataDevice}&starttime=${starttime}&endtime=${endtime}`;
        for (let i in listsensorname) {
            url_req += `&sensor=${listsensorname[i]}`;
        };
        const res = await fetch(url_req,
            {"headers": {"Authorization": `Bearer ${token}`}});
        let doc = await res.blob()
        let elm = document.createElement('a');
        elm.href = URL.createObjectURL(doc);
        elm.setAttribute('download', `Meas_${dataDevice}.csv`);
        elm.click();
        elm.remove();

    };


    return(
        <Layout>
            <div>Start date</div><DatePicker
                showIcon
                dateFormat="dd.MM.yyyy hh.mm"
                timeInputLabel="Time:"
                showTimeInput
                selected={startdate}
                onChange={(date) => handleChangeStarttime(date)}
                selectsStart
                startDate={startdate}
                endDate={enddate}
                />
            <div>End date</div>
            <DatePicker
                showIcon
                dateFormat="dd.MM.yyyy hh.mm"
                timeInputLabel="Time:"
                showTimeInput
                selected={enddate}
                onChange={(date) => handleChangeEndTime(date)}
                selectsEnd
                startDate={startdate}
                endDate={enddate}
                minDate={startdate}
                />
            <div>Choose the device</div>
            <div><select value={dataDevice} onChange={handleDevChange}>{devices}</select></div>
            <div>Choose Sensors:</div>
            <ol>{list_sensors}</ol>
            <div><button onClick={handleAddSensorClick}>Add Sensor</button></div>
            <div><button onClick={handlePerformRequest}>Extract CSV</button></div>
            

        </Layout>
    )
    
};

export default Plots;