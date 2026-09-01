import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import CertificateModal from './CertificateModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const { currentUser, userData, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-cyan-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">

          {/* BRAND LOGO & TITLE */}
          <Link to="/" className="flex gap-3 items-center">
            <img className="w-12 h-12 rounded-full shadow-md object-cover" src="/images/logo01.jpeg" alt="MVD Logo" />

            <div className="flex flex-col">
              <span className="md:text-2xl text-xl font-bold bg-gradient-to-r from-zinc-100 via-cyan-400 to-indigo-400 bg-clip-text text-transparent block">
                माँ वैष्णो कोचिंग सेंटर
              </span>
              <span className="text-[13px] tracking-wider text-zinc-400 font-medium uppercase">
                & MVD Computer Institute
              </span>
              
            </div>
          </Link>

          {/* ALWAYS VISIBLE QUICK LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `font-semibold text-sm py-2 px-4 rounded-xl border transition ${isActive
                  ? "bg-cyan-500 text-zinc-950 border-cyan-400 font-bold"
                  : "text-cyan-400 border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                }`
              }
            >
              Courses
            </NavLink>

            <NavLink
              to="/store"
              className={({ isActive }) =>
                `font-semibold text-sm py-2 px-4 rounded-xl border transition ${isActive
                  ? "bg-cyan-500 text-zinc-950 border-cyan-400 font-bold"
                  : "text-cyan-400 border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                }`
              }
            >
              Store & Notes
            </NavLink>

            {/* DYNAMIC AUTH BUTTONS */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                  className={`${isAdmin ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'} border text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 hover:opacity-80`}
                >
                  <span>{isAdmin ? '🛡️' : '👤'}</span>
                  {isAdmin ? 'Admin Panel' : (userData?.fullName ? userData.fullName.split(' ')[0] : 'Dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-bold text-zinc-300 hover:text-white px-3 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/10 active:scale-95"
                >
                  Register 🚀
                </Link>
              </div>
            )}
          </nav>

          {/* MENU BUTTON (MOBILE / DROPDOWN) */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "Close ✕" : "Menu ☰"}
            </Button>
          </div>

        </div>

        {/* DROPDOWN MENU */}
        {isMenuOpen && (
          <div className="bg-zinc-900/95 border-b border-zinc-800 px-6 py-6 animate-fadeIn">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pages</span>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Home Page
                </Link>
                <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Courses & Batches
                </Link>
                <Link to="/faculty" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Faculty Directory
                </Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  About Coaching
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Contact & Address
                </Link>
                
                {/* 📜 CERTIFICATE VERIFY BUTTON INSIDE HAMBURGER */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCertModalOpen(true);
                  }}
                  className="text-left text-amber-400 font-bold hover:underline py-1 flex items-center gap-1.5 cursor-pointer mt-1"
                >
                  📜 Certificates
                </button>
              </div>

              {/* Study Materials */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Downloads & Store</span>
                <Link to="/store" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Study Store (All PDFs)
                </Link>
                <Link to="/store?filter=free" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  Free Model Papers
                </Link>
                <Link to="/store?filter=upboard" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  UP Board Hindi Medium Notes
                </Link>
                <Link to="/store?filter=cbse" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                  CBSE Board English Medium Notes
                </Link>
              </div>

              {/* Portals & Dynamic Auth Area */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Student & Admin Portal</span>
                
                {currentUser ? (
                  <>
                    <p className="text-xs text-zinc-300">
                      Logged in as: <strong className="text-cyan-400">{userData?.fullName || currentUser.email}</strong>
                    </p>
                    <Link 
                      to={isAdmin ? "/admin-dashboard" : "/dashboard"} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-cyan-400 font-semibold text-sm hover:underline mt-1"
                    >
                      {isAdmin ? '🛡️ Go to Admin Dashboard' : '🎓 Go to Student Dashboard'}
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="text-left text-xs text-red-400 font-bold hover:underline mt-2 cursor-pointer"
                    >
                      🚪 Logout Account
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-1">
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-cyan-400 font-semibold hover:underline text-xs"
                    >
                      🔑 Student Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-amber-400 font-semibold hover:underline text-xs"
                    >
                      📝 New Student Registration
                    </Link>
                  </div>
                )}

                <div className="pt-2 mt-2 border-t border-zinc-800">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[11px] text-zinc-500 hover:text-zinc-300">
                    🔒 Admin Portal Access
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* 📜 CERTIFICATE MODAL */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </>
  );
};

export default Navbar;