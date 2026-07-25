import Button from './Button';
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // Menu open/close toggle karne ke liye state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-cyan-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">

        {/* BRAND LOGO & TITLE */}
        <Link to="/" className="flex gap-3 items-center">
          {/* Temporary Stylized Box Jab Tak Logo File Na Aaye */}
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-md">
            M
          </div>

          <div className="flex flex-col">
            <span className="md:text-2xl text-xl font-bold bg-linear-to-r from-zinc-100 via-cyan-400 to-indigo-400 bg-clip-text text-transparent block">
              MVD Coaching
            </span>
            <span className="text-[10px] tracking-wider text-zinc-400 font-medium uppercase">
              Class 6th - 12th | UP & CBSE
            </span>
          </div>
        </Link>

        {/* ALWAYS VISIBLE QUICK LINKS */}
        <nav className="hidden sm:flex items-center gap-4">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `font-semibold py-1.5 px-4 rounded-xl border transition ${isActive
                ? "bg-cyan-500 text-zinc-950 border-cyan-900"
                : "text-cyan-400 border-zinc-800 bg-zinc-900 hover:bg-zinc-700"
              }`
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/store"
            className={({ isActive }) =>
              `font-semibold py-1.5 px-4 rounded-xl border transition ${isActive
                ? "bg-cyan-500 text-zinc-950 border-cyan-900"
                : "text-cyan-400 border-zinc-800 bg-zinc-900 hover:bg-zinc-700"
              }`
            }
          >
            Store
          </NavLink>

          <Link
            to="/login"
            className="text-sm font-semibold text-zinc-300 hover:text-white px-3 py-1.5"
          >
            Login / Sign up
          </Link>
        </nav>

        {/* MENU BUTTON (Toggle State) */}
        <div>
          {/* NAYA CLEAN CODE */}
          <Button
            variant="secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close ✕" : "Menu ☰"}
          </Button>
        </div>
      </div>

      {/* DROPDOWN MENU (Jab Menu button par click hoga) */}
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
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                About Coaching
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                Contact & Address
              </Link>
            </div>

            {/* Study Materials */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Downloads & Store</span>
              <Link to="/store" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 py-1">
                Study Store (All PDFs)
              </Link>
              <Link to="/store?filter=free" onClick={() => setIsMenuOpen(false)} className=" hover:text-cyan-400 py-1">
                Free Model Papers
              </Link>
              <Link to="/store?filter=upboard" onClick={() => setIsMenuOpen(false)} className=" hover:text-cyan-400 py-1">
                UP Board Hindi Medium Notes
              </Link>
              <Link to="/store?filter=cbse" onClick={() => setIsMenuOpen(false)} className=" hover:text-cyan-400 py-1">
                CBSE Board English Medium Notes
              </Link>
            </div>

            {/* Portals */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Portals</span>
              <Link to="/student/dashboard" onClick={() => setIsMenuOpen(false)} className="text-cyan-400 font-semibold hover:underline">
                Student Dashboard
              </Link>
              <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="text-xs text-zinc-400 hover:text-white mt-2">
                🔒 Staff / Admin Login
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;