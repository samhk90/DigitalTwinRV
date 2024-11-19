import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RVModel from './RVModel';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const supabase = createClient('https://tdqecxiscqcyxhgpvpfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWVjeGlzY3FjeXhoZ3B2cGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMTQyNTksImV4cCI6MjA0NzU5MDI1OX0.jfwVI2qu6oBRbCwvN6OnaIp3JvubPAi14YRf0RQFugI');

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [rvStatus, setRvStatus] = useState(null);
  const [engineHealth, setEngineHealth] = useState(100);
  const [usageData, setUsageData] = useState({
    electricity: [],
    water: [],
  });

const mapContainerStyle = {
  height: '240px',
  width: '1130px'
};
  const [rvLocation, setRvLocation] = useState(null);
  const center = {
    lat: 0, // Default latitude
    lng: 0  // Default longitude
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user || !user.id) return;
  
      const { data: rvDetails, error: rvDetailsError } = await supabase
        .from('rvdetails')
        .select('*')
        .eq('userid', user.id);
  
      if (rvDetailsError || !rvDetails || rvDetails.length === 0) return;
  
      const rvid = rvDetails[0].id;
      const rvmodel= rvDetails[0].rvmodel;
      const { data: rvData, error } = await supabase
        .from('rvdata')
        .select('*')
        .eq('rvid', rvid)
        .order('created_at', { ascending: false }); // Sort by createdat in descending order
      console.log(rvData)
      if (error) return;
      setData(rvData);// Use the latest entry (first in the sorted list)
      setRvStatus({ ...rvData[0], rvmodel });
      // Prepare usage data for graphs
      const electricityUsage = rvData.map(item => item.power_consumption);
      const waterUsage = rvData.map(item => item.freshwater_tank_level);
      setUsageData({
        electricity: electricityUsage,
        water: waterUsage,
      });
      if (rvData) {
        setRvLocation({
          lat: rvData[0].latitude,
          lng: rvData[0].longitude
        });
      } else  {
        console.log('error in rv location');
      }
    };



  
    fetchData();
  }, []);
  

  // Graph data
  const graphData = {
    labels: data.map((item, index) => `Data ${index + 1}`),
    datasets: [
      {
        label: 'Electricity Usage (kWh)',
        data: usageData.electricity,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Water Usage (liters)',
        data: usageData.water,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-800 h-full">
      <header className="bg-gray-900 rounded-lg shadow-md p-4 flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-white">
          {rvStatus ? rvStatus.rvmodel : 'Loading RV Model...'}
        </h1>
        <div className="flex items-center">
          {rvStatus ? (
            <>
              <div className={`w-3 h-3 ${rvStatus.rvmodel ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2`}></div>
              <span className={`${rvStatus.rvmodel ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                {rvStatus.online ? 'Online' : 'Offline'}
              </span>
            </>
          ) : (
            <span className="text-gray-400">Loading...</span>
          )}
        </div>
      </header>

      <div className="p-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-650 min-h-screen">
      <div className="col-span-3  flex justify-between space-x-8">
  {/* Engine Health Card */}
  <div className="bg-transparent p-4 rounded-lg shadow-lg  col-span-3">
  <h2 className="text-2xl font-semibold mb-4 text-white">Engine Health</h2>
  
  {/* Adjusting the progress bar size */}
  <div className="w-3/4 mx-auto mb-4"> {/* Increased size from w-1/2 to w-3/4 */}
    <CircularProgressbar
      value={engineHealth}
      text={`${engineHealth}%`}
      styles={buildStyles({
        textSize: '16px', // Adjusted the text size inside the progress bar
        textColor: '#fff',
        pathColor: '#4CAF50',
        trailColor: '#333',
      })}
    />
  </div>

  {/* Text adjusted below the progress bar */}
  <div className="mt-2 mx-auto text-center"> {/* Centered the text block */}
    <p className="text-gray-300">Current Health: {engineHealth}%</p>
    <p className="text-gray-300">Engine Temperature: {rvStatus?.engine_temperature}°F</p>
    <p className="text-gray-300">Engine Oil Pressure: {rvStatus?.oil_pressure}</p>
    <p className="text-gray-300">Transmission Status: {rvStatus?.transmission_status}</p>
    <p className="text-gray-300">RPM: {rvStatus?.rpm}</p>
  </div>
</div>


  {/* Side Card */}
  <div className="bg-transparent h-fit w-full  rounded-lg shadow-lg  col-span-3">
      <RVModel />
</div>
</div>

          {/* GPS and Navigation Card */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg col-span-3">
            <h3 className="text-xl font-semibold text-white mb-2">GPS & Navigation</h3>
            <div className="w-full h-60 bg-gray-700 rounded-lg">
            <LoadScript googleMapsApiKey="AIzaSyBDRxzncdBrGr-pDUpqlAU1MIHOchZR4qg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={rvLocation || center}
        zoom={10}
      >
        {rvLocation && (
          <Marker position={rvLocation} />
        )}
      </GoogleMap>
    </LoadScript>
            </div>
          </div>
        {/* Overall Performance Graph */}


        {/* Engine & Transmission Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Engine & Transmission</h3>
          <p className="text-gray-300">Engine Temperature: {rvStatus?.engine_temperature}°F</p>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(rvStatus?.engine_temperature / 300) * 100}%` }}></div>
          </div>
          <p className="text-gray-300">RPM: {rvStatus?.rpm}</p>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(rvStatus?.rpm / 6000) * 100}%` }}></div>
          </div>
        </div>

        {/* Electrical Systems Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
  <h3 className="text-xl font-semibold text-white mb-2">Electrical Systems</h3>
  <p className="text-gray-300">Battery Level: {rvStatus?.battery_level} V</p>
  <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4 overflow-hidden">
    <div
      className="bg-green-600 h-2.5 rounded-full"
      style={{ width: `${Math.min((rvStatus?.battery_level / 12) * 100, 100)}%` }} // Ensure max width is 100%
    ></div>
  </div>
  <p className="text-gray-300">Alternator Output: {rvStatus?.alternator_output} V</p>
</div>


        {/* Water Systems Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Water Systems</h3>
          <p className="text-gray-300">Freshwater Tank Level: {rvStatus?.freshwater_tank_level} liters</p>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(rvStatus?.freshwater_tank_level / 100) * 100}%` }}></div>
          </div>
          <p className="text-gray-300">Waste Tank Level: {rvStatus?.waste_tank_level} liters</p>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(rvStatus?.waste_tank_level / 100) * 100}%` }}></div>
          </div>
        </div>

        {/* HVAC Systems Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">HVAC Systems</h3>
          <p className="text-gray-300">Current Temperature: {rvStatus?.current_temperature}°C</p>
          <p className="text-gray-300">HVAC Status: {rvStatus?.hvac_status}</p>
          <p className="text-gray-300">Fan Speed: {rvStatus?.fan_speed}</p>
        </div>

        {/* Appliances Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Appliances</h3>
          <p className="text-gray-300">Refrigerator Status: {rvStatus?.refrigerator_status}</p>
          <p className="text-gray-300">Stove Status: {rvStatus?.stove_status}</p>
          <p className="text-gray-300">Air Conditioning Status: {rvStatus?.air_conditioning_status}</p>
        </div>

        {/* Lighting Systems Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Lighting Systems</h3>
          <p className="text-gray-300">Interior Lights Status: {rvStatus?.interior_lights_status}</p>
          <p className="text-gray-300">Exterior Lights Status: {rvStatus?.exterior_lights_status}</p>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg col-span-3">
  <h3 className="text-xl font-semibold text-white mb-2">Electricity & Water Usage</h3>
  <Line 
    data={{
      labels: data.map((item, index) => `Data ${index + 1}`),
      datasets: [
        {
          label: 'Electricity Usage (kWh)',
          data: usageData.electricity,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Water Usage (liters)',
          data: usageData.water,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    }} 
    options={{
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 200, // Adjust for your data range
          ticks: {
            stepSize: 20,
          },
        },
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    }} 
  />
</div>


        {/* Alerts Card
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Alerts</h3>
          {rvStatus?.maintenance_alerts ? (
            <p className="text-red-400">{rvStatus?.maintenance_alerts}</p>
          ) : (
            <p className="text-green-400">No Alerts</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
