import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateModal from './CertificateModal';

const Footer = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#090A0F] border-t border-zinc-800/80 text-zinc-400 text-sm mt-20 pt-16 pb-10 relative overflow-hidden">
        
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/70">
            
            {/* 1. Brand Profile & Overview */}
            <div className="lg:col-span-4 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src="/images/logo01.jpeg" 
                  alt="MVD Logo" 
                  className="w-10 h-10 rounded-full object-cover shadow-lg border border-cyan-500/30 group-hover:border-cyan-400 transition"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-black text-white tracking-wide group-hover:text-cyan-300 transition">
                    Maa Vaishno Coaching
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    MVD Computer & Academic Hub
                  </span>
                </div>
              </Link>

              <p className="text-xs text-zinc-400 leading-relaxed pr-2">
                Class 9th to 12th UP & CBSE Board premier learning institute. Dedicated mentors, concept building, regular assessments, aur top academic results.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Admissions Open (2026-27)
                </span>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-cyan-500 pl-2">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/courses" className="hover:text-cyan-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                    <span className="text-zinc-600">›</span> Target Batches
                  </Link>
                </li>
                <li>
                  <Link to="/store" className="hover:text-cyan-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                    <span className="text-zinc-600">›</span> Study Material & Store
                  </Link>
                </li>
                <li>
                  <Link to="/faculty" className="hover:text-cyan-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                    <span className="text-zinc-600">›</span> Faculty Directory
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setIsCertModalOpen(true)} 
                    className="hover:text-amber-400 transition flex items-center gap-1.5 text-left text-zinc-400 cursor-pointer hover:translate-x-0.5 transform duration-200"
                  >
                    <span className="text-zinc-600">›</span> Verify Certificate 📜
                  </button>
                </li>
                <li>
                  <Link to="/about" className="hover:text-cyan-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-200">
                    <span className="text-zinc-600">›</span> About Institute
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. Programs & Classes */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-indigo-500 pl-2">
                Curriculum
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-indigo-400 font-bold">•</span> Class 9th Foundation
                </li>
                <li className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-indigo-400 font-bold">•</span> Class 10th Board Booster
                </li>
                <li className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-indigo-400 font-bold">•</span> Class 11th Concept Track
                </li>
                <li className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-indigo-400 font-bold">•</span> Class 12th Science Target
                </li>
                <li className="flex items-center gap-1.5 text-zinc-300">
                  <span className="text-indigo-400 font-bold">•</span> DCA / ADCA Computer
                </li>
              </ul>
            </div>

            {/* 4. Contact Details & Location */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Center Helpdesk
              </h4>
              
              <div className="space-y-2.5 text-xs">
                {/* Location */}
                <a 
                  href="https://maps.google.com/?q=Hanuman+Mandir+Mundera+Bazar+Chauri-Chaura+Gorakhpur+273201" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition group"
                >
                  <span className="p-1 rounded bg-zinc-800 text-sm group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition shrink-0">
                    📍
                  </span>
                  <span className="text-zinc-300 leading-snug group-hover:text-white transition">
                    Hanuman Mandir, Mundera Bazar, Chauri-Chaura, Gorakhpur (273201)
                  </span>
                </a>

                {/* Phone */}
                <a 
                  href="tel:+919235763122" 
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition group"
                >
                  <span className="p-1 rounded bg-zinc-800 text-sm group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition shrink-0">
                    📞
                  </span>
                  <span className="text-zinc-300 font-mono group-hover:text-white transition">
                    +91 92357 63122
                  </span>
                </a>

                {/* Email */}
                <a 
                  href="mailto:maavaishnocoaching7@gmail.com" 
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition group"
                >
                  <span className="p-1 rounded bg-zinc-800 text-sm group-hover:bg-amber-500/20 group-hover:text-amber-400 transition shrink-0">
                    ✉️
                  </span>
                  <span className="text-zinc-300 truncate group-hover:text-white transition">
                    maavaishnocoaching7@gmail.com
                  </span>
                </a>

                {/* Timings */}
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <span className="p-1 rounded bg-zinc-800/80 text-sm shrink-0">⏰</span>
                  <span className="text-[11px] text-zinc-400 leading-tight">
                    Mon - Sat: <strong className="text-zinc-200">6:00 AM - 10:00 AM</strong> & <strong className="text-zinc-200">2:00 PM - 5:00 PM</strong>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© 2026 Maa Vaishno Coaching Institute. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="hover:text-zinc-300 transition">Support</Link>
              <Link to="/contact" className="hover:text-zinc-300 transition">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-zinc-300 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Certificate Trigger Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </>
  );
};

export default Footer;