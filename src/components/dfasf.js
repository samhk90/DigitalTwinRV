import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  Chart
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'react-circular-progressbar/dist/styles.css';
import RVModel from './RVModel'; // Import your RVModel component

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

const supabase = createClient('https://wxundvfcpvhhggpifltc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dW5kdmZjcHZoaGdncGlmbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDU3MDgsImV4cCI6MjA0MjQ4MTcwOH0.uFy5Vkgbh0vdPAwux4VlFdDs8VNqEiY5fUgWns_UOCM');

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [chartsData, setChartsData] = useState({ engineTemp: [], rpm: [] });
  const [latestData, setLatestData] = useState(null); // Declare latestData

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }

      if (!user || !user.id) {
        console.error('User not authenticated or ID is undefined:', user);
        return;
      }

      const { data: rvDetails, error: rvDetailsError } = await supabase
        .from('rvdetails')
        .select('id')
        .eq('userid', user.id);

      if (rvDetailsError) {
        console.error('Error fetching RV details:', rvDetailsError);
        return;
      }

      if (!rvDetails || rvDetails.length === 0) {
        console.error('No RV details found for the user');
        return;
      }

      const rvid = rvDetails[0].id;

      const { data: rvData, error } = await supabase
        .from('rvdata')
        .select('*')
        .eq('rvid', rvid);

      if (error) {
        console.error('Error fetching RV data:', error);
      } else {
        console.log('RV Data:', rvData);
        
        if (rvData && rvData.length > 0) {
          setData(rvData);
          setLatestData(rvData[rvData.length - 1]); // Set latestData to the last entry

          const engineTemp = rvData.map(item => item.engine_temperature || 0);
          const rpm = rvData.map(item => item.rpm || 0);
          setChartsData({ engineTemp, rpm });
        } else {
          console.warn('RV data is empty or undefined');
          setLatestData(null); // Reset latestData to null if no data is available
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {/* Engine and Transmission */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Engine & Transmission</h3>
        {latestData ? (
          <>
            <p className="text-gray-300">Engine Temperature: {latestData.engine_temperature || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.engine_temperature || 0}%` }}></div>
            </div>
            <p className="text-gray-300">RPM: {latestData.rpm || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.rpm || 0}%` }}></div>
            </div>
            <p className="text-gray-300">Oil Pressure: {latestData.oil_pressure || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.oil_pressure || 0}%` }}></div>
            </div>
            <p className="text-green-400">Transmission Status: {latestData.transmission_status || 'N/A'}</p>
          </>
        ) : (
          <p className="text-gray-300">Loading engine and transmission data...</p>
        )}
      </div>

      {/* Electrical Systems */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Electrical Systems</h3>
        {latestData ? (
          <>
            <p className="text-gray-300">Battery Level: {latestData.battery_level || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.battery_level || 0}%` }}></div>
            </div>
            <p className="text-gray-300">Alternator Output: {latestData.alternator_output || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.alternator_output || 0}%` }}></div>
            </div>
            <p className="text-gray-300">Power Consumption: {latestData.power_consumption || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.power_consumption || 0}%` }}></div>
            </div>
          </>
        ) : (
          <p className="text-gray-300">Loading electrical systems data...</p>
        )}
      </div>

      {/* Water Systems */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Water Systems</h3>
        {latestData ? (
          <>
            <p className="text-gray-300">Freshwater Tank Level: {latestData.freshwater_tank_level || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.freshwater_tank_level || 0}%` }}></div>
            </div>
            <p className="text-gray-300">Waste Tank Level: {latestData.waste_tank_level || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.waste_tank_level || 0}%` }}></div>
            </div>
            <p className="text-green-400">Pump Status: {latestData.pump_status || 'N/A'}</p>
          </>
        ) : (
          <p className="text-gray-300">Loading water systems data...</p>
        )}
      </div>

      {/* HVAC Systems */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">HVAC Systems</h3>
        {latestData ? (
          <>
            <p className="text-gray-300 text-2xl">Current Temperature: {latestData.hvac_temperature || 'N/A'}</p>
            <p className="text-blue-400">HVAC Status: {latestData.hvac_status || 'N/A'}</p>
            <p className="text-gray-300">Fan Speed: {latestData.fan_speed || 'N/A'}</p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${latestData.fan_speed || 0}%` }}></div>
            </div>
          </>
        ) : (
          <p className="text-gray-300">Loading HVAC systems data...</p>
        )}
      </div>

      {/* Appliances */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Appliances</h3>
        {latestData ? (
          <>
            <p className="text-green-400">Refrigerator Status: {latestData.refrigerator_status ? 'On' : 'Off'}</p>
            <p className="text-green-400">Microwave Status: {latestData.microwave_status ? 'On' : 'Off'}</p>
            <p className="text-green-400">Water Heater Status: {latestData.water_heater_status ? 'On' : 'Off'}</p>
          </>
        ) : (
          <p className="text-gray-300">Loading appliances data...</p>
        )}
      </div>

      {/* Lighting Systems */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Lighting Systems</h3>
        {latestData ? (
          <>
            <p className="text-gray-300">Interior Light Status: {latestData.interior_light_status ? 'On' : 'Off'}</p>
            <p className="text-gray-300">Exterior Light Status: {latestData.exterior_light_status ? 'On' : 'Off'}</p>
            <p className="text-gray-300">Battery Light Status: {latestData.battery_light_status ? 'On' : 'Off'}</p>
          </>
        ) : (
          <p className="text-gray-300">Loading lighting systems data...</p>
        )}
      </div>

      {/* Render Charts */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Charts</h3>
        <Line
          data={{
            labels: data.map((_, index) => index + 1), // Sample labels
            datasets: [
              {
                label: 'Engine Temperature',
                data: chartsData.engineTemp,
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
              },
              {
                label: 'RPM',
                data: chartsData.rpm,
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          }}
        />
      </div>

      {/* RV Model */}
      <RVModel />
    </div>
  );
};

export default Dashboard;
