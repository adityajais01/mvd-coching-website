import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

const BatchesSection = ({ enrolledBatches = [], studentClass }) => {
  
  if (!enrolledBatches || enrolledBatches.length === 0) {
    return (
      <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <span className="text-4xl block mb-2">🎓</span>
        <h3 className="text-base font-bold text-white">No Purchased Batches Found</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          You haven't purchased any <strong className="text-cyan-400">Online</strong> or <strong className="text-emerald-400">Offline</strong> batch for {studentClass || 'your class'} yet.
        </p>
        
        <Link to="/courses" className="inline-block mt-4">
          <Button variant="primary" className="text-xs py-2.5 px-6 cursor-pointer">
            Explore & Buy Batches 🚀
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-white">🎓 My Purchased Batches</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Click on any batch to access video lectures, DPPs, and chapter notes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledBatches.map((batch) => {
          const isOnline = batch.mode?.toLowerCase().includes('online');

          return (
            <div 
              key={batch.id || batch.title}
              className={`bg-zinc-900 border ${
                isOnline ? 'border-cyan-500/40 hover:border-cyan-400' : 'border-emerald-500/40 hover:border-emerald-400'
              } p-6 rounded-3xl flex flex-col justify-between shadow-xl transition relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${
                    isOnline 
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {isOnline ? '🌐 ONLINE BATCH' : '🏢 OFFLINE BATCH'}
                  </span>

                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                    ✓ UNLOCKED
                  </span>
                </div>

                <h3 className="text-base font-black text-white mb-1">{batch.title}</h3>
                <p className="text-xs font-bold text-zinc-400 mb-4">{batch.subject || 'All Main Subjects'}</p>

                <div className="space-y-2 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80 mb-4 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Timings:</span>
                    <span className="font-semibold">{batch.timings || 'Scheduled Slot'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Faculty:</span>
                    <span className="font-semibold">{batch.instructor || 'Senior Faculty'}</span>
                  </div>
                </div>
              </div>

              {/* Enter Batch Portal Button */}
              <Link to={`/batch/${batch.id}`} className="w-full mt-2">
                <Button variant="primary" className="w-full text-xs py-2.5 cursor-pointer">
                  Open Batch Lectures & DPPs 🚀
                </Button>
              </Link>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatchesSection;