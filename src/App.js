import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';

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
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
