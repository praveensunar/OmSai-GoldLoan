import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Hide "Admin" if the user is on these pages
  const hideAdminRoutes = ["/home", "/customerdetail", "/addcustomer"];
  const isHidden = hideAdminRoutes.includes(location.pathname) || 
                   location.pathname.startsWith("/updatecustomer/") || 
                   location.pathname.startsWith("/customer/");

  return (
    <nav className="bg-gray-600 w-full px-6 md:px-10 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="cursor-pointer">
          <h2 className="font-[500] text-xl text-amber-500/50">
            <span className="font-[800] text-3xl text-gray-700">OmSai</span> goldloan
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 text-xl font-[700] uppercase">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="#" className="hover:text-gray-300">About Us</Link>
          <Link to="#" className="hover:text-gray-300">Services</Link>
          {!isHidden && <Link to="/login" className="hover:text-gray-300">Admin</Link>}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-transparent shadow-lg py-4 rounded-md">
          <div className="flex flex-col gap-4 text-xl font-[600] text-center">
            <Link to="/" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="#" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="#" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Services</Link>
            {!isHidden && <Link to="/login" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Admin</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
