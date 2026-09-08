import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import { storage } from '../../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { 
  getAllBatches, 
  createBatch, 
  deleteBatch, 
  togglePopularBatch,
  addLectureToBatch,
  deleteLectureFromBatch,
  addDPPToBatch,
  deleteDPPFromBatch,
  getBatchById
} from '../../../services/courseService';

const AdminBatchManager = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [targetClass, setTargetClass] = useState('Class 10th');
  const [medium, setMedium] = useState('Hindi & English');
  const [board, setBoard] = useState('UP & CBSE Board');
  const [mode, setMode] = useState('Online');
  const [price, setPrice] = useState('1999');
  const [originalPrice, setOriginalPrice] = useState('4999');
  const [billingType, setBillingType] = useState('One-Time Full Course');
  const [featuresInput, setFeaturesInput] = useState("Daily LIVE Classes & Recorded Backup\nChapterwise PDF Notes & DPPs\nWeekly Online Test Series");
  const [isPopular, setIsPopular] = useState(false);
  const [showPrice, setShowPrice] = useState(true); // Toggle for showing/hiding price
  const [submitting, setSubmitting] = useState(false);

  // Content Modal State
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [modalTab, setModalTab] = useState('lectures');

  // Add Lecture State
  const [chapterName, setChapterName] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('45 mins');
  const [addingLecture, setAddingLecture] = useState(false);

  // Add DPP State
  const [dppChapter, setDppChapter] = useState('');
  const [dppTitle, setDppTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [dppType, setDppType] = useState('DPP');
  const [addingDpp, setAddingDpp] = useState(false);

  // File Upload State
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    setLoading(true);
    try {
      const data = await getAllBatches();
      setBatches(data || []);
    } catch (err) {
      console.error("Error loading batches:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshSelectedBatch = async (batchId) => {
    const updated = await getBatchById(batchId);
    if (updated) setSelectedBatch(updated);
    loadBatches();
  };

  // Mode badalne par auto-set billingType
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'Offline') {
      setBillingType('Monthly at Center');
    } else {
      setBillingType('One-Time Full Course');
    }
  };

  // 🚀 PUBLISH BATCH SUBMIT HANDLER
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter Batch Title");
      return;
    }

    setSubmitting(true);
    try {
      const numPrice = Number(price);

      const featuresArray = featuresInput
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const newBatch = {
        title: title.trim(),
        targetClass,
        medium,
        board,
        mode,
        price: !price || numPrice === 0 ? '₹0' : `₹${numPrice}`,
        originalPrice: originalPrice ? `₹${originalPrice}` : '',
        billingType,
        features: featuresArray,
        isPopular,
        showPrice: Boolean(showPrice) // Saved to Firestore
      };

      const res = await createBatch(newBatch);
      if (res && (res.success || res.id)) {
        alert("🎉 Batch published successfully!");
        setTitle('');
        setPrice('500');
        setOriginalPrice('');
        setIsPopular(false);
        setShowPrice(true);
        loadBatches();
      } else {
        alert("Failed to create batch: " + (res?.error || "Unknown Error"));
      }
    } catch (error) {
      console.error("Error creating batch:", error);
      alert("Error publishing batch: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (batchId, batchTitle) => {
    if (window.confirm(`Are you sure you want to delete "${batchTitle}"?`)) {
      const res = await deleteBatch(batchId);
      if (res.success) {
        alert("Batch deleted!");
        loadBatches();
      }
    }
  };

  const handleTogglePopular = async (batchId, currentStatus) => {
    const res = await togglePopularBatch(batchId, currentStatus);
    if (res.success) loadBatches();
  };

  // Add Lecture
  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!lectureTitle || !videoUrl) {
      alert("Lecture title and video URL are required");
      return;
    }

    setAddingLecture(true);
    const res = await addLectureToBatch(selectedBatch.id, {
      chapterName: chapterName || 'Chapter 1',
      title: lectureTitle,
      videoUrl,
      duration
    });

    if (res.success) {
      setLectureTitle('');
      setVideoUrl('');
      refreshSelectedBatch(selectedBatch.id);
    } else {
      alert("Failed to add lecture: " + res.error);
    }
    setAddingLecture(false);
  };

  // Delete Lecture
  const handleDeleteLecture = async (lec) => {
    if (window.confirm(`Delete lecture "${lec.title}"?`)) {
      await deleteLectureFromBatch(selectedBatch.id, lec);
      refreshSelectedBatch(selectedBatch.id);
    }
  };

  // 📂 DIRECT FILE UPLOAD TO FIREBASE STORAGE
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    if (!storage) {
      alert('Firebase Storage bucket not found. Please paste PDF/Drive URL manually!');
      return;
    }

    setIsUploadingPdf(true);
    setPdfUploadProgress(0);

    try {
      const storageRef = ref(storage, `batch_dpps/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPdfUploadProgress(progress);
        },
        (error) => {
          console.error("Upload Error:", error);
          alert("Failed to upload PDF: " + error.message);
          setIsUploadingPdf(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPdfUrl(downloadURL);
          setIsUploadingPdf(false);
          alert("PDF Uploaded successfully!");
        }
      );
    } catch (err) {
      console.error("Storage Error:", err);
      setIsUploadingPdf(false);
    }
  };

  // Add DPP
  const handleAddDPP = async (e) => {
    e.preventDefault();
    if (!dppTitle || !pdfUrl) {
      alert("DPP title and PDF link are required");
      return;
    }

    setAddingDpp(true);
    const res = await addDPPToBatch(selectedBatch.id, {
      chapterName: dppChapter || 'Chapter 1',
      title: dppTitle,
      pdfUrl,
      type: dppType
    });

    if (res.success) {
      setDppTitle('');
      setPdfUrl('');
      setPdfUploadProgress(0);
      refreshSelectedBatch(selectedBatch.id);
    } else {
      alert("Failed to add DPP: " + res.error);
    }
    setAddingDpp(false);
  };

  // Delete DPP
  const handleDeleteDPP = async (dpp) => {
    if (window.confirm(`Delete "${dpp.title}"?`)) {
      await deleteDPPFromBatch(selectedBatch.id, dpp);
      refreshSelectedBatch(selectedBatch.id);
    }
  };

  return (
    <div className="space-y-8 text-white">
      {/* CREATE NEW BATCH FORM */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
        <h2 className="mb-4 text-base font-bold text-cyan-400">➕ Publish New Batch / Course</h2>
        
        <form onSubmit={handleCreateBatch} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">Batch Title *</label>
            <input 
              type="text"
              placeholder="e.g. Class 10th Board Booster"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">Target Class</label>
            <select
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
            >
              <option value="Class 9th">Class 9th</option>
              <option value="Class 10th">Class 10th</option>
              <option value="Class 11th">Class 11th</option>
              <option value="Class 12th">Class 12th</option>
              <option value="Computer ADCA">Computer ADCA / Tally</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">Mode *</label>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              className={`w-full px-3.5 py-2 text-xs font-bold rounded-xl border focus:outline-none ${
                mode === 'Offline'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-950 text-white border-zinc-800 focus:border-cyan-500'
              }`}
            >
              <option value="Online">💻 Online LIVE Batch</option>
              <option value="Offline">🏫 Offline Center Batch (Demo / Monthly)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">
              {mode === 'Offline' ? 'Monthly Fee in ₹ (Center)' : 'Course Price in ₹ (0 for FREE)'}
            </label>
            <input 
              type="number"
              placeholder={mode === 'Offline' ? "e.g. 500 / month" : "0 for Free"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">Original Price (Cut Price)</label>
            <input 
              type="number"
              placeholder="e.g. 4999"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-bold text-zinc-400">Billing Type / Subtitle</label>
            <input 
              type="text"
              placeholder="e.g. Monthly at Center OR Full Access"
              value={billingType}
              onChange={(e) => setBillingType(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block mb-1 text-xs font-bold text-zinc-400">Batch Features (One per line)</label>
            <textarea
              rows="3"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* TOGGLE CHECKBOXES ROW */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 md:col-span-3 border-t border-zinc-800">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-bold text-amber-400 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 border-zinc-700 rounded bg-zinc-950 cursor-pointer"
                />
                Show in "Popular Batches" on Home Page 🔥
              </label>

              {/* Show/Hide Price Toggle */}
              <label className="flex items-center gap-2 text-xs font-bold text-cyan-400 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 border-zinc-700 rounded bg-zinc-950 cursor-pointer"
                />
                Show Price on Website 💰
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'Publish Batch 🚀'}
            </button>
          </div>
        </form>
      </div>

      {/* PUBLISHED BATCHES LIST */}
      <div>
        <h2 className="mb-4 text-base font-bold text-white">📚 Active Published Batches ({batches.length})</h2>

        {loading ? (
          <div className="py-12 text-xs text-center text-zinc-500">Loading DB batches...</div>
        ) : batches.length === 0 ? (
          <div className="py-12 text-xs text-center bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500">
            No batches created yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {batches.map((b) => {
              const isOffline = (b.mode || '').toLowerCase() === 'offline';
              const isPriceVisible = b.showPrice !== false;

              return (
                <div key={b.id} className="flex flex-col justify-between p-5 shadow-lg bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                        isOffline 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      }`}>
                        {isOffline ? '🏫 OFFLINE' : '💻 ONLINE'}
                      </span>

                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {isPriceVisible ? `${b.price} ${isOffline ? '/mo' : ''}` : 'Price Hidden'}
                      </span>
                    </div>

                    <h3 className="mb-1 text-sm font-bold text-white">{b.title}</h3>
                    <p className="text-xs text-zinc-400">{b.targetClass}</p>

                    <div className="flex items-center gap-3 my-3 text-[11px] text-zinc-400">
                      <span>🎥 {(b.lectures || []).length} Lectures</span>
                      <span>•</span>
                      <span>📑 {(b.dpps || []).length} DPPs/Notes</span>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2 border-t border-zinc-800/80">
                    <button
                      type="button"
                      onClick={() => setSelectedBatch(b)}
                      className="w-full py-2 text-xs font-bold transition bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/20 cursor-pointer"
                    >
                      📺 Upload Lectures & DPPs ➔
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTogglePopular(b.id, b.isPopular)}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        b.isPopular 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' 
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {b.isPopular ? '🔥 Featured on Home Page' : '➕ Feature on Home Page'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(b.id, b.title)}
                      className="w-full py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs hover:bg-red-500/20 transition cursor-pointer"
                    >
                      Delete Batch 🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CONTENT MANAGEMENT MODAL */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            
            <div>
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    CONTENT MANAGER
                  </span>
                  <h3 className="mt-1 text-lg font-black text-white">{selectedBatch.title}</h3>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedBatch(null)}
                  className="p-1.5 text-zinc-400 rounded-lg hover:text-white hover:bg-zinc-800 text-xs font-bold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Modal Sub-Tabs */}
              <div className="flex p-1 my-4 border bg-zinc-950 rounded-xl border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalTab('lectures')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    modalTab === 'lectures' ? 'bg-cyan-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🎥 Video Lectures ({(selectedBatch.lectures || []).length})
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('dpps')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    modalTab === 'dpps' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📑 DPPs & PDFs ({(selectedBatch.dpps || []).length})
                </button>
              </div>

              {/* TAB 1: LECTURES */}
              {modalTab === 'lectures' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddLecture} className="p-4 border bg-zinc-950/60 rounded-2xl border-zinc-800/80 space-y-3">
                    <h4 className="text-xs font-bold text-cyan-400">➕ Add New Video Lecture</h4>
                    
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input 
                        type="text"
                        placeholder="Chapter Name (e.g. Real Numbers)"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
                      />
                      <input 
                        type="text"
                        placeholder="Lecture Title (e.g. Lecture 01 - Intro)"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <input 
                        type="text"
                        placeholder="YouTube Unlisted / Vimeo Video URL *"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="sm:col-span-2 px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
                        required
                      />
                      <input 
                        type="text"
                        placeholder="Duration (e.g. 45 mins)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={addingLecture}
                      className="w-full py-2 text-xs font-bold text-zinc-950 bg-cyan-500 hover:bg-cyan-400 rounded-xl cursor-pointer"
                    >
                      {addingLecture ? 'Uploading...' : 'Add Lecture to Batch 🚀'}
                    </button>
                  </form>

                  {/* Lectures List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {(selectedBatch.lectures || []).length === 0 ? (
                      <p className="py-4 text-xs text-center text-zinc-500">No video lectures added yet.</p>
                    ) : (
                      selectedBatch.lectures.map((lec) => (
                        <div key={lec.id} className="flex items-center justify-between p-3 border bg-zinc-950 rounded-xl border-zinc-800">
                          <div>
                            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                              {lec.chapterName}
                            </span>
                            <h5 className="mt-1 text-xs font-bold text-white">{lec.title}</h5>
                            <p className="text-[10px] text-zinc-500">{lec.duration}</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleDeleteLecture(lec)}
                            className="text-red-400 hover:text-red-300 text-xs font-bold p-1 cursor-pointer"
                          >
                            Delete 🗑️
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: DPPS & PDFS */}
              {modalTab === 'dpps' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddDPP} className="p-4 border bg-zinc-950/60 rounded-2xl border-zinc-800/80 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400">➕ Add DPP / PDF Note</h4>
                    
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input 
                        type="text"
                        placeholder="Chapter Name (e.g. Optics)"
                        value={dppChapter}
                        onChange={(e) => setDppChapter(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                      <input 
                        type="text"
                        placeholder="DPP / Note Title *"
                        value={dppTitle}
                        onChange={(e) => setDppTitle(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-2">
                      <label className="block text-[11px] font-bold text-zinc-400">
                        Upload File From Computer 📁
                      </label>
                      <input 
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="w-full text-xs text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 cursor-pointer"
                      />

                      {isUploadingPdf && (
                        <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                          <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${pdfUploadProgress}%` }} />
                        </div>
                      )}

                      <div className="text-center text-[10px] text-zinc-500 uppercase font-bold my-1">— OR PASTE LINK BELOW —</div>

                      <input 
                        type="text"
                        placeholder="Google Drive / PDF URL *"
                        value={pdfUrl}
                        onChange={(e) => setPdfUrl(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs text-white bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <select
                        value={dppType}
                        onChange={(e) => setDppType(e.target.value)}
                        className="px-3 py-1.5 text-xs text-white bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
                      >
                        <option value="DPP">Daily Practice Paper</option>
                        <option value="Class Notes">Class Notes PDF</option>
                        <option value="Formula Sheet">Formula Sheet</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={addingDpp || isUploadingPdf}
                      className="w-full py-2 text-xs font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-xl cursor-pointer"
                    >
                      {addingDpp ? 'Saving...' : 'Attach PDF to Batch 📄'}
                    </button>
                  </form>

                  {/* DPP List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {(selectedBatch.dpps || []).length === 0 ? (
                      <p className="py-4 text-xs text-center text-zinc-500">No DPPs attached yet.</p>
                    ) : (
                      selectedBatch.dpps.map((dpp) => (
                        <div key={dpp.id} className="flex items-center justify-between p-3 border bg-zinc-950 rounded-xl border-zinc-800">
                          <div>
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                              {dpp.type} • {dpp.chapterName}
                            </span>
                            <h5 className="mt-1 text-xs font-bold text-white">{dpp.title}</h5>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleDeleteDPP(dpp)}
                            className="text-red-400 hover:text-red-300 text-xs font-bold p-1 cursor-pointer"
                          >
                            Delete 🗑️
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBatchManager;