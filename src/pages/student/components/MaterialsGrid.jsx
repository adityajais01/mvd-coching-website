import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

const MaterialsGrid = ({ items, isPaidTab, onOpenPdf, studentClass }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <span className="text-4xl block mb-2">{isPaidTab ? '🔒' : '📭'}</span>
        <h3 className="text-base font-bold text-white">
          {isPaidTab ? 'No Unlocked Premium Bundles' : 'No Free Notes Uploaded for Your Class Yet'}
        </h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          {isPaidTab 
            ? "You haven't purchased any premium notes yet. Visit our digital store to unlock topper handwritten bundles."
            : `Faculty is preparing new chapter PDFs for ${studentClass || 'your class'}. Browse store for extra resources.`}
        </p>
        <Link to="/store" className="inline-block mt-4">
          <Button variant={isPaidTab ? "primary" : "secondary"} className="text-xs py-2 px-4 cursor-pointer">
            {isPaidTab ? 'Go To Digital Store 🛍️' : 'Browse Store Vault ➔'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((note) => (
        <div 
          key={note.id} 
          className={`bg-zinc-900 border ${
            isPaidTab ? 'border-amber-500/30' : 'border-zinc-800 hover:border-cyan-500/40'
          } p-6 rounded-2xl flex flex-col justify-between transition shadow-xl`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${
                isPaidTab 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
              }`}>
                {note.subject || 'General'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                isPaidTab 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {isPaidTab ? '⭐ UNLOCKED' : '🎁 FREE PDF'}
              </span>
            </div>

            <h3 className="font-bold text-white text-base mb-2 leading-snug">{note.title}</h3>
            {note.description && <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{note.description}</p>}
          </div>

          <Button 
            variant={isPaidTab ? "primary" : "secondary"}
            className="w-full text-xs py-2.5 mt-4 cursor-pointer"
            onClick={() => onOpenPdf(note.pdfUrl, note.title)}
          >
            {isPaidTab ? 'Open Secured PDF 🔓' : 'Read PDF in App 📄'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MaterialsGrid;