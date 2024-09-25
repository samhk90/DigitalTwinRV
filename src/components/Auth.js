import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from lucide-react

// Initialize Supabase client
const supabase = createClient('https://wxundvfcpvhhggpifltc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dW5kdmZjcHZoaGdncGlmbHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDU3MDgsImV4cCI6MjA0MjQ4MTcwOH0.uFy5Vkgbh0vdPAwux4VlFdDs8VNqEiY5fUgWns_UOCM');

const Auth = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.username,
      password: loginData.password,
    });
    if (error) {
      alert('Login error: ' + error.message);
    } else {
      window.location.reload();
      setIsAuthenticated(true);
      
      navigate('/'); // Redirect to the main dashboard
      window.location.reload();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="min-h-screen flex justify-end items-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/img/login.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'auto',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="w-full max-w-lg mr-16 mt-16 p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg">
        <div className="relative z-10">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h2 className="text-3xl font-semibold mb-4 text-gray-200 text-center">Login</h2>
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <span style={{ top: '3.5rem' }}
                className="absolute right-3  transform -translate-y-1/2 cursor-pointer "
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
