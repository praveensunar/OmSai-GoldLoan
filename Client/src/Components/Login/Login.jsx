import React, { useState } from 'react';
import { FaHouseUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FaSpinner } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('https://omsai-goldloan.onrender.com/', { email, password })
      .then(result => {
        setLoading(false);

        if (result.data.message === "success") {
          toast.success("Login successful!");
          setTimeout(() => navigate("/home"), 1000);
        } else if (result.data.message === "Incorrect Password") {
           toast.error("Incorrect Password");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      })
      .catch(error => {
        setLoading(false);
        toast.error("Something went wrong. Please try again later.");
        console.log("Login error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-blue-300/25 rounded-lg shadow-lg p-6 shadow-gray-500">
        
        {/* Icon */}
        <div className="flex justify-center">
          <h2 className="text-[40px] font-bold text-gray-700"><FaHouseUser /></h2>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-semibold mt-2">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">

          {/* Email Input */}
          <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
            <FaEnvelope className="text-gray-600" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
            <FaLock className="text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex justify-center items-center gap-5 w-full h-12 rounded-2xl text-xl font-medium text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600/60 hover:bg-blue-400 hover:scale-105'
            }`}
          >
            {loading ? (
  <FaSpinner className="animate-spin text-2xl" />
) : (
  <>
    <IoLogInOutline /> Login
  </>
)}

          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Login;
