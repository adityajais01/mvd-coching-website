import React from 'react';
import Button from './Button';

const BatchCard = ({ batch }) => {
  const isOffline = batch.mode === "Offline";

  return (
    <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden">
      
      {/* Mode Indicator Tag */}
      <div className={`absolute top-0 right-0 px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-bl-xl ${
        isOffline 
          ? "bg-amber-500/20 text-amber-400 border-l border-b border-amber-500/30" 
          : "bg-cyan-500/20 text-cyan-400 border-l border-b border-cyan-500/30"
      }`}>
        {isOffline ? "🏫 Offline Center" : "💻 Online Batch"}
      </div>

      {/* Header Info */}
      <div>
        <div className="flex items-center gap-2 mb-3 pr-24">
          <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
            {batch.targetClass} • {batch.board}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
          {batch.title}
        </h3>

        <p className="text-xs text-zinc-400 mb-4 font-medium">
          Medium: <span className="text-zinc-200">{batch.medium}</span>
        </p>

        {/* Feature List */}
        <ul className="space-y-2 mb-6">
          {batch.features.map((feat, idx) => (
            <li key={idx} className="flex items-start text-xs sm:text-sm text-zinc-300 gap-2">
              <span className="text-cyan-400 mt-0.5">✓</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer & Clear Pricing Highlight */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{batch.price}</span>
            <span className="text-xs text-zinc-500 line-through">{batch.originalPrice}</span>
          </div>
          
          {/* Highlighted Billing Badge */}
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md inline-block mt-1 ${
            isOffline 
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          }`}>
            {isOffline ? "Per Month Fee" : "One-Time Full Course"}
          </span>
        </div>

        <Button variant={isOffline ? "secondary" : "primary"}>
          {isOffline ? "Enroll Center" : "Explore Batch"}
        </Button>
      </div>

    </div>
  );
};

export default BatchCard;