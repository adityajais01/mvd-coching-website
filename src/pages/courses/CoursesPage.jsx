import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import BatchCard from '../../components/common/BatchCard';
import FloatingContact from '../../components/common/FloatingContact';
import { getAllBatches, enrollStudentInBatch } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Free Modal State
  const [freeModalBatch, setFreeModalBatch] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    setLoading(true);
    const dbBatches = await getAllBatches();
    setBatches(dbBatches);
    setLoading(false);
  };

  const enrolledIds = (userData?.enrolledBatches || []).map((b) => b.id);

  const filteredBatches = batches.filter(batch => {
    if (activeTab === 'online') return batch.mode === 'Online';
    if (activeTab === 'offline') return batch.mode === 'Offline';
    return true;
  });

  // Offline Batches ke liye Demo Booking Handler
  const handleOfflineDemoBooking = (batch) => {
    const coachingWhatsAppNumber = "919235763122"; 
    const studentName = userData?.fullName || "Student";
    const message = encodeURIComponent(
      `Hello Maa Vaishno Coaching, mera naam ${studentName} hai. Mujhe offline batch "${batch.title}" ke liye FREE Demo Class book karni hai.`
    );
    window.open(`https://wa.me/${coachingWhatsAppNumber}?text=${message}`, '_blank');
  };

  const handleEnrollClick = (batch) => {
    // 0. OFFLINE BATCH CHECK: No payment, trigger Free Demo Booking
    if (batch.mode === 'Offline' || batch.mode === 'offline') {
      handleOfflineDemoBooking(batch);
      return;
    }

    // 1. UNAUTHENTICATED CHECK: Redirect to Login
    if (!currentUser) {
      alert("Please login or sign up to purchase or enroll in this batch.");
      navigate('/login');
      return;
    }

    // 2. ALREADY ENROLLED CHECK
    if (enrolledIds.includes(batch.id)) {
      alert(`Aap "${batch.title}" me pehle se enrolled hain! Direct Dashboard par ja rahe hain...`);
      navigate('/dashboard');
      return;
    }

    // 3. FREE ₹0 BATCH CHECK
    if (batch.price === 0 || batch.price === "0" || batch.price === "₹0") {
      setFreeModalBatch(batch);
      return;
    }

    // 4. PAID BATCH: Trigger Razorpay
    triggerRazorpayPayment(batch);
  };

  const confirmFreeEnrollment = async () => {
    if (!freeModalBatch) return;
    setEnrolling(true);

    const res = await enrollStudentInBatch(currentUser.uid, freeModalBatch);

    if (res.success) {
      alert(`🎉 Successfully enrolled in "${freeModalBatch.title}"!`);
      setFreeModalBatch(null);
      navigate('/dashboard');
    } else if (res.alreadyEnrolled) {
      alert(`⚠️ ${res.error}`);
      setFreeModalBatch(null);
      navigate('/dashboard');
    } else {
      alert("Enrollment failed: " + res.error);
    }

    setEnrolling(false);
  };

  const triggerRazorpayPayment = (batch) => {
    const cleanPrice = typeof batch.price === 'number' 
      ? batch.price 
      : Number(String(batch.price).replace(/[^0-9]/g, '')) || 0;

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: cleanPrice * 100,
      currency: "INR",
      name: "Maa Vaishno Coaching",
      description: `Enrollment for ${batch.title}`,
      handler: async function () {
        await enrollStudentInBatch(currentUser.uid, batch);
        alert(`🎉 Payment Successful! Unlocked "${batch.title}".`);
        navigate('/dashboard');
      },
      prefill: {
        name: userData?.fullName || "",
        contact: userData?.phone || ""
      },
      theme: { color: "#06b6d4" }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      if (window.confirm(`[DEMO PAYMENT] Complete payment of ₹${cleanPrice} for ${batch.title}?`)) {
        enrollStudentInBatch(currentUser.uid, batch).then(() => {
          alert(`🎉 Payment Successful! Unlocked "${batch.title}".`);
          navigate('/dashboard');
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              📚 Academic & IT Programs
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 leading-tight">
              Our Target Batches & Courses
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Special exam-focused batches for Classes 9–12 (UP/CBSE Board) and skill courses at Maa Vaishno Coaching Center & Computer Institute.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'all' ? "bg-cyan-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                All Batches ({batches.length})
              </button>
              <button
                onClick={() => setActiveTab('offline')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'offline' ? "bg-amber-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                🏫 Offline Center (Monthly)
              </button>
              <button
                onClick={() => setActiveTab('online')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'online' ? "bg-cyan-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                💻 Online LIVE Batches
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="text-center py-20 text-xs text-zinc-500">Loading available courses...</div>
          ) : filteredBatches.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 max-w-md mx-auto">
              <span className="text-4xl block mb-2">🎓</span>
              <h3 className="font-bold text-white text-base">No Batches Available</h3>
              <p className="text-xs text-zinc-500 mt-1">Upcoming batches will be announced here soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBatches.map((batch) => (
                <BatchCard 
                  key={batch.id} 
                  batch={batch} 
                  isEnrolled={enrolledIds.includes(batch.id)}
                  onEnroll={() => handleEnrollClick(batch)}
                />
              ))}
            </div>
          )}

          {/* ₹0 Free Enroll Modal */}
          {freeModalBatch && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
                <span className="text-3xl block mb-2">🎁</span>
                <h3 className="text-lg font-black text-white">Confirm Free Enrollment</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  You are enrolling in <strong className="text-white">{freeModalBatch.title}</strong> for <strong className="text-emerald-400">₹0 (Free)</strong>.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <button 
                    onClick={() => setFreeModalBatch(null)}
                    className="flex-1 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmFreeEnrollment}
                    disabled={enrolling}
                    className="flex-1 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400 transition"
                  >
                    {enrolling ? 'Enrolling...' : 'Confirm & Unlock 🚀'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default CoursesPage;