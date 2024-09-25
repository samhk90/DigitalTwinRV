import { Link } from 'react-router-dom';
import { Home, Monitor, Calendar, FileText, User } from 'lucide-react';
import Logout from './Logout'; // Import the Logout component

const Sidebar = ({ setIsAuthenticated }) => {
  return (
    <aside className="sidebar w-70 h-fit bg-gray-900 text-white flex flex-col">
      <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold">RVision</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/" className="flex items-center px-4 py-3">
              <Home className="mr-3 text-lg" />
              Dashboard
            </Link>
          </li>
          {/* <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/real-time-monitoring" className="flex items-center px-4 py-3">
              <Monitor className="mr-3 text-lg" />
              Real-Time Monitoring
            </Link>
          </li> */}
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
          {/* <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/remote-control" className="flex items-center px-4 py-3">
              <BarChart2 className="mr-3 text-lg" />
              Remote Control
            </Link>
          </li> */}
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/historicaldatareport" className="flex items-center px-4 py-3">
              <Monitor className="mr-3 text-lg" />
              Historical Data
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Link to="/profile" className="flex items-center px-4 py-3">
              <User className="mr-3 text-lg" />
              Profile
            </Link>
          </li>
          <li className="hover:bg-gray-700 transition duration-300">
            <Logout setIsAuthenticated={setIsAuthenticated} /> {/* Include Logout component */}
          </li>
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
