import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CertificateModal from './CertificateModal';

const Footer = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#090A0F] border-t border-zinc-800/80 text-zinc-400 text-sm mt-20 pt-16 pb-10 relative overflow-hidden">

        {/* Subtle Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-linear-to-b from-cyan-500/5 to-transparent pointer-events-none blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/70">

            {/* 1. Brand Profile & Overview */}
            <div className="lg:col-span-4 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <img
                  src="/images/logo01.jpeg"
                  alt="Maa Vaishno Coaching Center Logo"
                  className="w-10 h-10 rounded-full object-cover shadow-lg border border-cyan-500/30 group-hover:border-cyan-400 transition"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-black text-white tracking-wide group-hover:text-cyan-300 transition">
                    Maa Vaishno Coaching Center
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    & Computer Institute
                  </span>
                </div>
              </Link>

              <p className="text-xs text-zinc-400 leading-relaxed pr-2">
                A premier learning institute for Classes 9th to 12th under UP & CBSE Boards. Dedicated mentors, concept-based learning, regular assessments, and strong academic results.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Admissions Open (2026-27)
                </span>
              </div>

              {/* 🌐 Social Media Icons */}
              <div className="flex items-center gap-3 pt-2">
                {/* YouTube */}
                <a
                  href="https://youtube.com/@your_channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition duration-300 group shadow-md"
                  title="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/your_instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent transition duration-300 group shadow-md"
                  title="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/your_facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition duration-300 group shadow-md"
                  title="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.054-2.797 2.656v1.319h4.37l-.712 3.667h-3.658v7.98h-4.997z"/>
                  </svg>
                </a>
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
                {/* Updated Detailed Location */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Maa+Vaishno+Coaching+Center+NKR+Maharaja+Agrasen+Bal+Vidya+Mandir+Pratibha+Beauty+Parlour+Mundera+Bazar+Chauri+Chaura+Gorakhpur+273201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 transition group"
                >
                  <span className="p-1.5 rounded-lg bg-zinc-800 text-sm group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition shrink-0">
                    📍
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-zinc-200 font-bold text-xs leading-snug group-hover:text-white transition">
                      Maa Vaishno Coaching Center (N.K.R.)
                    </p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed group-hover:text-zinc-300 transition">
                      महाराजा अग्रसेन बाल विद्या मंदिर, प्रतिभा ब्यूटी पार्लर के सामने, मुंडेरा बाज़ार, Chauri Chaura, UP (273201)
                    </p>
                  </div>
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
            <p>© 2026 Maa Vaishno Coaching Center & Computer Institute. All Rights Reserved.</p>
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