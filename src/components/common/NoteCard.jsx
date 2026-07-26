import React from 'react';
import Button from './Button';

const NoteCard = ({ note, onAction }) => {
  const isPaid = note.isPaid;

  return (
    <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden group">
      
      {/* Free vs Paid Tag Badge */}
      <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-bl-xl ${
        isPaid 
          ? "bg-amber-500/20 text-amber-400 border-l border-b border-amber-500/30" 
          : "bg-emerald-500/20 text-emerald-400 border-l border-b border-emerald-500/30"
      }`}>
        {isPaid ? "⭐ Premium Paid" : "🎁 100% Free"}
      </div>

      <div>
        {/* Class & Subject Badge */}
        <div className="flex items-center gap-2 mb-3 pr-24">
          <span className="text-[11px] font-bold px-2.5 py-0.5 bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700/60">
            {note.classTarget}
          </span>
          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
            {note.subject}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition">
          {note.title}
        </h3>

        <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {note.description}
        </p>

        {/* Meta Stats (Downloads, File Size, Format) */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mb-6">
          <span>📥 {note.downloads || "1k+"} Downloads</span>
          <span>•</span>
          <span>💾 {note.fileSize || "PDF"}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div>
          {isPaid ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-white">{note.price}</span>
              {note.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">{note.originalPrice}</span>
              )}
            </div>
          ) : (
            <span className="text-xs font-bold text-emerald-400">FREE PDF</span>
          )}
        </div>

        <Button 
          variant={isPaid ? "primary" : "secondary"}
          className="text-xs py-2 px-4"
          onClick={() => onAction && onAction(note)}
        >
          {isPaid ? "Unlock Notes 🔓" : "Download PDF 📄"}
        </Button>
      </div>

    </div>
  );
};

export default NoteCard;