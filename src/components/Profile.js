import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tdqecxiscqcyxhgpvpfi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWVjeGlzY3FjeXhoZ3B2cGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMTQyNTksImV4cCI6MjA0NzU5MDI1OX0.jfwVI2qu6oBRbCwvN6OnaIp3JvubPAi14YRf0RQFugI');

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [rvData, setRvData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Fetch user data
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .single(); // Assuming you want the current user's profile
      
      if (userError) {
        console.error('Error fetching user data:', userError);
      } else {
        setUserData(user);
      }

      // Fetch RV details for the user
      const { data: rvDetails, error: rvError } = await supabase
        .from('rvdetails')
        .select('*')
        .eq('userid', user?.uid); // Match with the current user's ID

      if (rvError) {
        console.error('Error fetching RV details:', rvError);
      } else {
        setRvData(rvDetails);

        // Example logic to set alerts based on RV data
        const alertsList = rvDetails.filter(rv => rv.engine_temperature > 100 || rv.oil_pressure < 25);
        setAlerts(alertsList);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Profile</h2>
      {userData && (
        <div className="mb-6">
          <h3 className="text-2xl">{userData.full_name}</h3>
          <p className="text-lg">{userData.username}</p>
          <p className="text-sm">{new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      )}

      <h3 className="text-2xl mb-4">RV Details</h3>
      <div className="grid grid-cols-1 gap-4">
        {rvData.map((rv) => (
          <div key={rv.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">{rv.rvmodel}</h4>
            <p>Year: {rv.rvyear}</p>
            <p>VIN: {rv.vin}</p>
            <p>License Plate: {rv.licenseplate}</p>
            <p>Color: {rv.color}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl mb-4 mt-6">Alerts</h3>
      <div className="grid grid-cols-1 gap-4">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="bg-red-600 p-4 rounded-lg shadow-md">
              <p className="text-lg">Alert for {alert.rvmodel}: Engine temperature is high!</p>
            </div>
          ))
        ) : (
          <p>No alerts at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
