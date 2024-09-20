// src/components/ElectricityUsageCard.js
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", usage: 400 },
  { name: "Feb", usage: 300 },
  { name: "Mar", usage: 500 },
  { name: "Apr", usage: 200 },
];

const ElectricityUsageCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-lg font-bold mb-2">Electricity Usage</h2>
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="usage" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    <p>Usage this month</p>
  </div>
);

export default ElectricityUsageCard;
