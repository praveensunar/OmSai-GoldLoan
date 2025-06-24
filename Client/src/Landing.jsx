import Login from './Components/Login/Login';

function Landing() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden -mt-16 sm:-mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0">
        {/* Animated overlay for visual interest */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#9C8E6B]/20 to-[#ffd700]/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen bg-black/40 px-4 py-8 pt-24 sm:pt-28">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-[#cae2e2] text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to OmSai Gold Loan
          </h1>
          <p className="text-[#f9eed2] text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Your trusted partner for secure and quick gold loans with competitive rates
          </p>
        </div>

        <div className="w-full max-w-md animate-slide-up">
          <Login/>
        </div>
      </div>

    </div>
  );
}

export default Landing;
