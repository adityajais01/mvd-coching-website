import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, userData, isAdmin, loading, resendVerificationEmail, logout } = useAuth();
  const [resendStatus, setResendStatus] = useState('');
  const [sending, setSending] = useState(false);

  // 1. Loading State Guard
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. Not Logged In -> Redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Email Verification Guard (Only for password signups, Google users are auto-verified)
  if (!currentUser.emailVerified) {
    const handleResend = async () => {
      try {
        setSending(true);
        await resendVerificationEmail();
        setResendStatus('Verification link sent! Check your inbox/spam folder.');
      } catch (err) {
        setResendStatus('Failed to resend. Please wait a minute and try again.');
      } finally {
        setSending(false);
      }
    };

    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-zinc-950">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-cyan-500/20">
            ✉️
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Verify Your Email Address</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We have sent a verification link to <br />
              <span className="text-cyan-400 font-medium">{currentUser.email}</span>
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            Please click the link in your email to activate your account, then click the button below.
          </p>

          {resendStatus && (
            <p className="text-xs text-cyan-400 bg-cyan-950/40 py-2 px-3 rounded-lg border border-cyan-800/40">
              {resendStatus}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-sm transition active:scale-95"
            >
              I Have Verified (Refresh)
            </button>
            
            <button
              onClick={handleResend}
              disabled={sending}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl text-xs transition disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Resend Verification Email'}
            </button>

            <button
              onClick={() => logout()}
              className="text-xs text-zinc-500 hover:text-zinc-400 underline transition pt-1"
            >
              Log out / Use different account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Admin Role Check
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;