import React from 'react';
import { toppersList, studentReviews } from '../../data/testimonialsData_&_Reviews';

const ToppersCorner = () => {
  if (!toppersList || toppersList.length === 0) return null;

  // Agar items kam hain (jaise 1, 2 ya 4), toh track ko screen se bada banane ke liye auto-multiply
  const minItemsRequired = 10;
  const repeatFactor = Math.max(2, Math.ceil(minItemsRequired / toppersList.length));
  
  // Set 1 and Set 2 for flawless 50% seamless loop
  const baseArray = Array(repeatFactor).fill(toppersList).flat();
  const marqueeList = [...baseArray, ...baseArray];

  // Data ke hisab se constant speed calculate (har card ke liye ~3.5 seconds)
  const duration = Math.max(18, baseArray.length * 3.5);

  return (
    <section className="mt-14 sm:mt-20 overflow-hidden">
      {/* Self-contained CSS Animation (No external config needed) */}
      <style>{`
        @keyframes bulletineLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .toppers-ticker-track {
          display: flex;
          width: max-content;
          animation: bulletineLoop ${duration}s linear infinite;
          will-change: transform;
        }
        .toppers-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 🏆 PART 1: TOPPERS SHOWCASE HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
          🏆 Wall of Fame
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
          Meet Our Board & Certified Achievers
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Continuous roll of outstanding performers across academic boards and professional computer certifications.
        </p>
      </div>

      {/* CONTINUOUS BULLETIN MARQUEE TICKER */}
      <div className="relative w-full mb-16 overflow-hidden select-none">
        {/* Left & Right Smooth Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Moving Track */}
        <div className="toppers-ticker-track py-4">
          {marqueeList.map((topper, index) => {
            const isComputer = topper.type === 'computer' || !topper.board?.toLowerCase().includes('board');

            return (
              <div
                key={`${topper.id}-${index}`}
                className="w-[260px] sm:w-[280px] shrink-0 mx-3 bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 p-5 rounded-2xl transition duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center shadow-lg"
              >
                {/* Top Score Badge */}
                <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md z-10">
                  {topper.badge}
                </div>

                {/* Circular Student Photo */}
                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-amber-400/80 p-0.5 mb-4 shadow-xl flex items-center justify-center text-zinc-500 text-2xl overflow-hidden">
                  {topper.image ? (
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <span className={`w-full h-full rounded-full items-center justify-center ${topper.image ? 'hidden' : 'flex'}`}>
                    {isComputer ? '💻' : '🎓'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-0.5 truncate w-full">{topper.name}</h3>
                <p className="text-xs text-zinc-400 font-medium mb-3 truncate w-full">
                  {topper.classTarget} • {topper.board}
                </p>

                {/* Score Footer Box */}
                <div className="w-full bg-zinc-950/80 border border-zinc-800 py-2 rounded-xl mt-auto">
                  <span className="block text-2xl font-black text-amber-400 leading-none">
                    {topper.score}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {isComputer ? `Certified ${topper.year}` : `Board Exam ${topper.year}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 💬 PART 2: STUDENT & PARENT REVIEWS */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              💬 Testimonials
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              Experiences Shared by Our Students and Parents
            </h3>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-bold bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-zinc-300 ml-1">4.9/5 Rating</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-zinc-950/70 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-4">
                "{rev.review}"
              </p>
              
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.studentName}</h4>
                  <span className="text-[11px] text-cyan-400 font-medium">{rev.role}</span>
                </div>
                <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToppersCorner;