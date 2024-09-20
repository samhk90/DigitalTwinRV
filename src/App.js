import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import Sidebar from './components/Sidebar'; // Import the Sidebar component

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-grow h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
