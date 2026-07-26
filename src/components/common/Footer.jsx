import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-sm mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/60">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="text-xl font-black text-white tracking-wider flex items-center gap-1 mb-3">
              MAA VAISHNO <span className="text-cyan-400 font-extrabold text-xs px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded">COACHING</span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Class 9th to 12th UP & CBSE Board Special Coaching Institute. Quality Education, Expert Mentorship & Top Results.
            </p>
          </div>

          {/* Quick Links (Updated with React Router Link) */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition">Target Batches</Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-cyan-400 transition">Free Study Material & Store</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">About MVD Coaching</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Target Classes */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Target Classes</h4>
            <ul className="space-y-2 text-xs">
              <li>Class 9th Foundation</li>
              <li>Class 10th Board Booster</li>
              <li>Class 11th Concept Building</li>
              <li>Class 12th Science Target (PCM/PCB)</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Contact Support</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">📍 Main Branch, Coaching Hub City</li>
              <li className="flex items-center gap-2">📞 +91 98765 43210</li>
              <li className="flex items-center gap-2">✉️ support@mvdcoaching.com</li>
              <li className="flex items-center gap-2">⏰ Mon - Sat: 8:00 AM - 7:00 PM</li>
            </ul>
          </div>

        </div>

        {/* Copyright & Socials */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 MVD Coaching Institute. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-cyan-400 transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;