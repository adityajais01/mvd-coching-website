import React from 'react';
import { Link } from 'react-router-dom';
import { facultyMembers } from '../../data/facultyData';

const StarFaculty = () => {
  // Home section par sirf Star Faculties
  const starFaculties = facultyMembers.filter(fac => fac.isStar);

  return (
    <section className="mt-14 sm:mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Meet Our Experts
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
          Our Star Faculties 👨‍🏫
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Experienced educators dedicated to making board exam preparation simple, effective, and result-oriented.
        </p>
      </div>

      {/* 🌟 Star Faculties Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {starFaculties.map((fac) => (
          <div 
            key={fac.id}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-cyan-500/40 transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Faculty Photo Container */}
              <div className="relative w-full h-48 bg-zinc-800 rounded-xl overflow-hidden mb-4 border border-zinc-700/50 flex flex-col items-center justify-center text-zinc-500">
                {fac.photo ? (
                  <img 
                    src={fac.photo} 
                    alt={fac.name} 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback agar image na ho ya load na ho */}
                <div 
                  className={`flex-col items-center justify-center w-full h-full ${fac.photo ? 'hidden' : 'flex'}`}
                >
                  <span className="text-4xl mb-1">👨‍🏫</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Faculty Member</span>
                </div>
                
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md backdrop-blur-md">
                  {fac.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{fac.name}</h3>
              <p className="text-xs text-cyan-400 font-semibold mb-2">{fac.subject}</p>
              <p className="text-[11px] text-zinc-400 mb-3">{fac.education} • <strong className="text-zinc-300">{fac.experience}</strong></p>
              
              <p className="text-xs text-zinc-400 italic bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60">
                "{fac.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 Dedicated Page Link Button */}
      <div className="text-center mt-10">
        <Link
          to="/faculty"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl font-bold text-xs sm:text-sm transition duration-300 shadow-lg shadow-cyan-500/5 active:scale-95 cursor-pointer"
        >
          <span>View All Faculty Members & Departments</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
};

export default StarFaculty;