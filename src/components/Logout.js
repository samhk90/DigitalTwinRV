import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import {LogOut } from 'lucide-react';
// Initialize Supabase client
const supabase = createClient('https://wxundvfcpvhhggpifltc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dW5kdmZjcHZoaGdncGlmbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDU3MDgsImV4cCI6MjA0MjQ4MTcwOH0.uFy5Vkgbh0vdPAwux4VlFdDs8VNqEiY5fUgWns_UOCM');

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
    setIsAuthenticated(false);
    
    navigate('/') // Redirect to the Auth page
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-3 hover:bg-gray-700 transition duration-300"
    >
      <LogOut className="mr-3 text-lg" />
      Logout
    </button>  );
};

export default Logout;
