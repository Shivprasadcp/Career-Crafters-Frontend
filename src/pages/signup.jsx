import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
        username: formData.username,
        password: formData.password,
      });

      console.log('Signup successful:', response.data);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" width={120} height={120} />
        </div>

        <h2 className="text-xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          By registering, you agree to our Terms and Privacy Policy.
        </p>

        <div className="text-center mt-6">
          <h2 className="font-semibold mb-2">Already have an account?</h2>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
