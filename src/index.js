import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Device from './pages/Device'
import Devices from './pages/Devices';
import Newdevice from './pages/Newdevice';
import About from './pages/About';
import Sensors from './pages/Sensors'
import Sensor from './pages/Sensor';
import Programs from './pages/Programs'
import Login from './pages/Login';
import Register from './pages/Register';
import DevicesSensors from './pages/Device_Sensor';
import Measurements from './pages/Measurements';
import Predictions from './pages/Predictions';
import Plots from './pages/Plots';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <AuthProvider>
    <Routes>
    <Route path='/*' element={<App />}></Route>
    <Route path='devices' element={<Devices />}></Route>
    <Route path='device/new' element={<Newdevice />}></Route>
    <Route path='devices/:name' element={<Device />}></Route>
    <Route path="about" element={<About />} />
    <Route path='sensors' element={<Sensors/>} />
    <Route path='sensors/:name/:sensor' element={<><Sensor/></>} />
    <Route path='login' element={<Login/>} />
    <Route path='register' element={<Register/>} />
    <Route path="programs" element={<Programs/>}></Route>
    <Route path="devices/:devicename/sensors" element={<DevicesSensors/>}></Route>
    <Route path="measurements/:devicename/:sensorname" element={<Measurements/>}></Route>
    <Route path="predictions/:programname" element={<Predictions/>}></Route>
    <Route path="plots" element={<Plots/>}></Route>

    </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
