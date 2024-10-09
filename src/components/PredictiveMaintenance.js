import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import RVModel from './RVModel';

// Initialize Supabase client
const supabase = createClient('https://wxundvfcpvhhggpifltc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dW5kdmZjcHZoaGdncGlmbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDU3MDgsImV4cCI6MjA0MjQ4MTcwOH0.uFy5Vkgbh0vdPAwux4VlFdDs8VNqEiY5fUgWns_UOCM');

export default function RvDashboard() {
  const [rvData, setRvData] = useState(null);
  const [engineStatus, setEngineStatus] = useState(false);
  const [maintenanceStatus, setMaintenanceStatus] = useState({
    engine: { required: false, message: "" },
    battery: { required: false, message: "" },
    water: { required: false, message: "" },
  });

  // Fetch latest RV data from Supabase
  useEffect(() => {
    const fetchRvData = async () => {
      const { data, error } = await supabase
        .from('rvdata')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (data) {
        setRvData(data[0]);
        checkMaintenance(data[0]);
      }
      if (error) console.error('Error fetching RV data:', error);
    };

    fetchRvData();
  }, []);

  const toggleApplianceStatus = async (name, currentStatus) => {
    const newStatus = currentStatus === 'On' ? 'Off' : 'On';
    await supabase
      .from('rvdata')
      .update({ [name]: newStatus })
      .match({ id: rvData.id });

    setRvData((prevData) => ({
      ...prevData,
      [name]: newStatus,
    }));
  };

  const checkMaintenance = (data) => {
    let engineMaintenance = { required: false, message: "" };
    let batteryMaintenance = { required: false, message: "" };
    let waterAlert = { required: false, message: "" };

    if (data.engine_temperature > 90 || data.oil_pressure < 20) {
      engineMaintenance.required = true;
      engineMaintenance.message = "Engine requires maintenance. High temperature or low oil pressure.";
    }

    if (data.battery_level < 20) {
      batteryMaintenance.required = true;
      batteryMaintenance.message = "Battery level is below 20%. Maintenance or charging required.";
    }

    if (data.freshwater_tank_level < 10) {
      waterAlert.required = true;
      waterAlert.message = "Freshwater level is low. Refill needed.";
    } else if (data.waste_tank_level > 80) {
      waterAlert.required = true;
      waterAlert.message = "Waste tank is full. Emptying required.";
    }

    setMaintenanceStatus({
      engine: engineMaintenance,
      battery: batteryMaintenance,
      water: waterAlert,
    });
  };

  const toggleEngineStatus = () => {
    const newEngineStatus = !engineStatus;
    let newEngineTemperature = rvData.engine_temperature;
    let newOilPressure = rvData.oil_pressure;

    if (newEngineStatus) {
      newEngineTemperature = Math.min(newEngineTemperature + 5, 100);
      newOilPressure = Math.max(newOilPressure - 5, 0);
    } else {
      newEngineTemperature = Math.max(newEngineTemperature - 5, 0);
      newOilPressure = Math.min(newOilPressure + 5, 100);
    }

    supabase
      .from('rvdata')
      .update({
        engine_temperature: newEngineTemperature,
        oil_pressure: newOilPressure,
      })
      .match({ id: rvData.id });

    setEngineStatus(newEngineStatus);
    setRvData((prevData) => ({
      ...prevData,
      engine_temperature: newEngineTemperature,
      oil_pressure: newOilPressure,
    }));

    checkMaintenance({
      ...rvData,
      engine_temperature: newEngineTemperature,
      oil_pressure: newOilPressure,
    });
  };

  return (
    <div className="p-6 w-full bg-gray-900">
      <h2 className="text-3xl font-semibold mb-4 text-white">RV Dashboard</h2>

      {/* Display Maintenance Status and Data */}
      <div className="flex space-x-4 mb-4">
        <div className="p-4 bg-gray-800 flex-1 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">Engine Maintenance</h3>
          {maintenanceStatus.engine.required ? (
            <p className="text-red-400">{maintenanceStatus.engine.message}</p>
          ) : (
            <p className="text-green-400">Engine status is normal.</p>
          )}
          <p className="text-white">Temperature: {rvData?.engine_temperature}°C</p>
          <p className="text-white">Oil Pressure: {rvData?.oil_pressure} PSI</p>
        </div>

        <div className="p-4 bg-gray-800 flex-1 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">Battery Maintenance</h3>
          {maintenanceStatus.battery.required ? (
            <p className="text-red-400">{maintenanceStatus.battery.message}</p>
          ) : (
            <p className="text-green-400">Battery level is sufficient.</p>
          )}
          <p className="text-white">Battery Level: {rvData?.battery_level}%</p>
        </div>

        <div className="p-4 bg-gray-800 flex-1 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">Water Levels</h3>
          {maintenanceStatus.water.required ? (
            <p className="text-red-400">{maintenanceStatus.water.message}</p>
          ) : (
            <p className="text-green-400">Water levels are normal.</p>
          )}
          <p className="text-white">Freshwater Level: {rvData?.freshwater_tank_level}%</p>
          <p className="text-white">Waste Tank Level: {rvData?.waste_tank_level}%</p>
        </div>
      </div>

      {/* 3D Model Component */}
      <div className="bg-transparent h-fit w-full  rounded-lg shadow-lg mb-8">
      <RVModel />
</div>

      {/* Additional Data Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">RPM</h3>
          <p className="text-white">{rvData?.rpm} RPM</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">Speed</h3>
          <p className="text-white">{rvData?.speed} km/h</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold text-white mb-4">Power Consumption</h3>
          <p className="text-white">{rvData?.power_consumption} W</p>
        </div>
      </div>

      {/* Appliances Table */}
      <h3 className="text-2xl font-bold text-white mt-5">Appliances</h3>
      <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-white text-lg">Appliance</TableCell>
              <TableCell className="text-white text-lg" align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="text-white text-lg">ENGINE</TableCell>
              <TableCell align="right">
                <Switch
                  checked={engineStatus}
                  onChange={toggleEngineStatus}
                  color="primary"
                />
              </TableCell>
            </TableRow>
            {[ // List of appliances
              { name: 'refrigerator_status', label: 'REFRIGERATOR' },
              { name: 'stove_status', label: 'STOVE' },
              { name: 'hvac_status', label: 'HVAC' },
              { name: 'air_conditioning_status', label: 'A/C' },
              { name: 'interior_lights_status', label: 'INTERIOR LIGHTS' },
              { name: 'exterior_lights_status', label: 'EXTERIOR LIGHTS' },
              { name: 'fan_speed', label: 'FAN' }
            ].map((appliance) => (
              <TableRow key={appliance.name}>
                <TableCell className="text-white text-lg">{appliance.label}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={rvData?.[appliance.name] === 'On'}
                    onChange={() => toggleApplianceStatus(appliance.name, rvData?.[appliance.name])}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
