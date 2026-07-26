import React, { useState } from 'react';
import BatchCard from '../common/BatchCard';
import { onlineBatches, offlineBatches } from '../../data/BatchesData';

const FeaturedBatches = () => {
  // 'online' ya 'offline' toggle karne ke liye state
  const [activeTab, setActiveTab] = useState('online');

  const currentBatches = activeTab === 'online' ? onlineBatches : offlineBatches;

  return (
    <section className="mt-12 sm:mt-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Target Batches 2026-27
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Popular Board Exam Batches
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Choose between Online LIVE Batches (One-Time Fee) or Classroom Offline Batches (Per Month Fee).
          </p>
        </div>

        {/* ONLINE / OFFLINE TOGGLE BUTTONS */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'online'
                ? "bg-cyan-500 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            💻 Online Batches
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('offline')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'offline'
                ? "bg-amber-500 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            🏫 Offline Batches (Monthly)
          </button>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBatches && currentBatches.length > 0 ? (
          currentBatches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))
        ) : (
          <p className="text-zinc-400 text-sm">No batches available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedBatches;