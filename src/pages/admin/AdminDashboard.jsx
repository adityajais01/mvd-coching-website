import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentDirectory from './components/StudentDirectory';
import StudyMaterialManager from './components/StudyMaterialManager';
import NoticeManager from './components/NoticeManager';
import AdminBatchManager from './components/AdminBatchManager';

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
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 🟢 ONLY IMAGE BANNER FORM
  const [imageUrl, setImageUrl] = useState('');
  const [submittingBanner, setSubmittingBanner] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [stdData, batchData, matData, notData, banData] = await Promise.all([
        getAllStudents().catch(() => []),
        getAllBatches().catch(() => []),
        getAllStudyMaterials().catch(() => []),
        getAllNotices().catch(() => []),
        getHomeBanners().catch(() => [])
      ]);
      setStudents(stdData || []);
      setBatches(batchData || []);
      setMaterials(matData || []);
      setNotices(notData || []);
      setBanners(banData || []);
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

  // 🟢 ONLY IMAGE BANNER SUBMISSION
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            🛡️ Main Admin Portal
          </span>
          <h1 className="text-3xl font-black mt-2">Welcome, {userData?.fullName || 'Admin'} 👋</h1>
          <p className="text-zinc-400 text-xs sm:text-sm">Manage students, courses, materials, notices & home banners.</p>
        </div>

        {/* TABS */}
        <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 gap-1 w-full md:w-auto overflow-x-auto">
          {['students', 'batches', 'materials', 'notices', 'banners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-xl transition capitalize whitespace-nowrap cursor-pointer ${
                activeTab === tab 
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/10' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab === 'students' && `🎓 Students (${students.length})`}
              {tab === 'batches' && `🚀 Batches (${batches.length})`}
              {tab === 'materials' && `📁 Study Notes (${materials.length})`}
              {tab === 'notices' && `📢 Notices (${notices.length})`}
              {tab === 'banners' && `🖼️ Banners (${banners.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ALERT */}
      {message.text && (
        <div className={`max-w-7xl mx-auto mb-6 p-4 rounded-xl text-sm font-semibold border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* STATS OVERVIEW */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Enrolled Students</p>
          <h3 className="text-2xl font-black text-cyan-400 mt-1">{students.length}</h3>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Batches</p>
          <h3 className="text-2xl font-black text-cyan-400 mt-1">{batches.length}</h3>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Uploaded Notes</p>
          <h3 className="text-2xl font-black text-amber-400 mt-1">{materials.length}</h3>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Notices</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">{notices.length}</h3>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Home Banners</p>
          <h3 className="text-2xl font-black text-purple-400 mt-1">{banners.length}</h3>
        </div>
      </div>

      {/* DYNAMIC TAB COMPONENTS */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'students' && <StudentDirectory students={students} loading={loading} />}
        {activeTab === 'batches' && <AdminBatchManager />}
        {activeTab === 'materials' && <StudyMaterialManager materials={materials} onUpload={handleMaterialUpload} onDelete={handleMaterialDelete} />}
        {activeTab === 'notices' && <NoticeManager notices={notices} onPost={handleNoticePost} onDelete={handleNoticeDelete} />}
        
        {/* 🟢 SIMPLIFIED BANNER MANAGER TAB */}
        {activeTab === 'banners' && (
          <div className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl max-w-xl">
              <h2 className="text-lg font-black text-white mb-1">🖼️ Upload Home Banner Image</h2>
              <p className="text-xs text-zinc-400 mb-6">Home Slider ke liye Banner Image Link enter karein.</p>

              <form onSubmit={handleBannerSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1">Image Link / Path *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /images/mvd-admission-banner.png or https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5">Aap public folder path (e.g. `/images/banner01.jpg`) ya online image URL use kar sakte hain.</p>
                </div>

                <button
                  type="submit"
                  disabled={submittingBanner}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition cursor-pointer mt-2"
                >
                  {submittingBanner ? 'Uploading Banner...' : 'Upload Banner 🚀'}
                </button>
              </form>
            </div>

            {/* BANNERS LIST */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-sm font-bold text-white mb-4">Active Banners ({banners.length})</h3>
              {banners.length === 0 ? (
                <div className="text-xs text-zinc-500">No banners uploaded yet. Default banners are showing on Home Page.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {banners.map((b) => (
                    <div key={b.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 flex gap-4 items-center justify-between">
                      <img src={b.image} alt="Banner" className="w-40 h-20 object-cover rounded-xl border border-zinc-800" />
                      <div className="flex-1 min-w-0 px-2">
                        <p className="text-[11px] text-zinc-400 truncate font-mono">{b.image}</p>
                      </div>
                      <button
                        onClick={() => handleBannerDelete(b.id)}
                        className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-xs transition cursor-pointer"
                        title="Delete Banner"
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
      </div>
    </div>
  );
};

export default AdminDashboard;