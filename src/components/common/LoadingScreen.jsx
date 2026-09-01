import React from 'react';

const LoadingScreen = ({ isFadingOut }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Brand Glowing Ring Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer glowing pulse - Increased to w-32 h-32 */}
        <div className="absolute w-32 h-32 rounded-full bg-cyan-500/20 animate-ping"></div>

        {/* Spinning gradient ring - Increased to w-28 h-28 */}
        <div className="w-28 h-28 rounded-full border-4 border-zinc-800 border-t-cyan-400 animate-spin"></div>

        {/* Center Logo Box - Increased to w-20 h-20 */}
        <div className="absolute w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 shadow-2xl p-1">
          <img
            src="/images/logo01.jpeg"
            alt="Maa Vaishno Coaching Center"
            className="w-full h-full object-cover rounded-full select-none"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = '<span class="text-3xl">🎓</span>';
            }}
          />
        </div>
      </div>

      {/* Brand Title & Subtext - Increased typography */}
      <div className="text-center space-y-2.5 px-6 max-w-lg">

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-tight">
          Welcome to...
        </h1>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-tight">
          Maa Vaishno Coaching Center
        </h2>
        <p className="text-sm md:text-base text-cyan-400 font-semibold tracking-wider uppercase animate-pulse">
          & Computer Institute
        </p>
      </div>

      {/* Bottom Progress Line - Increased to w-48 h-1.5 */}
      <div className="w-48 h-1.5 bg-zinc-800 rounded-full mt-8 overflow-hidden">
        <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;