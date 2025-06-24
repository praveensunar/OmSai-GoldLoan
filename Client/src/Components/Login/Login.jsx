import { useState, useEffect } from 'react';
import { FaHouseUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    console.log('Login useEffect - checking authentication'); // Debug log
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || "/home";
      console.log('Already authenticated, redirecting to:', from); // Debug log
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password: '***' }); // Debug log
      const result = await login(email, password);
      console.log('Login result:', result); // Debug log

      if (result.success) {
        toast.success(result.message);
        const from = location.state?.from?.pathname || "/home";
        console.log('Navigating to:', from); // Debug log

        // Wait a bit for state to update, then navigate
        setTimeout(() => {
          console.log('Auth state after login:', {
            isAuth: isAuthenticated(),
            user: !!user,
            token: !!token
          });
          navigate(from, { replace: true });
        }, 100);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg glass-effect rounded-2xl shadow-2xl p-8 border border-white/20 backdrop-blur-lg animate-slide-up">
        <div className="flex justify-center mb-4">
          <div className="text-[50px] text-[#ffd700] animate-float">
            <FaHouseUser />
          </div>
        </div>

        <h1 className="text-center text-3xl md:text-4xl text-white font-bold mb-8 drop-shadow-lg">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Email */}
          <div className="relative group">
            <div className="flex items-center bg-white/10 w-full h-14 rounded-xl px-4 border border-white/20 hover:border-[#ffd700]/50 focus-within:border-[#ffd700] transition-all duration-300 hover:scale-[1.02]">
              <FaEnvelope className="text-[#ffd700] text-lg mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full h-full text-white placeholder-white/70 font-medium"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="flex items-center bg-white/10 w-full h-14 rounded-xl px-4 border border-white/20 hover:border-[#ffd700]/50 focus-within:border-[#ffd700] transition-all duration-300 hover:scale-[1.02]">
              <FaLock className="text-[#ffd700] text-lg mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full h-full text-white placeholder-white/70 font-medium pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/80 hover:text-[#ffd700] transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-hover-effect flex justify-center items-center gap-3 w-full h-14 rounded-xl text-lg font-semibold text-white transition-all duration-300 mt-4 ${
              loading
                ? 'bg-gray-500/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:from-[#ffed4e] hover:to-[#ffd700] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ffd700]/25 text-gray-800'
            }`}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              <>
                <IoLogInOutline className="text-xl" />
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-sm">
            Secure admin access to manage gold loan operations
          </p>

         
        </div>
      </div>


    </div>
  );
}

export default Login;
