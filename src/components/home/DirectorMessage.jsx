import React from 'react';

const DirectorMessage = () => {
  return (
    <div className="mt-14 sm:mt-20 space-y-8">
      
      {/* ========================================================= */}
      {/* 🚀 SECTION 1: DUAL BRANDING & INSTITUTE HIGHLIGHTS BANNER */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800/90 p-6 sm:p-10 shadow-2xl">
        {/* Subtle Glow Behind Branding */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          {/* Main Titles */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
                🏆 Premier Educational Hub
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                💻 Govt. & ISO Certified
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              Maa Vaishno <span className="text-cyan-400">Coaching Center</span>
            </h1>

            <h2 className="text-lg sm:text-2xl font-bold text-amber-400 mt-1 flex items-center justify-center lg:justify-start gap-2">
              <span>💻</span> MVD Computer Center
              <span className="text-[11px] font-bold text-zinc-300 bg-zinc-800/90 px-2.5 py-0.5 rounded-md border border-zinc-700">
                IT & Skill Division
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 italic font-medium mt-3 leading-relaxed">
              "Empowering Academic Excellence & Future-Ready Tech Skills — <span className="text-cyan-300 not-italic font-bold">All Under One Roof!</span>"
            </p>
          </div>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap lg:flex-col gap-3 justify-center w-full lg:w-auto">
            <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-2xl shadow-lg">
              <span className="text-xl">📚</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">Class 9th - 12th Board Target</h4>
                <p className="text-[10px] text-zinc-400">UP & CBSE Special Batches</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-2xl shadow-lg">
              <span className="text-xl">🖥️</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-amber-400">Computer & IT Courses</h4>
                <p className="text-[10px] text-zinc-400">DCA • ADCA • Tally • Coding</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 👨‍🏫 SECTION 2: DIRECTOR'S DESK & VISION SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900/90 border border-zinc-800/80 p-6 sm:p-10 shadow-2xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Director Photo & Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            
            {/* Outer Frame Glow Effect */}
            <div className="relative p-1.5 rounded-3xl bg-linear-to-b from-cyan-500/40 via-zinc-800 to-amber-500/30 shadow-2xl">
              
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-zinc-950 group">
                {/* Director Photo */}
                <img 
                  src="/images/director.jpg" 
                  alt="Director - Er. Manish Verma" 
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105 relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Fallback Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 text-xs p-4">
                  <span className="text-4xl mb-2">👨‍🏫</span>
                  <span className="font-bold text-zinc-200">Director Photo</span>
                  <span className="text-[10px] text-zinc-500 mt-1">Add 'director.jpg' in public/images</span>
                </div>

                {/* Badge Overlay */}
                <div className="absolute bottom-0 inset-x-0 z-20 bg-linear-to-t from-zinc-950 via-zinc-950/90 to-transparent p-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    Founder & Director
                  </span>
                </div>
              </div>

            </div>

            {/* Profile Info */}
            <h3 className="text-2xl font-black text-white mt-4 tracking-tight">Lakshman Gupta</h3>
            <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider mt-0.5">Senior Academic & Tech Mentor</p>

            <div className="mt-3 inline-flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full">
              <span className="text-[11px] font-bold text-zinc-300">🎓 B.Tech | 12+ Years Teaching Experience</span>
            </div>

          </div>

          {/* Right Column: Director Message Content */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full">
                💬 Director's Message
              </span>
              <span className="text-xs text-zinc-400 font-semibold hidden sm:inline">
                • Empowering Students Since 2012
              </span>
            </div>

            {/* Quote Box Style */}
            <blockquote className="relative border-l-4 border-cyan-500 pl-4 sm:pl-6 py-1 mb-5">
              <h3 className="text-base sm:text-xl font-bold text-white leading-snug italic">
                "Our goal is simple—help every student achieve academic excellence while building the practical skills needed for a successful future."
              </h3>
            </blockquote>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 space-y-2">
              <span>At Maa Vaishno Coaching Center and MVD Computer Center, we empower students through </span>
              <strong className="text-cyan-300 font-bold">quality education, personalized mentoring, strong conceptual understanding</strong> 
              <span> and </span>
              <strong className="text-amber-300 font-bold">Practical Computer & IT Training</strong> 
              <span> to achieve academic excellence and career success..</span>
            </p>

            <h1 className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full w-42 mb-2">Our Achievements :</h1>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-zinc-800/80">
            
              <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80 text-center sm:text-left">
                <span className="block text-xl font-black text-cyan-400">10,000+</span>
                <span className="text-[11px] text-zinc-400 font-medium">Students Mentored</span>
              </div>

              <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80 text-center sm:text-left">
                <span className="block text-xl font-black text-amber-400">98%</span>
                <span className="text-[11px] text-zinc-400 font-medium">Board Pass Rate</span>
              </div>

              <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80 text-center sm:text-left">
                <span className="block text-xl font-black text-emerald-400">100%</span>
                <span className="text-[11px] text-zinc-400 font-medium">Practical Computer Lab</span>
              </div>

              <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80 text-center sm:text-left">
                <span className="block text-xl font-black text-purple-400">ISO</span>
                <span className="text-[11px] text-zinc-400 font-medium">Certified Training</span>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default DirectorMessage;