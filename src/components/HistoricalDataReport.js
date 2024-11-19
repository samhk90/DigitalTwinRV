import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Initialize Supabase Client
// Initialize Supabase client
const supabase = createClient('https://tdqecxiscqcyxhgpvpfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWVjeGlzY3FjeXhoZ3B2cGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMTQyNTksImV4cCI6MjA0NzU5MDI1OX0.jfwVI2qu6oBRbCwvN6OnaIp3JvubPAi14YRf0RQFugI');


export default function HistoricalDataReport() {
  const [historicalData, setHistoricalData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch historical data from Supabase
  const fetchHistoricalData = async (startDate, endDate) => {
    setLoading(true);

    // Query Supabase to fetch data within the selected date range
    let query = supabase
      .from('rvdata')
      .select('*')
      .order('created_at', { ascending: true });

    // Apply date filters if they exist
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching historical data:', error.message);
    } else {
      setHistoricalData(data);
    }

    setLoading(false);
  };

  // Handle date range selection and data fetch
  const handleDateRangeSubmit = () => {
    fetchHistoricalData(startDate, endDate);
  };

  useEffect(() => {
    // Fetch all historical data on component mount without date filters
    fetchHistoricalData();
  }, []);

  // Function to generate PDF from the table content
  const downloadPDF = () => {
    const reportTable = document.getElementById('report-table');
    html2canvas(reportTable).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Adding image of table to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 580, 400);
      pdf.save('historical-report.pdf');
    });
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Historical Data and Reporting</h3>

      {/* Date Range Filters */}
      <div className="flex   mb-4">
        <div className='m-4'>
          <label className="text-white block mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="text-black px-2 py-1 rounded"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
          />
        </div>

        <div className='m-4'>
          <label className="text-white block mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="text-black px-2 py-1 rounded"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
          />
        </div>

        <div className="p-5">
        <button
          className="bg-blue-500 text-white m-4 px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleDateRangeSubmit}
        >
          Filter Data
        </button>
        <button
              className="bg-green-500 text-white m-4 px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <p className="text-white">Loading data...</p>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            {/* Download PDF Button */}

          </div>
          <div id="report-table">
            <table className="w-full table-auto bg-transparent text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Engine Temperature</th>
                  <th className="px-4 py-2">RPM</th>
                  <th className="px-4 py-2">Oil Pressure</th>
                  <th className="px-4 py-2">Battery Level</th>
                  <th className="px-4 py-2">Maintenance Alerts</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((entry) => (
                  <tr key={entry.id} className="bg-gray-800 hover:bg-gray-700 transition">
                    <td className="mx-auto text-center px-4 py-2">{new Date(entry.created_at).toLocaleDateString()}</td>
                    <td className="mx-auto text-center px-4 py-2">{entry.engine_temperature}°F</td>
                    <td className="mx-auto text-center px-4 py-2">{entry.rpm}</td>
                    <td className="mx-auto text-center px-4 py-2">{entry.oil_pressure}</td>
                    <td className="mx-auto text-center px-4 py-2">{entry.battery_level}%</td>
                    <td className="mx-auto text-center px-4 py-2">{entry.maintenance_alerts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
