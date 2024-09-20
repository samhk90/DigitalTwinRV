import Sidebar from './Sidebar';

const RealTimeMonitoring = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold">Real-Time Monitoring</h2>
        <p className="mt-4">Here you can view real-time data from various RV systems such as engine, electrical, water, and HVAC systems.</p>

        {/* Replace with actual real-time data */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-medium">Engine Status</h3>
            <p className="text-sm text-gray-500">Placeholder for engine data</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-medium">Electrical System</h3>
            <p className="text-sm text-gray-500">Placeholder for electrical system data</p>
          </div>
          {/* Add more components for water, HVAC, etc */}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
