import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Redirection fix with .trim() and .toLowerCase()
  const redirectBasedOnRole = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const rawRole = userDocSnap.data().role || '';
        const cleanRole = rawRole.trim().toLowerCase();

        if (cleanRole === 'admin') {
          navigate('/admin-dashboard');
          return;
        }
      }
      
      // Fallback to Student Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Role fetch error:', err);
      navigate('/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await login(email, password);
      await redirectBasedOnRole(userCredential.user);
    } catch (err) {
      setError(
        err.message.includes('user-not-found') ||
        err.message.includes('wrong-password') ||
        err.message.includes('invalid-credential')
          ? 'Invalid Email or Password.'
          : 'Failed to log in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const userCredential = await loginWithGoogle();
      await redirectBasedOnRole(userCredential.user);
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    setResetLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset link has been sent to your email! Please check your inbox.');
    } catch (err) {
      if (err.message.includes('user-not-found')) {
        setResetError('No account registered with this email address.');
      } else {
        setResetError('Failed to send reset email. Please verify your email ID.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950">
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Glow Effects */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              Student & Admin Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">Welcome Back 👋</h2>
            <p className="text-xs text-zinc-400 mt-1">Log in to access your course materials & notes.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-zinc-300">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setResetError('');
                    setResetMessage('');
                    setIsForgotModalOpen(true);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-full py-3 mt-2 text-sm"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In 🚀'}
            </Button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
            <span className="relative bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">OR</span>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>🌐</span> Continue with Google
          </button>

          <p className="text-center text-xs text-zinc-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-400 font-bold hover:underline">
              Register Here
            </Link>
          </p>

        </div>
      </div>

      {/* 🔑 FORGOT PASSWORD MODAL */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
              Account Recovery
            </span>
            <h3 className="text-xl font-black text-white mt-2 mb-1">Reset Password 🔑</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Enter your registered email ID to receive a password reset link.
            </p>

            {resetMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                {resetMessage}
              </div>
            )}

            {resetError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                {resetError}
              </div>
            )}

            <form onSubmit={handlePasswordReset} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Registered Email ID"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                {resetLoading ? 'Sending link...' : 'Send Reset Link 📩'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;