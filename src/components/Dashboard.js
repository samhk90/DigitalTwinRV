import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Register necessary Chart.js components
ChartJS.register(
  RadarController,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

// Sample Data
const enginePerformanceData = [
  { category: 'Speed', value: 80 },
  { category: 'Fuel Efficiency', value: 70 },
  { category: 'Maintenance', value: 60 },
  { category: 'Temperature', value: 75 },
  { category: 'Noise Level', value: 65 },
];

const fuelUsageData = [
  { name: 'Jan', value: 150 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 180 },
  { name: 'Apr', value: 210 },
  { name: 'May', value: 190 },
  { name: 'Jun', value: 220 },
];

const overallPerformanceData = [
  { name: 'Jan', value: 75 },
  { name: 'Feb', value: 80 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 90 },
  { name: 'Jun', value: 95 },
];

const engineHealth = 75;

const Dashboard = () => {
  const lineData = useMemo(() => ({
    labels: fuelUsageData.map((data) => data.name),
    datasets: [
      {
        label: 'Fuel Usage (kWh)',
        data: fuelUsageData.map((data) => data.value),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Overall Performance (%)',
        data: overallPerformanceData.map((data) => data.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  }), []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-650 min-h-screen">
      
      {/* Engine Health Card */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-white">Engine Health</h2>
        <div className="w-1/2 mx-auto mb-4">
          <CircularProgressbar
            value={engineHealth}
            text={`${engineHealth}%`}
            styles={buildStyles({
              textColor: '#fff',
              pathColor: '#4CAF50',
              trailColor: '#333',
            })}
          />
        </div>
        <p className="text-gray-300 text-center">Current Health: {engineHealth}%</p>
        <ul className="mt-4 text-gray-300">
          <li>Oil Level: <span className="font-semibold">Good</span></li>
          <li>Coolant Level: <span className="font-semibold">Normal</span></li>
          <li>Battery Status: <span className="font-semibold">Charged</span></li>
        </ul>
      </div>

      {/* Combined Usage and Performance Line Chart */}
      <div className="col-span-1 lg:col-span-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-white">Usage & Performance Overview</h2>
        <div className="w-full h-96">
          <Line 
            data={lineData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#fff',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || '';
                      return `${label}: ${context.raw} ${label.includes('Fuel') ? 'kWh' : '%'}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: '#fff',
                  },
                  grid: {
                    color: '#444',
                  },
                },
                y: {
                  ticks: {
                    color: '#fff',
                  },
                  beginAtZero: true,
                  grid: {
                    color: '#444',
                  },
                },
              },
            }} 
          />
        </div>
        <p className="text-gray-300 mt-4">Fuel usage and overall performance over the last 6 months</p>
      </div>

      {/* Appliance Status Card */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-white">Appliance Status</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex justify-between">
            <span>Refrigerator:</span> 
            <span className="text-green-400 font-semibold">Running</span>
          </li>
          <li className="flex justify-between">
            <span>Stove:</span> 
            <span className="text-red-400 font-semibold">Off</span>
          </li>
          <li className="flex justify-between">
            <span>Air Conditioning:</span> 
            <span className="text-green-400 font-semibold">Running</span>
          </li>
          <li className="flex justify-between">
            <span>Heater:</span> 
            <span className="text-red-400 font-semibold">Off</span>
          </li>
          <li className="flex justify-between">
            <span>Lights:</span> 
            <span className="text-green-400 font-semibold">On</span>
          </li>
        </ul>
      </div>

      {/* Fuel Status Card */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-white">Fuel Status</h2>
        <div className="w-full h-6 bg-gray-800 rounded-lg relative">
          <div className="absolute top-0 left-0 h-full bg-green-500 rounded-lg" style={{ width: '60%' }}>
            <div className="h-full text-white flex items-center justify-center">
              60%
            </div>
          </div>
        </div>
        <p className="text-gray-300 mt-4">Estimated distance remaining: 300 km</p>
      </div>

      {/* Tire Pressure Card */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-white">Tire Pressure</h2>
        <ul className="text-gray-300">
          <li>Front Left: <span className="font-semibold">32 psi</span></li>
          <li>Front Right: <span className="font-semibold">32 psi</span></li>
          <li>Rear Left: <span className="font-semibold">34 psi</span></li>
          <li>Rear Right: <span className="font-semibold">34 psi</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
