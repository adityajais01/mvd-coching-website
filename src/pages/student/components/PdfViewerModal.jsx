import React from 'react';

const PdfViewerModal = ({ pdfUrl, pdfTitle, onClose }) => {
  if (!pdfUrl) return null;

  // 🔒 Direct link ko secure preview link mein convert karne ke liye helper
  const getSecuredPdfUrl = (url) => {
    if (!url) return '';
    // Agar Google Drive URL hai toh '/preview' parameter set karein
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    // Standard PDF URL ke liye toolbar, navigation aur scrollbars hide karein
    return `${url}#toolbar=0&navpanes=0&scrollbar=0`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
              🔒 Protected Reader
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

        {/* PDF Viewer Container */}
        <div className="flex-1 bg-zinc-950 relative overflow-hidden">
          
          {/* 🚫 INVISIBLE POP-OUT BLOCKER SHIELD (Top-Right Click Block) */}
          <div 
            className="absolute top-0 right-0 w-20 h-16 z-20 bg-transparent cursor-default pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            title="In-App View Only"
          />

          {/* 🔒 PROTECTED IFRAME (Popups & External Navigation Strictly Blocked) */}
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

export default PdfViewerModal;