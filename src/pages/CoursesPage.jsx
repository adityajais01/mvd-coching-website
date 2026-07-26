import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BatchCard from '../components/common/BatchCard';
import { onlineBatches, offlineBatches } from '../data/BatchesData';
import FloatingContact from '../components/common/FloatingContact';

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const allBatches = [...onlineBatches, ...offlineBatches];
  
  const filteredBatches = allBatches.filter(batch => {
    if (activeTab === 'online') return batch.mode === 'Online';
    if (activeTab === 'offline') return batch.mode === 'Offline';
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              📚 Academic & IT Programs
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 leading-tight">
              Our Target Batches & Courses
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Class 9th–12th UP/CBSE Board exam special batches aur MVD Computer Center ke ISO Certified skill courses.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'all' ? "bg-cyan-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                All Batches ({allBatches.length})
              </button>
              <button
                onClick={() => setActiveTab('offline')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'offline' ? "bg-amber-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                🏫 Offline Center (Monthly)
              </button>
              <button
                onClick={() => setActiveTab('online')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'online' ? "bg-cyan-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                💻 Online LIVE Batches
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default CoursesPage;