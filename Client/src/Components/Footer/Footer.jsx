import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 px-4 w-full mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#ffd700] mb-4">OmSai Gold Loan</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for secure and quick gold loans with competitive rates and transparent processes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-[#ffd700] mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-300 hover:text-[#ffd700] transition-colors duration-300">About Us</a>
              <a href="/service" className="block text-gray-300 hover:text-[#ffd700] transition-colors duration-300">Services</a>
              <a href="/contact" className="block text-gray-300 hover:text-[#ffd700] transition-colors duration-300">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-[#ffd700] mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📞 +91 99008 28269</p>
              <p>📧 info@omsaigoldloan.com</p>
              <p>🏢 Bangalore, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex justify-center items-center gap-6 text-2xl mb-4 md:mb-0">
              <a href="https://www.instagram.com/your_instagram_handle"
                 target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://wa.me/919900828269"
                 target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-green-500 transition-all duration-300 hover:scale-110">
                <FaWhatsapp />
              </a>
              <a href="https://www.facebook.com/your_facebook_profile"
                 target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110">
                <FaFacebook />
              </a>
              <a href="https://maps.app.goo.gl/phab53iu8ZvBxNWXA"
                 target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                <FaLocationDot />
              </a>
            </div>

            {/* Copyright Section */}
            <p className="text-xs md:text-sm text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} OmSai Gold Loan Services. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
