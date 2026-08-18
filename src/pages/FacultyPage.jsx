import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingContact from '../components/common/FloatingContact';
import { facultyMembers } from '../data/facultyData';

const FacultyPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredFaculties = activeTab === 'all'
    ? facultyMembers
    : facultyMembers.filter(fac => fac.department === activeTab);

  const departments = [
    { id: 'all', label: 'All Departments', count: facultyMembers.length },
    { id: 'upboard', label: '📖 UP Board Hindi Medium', count: facultyMembers.filter(f => f.department === 'upboard').length },
    { id: 'cbse', label: '🎓 CBSE English Medium', count: facultyMembers.filter(f => f.department === 'cbse').length },
    { id: 'computer', label: '💻 Computer & IT Wing', count: facultyMembers.filter(f => f.department === 'computer').length },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 rounded-full">
              Teaching Faculty Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Meet Our Expert Teachers & Mentors 👨‍🏫
            </h1>
            <p className="text-zinc-400 text-sm mt-3">
              Get to know our experienced educators across UP Board, CBSE Board, and Computer training departments.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                  activeTab === dept.id
                    ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {dept.label} ({dept.count})
              </button>
            ))}
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculties.map((fac) => (
              <div
                key={fac.id}
                className="bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/40 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Photo Container */}
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

                    {/* Fallback avatar */}
                    <div className={`flex-col items-center justify-center w-full h-full ${fac.photo ? 'hidden' : 'flex'}`}>
                      <span className="text-4xl mb-1">👨‍🏫</span>
                      <span className="text-[11px] text-zinc-400 font-medium">Faculty Member</span>
                    </div>

                    <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-md backdrop-blur-md">
                      {fac.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-0.5">{fac.name}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mb-2">{fac.subject}</p>
                  <p className="text-[11px] text-zinc-400 mb-3">{fac.education} • <strong className="text-zinc-300">{fac.experience}</strong></p>

                  <p className="text-xs text-zinc-400 italic bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/60">
                    "{fac.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default FacultyPage;