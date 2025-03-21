import React, { useState } from 'react';
import { FaHouseUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogInOutline } from "react-icons/io5";



function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/', { email, password })
        .then(result => {
            console.log(result.data);
            if (result.data.message === "success") {
                alert("Success login");
                navigate("/home");
            } else if (result.data.message === "Incorrect Password") {
                alert("Incorrect Password");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => console.log("Login error:", error));
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
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="flex justify-center items-center gap-5 bg-blue-600/60 w-full h-12 rounded-2xl text-xl font-medium text-white hover:bg-blue-400 hover:scale-105 transition"
                    ><IoLogInOutline />
                        Login
                    </button>
                </form>

                {/* Signup Redirect */}
                {/* <p className="text-center text-gray-600 mt-4">Don't have an account?</p>
                <Link 
                    to="/register" 
                    className="block bg-blue-600/60 w-full h-12 rounded-2xl text-xl font-medium text-white text-center leading-[3rem] hover:bg-blue-400 hover:scale-105 transition"
                >
                    Sign Up
                </Link> */}
            </div>
        </div>
    );
}

export default Login;
