import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StudentDirectory from './components/StudentDirectory';
import StudyMaterialManager from './components/StudyMaterialManager';
import NoticeManager from './components/NoticeManager';
import AdminBatchManager from './components/AdminBatchManager';

import { db } from '../../config/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { 
  getAllStudents, 
  uploadStudyMaterial, 
  getAllStudyMaterials, 
  deleteStudyMaterial,
  postNotice,
  getAllNotices,
  deleteNotice,
  getHomeBanners,
  addHomeBanner,
  deleteHomeBanner
} from '../../services/adminService';

import { getAllBatches } from '../../services/courseService';

const AdminDashboard = () => {
  const { userData, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // User Profile Menu Popup State
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Banner Form State
  const [imageUrl, setImageUrl] = useState('');
  const [submittingBanner, setSubmittingBanner] = useState(false);

  // Certificate Form & Search State
  const [certForm, setCertForm] = useState({ certId: '', studentName: '', imageUrl: '' });
  const [submittingCert, setSubmittingCert] = useState(false);
  const [certSearchQuery, setCertSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  // Close User Menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const loadCertificates = async () => {
    try {
      const snap = await getDocs(collection(db, 'certificates'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch {
      return [];
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [stdData, batchData, matData, notData, banData, certData] = await Promise.all([
        getAllStudents().catch(() => []),
        getAllBatches().catch(() => []),
        getAllStudyMaterials().catch(() => []),
        getAllNotices().catch(() => []),
        getHomeBanners().catch(() => []),
        loadCertificates()
      ]);
      setStudents(stdData || []);
      setBatches(batchData || []);
      setMaterials(matData || []);
      setNotices(notData || []);
      setBanners(banData || []);
      setCertificates(certData || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setLoading(false);
  };

  const showAlert = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleMaterialUpload = async (formData) => {
    try {
      await uploadStudyMaterial(formData);
      showAlert('success', 'Study Material / Note uploaded successfully! 📁');
      setMaterials(await getAllStudyMaterials());
    } catch {
      showAlert('error', 'Failed to upload study material.');
    }
  };

  const handleMaterialDelete = async (id) => {
    if (window.confirm("Delete this study material?")) {
      try {
        await deleteStudyMaterial(id);
        showAlert('success', 'Material deleted successfully.');
        setMaterials(materials.filter(m => m.id !== id));
      } catch {
        showAlert('error', 'Failed to delete material.');
      }
    }
  };

  const handleNoticePost = async (formData) => {
    try {
      await postNotice(formData);
      showAlert('success', 'Notice posted successfully! 📢');
      setNotices(await getAllNotices());
    } catch {
      showAlert('error', 'Failed to post notice.');
    }
  };

  const handleNoticeDelete = async (id) => {
    if (window.confirm("Delete this notice?")) {
      try {
        await deleteNotice(id);
        showAlert('success', 'Notice deleted successfully.');
        setNotices(notices.filter(n => n.id !== id));
      } catch {
        showAlert('error', 'Failed to delete notice.');
      }
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      showAlert('error', 'Please enter a valid Banner Image URL / Path');
      return;
    }
    setSubmittingBanner(true);
    try {
      await addHomeBanner({ image: imageUrl.trim() });
      showAlert('success', 'Banner Image uploaded successfully! 🖼️');
      setImageUrl('');
      setBanners(await getHomeBanners());
    } catch {
      showAlert('error', 'Failed to upload banner.');
    }
    setSubmittingBanner(false);
  };

  const handleBannerDelete = async (id) => {
    if (window.confirm("Delete this banner from Home Slider?")) {
      try {
        await deleteHomeBanner(id);
        showAlert('success', 'Banner deleted successfully.');
        setBanners(banners.filter(b => b.id !== id));
      } catch {
        showAlert('error', 'Failed to delete banner.');
      }
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    if (!certForm.certId.trim() || !certForm.imageUrl.trim()) {
      showAlert('error', 'Please provide both Certificate ID and Image Link.');
      return;
    }
    setSubmittingCert(true);
    try {
      const cleanId = certForm.certId.trim().toUpperCase();
      await setDoc(doc(db, 'certificates', cleanId), {
        certificateId: cleanId,
        studentName: certForm.studentName.trim(),
        imageUrl: certForm.imageUrl.trim(),
        createdAt: new Date().toISOString()
      });
      showAlert('success', 'Certificate added to database successfully! 📜');
      setCertForm({ certId: '', studentName: '', imageUrl: '' });
      setCertificates(await loadCertificates());
    } catch {
      showAlert('error', 'Failed to save certificate.');
    }
    setSubmittingCert(false);
  };

  const handleCertDelete = async (id) => {
    if (window.confirm(`Delete certificate ${id}?`)) {
      try {
        await deleteDoc(doc(db, 'certificates', id));
        showAlert('success', 'Certificate removed successfully.');
        setCertificates(certificates.filter(c => c.id !== id));
      } catch {
        showAlert('error', 'Failed to delete certificate.');
      }
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    const driveMatch = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
    return cleanUrl;
  };

  const filteredCertificates = certificates.filter((c) => {
    const query = certSearchQuery.trim().toLowerCase();
    if (!query) return true;
    const matchId = (c.id || '').toLowerCase().includes(query);
    const matchName = (c.studentName || '').toLowerCase().includes(query);
    return matchId || matchName;
  });

  const navItems = [
    { id: 'students', label: 'Students', icon: '🎓', count: students.length },
    { id: 'batches', label: 'Batches', icon: '🚀', count: batches.length },
    { id: 'materials', label: 'Study Notes', icon: '📁', count: materials.length },
    { id: 'notices', label: 'Notices', icon: '📢', count: notices.length },
    { id: 'banners', label: 'Banners', icon: '🖼️', count: banners.length },
    { id: 'certificates', label: 'Certificates', icon: '📜', count: certificates.length },
  ];

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-100 flex flex-col md:flex-row antialiased selection:bg-cyan-500 selection:text-zinc-950">
      
      {/* 🧭 FIXED LEFT SIDEBAR */}
      <aside className="w-full md:w-64 md:min-w-[16rem] md:max-w-[16rem] md:sticky md:top-0 md:h-screen bg-zinc-950/90 backdrop-blur-2xl border-r border-zinc-800/80 p-4 flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-zinc-800/60">
            <img 
              src="/images/logo01.jpeg" 
              alt="MVD Logo" 
              className="w-10 h-10 rounded-full object-cover shadow-md border border-cyan-500/30 shrink-0" 
            />
            <div className="min-w-0">
              <h2 className="text-sm font-black text-white tracking-wide truncate">MVD Coaching</h2>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 inline-block mt-0.5">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/5'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 👤 INTERACTIVE USER PROFILE PILL WITH UPWARD FLYOUT MENU */}
        <div className="relative mt-6 pt-3 border-t border-zinc-800/80" ref={userMenuRef}>
          
          {/* Upward Flyout Menu Card */}
          {isUserMenuOpen && (
            <div className="absolute bottom-full left-0 mb-3 w-full bg-zinc-900/95 border border-zinc-800 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl animate-fadeIn z-50">
              
              <div className="px-3 py-2 border-b border-zinc-800/80 mb-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Signed In As</p>
                <p className="text-xs font-semibold text-zinc-300 truncate mt-0.5">
                  {currentUser?.email || 'admin@mvdcoaching.com'}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400">Authenticated Session</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-1">
                <Link
                  to="/"
                  target="_blank"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <span className="text-sm">🌐</span>
                  <span>View Public Website</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
                >
                  <span className="text-sm">🚪</span>
                  <span>Logout Admin</span>
                </button>
              </div>

            </div>
          )}

          {/* Trigger Button */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isUserMenuOpen 
                ? 'bg-zinc-900 border-cyan-500/40 shadow-lg shadow-cyan-500/5' 
                : 'bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-400 shrink-0">
                🛡️
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {userData?.fullName || 'Super Admin'}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono tracking-tight leading-tight mt-0.5">
                  Admin Operator
                </p>
              </div>
            </div>

            <span className={`text-[10px] text-zinc-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-cyan-400' : ''}`}>
              ▲
            </span>
          </button>

        </div>
      </aside>

      {/* 🚀 MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 min-w-0 overflow-x-hidden">
        
        {/* Top Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dashboard Overview ⚡
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Real-time management for Batches, Study Materials, Notices and Student Verifications.
            </p>
          </div>
        </div>

        {/* Dynamic Alerts */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-semibold border backdrop-blur-md animate-fadeIn ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* 📊 KPI METRIC CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {navItems.map((stat) => (
            <div 
              key={stat.id}
              onClick={() => setActiveTab(stat.id)}
              className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 p-4 rounded-2xl transition duration-200 cursor-pointer flex flex-col justify-between shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate">{stat.label}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-mono">{stat.count}</h3>
            </div>
          ))}
        </div>

        {/* 🧩 ACTIVE TAB CONTENT */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
          {activeTab === 'students' && <StudentDirectory students={students} loading={loading} />}
          {activeTab === 'batches' && <AdminBatchManager />}
          {activeTab === 'materials' && <StudyMaterialManager materials={materials} onUpload={handleMaterialUpload} onDelete={handleMaterialDelete} />}
          {activeTab === 'notices' && <NoticeManager notices={notices} onPost={handleNoticePost} onDelete={handleNoticeDelete} />}

          {/* 🖼️ BANNERS TAB */}
          {activeTab === 'banners' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800/80 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  Visual Assets
                </span>
                <h3 className="text-lg font-black text-white mt-2 mb-1">Add Slider Banner</h3>
                <p className="text-xs text-zinc-400 mb-6">Enter direct image link to display on homepage carousel.</p>

                <form onSubmit={handleBannerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Image Link / Path *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /images/banner01.jpg or https://..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingBanner}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-zinc-950 font-black rounded-xl text-xs transition cursor-pointer shadow-lg shadow-cyan-500/10"
                  >
                    {submittingBanner ? 'Uploading...' : 'Publish Banner 🚀'}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-sm font-bold text-white mb-4">Active Banners ({banners.length})</h3>
                {banners.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-zinc-800 rounded-2xl text-xs text-zinc-500">
                    No custom banners uploaded. Default banners are active.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {banners.map((b) => (
                      <div key={b.id} className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3 flex gap-4 items-center justify-between">
                        <img src={b.image} alt="Banner" className="w-32 h-16 object-cover rounded-xl border border-zinc-800" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-zinc-400 truncate font-mono">{b.image}</p>
                        </div>
                        <button
                          onClick={() => handleBannerDelete(b.id)}
                          className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-xs transition cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 📜 CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Add Form */}
              <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800/80 p-6 rounded-2xl">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Student Verification
                </span>
                <h3 className="text-lg font-black text-white mt-2 mb-1">Issue Certificate</h3>
                <p className="text-xs text-zinc-400 mb-6">Assign a unique ID and image URL for direct verification.</p>

                <form onSubmit={handleCertSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Certificate ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MVD-2026-1001"
                      value={certForm.certId}
                      onChange={(e) => setCertForm({ ...certForm, certId: e.target.value.toUpperCase() })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      value={certForm.studentName}
                      onChange={(e) => setCertForm({ ...certForm, studentName: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Direct Image URL / Drive Link *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://... or Google Drive share link"
                      value={certForm.imageUrl}
                      onChange={(e) => setCertForm({ ...certForm, imageUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingCert}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:opacity-90 text-zinc-950 font-black rounded-xl text-xs transition cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    {submittingCert ? 'Adding...' : 'Save Certificate 📜'}
                  </button>
                </form>
              </div>

              {/* Records List with Search */}
              <div className="lg:col-span-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-sm font-bold text-white">
                    Issued Records ({filteredCertificates.length}/{certificates.length})
                  </h3>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search by ID or Name..."
                      value={certSearchQuery}
                      onChange={(e) => setCertSearchQuery(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                    <span className="absolute left-2.5 top-1.5 text-xs text-zinc-500">🔍</span>
                    {certSearchQuery && (
                      <button
                        onClick={() => setCertSearchQuery('')}
                        className="absolute right-2.5 top-1.5 text-xs text-zinc-400 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {filteredCertificates.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-zinc-800 rounded-2xl text-xs text-zinc-500">
                    {certSearchQuery ? `No certificate matches "${certSearchQuery}".` : 'No certificates recorded yet.'}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                    {filteredCertificates.map((c) => (
                      <div key={c.id} className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-zinc-700 transition">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                              {c.id}
                            </span>
                            {c.studentName && (
                              <span className="text-xs font-bold text-white truncate">{c.studentName}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate font-mono">{c.imageUrl}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setPreviewCert({ id: c.id, url: formatImageUrl(c.imageUrl), name: c.studentName })}
                            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-700 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            👁️ View
                          </button>

                          <button
                            onClick={() => handleCertDelete(c.id)}
                            className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg text-xs transition cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PREVIEW MODAL */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                Admin Preview
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                {previewCert.name ? `${previewCert.name} (${previewCert.id})` : previewCert.id}
              </h3>
            </div>

            <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-2 flex justify-center overflow-hidden">
              <img
                src={previewCert.url}
                alt={previewCert.id}
                className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;