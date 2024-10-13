import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const BlackSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#000', // Black color when checked
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light black on hover
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000', // Black background when checked
  },
}));
const RVSimulation = () => {
  
  const [simulationResults, setSimulationResults] = useState(false);
  const [activeTab, setActiveTab] = useState('Environment');
  const [duration, setDuration] = useState(24);
  const [occupants, setOccupants] = useState(2);
  const [weather, setWeather] = useState('');
  const [terrain, setTerrain] = useState('');
  const [enginehp,setEngine]=useState(3000)
  const [fuelType, setFuelType] = useState('');
  const [wheelDrive,setWheeldrive]=useState('');
  const [length,setLength]=useState(25);
  const [height,setHeight]=useState(10);
  const [weight,setWeight]=useState(7500);
  const [width,setWidth]=useState(8);
  const [towingCapcity,setTowingCapacity]=useState(5000)
  const [solarPanel,setSolarPanel]=useState('');
  const [water,setWater]=useState('');
  const [hvacEfficiency, setHvacEfficiency] = useState(50);
  const [greywaterCapacity, setGreywaterCapacity] = useState(40);
  const [propaneTankSize, setPropaneTankSize] = useState(20);
  const [generatorPower, setGeneratorPower] = useState(3600);
  const [freshwaterCapacity, setFreshwaterCapacity] = useState(50);
  const [blackwaterCapacity, setBlackwaterCapacity] = useState(40);
  const [inverterCapacity, setInverterCapacity] = useState(2000);
  const [batteryCapacity, setBatteryCapacity] = useState(50);
  const [suspensionType, setSuspensionType] = useState('');
  const [insulationType, setInsulationType] = useState('');
  const [numberOfAxles, setNumberOfAxles] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [awningLength, setAwningLength] = useState('');
  const [roofMaterial, setRoofMaterial] = useState('');
  const [floorplanType, setFloorplanType] = useState('');
  const [refrigeratorType, setRefrigeratorType] = useState('');
  const [refrigeratorWattage, setRefrigeratorWattage] = useState(60);
  const [microwaveWattage, setMicrowaveWattage] = useState(1000);
  const [tvWattage, setTvWattage] = useState(100);
  const [acType, setAcType] = useState('');
  const [acBTU, setAcBTU] = useState(13500);
  const [acWattage, setAcWattage] = useState(1500);
  const [loading, setLoading] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const runSimulation = () => {
    setLoading(true);
    setSimulationResults(null); // Clear previous results

    // Simulate a delay for loading
    setTimeout(() => {
      // Generate the simulation results based on user input
      const results = {
        energyConsumption: `${(duration *weight/ 100).toFixed(2)} kWh`,
        batteryLife: `${(batteryCapacity / (acWattage + refrigeratorWattage)).toFixed(2)} hours`,
        fuelEfficiency: `${(enginehp / weight * 100).toFixed(2)} mpg`,
        hvacPerformance: `${hvacEfficiency}%`,
        waterUsage: `${(water * occupants).toFixed(2)} gallons`,
        maintenanceScore: `${Math.floor(Math.random() * 100)}/100`,
        estimatedRange: `${(fuelType === 'Gasoline' ? (towingCapcity * 10).toFixed(2) : 546.00)} miles`,
        wasteManagementEfficiency: `${Math.random().toFixed(2)}%`,
        testsPassed: Math.floor(Math.random() * 15),
        totalTests: 15,
        testResults: [
          { name: 'Highway Fuel Efficiency', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Mountain Climb Performance', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Water System Pressure', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Electrical System Load', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'HVAC Performance', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Waste Management', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Solar Panel Efficiency', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Stability on Rough Terrain', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Brake System Response', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Interior Noise Levels', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Towing Capacity Test', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Slide-Out Mechanism', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Freshwater Tank Capacity', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Greywater Tank Capacity', result: Math.random() > 0.5 ? 'Passed' : 'Failed' },
          { name: 'Blackwater Tank Capacity', result: Math.random() > 0.5 ? 'Passed' : 'Failed' }
        ],
      };

      setSimulationResults(results);
      console.log(results.energyConsumption);
      setLoading(false);
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
    <h1 className="text-2xl font-bold mb-4">RV Digital Twin Comprehensive Simulation</h1>
    <p className="text-gray-500 mb-6">Configure detailed parameters to simulate your RV's performance in various conditions</p>
    
    <div className="flex justify-around mb-6 border-b">
      {['Environment', 'Vehicle', 'Systems', 'Configuration','Appliances'].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
    
    {activeTab === 'Environment' && (
                
                
      <div>
<div className="grid grid-cols-2 gap-4">
          <div>
          <label className="block text-gray-700">Simulation Duration (hours)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 w-full"
                />
          </div>
          <div>
          <label className="block text-gray-700">Number of Occupants</label>
                <input
                  type="number"
                  value={occupants}
                  onChange={(e) => setOccupants(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 w-full"
                />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Weather Condition</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 w-full"
            >
              <option value="">Select weather</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="snowy">Snowy</option>
              <option value="windy">Windy</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Terrain Type</label>
            <select
              value={terrain}
              onChange={(e) => setTerrain(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 w-full"
            >
              <option value="">Select terrain</option>
              <option value="flat">Flat</option>
              <option value="mountain">Mountain</option>
              <option value="desert">Desert</option>
              <option value="forest">Forest</option>
            </select>
          </div>
        </div>
      </div>
    )}
    {activeTab === 'Vehicle' && (
                
                
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <label className="block text-black font-bold mr-4">Solar Panel</label>
          <label className="switch">
            <BlackSwitch
                  checked={solarPanel}
                  onChange={(e) => setSolarPanel(e.target.checked)}
                  
                />
          </label>
        </div>
        <div className="flex items-center">
          <label className="block text-black font-bold mr-4">Water Conversation Mode</label>
          <label className="switch">
            <BlackSwitch
                  checked={water}
                  onChange={(e) => setWater(e.target.checked)}
                  
                />
          </label>
        </div>
        </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                    <label className="block text-black font-semibold">Engine Power (HP)</label>
                          <input
                            type="text"
                            value={enginehp}
                            onChange={(e) => setEngine(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                    <div>
                    <label className="block text-black font-semibold">Fuel Type</label>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 w-full"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Propane">Propane</option>
                      </select>
                    </div>
                  </div>
          
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-black font-semibold">Wheel Drive</label>
                      <select
                        value={wheelDrive}
                        onChange={(e) => setWheeldrive(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 w-full"
                      >
                        <option value="">Select Wheel Drive</option>
                        <option value="2wd">2WD</option>
                        <option value="4wd">4WD</option>
                        <option value="awd">AWD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-black font-semibold">Length (ft)</label>
                      <input
                            type="text"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                    <label className="block text-black font-semibold">Width (ft)</label>
                      <input
                            type="text"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                    <div>
                    <label className="block text-black font-semibold">Height (ft)</label>
                      <input
                            type="text"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                  </div>
          
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                    <label className="block text-black font-semibold">Weight (lbs)</label>
                      <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                    <div>
                    <label className="block text-black font-semibold">Towing Capacity (lbs)</label>
                      <input
                            type="text"
                            value={towingCapcity}
                            onChange={(e) => setTowingCapacity(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 w-full"
                          />
                    </div>
                  </div>
                  
                </div>
              )}


{activeTab === 'Systems' && (
  <div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
      <label className="block text-black font-semibold">HVAC Efficiency (%)</label>
<input
  type="range"
  min="0"
  max="100"
  value={hvacEfficiency}
  onChange={(e) => setHvacEfficiency(e.target.value)}
  className="w-full stylish-slider"

/>



      </div>
      <div>
        <label className="block text-black font-semibold">Greywater Capacity (gal)</label>
        <input
          type="number"
          value={greywaterCapacity}
          onChange={(e) => setGreywaterCapacity(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Propane Tank Size (lbs)</label>
        <input
          type="number"
          value={propaneTankSize}
          onChange={(e) => setPropaneTankSize(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">Generator Power (W)</label>
        <input
          type="number"
          value={generatorPower}
          onChange={(e) => setGeneratorPower(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Freshwater Capacity (gal)</label>
        <input
          type="number"
          value={freshwaterCapacity}
          onChange={(e) => setFreshwaterCapacity(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">Blackwater Capacity (gal)</label>
        <input
          type="number"
          value={blackwaterCapacity}
          onChange={(e) => setBlackwaterCapacity(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Inverter Capacity (W)</label>
        <input
          type="number"
          value={inverterCapacity}
          onChange={(e) => setInverterCapacity(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">Battery Capacity (%)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={batteryCapacity}
          onChange={(e) => setBatteryCapacity(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  </div>
)}
{activeTab === 'Configuration' && (
  <div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Suspension Type</label>
        <select
          value={suspensionType}
          onChange={(e) => setSuspensionType(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select Suspension Type</option>
          <option value="Standard">Standard</option>
          <option value="Comfort">Comfort</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="block text-black font-semibold">Insulation Type</label>
        <select
          value={insulationType}
          onChange={(e) => setInsulationType(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select Insulation Type</option>
          <option value="Standard">Standard</option>
          <option value="Enhanced">Enhanced</option>
          <option value="Premium">Premium</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Number of Axles</label>
        <input
          type="number"
          value={numberOfAxles}
          onChange={(e) => setNumberOfAxles(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">Tire Size</label>
        <input
          type="text"
          value={tireSize}
          onChange={(e) => setTireSize(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Awning Length</label>
        <input
          type="number"
          value={awningLength}
          onChange={(e) => setAwningLength(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">Roof Material</label>
        <select
          value={roofMaterial}
          onChange={(e) => setRoofMaterial(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select Roof Material</option>
          <option value="Fiber Glass">Fiber Glass</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Rubber">Rubber</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Floorplan Type</label>
        <select
          value={floorplanType}
          onChange={(e) => setFloorplanType(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select Floorplan Type</option>
          <option value="Bunk House">Bunk House</option>
          <option value="Rear Living">Rear Living</option>
          <option value="Front Kitchen">Front Kitchen</option>
          <option value="Toy Hauler">Toy Hauler</option>
        </select>
      </div>
    </div>
  </div>
)}
  {activeTab === 'Appliances' && (
  <div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Refrigerator Type</label>
        <select
          value={refrigeratorType}
          onChange={(e) => setRefrigeratorType(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select Refrigerator Type</option>
          <option value="Compact">Compact</option>
          <option value="Standard">Standard</option>
          <option value="French Door">French Door</option>
        </select>
      </div>
      <div>
        <label className="block text-black font-semibold">Refrigerator Wattage</label>
        <input
          type="number"
          value={refrigeratorWattage}
          onChange={(e) => setRefrigeratorWattage(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Microwave Wattage</label>
        <input
          type="number"
          value={microwaveWattage}
          onChange={(e) => setMicrowaveWattage(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
      <div>
        <label className="block text-black font-semibold">TV Wattage</label>
        <input
          type="number"
          value={tvWattage}
          onChange={(e) => setTvWattage(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Air Conditioner Type</label>
        <select
          value={acType}
          onChange={(e) => setAcType(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        >
          <option value="">Select AC Type</option>
          <option value="Window">Window</option>
          <option value="Portable">Portable</option>
          <option value="Split">Split</option>
        </select>
      </div>
      <div>
        <label className="block text-black font-semibold">Air Conditioner BTU</label>
        <input
          type="number"
          value={acBTU}
          onChange={(e) => setAcBTU(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-black font-semibold">Air Conditioner Wattage</label>
        <input
          type="number"
          value={acWattage}
          onChange={(e) => setAcWattage(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 w-full"
        />
      </div>
    </div>
  </div>
)}

    {/* run simulation  btn */}
    <div className="mt-6 mb-5 flex justify-center items-center">
            {/* Button to run the simulation */}
            <button
        onClick={runSimulation}
        className="bg-black text-white rounded-lg px-4 py-2 w-1/7 hover:bg-gray-800"
      >
        Run Simulation
      </button>


    </div>
    {/* simulation result card */}
    {simulationResults ? (
    <div style={{ 
        padding: '20px', 
        fontFamily: 'Arial, sans-serif', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', 
        borderRadius: '10px',
        backgroundColor: 'white',
        marginTop: '20px'
      }}>
        <h2 className='text-black text-2xl font-semibold m-5 text-center'>Simulation Results</h2>
        <p>Detailed performance metrics and test results based on your input parameters</p>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <p><strong>Energy Consumption:</strong> {simulationResults.energyConsumption}</p>
            <p><strong>Battery Life:</strong> {simulationResults.batteryLife}</p>
            <p><strong>Fuel Efficiency:</strong> {simulationResults.fuelEfficiency}</p>
            <p><strong>HVAC Performance:</strong> {simulationResults.hvacPerformance}</p>
          </div>
          <div>
            <p><strong>Water Usage:</strong> {simulationResults.waterUsage}</p>
            <p><strong>Maintenance Score:</strong> {simulationResults.maintenanceScore}</p>
            <p><strong>Estimated Range:</strong> {simulationResults.estimatedRange}</p>
            <p><strong>Waste Management Efficiency:</strong> {simulationResults.wasteManagementEfficiency}</p>
          </div>
        </div>
        <h3 className='text-black font-semibold mt-5'>Test Results</h3>
        <p>Passed {simulationResults.testsPassed} out of {simulationResults.totalTests} tests</p>
        <div className="flex justify-center">
        <table className='w-1/2  text-start border border-gray-300' cellPadding="10">
  <thead>
    <tr className='border-b border-gray-300'>
      <th className='border border-gray-300 px-1 py-2'>Test Name</th>
      <th className='border border-gray-300 px-4 py-2'>Result</th>
    </tr>
  </thead>
  <tbody>
    {simulationResults.testResults.map((test, index) => (
      <tr key={index} className='border-b border-gray-300'>
        <td className='border border-gray-300 px-2 py-2 text-center'>{test.name}</td>
        <td className='border border-gray-300 px-2 py-2 text-center'>{test.result}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
    ):(
      <div>No simulation results available.</div>
      
    )}
          {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Loading...</p>
          <div className="loader"></div>
        </div>
      )}
  </div>
    </div>
  );
};

export default RVSimulation;
