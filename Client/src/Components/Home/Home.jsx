import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiUserAddOutline } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

function Home() {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear token (or any auth data)
    sessionStorage.removeItem("userSession"); // Clear session data (if any)
    alert("You have been logged out successfully!");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] p-5 bg-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-6 text-center">
        <div className="text-6xl text-zinc-700">
          <RiAdminFill />
        </div>

        <Link
          to="/addcustomer"
          className="flex items-center justify-center gap-2 bg-gray-500 w-64 md:w-52 h-12 rounded-2xl text-lg font-medium text-white hover:bg-gray-400 hover:scale-105 transition"
        >
          <TiUserAddOutline /> Add Customers
        </Link>

        <Link
          to="/customerdetail"
          className="flex items-center justify-center gap-2 bg-gray-500 w-64 md:w-52 h-12 rounded-2xl text-lg font-medium text-white hover:bg-gray-400 hover:scale-105 transition"
        >
          <BiSolidUserDetail /> View Customer
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-500 w-64 md:w-52 h-12 rounded-2xl text-lg font-medium text-white hover:bg-red-400 hover:scale-105 transition"
        >
          <MdLogout /> Logout
        </button>
      </div>

      {/* Right Section (Image) */}
      
    </div>
  );
}

export default Home;
