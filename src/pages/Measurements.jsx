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

let BASE_URL= `${process.env.REACT_APP_API}/measurements/get/`

const Measurements = () => {
    const { devicename } = useParams()
    const { sensorname } = useParams()
    const [sensor, setSensor] = useState({})
    const [error, setError] = useState([])
    const [isPending, setIsPending] = useState(true)
    const { auth } = useAuth()
    const date_now = new Date();
    const [startdate, setStartdate] = useState(new Date(Date.UTC(date_now.getUTCFullYear(), date_now.getUTCMonth(), date_now.getDate()) - 7 * 24 * 60 * 60000));
    const [enddate, setEnddate] = useState(new Date(Date.UTC(date_now.getUTCFullYear(), date_now.getUTCMonth(), date_now.getDate())));
    let starttime_str = encodeURIComponent(startdate.toISOString());
    let endtime_str = encodeURIComponent(enddate.toISOString());
    const [starttime, setStarttime]  = useState(starttime_str)
    const [endtime, setEndtime] = useState(endtime_str)
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Dataset 1',
          data: [],
          borderColor: 'rgb(255,99,132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    });

    const titleChart = `Measured Values - Device: ${devicename} / Sensor: ${sensorname}`;

    const getMeasurement = async () => {
        const res = await fetch (`${BASE_URL}?download=safe&sensor=${sensorname}&device_name=${devicename}&starttime=${starttime}&endtime=${endtime}`,{
        "headers": {"Authorization": `Bearer ${auth.token}`}})
        if (!res.ok){
            setError([res.url,res.status])
        }else {
            const data = await res.json()
            const chartdata = {
              labels: data.map((meas) => Date.parse(meas.starttime)),
              datasets: [
                {
                  label: `${devicename} / ${sensorname}`,
                  data: data.map((meas) => meas.value),
                  pointStyle: false,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ]
            };
            setChartData(chartdata)
            
        }

        setIsPending(false)
    }

    const getSensor = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/sensors/get_sensor/sensor=${sensorname}&device=${devicename}`)
      const data = await res.json()
      setSensor(data)
    };

    useEffect(() => {getMeasurement()}, []);
    useEffect(() => {getSensor()}, []);
    const handleNewRequest = async () => {
        await getMeasurement()
    };
    const handleChangeStarttime = (date) => {
      setStartdate(date)
      setStarttime(encodeURIComponent(date.toISOString())); 
    };
    const handleChangeEndTime = (date) => {;
      setEnddate(date)
      setEndtime(encodeURIComponent(date.toISOString()));
    };
    
    const handleExtractCSV = async () => {
      const res = await fetch (`${BASE_URL}?download=csv&sensor=${sensorname}&device_name=${devicename}&starttime=${starttime}&endtime=${endtime}`,{
        "headers": {"Authorization": `Bearer ${auth.token}`}})
        if (!res.ok){
            setError([res.url,res.status])
        }else {
            let doc = await res.blob()
            let elm = document.createElement('a');
            elm.href = URL.createObjectURL(doc);
            elm.setAttribute('download', `Meas_${devicename}_${sensorname}.csv`);
            elm.click();
            elm.remove();
        }
    };
  return (
    <Layout>
        {isPending}
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
          <button onClick={handleNewRequest}>New request</button>
          <button onClick={handleExtractCSV}>Extract Data: Get CSV</button>
          <div className='grid gid-cols-2 gap-3 lg:grid-cols-4'>  

                <MeasurementChart key={sensorname} chartData = {chartData} title = {titleChart} unit={sensor.unit}/>
                
          </div>
    </Layout>
  )
}

export default Measurements;