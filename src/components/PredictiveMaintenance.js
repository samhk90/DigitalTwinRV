import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Line } from 'react-chartjs-2';
import 'react-circular-progressbar/dist/styles.css';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from lucide-react

// Initialize Supabase client
const supabase = createClient('https://wxundvfcpvhhggpifltc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dW5kdmZjcHZoaGdncGlmbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDU3MDgsImV4cCI6MjA0MjQ4MTcwOH0.uFy5Vkgbh0vdPAwux4VlFdDs8VNqEiY5fUgWns_UOCM');

export default function PredictiveMaintenance() {
  const [rvData, setRvData] = useState(null);
  const [maintenanceDate, setMaintenanceDate] = useState(null);

  // Fetch latest RV data from Supabase
  useEffect(() => {
    const fetchRvData = async () => {
      const { data, error } = await supabase
        .from('rvdata')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1); // Fetch the latest data

      if (data) {
        setRvData(data[0]);
        calculateMaintenanceDate(data[0]); // Calculate maintenance date
      }
      if (error) console.error('Error fetching RV data:', error);
    };

    fetchRvData();
  }, []);

  // Maintenance prediction logic based on RV status
  const calculateMaintenanceDate = (data) => {
    const currentDate = new Date();
    const isMaintenanceNeeded = data.engine_temperature > 100 || data.oil_pressure < 25;
    const maintenanceDueDate = isMaintenanceNeeded
      ? new Date(currentDate.setDate(currentDate.getDate() + 30)) // Predict 30 days from today
      : 'No Maintenance Required';

    setMaintenanceDate(maintenanceDueDate);
  };

  const chartData = {
    labels: ['1', '2', '3', '4', '5'], // Placeholder labels for the chart
    datasets: [
      {
        label: 'Engine Temperature (°F)',
        data: [85, 90, 95, rvData?.engine_temperature],
        borderColor: '#ff6f61',
        fill: false,
      },
      {
        label: 'Oil Pressure (PSI)',
        data: [30, 28, 26, rvData?.oil_pressure],
        borderColor: '#4CAF50',
        fill: false,
      },
    ],
  };

  return (
    <div className="col-span-12 bg-transparent p-6  w-full">
      <h2 className="text-3xl font-semibold mb-4 text-white">Simulation & Predictive Maintenance</h2>
      
      {/* Progress bar section */}
      <div className="flex justify-between items-center space-x-8 mb-8">
        <div className="w-1/5">
          <CircularProgressbar
            value={rvData?.engine_temperature}
            text={`${rvData?.engine_temperature}°F`}
            styles={buildStyles({
              textSize: '12px',
              textColor: '#fff',
              pathColor: rvData?.engine_temperature > 100 ? '#ff6f61' : '#4CAF50',
              trailColor: '#333',
            })}
          />
          <p className="text-gray-300 mt-2 text-center">Engine Temp</p>
        </div>

        <div className="w-1/5">
          <CircularProgressbar
            value={rvData?.oil_pressure}
            text={`${rvData?.oil_pressure} PSI`}
            styles={buildStyles({
              textSize: '12px',
              textColor: '#fff',
              pathColor: rvData?.oil_pressure < 25 ? '#ff6f61' : '#4CAF50',
              trailColor: '#333',
            })}
          />
          <p className="text-gray-300 mt-2 text-center">Oil Pressure</p>
        </div>

        <div className="w-1/2 p-4 text-center bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">Predictive Maintenance</h3>
          <p className={`text-lg ${maintenanceDate === 'No Maintenance Required' ? 'text-green-400' : 'text-red-400'}`}>
            {maintenanceDate !== 'No Maintenance Required' && maintenanceDate instanceof Date
              ? `Maintenance Due: ${maintenanceDate.toLocaleDateString()}`
              : maintenanceDate}
          </p>
        </div>
      </div>

      {/* Chart section */}
      <div className="w-full h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                grid: { color: '#666' },
                ticks: { color: '#fff' }
              },
              x: {
                grid: { color: '#666' },
                ticks: { color: '#fff' }
              }
            },
            plugins: {
              legend: {
                labels: { color: '#fff' }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
