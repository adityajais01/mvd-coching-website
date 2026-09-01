import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// 🛠️ 1. Direct 1-Click File Downloader URL
const getDirectDownloadUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const cleanUrl = url.trim();

  if (cleanUrl.includes('drive.google.com')) {
    const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                  cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                  cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return cleanUrl;
};

// 🛠️ 2. Clean PDF Preview URL for In-App Viewer
const getSecuredPdfUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const cleanUrl = url.trim();

  if (cleanUrl.includes('drive.google.com')) {
    const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                  cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                  cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview?embedded=true`;
    }
  }
  return `${cleanUrl}#toolbar=0&navpanes=0&scrollbar=0`;
};

// 🔒 Inline PDF Viewer Modal Component
const InlinePdfViewerModal = ({ pdfUrl, pdfTitle, onClose }) => {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
              🔒 In-App Reader
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-white truncate">📄 {pdfTitle}</h3>
          </div>
          <button 
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer whitespace-nowrap"
          >
            Close Viewer ❌
          </button>
        </div>

        <div className="flex-1 bg-zinc-950 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-36 h-14 z-30 bg-transparent cursor-default pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <iframe 
            src={getSecuredPdfUrl(pdfUrl)} 
            className="w-full h-full border-none select-none" 
            title={pdfTitle}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="autoplay"
          />
        </div>

      </div>
    </div>
  );
};

const StudyMaterialSection = () => {
  const [freeResources, setFreeResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const fetchFreeResources = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'study_materials'));
        const list = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const isFree = !data.isPaid;
          const isHomeVisible = data.showOnHome !== false;

          if (isFree && isHomeVisible) {
            list.push({ id: doc.id, ...data });
          }
        });

        const latestFour = list.reverse().slice(0, 4);
        setFreeResources(latestFour);
      } catch (err) {
        console.error("Error fetching free resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeResources();
  }, []);

  const handleDownload = (rawUrl, title = 'Study_Material') => {
    if (!rawUrl) {
      alert("PDF link is not available!");
      return;
    }

    const downloadLink = getDirectDownloadUrl(rawUrl);

    const anchor = document.createElement('a');
    anchor.href = downloadLink;
    anchor.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <section className="mt-14 sm:mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            🎁 100% Free Study Vault
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Free Notes & Board PYQs
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Download free NCERT chapter-wise notes, formula sheets, and previous years' solved question papers.
          </p>
        </div>

        <a 
          href="/store" 
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 w-fit bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-cyan-500/40"
        >
          Explore All Notes & Store ➔
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-zinc-500 text-sm">
            Fetching latest study materials...
          </div>
        ) : freeResources.length > 0 ? (
          freeResources.map((item) => {
            const rawPdf = item.pdfUrl || item.fileUrl || '';

            return (
              <div 
                key={item.id} 
                className="flex flex-col justify-between bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 p-5 rounded-2xl transition duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">
                      {item.subject || 'Notes'}
                    </span>
                    <span className="text-[10px] font-semibold text-cyan-400">
                      {item.targetClass || item.class || 'Class 10th'}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-3 mb-5">
                    <span>📥 {item.downloads || '1k+'} Reads</span>
                    <span>•</span>
                    <span>💾 PDF</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={() => setSelectedPdf({ url: rawPdf, title: item.title })}
                    className="py-2 px-3 text-center text-xs font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>👁️</span>
                    <span>Read</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(rawPdf, item.title)}
                    className="py-2 px-3 text-center text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/10"
                  >
                    <span>📥</span>
                    <span>Save</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 px-4 bg-zinc-900/40 rounded-3xl border border-zinc-800/80">
            <span className="text-3xl block mb-2">📭</span>
            <h4 className="text-base font-bold text-white">No Free Study Materials Uploaded Yet</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Our faculty is currently preparing new chapter notes and model papers. Please check back soon!
            </p>
          </div>
        )}
      </div>

      {selectedPdf && (
        <InlinePdfViewerModal
          pdfUrl={selectedPdf.url}
          pdfTitle={selectedPdf.title}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </section>
  );
};

export default StudyMaterialSection;