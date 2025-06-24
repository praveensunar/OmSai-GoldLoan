import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdDashboard, MdInfo, MdMiscellaneousServices } from "react-icons/md";
// Main Logo Component - Exact Match to Your "Om Sai Gold Loan" Logo Design

// Alternative Logo Design 1 - Exact Match to Your Logo (Transparent Background)
const OmSaiLogo = ({ className, title = "Om Sai Gold Loan" }) => (
  <svg className={className} viewBox="0 0 140 140" fill="none" role="img" aria-labelledby="omsai-logo-title">
    <title id="omsai-logo-title">{title}</title>

    {/* Main golden circle - matches your logo exactly */}
    <circle
      cx="70"
      cy="70"
      r="60"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.9"
    />

    {/* Decorative arc at top - partial circle */}
    <path
      d="M 25 50 A 45 45 0 0 1 115 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />

    {/* Main text "Om Sai" - elegant serif font */}
    <text
      x="70"
      y="65"
      textAnchor="middle"
      fontSize="20"
      fontWeight="600"
      fill="currentColor"
      fontFamily="Georgia, serif"
      opacity="0.95"
    >
      Om Sai
    </text>

    {/* Subtitle "GOLD LOAN" - spaced letters like your logo */}
    <text
      x="70"
      y="85"
      textAnchor="middle"
      fontSize="9"
      fontWeight="400"
      fill="currentColor"
      letterSpacing="3px"
      fontFamily="Arial, sans-serif"
      opacity="0.8"
    >
      GOLD LOAN
    </text>

    {/* Side decorative elements */}
    <circle cx="25" cy="70" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="115" cy="70" r="2" fill="currentColor" opacity="0.6"/>

    {/* Elegant side lines */}
    <line x1="15" y1="70" x2="20" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <line x1="120" y1="70" x2="125" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
  </svg>
);


import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SessionStatus from "../common/SessionStatus";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Show all navigation links on all pages
  const hideInfoLinks = false;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-6 lg:px-10 py-3 sm:py-4 transition-all duration-300 z-50 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50'
        : 'bg-gradient-to-r from-[#9C8E6B]/90 to-[#8B7D5A]/95 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="cursor-pointer group flex items-center gap-3">
          <div className={`p-2 rounded-4xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 text-black'
              : 'bg-white/20 text-black'
          }`}>
            <OmSaiLogo
              className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse drop-shadow-lg"
              title="Om Sai Gold Loan - Trusted Financial Services"
            />
          </div>
          <div className="flex flex-col">
            <h2 className={`font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              scrolled ? 'text-gray-800' : 'text-white'
            }`}>
              <span className="font-serif">OmSai</span>
            </h2>
            <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
              scrolled ? 'text-[#9C8E6B]' : 'text-[#ffd700]'
            }`}>
              Gold Loan Services
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Session Status for authenticated users */}
          {isAuthenticated() && (
            <div className="mr-4">
              <SessionStatus />
            </div>
          )}
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative group ${
              location.pathname === "/"
                ? scrolled
                  ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                  : "bg-white/20 text-[#ffd700] shadow-lg"
                : scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
            }`}
          >
            <MdDashboard className="text-lg" />
            <span>Home</span>
          </Link>

          {!hideInfoLinks && (
            <>
              <Link
                to="/about"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative group ${
                  location.pathname === "/about"
                    ? scrolled
                      ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                      : "bg-white/20 text-[#ffd700] shadow-lg"
                    : scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                }`}
              >
                <MdInfo className="text-lg" />
                <span>About Us</span>
              </Link>

              <Link
                to="/service"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative group ${
                  location.pathname === "/service"
                    ? scrolled
                      ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                      : "bg-white/20 text-[#ffd700] shadow-lg"
                    : scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                }`}
              >
                <MdMiscellaneousServices className="text-lg" />
                <span>Services</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-all duration-300 focus:outline-none ${
            scrolled
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose className="text-2xl" /> : <IoMdMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
        menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className={`mx-4 mt-2 rounded-2xl shadow-2xl border backdrop-blur-lg ${
          scrolled
            ? 'bg-white/95 border-gray-200/50'
            : 'bg-gradient-to-b from-[#9C8E6B]/95 to-[#8B7D5A]/95 border-white/20'
        }`}>
          <div className="p-6 space-y-3">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                location.pathname === "/"
                  ? scrolled
                    ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                    : "bg-white/20 text-[#ffd700] shadow-lg"
                  : scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <MdDashboard className="text-xl" />
              <span>Home</span>
            </Link>

            {!hideInfoLinks && (
              <>
                <Link
                  to="/about"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === "/about"
                      ? scrolled
                        ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                        : "bg-white/20 text-[#ffd700] shadow-lg"
                      : scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <MdInfo className="text-xl" />
                  <span>About Us</span>
                </Link>

                <Link
                  to="/service"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === "/service"
                      ? scrolled
                        ? "bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white shadow-lg"
                        : "bg-white/20 text-[#ffd700] shadow-lg"
                      : scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <MdMiscellaneousServices className="text-xl" />
                  <span>Services</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
