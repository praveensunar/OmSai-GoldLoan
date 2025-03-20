import axios from 'axios';
import React, { useState } from 'react';
import { FaHouseUser, FaRegUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoLogInOutline } from "react-icons/io5";


function Signup() { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password, phone })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-blue-300/25 rounded-lg shadow-lg p-6 shadow-gray-500">
                {/* Icon */}
                <div className="flex justify-center">
                    <h2 className="text-[40px] font-bold text-gray-700"><FaHouseUser /></h2>
                </div>

                {/* Title */}
                <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-semibold mt-2">Register</h1>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
                    
                    {/* Username Input */}
                    <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
                        <FaRegUser className="text-gray-600" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
                        <FaEnvelope className="text-gray-600" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
                        <FaLock className="text-gray-600" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex items-center bg-gray-700/10 w-full h-12 rounded-lg px-3 hover:bg-gray-700/50 hover:scale-105 transition">
                        <FaPhone className="text-gray-600" />
                        <input 
                            type="number" 
                            inputMode="numeric" 
                            placeholder="Phone no" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-transparent outline-none w-full h-full pl-3 text-center font-semibold 
                                       [&::-webkit-inner-spin-button]:appearance-none 
                                       [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>

                    {/* Signup Button */}
                    <button 
                        type="submit" 
                        className="bg-blue-600/60 w-full h-12 rounded-2xl text-xl font-medium text-white hover:bg-blue-400 hover:scale-105 transition"
                    >
                        Signup
                    </button>
                </form>

                {/* Login Redirect */}
                <p className="text-center text-gray-600 mt-4">Already have an account?</p>
                <Link 
                    to="/login" 
                    className=" flex justify-center items-center gap-5 bg-blue-600/60 w-full h-12 rounded-2xl text-xl font-medium text-white text-center leading-[3rem] hover:bg-blue-400 hover:scale-105 transition"
                ><IoLogInOutline />
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
