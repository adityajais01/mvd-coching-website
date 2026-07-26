import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NoteCard from '../components/common/NoteCard';
import FloatingContact from '../components/common/FloatingContact';
import { notesData } from '../data/notesData';

const Store = ({ onOpenEnquiry }) => {
  const [filterType, setFilterType] = useState('all'); // 'all', 'free', 'paid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  // Filter Logic
  const filteredNotes = notesData.filter((item) => {
    // Type Filter (Free / Paid)
    if (filterType === 'free' && item.isPaid) return false;
    if (filterType === 'paid' && !item.isPaid) return false;

    // Class Filter
    if (selectedClass !== 'All' && !item.classTarget.includes(selectedClass)) return false;

    // Search Query
    if (
      searchQuery.trim() !== '' &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleAction = (note) => {
    if (note.isPaid) {
      // Paid notes ke liye direct WhatsApp purchase enquiry
      const msg = `Hello Maa Vaishno Coaching! I want to buy/unlock *${note.title}* (${note.price}). Please share payment details.`;
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      // Free notes ke liye direct download ya enquiry trigger
      if (onOpenEnquiry) {
        onOpenEnquiry();
      } else {
        alert(`Downloading ${note.title}...`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 flex flex-col justify-between">
      <div>
        <Navbar onOpenEnquiry={onOpenEnquiry} />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              📚 Digital Notes & Study Store
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 leading-tight">
              Study Vault & Premium Books
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Free NCERT PDFs, Chapterwise Handwritten Notes, Solved PYQs aur Topper's Special Premium Bundles.
            </p>
          </div>

          {/* Search Bar & Filters Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-6 rounded-3xl mb-10 space-y-4">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Box */}
              <div className="w-full md:w-96 relative">
                <input
                  type="text"
                  placeholder="Search subject, chapter or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
              </div>

              {/* Free vs Paid Toggle Tabs */}
              <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-xl w-full md:w-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    filterType === 'all' ? "bg-cyan-500 text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  All Material
                </button>
                <button
                  onClick={() => setFilterType('free')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    filterType === 'free' ? "bg-emerald-500 text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  🎁 Free PDFs
                </button>
                <button
                  onClick={() => setFilterType('paid')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    filterType === 'paid' ? "bg-amber-500 text-zinc-950 shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  ⭐ Premium Paid
                </button>
              </div>

            </div>

            {/* Class Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pt-2 border-t border-zinc-800/80">
              {['All', 'Class 9th', 'Class 10th', 'Class 11th', 'Class 12th', 'Computer Center'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedClass === cls
                      ? "bg-zinc-800 text-cyan-400 border border-cyan-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} onAction={handleAction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl">
              <span className="text-4xl">📂</span>
              <h3 className="text-lg font-bold text-white mt-3">No Notes Found</h3>
              <p className="text-xs text-zinc-400 mt-1">Try changing your search query or class filter.</p>
            </div>
          )}

        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Store;