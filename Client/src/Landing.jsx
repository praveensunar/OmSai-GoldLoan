import React from 'react';

function Landing() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video 
        src="/background.mp4" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted 
        playsInline
      ></video>

      {/* Content Overlay (Optional) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">
        <h1 className="text-[#cae2e2] text-3xl md:text-6xl font-bold my-3">Welcome to Our Website</h1>

        <h2 className='text-[#f9eed2] text-xl md:text-2xl font-bold'>Gold Loan</h2>
      </div>
    </div>
  );
}

export default Landing;
