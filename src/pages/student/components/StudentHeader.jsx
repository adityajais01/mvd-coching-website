import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

const StudentHeader = ({ userData }) => {
  const fullName = userData?.fullName || 'Student';
  const initial = fullName.charAt(0).toUpperCase();
  const board = userData?.board || 'UP Board';
  const studentClass = userData?.class || userData?.targetClass || 'Class 10th';
  const phone = userData?.phone || 'N/A';

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl mb-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        
        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/30 flex items-center justify-center text-3xl font-black text-cyan-400 shadow-inner">
            {initial}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified Student
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {board}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Welcome back, {fullName}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Class / Course: <strong className="text-amber-400">{studentClass}</strong> • Mobile: {phone}
            </p>
          </div>
        </div>

        {/* Quick CTA */}
        <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 border-zinc-800 pt-4 lg:pt-0">
          <Link to="/store" className="flex-1 lg:flex-none">
            <Button variant="primary" className="w-full text-xs py-2.5 px-5 cursor-pointer">
              Explore Digital Store 🛍️
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StudentHeader;