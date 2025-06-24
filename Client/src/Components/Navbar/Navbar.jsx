import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdDashboard, MdInfo, MdMiscellaneousServices } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
// Alternative icon options for easy switching:
// import { GiDiamondRing, GiReceiveMoney, GiGoldBar, GiTreasure } from "react-icons/gi";
// import { FaGem, FaUniversity, FaCoins } from "react-icons/fa";
// import { MdAccountBalance, MdDiamond } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SessionStatus from "../../components/common/SessionStatus";

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
        : 'bg-gradient-to-r from-[#9C8E6B]/95 to-[#8B7D5A]/95 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="cursor-pointer group flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            scrolled
              ? 'bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white'
              : 'bg-white/20 text-[#ffd700]'
          }`}>
            <GiTwoCoins className="text-2xl sm:text-3xl animate-pulse drop-shadow-lg" />
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
