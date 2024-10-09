import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import PredictiveMaintenance from './components/PredictiveMaintenance';
import HistoricalDataReport from './components/HistoricalDataReport';
import Profile from './components/Profile';
import DataAnalysis from './components/DataAnalysis';
import SimulationComponent from './components/SimulationComponent'
const App = () => {
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  // Update localStorage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />} {/* Render Sidebar only if authenticated */}

        {/* Main content */}
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/real-time-monitoring" element={isAuthenticated ? <RealTimeMonitoring /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/predictive-maintenance" element={isAuthenticated ? <PredictiveMaintenance /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/historicaldatareport" element={isAuthenticated ? <HistoricalDataReport /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/simulationcomponent " element={isAuthenticated ? <SimulationComponent /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/data-analysis" element={isAuthenticated ? <DataAnalysis /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
