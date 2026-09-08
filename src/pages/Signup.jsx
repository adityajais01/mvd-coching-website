import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { sendEmailVerification } from 'firebase/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    board: 'UP Board',
    targetClass: 'Class 10th',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [verificationNotice, setVerificationNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVerificationNotice('');

    // 1. Sanitization
    const sanitizedFullName = formData.fullName.trim();
    const sanitizedEmail = formData.email.trim().toLowerCase();
    const sanitizedPhone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // 2. Validation Checks
    if (!sanitizedFullName || sanitizedFullName.length < 3) {
      return setError('Full name must be at least 3 characters long.');
    }
    if (sanitizedFullName.length > 50) {
      return setError('Full name cannot exceed 50 characters.');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail)) {
      return setError('Please enter a valid email address (e.g. name@gmail.com).');
    }
    if (sanitizedEmail.length > 80) {
      return setError('Email address cannot exceed 80 characters.');
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(sanitizedPhone)) {
      return setError('Please enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9).');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (password.length > 32) {
      return setError('Password cannot exceed 32 characters.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match!');
    }

    setLoading(true);

    try {
      // 3. Create Account & Save Profile via AuthContext signup helper
      const userCredential = await signup(sanitizedEmail, password, {
        fullName: sanitizedFullName,
        phone: sanitizedPhone,
        board: formData.board,
        targetClass: formData.targetClass
      });

      // 4. Send Email Verification (Preserved with alert & notice)
      if (userCredential?.user) {
        try {
          await sendEmailVerification(userCredential.user);
          alert('🎉 Account created successfully! A verification email has been sent to your inbox. Please verify your email.');
        } catch (verifyErr) {
          console.warn("Verification email notice:", verifyErr);
        }
      }

      navigate('/dashboard');
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.code === 'auth/email-already-in-use' || err.message.includes('email-already-in-use')) {
        setError('This email address is already registered. Please log in.');
      } else if (err.code === 'auth/invalid-email' || err.message.includes('invalid-email')) {
        setError('Invalid email address format.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Failed to create an account: ' + (err.message || 'Please try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Sign-Up Handler
  const handleGoogleSignUp = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError('Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            New Student Account
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">Join MVD Coaching 🎉</h2>
          <p className="text-xs text-zinc-400 mt-1">Get instant access to notes, batches & test series.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {verificationNotice && (
          <div className="mb-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs text-center font-medium">
            {verificationNotice}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Full Name</label>
            <input 
              type="text"
              name="fullName"
              required
              maxLength={50}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Email Address</label>
              <input 
                type="email"
                name="email"
                required
                maxLength={80}
                value={formData.email}
                onChange={handleChange}
                placeholder="student@gmail.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Mobile Number</label>
              <input 
                type="tel"
                name="phone"
                required
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Board / Division</label>
              <select
                name="board"
                value={formData.board}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="UP Board">UP Board (Hindi/English)</option>
                <option value="CBSE">CBSE Board</option>
                <option value="Computer Division">MVD Computer Center</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Class / Course</label>
              <select
                name="targetClass"
                value={formData.targetClass}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th">Class 11th</option>
                <option value="Class 12th">Class 12th</option>
                <option value="ADCA / DCA">ADCA / DCA</option>
                <option value="Tally / Coding">Tally / Coding</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password with Show/Hide Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  maxLength={32}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition text-xs cursor-pointer p-1"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  minLength={6}
                  maxLength={32}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition text-xs cursor-pointer p-1"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-full py-3 mt-4 text-sm cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Complete Registration 🎓'}
          </Button>

        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
          <span className="relative bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">OR</span>
        </div>

        {/* 🌐 Sign Up with Google Button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <span>🌐</span> Sign up with Google
        </button>

        <p className="text-center text-xs text-zinc-400 mt-5">
          Already registered?{' '}
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Login Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;