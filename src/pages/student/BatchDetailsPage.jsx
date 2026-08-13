import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import CleanYouTubePlayer from '../../components/common/CleanYouTubePlayer';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const BatchDetailsPage = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lectures'); // 'lectures' | 'dpps' | 'notes'
  
  // Active Selected Video for Player
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchBatchDetails();
  }, [batchId]);

  const fetchBatchDetails = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'batches', batchId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const batchData = { id: docSnap.id, ...docSnap.data() };
        setBatch(batchData);
        if (batchData.lectures && batchData.lectures.length > 0) {
          setCurrentVideo(batchData.lectures[0]);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching batch details:", err);
      setLoading(false);
    }
  };

  const getYoutubeId = (url, youtubeId) => {
    if (youtubeId) return youtubeId;
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32">
          <span className="text-3xl block mb-2 animate-bounce">⏳</span>
          <p className="text-xs text-zinc-400">Loading batch lectures & resources...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32">
          <h2 className="text-xl font-bold">Batch Not Found</h2>
          <Link to="/dashboard" className="text-xs text-cyan-400 underline mt-2 block">
            ➔ Back to Student Dashboard
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const activeYoutubeId = currentVideo ? getYoutubeId(currentVideo.videoUrl, currentVideo.youtubeId) : '';

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          
          {/* Top Breadcrumb Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link to="/dashboard" className="text-xs font-bold text-zinc-400 hover:text-white transition">
                ← Back to My Batches
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{batch.title}</h1>
              <p className="text-xs text-cyan-400 font-semibold">{batch.subject || 'All Subjects'} • Class {batch.targetClass}</p>
            </div>
          </div>

          {/* MAIN LMS CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT 2 COLUMNS: VIDEO PLAYER */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative aspect-video">
                {currentVideo ? (
                  activeYoutubeId || currentVideo.videoUrl?.includes('youtube') || currentVideo.videoUrl?.includes('youtu.be') ? (
                    <CleanYouTubePlayer 
                      youtubeId={activeYoutubeId} 
                      title={currentVideo.title} 
                    />
                  ) : (
                    <video
                      src={currentVideo.videoUrl}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                    No Video Selected
                  </div>
                )}
              </div>

              {currentVideo && (
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2 inline-block">
                    Chapter: {currentVideo.chapterName || 'General'}
                  </span>
                  <h2 className="text-lg font-bold text-white">{currentVideo.title}</h2>
                  {currentVideo.duration && (
                    <p className="text-xs text-zinc-400 mt-1">Duration: {currentVideo.duration}</p>
                  )}
                </div>
              )}

            </div>

            {/* RIGHT 1 COLUMN: TABS & PLAYLIST */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col h-[650px]">
              
              <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-800 gap-1 mb-4">
                <button
                  onClick={() => setActiveTab('lectures')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                    activeTab === 'lectures' ? 'bg-cyan-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🎥 Lectures
                </button>
                <button
                  onClick={() => setActiveTab('dpps')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                    activeTab === 'dpps' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📝 DPPs
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                    activeTab === 'notes' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📄 Notes
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                
                {/* 1. LECTURES */}
                {activeTab === 'lectures' && (
                  batch.lectures && batch.lectures.length > 0 ? (
                    batch.lectures.map((lec, index) => (
                      <div
                        key={lec.id || index}
                        onClick={() => setCurrentVideo(lec)}
                        className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                          currentVideo?.title === lec.title
                            ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                            : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-cyan-400 w-5">#{index + 1}</span>
                          <div>
                            <h4 className="text-xs font-bold line-clamp-1">{lec.title}</h4>
                            <span className="text-[10px] text-zinc-500">{lec.chapterName || lec.duration || 'Video Lecture'}</span>
                          </div>
                        </div>
                        <span className="text-xs">▶️</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-xs text-zinc-500">No lectures uploaded yet.</div>
                  )
                )}

                {/* 2. DPPS */}
                {activeTab === 'dpps' && (
                  batch.dpps && batch.dpps.length > 0 ? (
                    batch.dpps.map((dpp, index) => (
                      <div key={dpp.id || index} className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{dpp.title}</h4>
                          <span className="text-[10px] text-amber-400">{dpp.chapterName || 'Daily Practice Problem'}</span>
                        </div>
                        <a href={dpp.pdfUrl} target="_blank" rel="noreferrer">
                          <Button variant="secondary" className="text-[10px] py-1 px-3">
                            Download PDF 📥
                          </Button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-xs text-zinc-500">No DPPs available for this batch yet.</div>
                  )
                )}

                {/* 3. NOTES */}
                {activeTab === 'notes' && (
                  batch.notes && batch.notes.length > 0 ? (
                    batch.notes.map((note, index) => (
                      <div key={note.id || index} className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{note.title}</h4>
                          <span className="text-[10px] text-emerald-400">Class Notes</span>
                        </div>
                        <a href={note.pdfUrl} target="_blank" rel="noreferrer">
                          <Button variant="secondary" className="text-[10px] py-1 px-3">
                            View Notes 📄
                          </Button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-xs text-zinc-500">No PDF notes uploaded yet.</div>
                  )
                )}

              </div>

            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BatchDetailsPage;