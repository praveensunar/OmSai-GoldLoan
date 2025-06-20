import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="flex flex-col items-center bg-black text-white p-4 md:p-4 w-full  ">
     
      {/* Social Media Links */}
      <div className=" w-full text-center">
        <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-3xl mb-5">
          <a href="https://www.instagram.com/your_instagram_handle" 
             target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400/50 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://wa.me/919900828269" 
             target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400/50 transition duration-300">
            <FaWhatsapp />
          </a>
          <a href="https://www.facebook.com/your_facebook_profile" 
             target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400/50 transition duration-300">
            <FaFacebook />
          </a>
          <a href="https://maps.app.goo.gl/phab53iu8ZvBxNWXA" 
             target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400/50 transition duration-300">
            <FaLocationDot />
          </a>
        </ul>
        
        {/* Copyright Section */}
        <p className="text-[12px] md:text-[14px] font-medium">
          © {new Date().getFullYear()} Gold Loan Services. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
