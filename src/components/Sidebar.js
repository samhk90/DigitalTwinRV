import { Link } from 'react-router-dom';
import { Home, Monitor, Calendar, FileText, BarChart2, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar w-60  bg-gray-900 text-white flex flex-col">
      <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold">RV Dashboard</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/" className="flex items-center px-4 py-3">
              <Home className="mr-3 text-lg" />
              Dashboard
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/real-time-monitoring" className="flex items-center px-4 py-3">
              <Monitor className="mr-3 text-lg" />
              Real-Time Monitoring
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/predictive-maintenance" className="flex items-center px-4 py-3">
              <Calendar className="mr-3 text-lg" />
              Predictive Maintenance
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/data-analysis" className="flex items-center px-4 py-3">
              <FileText className="mr-3 text-lg" />
              Data Analysis
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/remote-control" className="flex items-center px-4 py-3">
              <BarChart2 className="mr-3 text-lg" />
              Remote Control
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/historical-data" className="flex items-center px-4 py-3">
              <Monitor className="mr-3 text-lg" />
              Historical Data
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/profile" className="flex items-center px-4 py-3">
              <User className="mr-3 text-lg" />
              Profile
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/logout" className="flex items-center px-4 py-3">
              <LogOut className="mr-3 text-lg" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
