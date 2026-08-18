import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const CertificateModal = ({ isOpen, onClose }) => {
  const [certId, setCertId] = useState('');
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // 🔒 Raw Direct Stream Link Converter (Google Drive UI completely bypassed)
  const formatRawImageUrl = (url) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    
    const driveMatch = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
    return cleanUrl;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setError('');
    setCertData(null);
    setLoading(true);

    try {
      const cleanId = certId.trim().toUpperCase();
      const docRef = doc(db, 'certificates', cleanId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().imageUrl) {
        const rawUrl = formatRawImageUrl(docSnap.data().imageUrl);
        setCertData({
          id: docSnap.id,
          url: rawUrl,
          studentName: docSnap.data().studentName || docSnap.id
        });
      } else {
        setError('No certificate found with this Certificate ID. Please verify and try again.');
      }
    } catch (err) {
      console.error('Certificate verification error:', err);
      setError('Verification service unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 📥 Secure In-Memory Blob Downloader (Zero external redirects)
  const handleDownload = async () => {
    if (!certData?.url) return;
    setDownloading(true);

    try {
      const response = await fetch(certData.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${certData.id}_Certificate.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('In-memory download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleClose = () => {
    setCertId('');
    setCertData(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full cursor-pointer transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Official Verification Vault
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">Verify Certificate 📜</h3>
          <p className="text-xs text-zinc-400 mt-1">Enter your unique Certificate ID to verify and view original credential.</p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-3 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. MVD-2026-1001"
              value={certId}
              onChange={(e) => setCertId(e.target.value.toUpperCase())}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 rounded-xl text-xs sm:text-sm transition disabled:opacity-50 cursor-pointer shrink-0"
            >
              {loading ? 'Checking...' : 'Verify 🔍'}
            </button>
          </div>
        </form>

        {/* Error Notification */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Protected Certificate View Container */}
        {certData && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span>✓</span> Verified Credential
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 font-bold">
                ID: {certData.id}
              </span>
            </div>

            {/* Shielded Display Box (Right click disabled, no external popouts) */}
            <div 
              className="border border-zinc-800 bg-zinc-950 rounded-2xl p-2 relative overflow-hidden shadow-inner flex justify-center select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={certData.url}
                alt={`Certificate ${certData.id}`}
                className="w-full h-auto max-h-[50vh] object-contain rounded-xl pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Direct In-App Download Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>📥</span> {downloading ? 'Downloading Secure File...' : 'Download Certificate'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CertificateModal;