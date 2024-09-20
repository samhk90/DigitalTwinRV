// src/components/ui/Progress.js
import { BarChart, XAxis, YAxis, Bar } from 'recharts';

const Progress = ({ value }) => {
    return (
      <div className="relative pt-1">
        <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${value}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    );
  };
  
  export default Progress;
  