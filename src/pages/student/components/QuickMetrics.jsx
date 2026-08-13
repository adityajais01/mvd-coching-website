import React from 'react';

const QuickMetrics = ({ freeCount, purchasedCount, noticesCount }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/90 shadow-lg">
        <span className="text-[10px] text-zinc-500 font-extrabold block uppercase tracking-wider">FREE MATERIALS</span>
        <span className="text-xl font-black text-cyan-400 mt-0.5 block">{freeCount} PDFs</span>
      </div>
      
      <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/90 shadow-lg">
        <span className="text-[10px] text-zinc-500 font-extrabold block uppercase tracking-wider">MY PURCHASES</span>
        <span className="text-xl font-black text-amber-400 mt-0.5 block">{purchasedCount} Unlocked</span>
      </div>

      <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/90 shadow-lg">
        <span className="text-[10px] text-zinc-500 font-extrabold block uppercase tracking-wider">NOTICES</span>
        <span className="text-xl font-black text-emerald-400 mt-0.5 block">{noticesCount} Updates</span>
      </div>

      <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/90 shadow-lg">
        <span className="text-[10px] text-zinc-500 font-extrabold block uppercase tracking-wider">BATCH STATUS</span>
        <span className="text-xs font-black text-white mt-1 block truncate">Regular Offline Batch</span>
      </div>
    </div>
  );
};

export default QuickMetrics;