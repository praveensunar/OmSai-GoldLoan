import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gray-600 text-white p-4 md:p-8 w-full">
      {/* Contact Details */}
      <div className="text-center mb-6 px-4">
        <h3 className="text-xl md:text-2xl font-bold">Contact Us</h3>
        <p className="text-base md:text-lg font-medium">Email: omsai7773@gmail.com</p>
        <p className="text-base md:text-lg font-medium">Phone: 9902737773</p>
        <p className="text-base md:text-lg font-medium max-w-lg mx-auto">
          Address: NEAR S.S.PATIL Function Hall Complex, Manna-E-Khelli Main Road, KAMTHANA TQ. DIST-BIDAR 585226
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-5 w-full text-center">
        <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-3xl mb-5">
          <a href="https://www.instagram.com/your_instagram_handle" 
             target="_blank" rel="noopener noreferrer"
             className="hover:text-blue-400/50 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://wa.me/919902737773" 
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
        <p className="text-sm md:text-base font-medium">
          © {new Date().getFullYear()} Gold Loan Services. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
