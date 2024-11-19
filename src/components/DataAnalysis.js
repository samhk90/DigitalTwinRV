import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Line } from 'react-chartjs-2';

const supabase = createClient('https://tdqecxiscqcyxhgpvpfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWVjeGlzY3FjeXhoZ3B2cGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMTQyNTksImV4cCI6MjA0NzU5MDI1OX0.jfwVI2qu6oBRbCwvN6OnaIp3JvubPAi14YRf0RQFugI');

const DataAnalysis = () => {
  const [rvData, setRvData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('rvdata')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching RV data:', error);
      } else {
        setRvData(data);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: rvData.map(item => new Date(item.created_at).toLocaleString()), // Format timestamps
    datasets: [
      {
        label: 'Engine Temperature (°F)',
        data: rvData.map(item => item.engine_temperature),
        borderColor: '#ff6f61',
        fill: false,
      },
      {
        label: 'Oil Pressure (PSI)',
        data: rvData.map(item => item.oil_pressure),
        borderColor: '#4CAF50',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Data Analysis</h2>
      
      {/* Chart section */}
      <div className="w-full h-64 mb-6">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                grid: { color: '#666' },
                ticks: { color: '#fff' },
              },
              x: {
                grid: { color: '#666' },
                ticks: { color: '#fff' },
              },
            },
            plugins: {
              legend: {
                labels: { color: '#fff' },
              },
            },
          }}
        />
      </div>

      {/* Table section */}
      <h3 className="text-2xl mb-4">RV Data</h3>
      <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Engine Temperature (°F)</th>
            <th className="py-2 px-4 text-left">Oil Pressure (PSI)</th>
          </tr>
        </thead>
        <tbody>
          {rvData.length > 0 ? (
            rvData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-600">
                <td className="py-2 px-4">{new Date(item.created_at).toLocaleString()}</td>
                <td className="py-2 px-4">{item.engine_temperature}</td>
                <td className="py-2 px-4">{item.oil_pressure}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataAnalysis;
