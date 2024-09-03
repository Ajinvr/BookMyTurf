import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Logo from "../../assets/logo.png";
import axiosInstance from '../../Utils/axiosInstance'; 
import Cookies from 'js-cookie';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const notify = (msg, status) => {
    status === 'success' ? toast.success(msg) : toast.error(msg);
  };

  const signup = async () => {
    try {
      const response = await axiosInstance.post('/api/signup', {
        email,
        password
      });
      Cookies.set('token', response.data.token);
      
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      userdata.isAuthenticated = true
      localStorage.setItem('userdata', JSON.stringify(userdata));
      
      notify(response.data.msg, response.data.ts);
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      const msg = error.response?.data?.msg || 'An unexpected error occurred';
      const ts = error.response?.data?.ts || 'error';
      notify(msg, ts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email address is invalid';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length === 0) {
      signup();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-secondary text-black font-bold">
      <div className="flex flex-col md:flex-row items-center md:w-3/4 lg:w-1/2 bg-primary p-6 rounded-lg shadow-lg w-10/12">
        
        <div className="md:mb-0 md:w-1/2 md:flex justify-center items-center hidden">
          <img src={Logo} alt="BMT Logo" className="w-full h-auto rounded-lg" />
        </div>

        <div className="md:mb-0 md:w-1/2 flex justify-center items-center w-40 md:hidden">
          <img src={Logo} alt="BMT Logo" className="w-full h-auto rounded-lg" />
        </div>
        
        <div className="md:w-1/2 bg-primary p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({}) }}
                className="mt-1 block w-full px-3 py-2 rounded-md placeholder-gray-400 sm:text-sm outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}) }}
                className="mt-1 block w-full px-3 py-2 rounded-md placeholder-gray-400 sm:text-sm outline-none"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}) }}
                className="mt-1 block w-full px-3 py-2 rounded-md placeholder-gray-400 sm:text-sm outline-none"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md">Sign Up</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
