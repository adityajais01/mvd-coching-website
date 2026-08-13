import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const StudentNavbar = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-zinc-950 text-lg shadow-lg">
            MV
          </div>
          <div>
            <span className="font-black text-white text-base tracking-wide block leading-none">Maa Vaishno</span>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mt-0.5">Student Portal</span>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            to="/store" 
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold hover:bg-cyan-500/20 transition"
          >
            🛍️ Store Vault
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition cursor-pointer"
          >
            Logout 🚪
          </button>
        </div>

      </div>
    </nav>
  );
};

export default StudentNavbar;