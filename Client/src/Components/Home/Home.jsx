import { Link } from 'react-router-dom';
import { TiUserAddOutline } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { GiReceiveMoney  } from "react-icons/gi";
import { FaCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { checkServerStatus } from '../../utils/serverCheck';
import SessionStatus from '../common/SessionStatus';
import { useState, useEffect } from 'react';

// Om Sai Logo Component - Same as navbar
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

function Home() {
  const { logout, user } = useAuth();
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server status on component mount
  useEffect(() => {
    const checkServer = async () => {
      const result = await checkServerStatus();
      setServerStatus(result.status);
    };
    checkServer();
  }, []);

  // Logout Function
  const handleLogout = () => {
    logout(false); // Don't auto-redirect, we'll handle it here
    toast.success("You have been logged out successfully!");
    setTimeout(() => {
      // Use window.location for complete page refresh
      window.location.href = "/";
    }, 1000);
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'slow': return 'text-yellow-500';
      case 'checking': return 'text-gray-500';
      default: return 'text-red-500';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online': return 'Server Online';
      case 'offline': return 'Server Offline';
      case 'slow': return 'Server Slow';
      case 'checking': return 'Checking...';
      default: return 'Server Error';
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 sm:p-6">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome, {user?.name || 'Admin'}!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Manage your gold loan operations efficiently with our comprehensive admin panel
          </p>

          {/* Status Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm">
            {/* Server Status */}
            <div className="flex items-center gap-2">
              <FaCircle className={`text-xs ${getStatusColor()}`} />
              <span className="text-gray-600">{getStatusText()}</span>
            </div>
    
            {/* Session Status */}
            {/* <div className="flex items-center gap-2">
              <span className="text-gray-600">Session:</span>
              <SessionStatus />
            </div> */}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
          {/* Left Section - Admin Controls */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
            <div className="text-8xl text-[#9C8E6B] mb-6 animate-float">
              <RiAdminFill />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
              <Link
                to="/addcustomer"
                className="card-hover btn-hover-effect flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#9C8E6B] to-[#8B7D5A] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#8B7D5A] hover:to-[#7A6C49] group"
              >
                <TiUserAddOutline className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">Add Customer</span>
                <span className="text-sm opacity-90">Register new customers</span>
              </Link>

              <Link
                to="/customerdetail"
                className="card-hover btn-hover-effect flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#B8860B] to-[#DAA520] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#DAA520] hover:to-[#FFD700] group"
              >
                <BiSolidUserDetail className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">View Customers</span>
                <span className="text-sm opacity-90">Manage customer data</span>
              </Link>

              <Link
                to="/loanamount"
                className="card-hover btn-hover-effect flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#CD853F] to-[#D2691E] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#D2691E] hover:to-[#F4A460] group"
              >
                <GiReceiveMoney className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">Loan Amounts</span>
                <span className="text-sm opacity-90">Track loan details</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="card-hover btn-hover-effect flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#8B4513] to-[#A0522D] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#A0522D] hover:to-[#CD853F] group"
              >
                <MdLogout className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">Logout</span>
                <span className="text-sm opacity-90">End admin session</span>
              </button>
            </div>
          </div>

          {/* Right Section - Logo/Branding */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative mt-16 lg:mt-20">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9C8E6B]/20 to-[#ffd700]/20 rounded-full blur-3xl"></div>
              <div className="relative flex justify-center items-center">
                <OmSaiLogo
                  className="w-full max-w-md h-auto text-black animate-float drop-shadow-2xl"
                  title="Om Sai Gold Loan - Trusted Financial Services"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Service Available</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Secure Transactions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover">
            <div className="text-3xl font-bold text-purple-600 mb-2">Fast</div>
            <div className="text-gray-600">Loan Processing</div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Home;
