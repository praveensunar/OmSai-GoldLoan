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
      <div className="absolute inset-0 flex justify-center items-center bg-black/40">
        <h1 className="text-cyan-300/50 text-3xl md:text-5xl font-bold">Welcome to Our Website</h1>
      </div>
    </div>
  );
}

export default Landing;
