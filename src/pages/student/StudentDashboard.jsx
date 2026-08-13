import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentMaterials, getStudentNotices } from '../../services/studentService';

// Original Global Components
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// Student Sub Components
import StudentHeader from './components/StudentHeader';
import QuickMetrics from './components/QuickMetrics';
import MaterialsGrid from './components/MaterialsGrid';
import BatchesSection from './components/BatchesSection';
import NoticesList from './components/NoticesList';
import PdfViewerModal from './components/PdfViewerModal';

const StudentDashboard = () => {
  const { userData } = useAuth();

  const [materials, setMaterials] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🟢 FIX 1: Set Default Tab to 'batches' so user immediately sees their enrolled courses
  const [activeTab, setActiveTab] = useState('batches'); // 'batches' | 'notes' | 'purchases' | 'notices'

  // Modal State
  const [activePdfUrl, setActivePdfUrl] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');

  useEffect(() => {
    if (userData) {
      loadData();
    }
  }, [userData]);

  const loadData = async () => {
    setLoading(true);
    const studentClass = userData?.class || userData?.targetClass;
    const [matData, notData] = await Promise.all([
      getStudentMaterials(studentClass),
      getStudentNotices(studentClass)
    ]);
    setMaterials(matData || []);
    setNotices(notData || []);
    setLoading(false);
  };

  const handleOpenPdf = (url, title) => {
    if (!url || url === '#') {
      alert('PDF document is being processed. Please check back shortly.');
      return;
    }
    setActivePdfUrl(url);
    setPdfTitle(title);
  };

  const freeNotes = materials.filter((m) => !m.isPaid);
  const paidNotes = materials.filter((m) => m.isPaid);
  const purchasedIds = userData?.purchasedMaterials || [];
  const purchasedNotes = paidNotes.filter((m) => purchasedIds.includes(m.id));

  const studentClass = userData?.class || userData?.targetClass || 'Class 10th';
  
  // 🟢 FIX 2: Safely read enrolledBatches from userData
  const enrolledBatches = userData?.enrolledBatches || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-cyan-500">
      
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          
          {/* Welcome Profile Card */}
          <StudentHeader userData={userData} />

          {/* Quick Metrics Row */}
          <QuickMetrics 
            freeCount={freeNotes.length} 
            purchasedCount={purchasedNotes.length} 
            noticesCount={notices.length} 
            enrolledCount={enrolledBatches.length}
          />

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 gap-2 w-full md:w-fit overflow-x-auto">
              
              {/* 🎓 MY BATCHES TAB (FIRST TAB) */}
              <button
                type="button"
                onClick={() => setActiveTab('batches')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'batches' ? 'bg-cyan-500 text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
              >
                🎓 My Batches ({enrolledBatches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'notes' ? 'bg-cyan-500 text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
              >
                📚 Study Material ({freeNotes.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('purchases')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'purchases' ? 'bg-amber-500 text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⭐ Purchased Notes ({purchasedNotes.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notices')}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                  activeTab === 'notices' ? 'bg-purple-500 text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
              >
                📢 Notice Board ({notices.length})
              </button>
            </div>
          </div>

          {/* Dynamic Content Views */}
          {loading ? (
            <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
              <span className="text-3xl block mb-2 animate-bounce">⏳</span>
              <p className="text-xs text-zinc-400 font-semibold">Loading student vault data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'batches' && (
                <BatchesSection 
                  enrolledBatches={enrolledBatches} 
                  studentClass={studentClass} 
                />
              )}

              {activeTab === 'notes' && (
                <MaterialsGrid 
                  items={freeNotes} 
                  isPaidTab={false} 
                  onOpenPdf={handleOpenPdf} 
                  studentClass={studentClass} 
                />
              )}

              {activeTab === 'purchases' && (
                <MaterialsGrid 
                  items={purchasedNotes} 
                  isPaidTab={true} 
                  onOpenPdf={handleOpenPdf} 
                  studentClass={studentClass} 
                />
              )}

              {activeTab === 'notices' && (
                <NoticesList notices={notices} />
              )}
            </>
          )}

          {/* In-App Secured PDF Viewer */}
          <PdfViewerModal 
            pdfUrl={activePdfUrl} 
            pdfTitle={pdfTitle} 
            onClose={() => setActivePdfUrl(null)} 
          />

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;