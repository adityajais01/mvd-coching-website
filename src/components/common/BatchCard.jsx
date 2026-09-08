import React from 'react';

const BatchCard = ({ batch, isEnrolled, onEnroll }) => {
  const isOnline = batch.mode === 'Online' || batch.mode === 'online';
  // Check if price should be displayed (default is true if not set)
  const isPriceVisible = batch.showPrice !== false;

  return (
    <div className={`bg-zinc-900 border ${
      isOnline ? 'border-cyan-500/30 hover:border-cyan-500/60' : 'border-amber-500/30 hover:border-amber-500/60'
    } p-6 rounded-3xl flex flex-col justify-between shadow-xl transition relative overflow-hidden`}>
      
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${
            isOnline 
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            {isOnline ? '💻 ONLINE LIVE' : '🏫 OFFLINE CENTER'}
          </span>

          <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
            {batch.targetClass}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-white mb-1 leading-snug">{batch.title}</h3>
        <p className="text-xs text-zinc-400 mb-4">{batch.medium || 'Hindi & English'} • {batch.board || 'UP & CBSE Board'}</p>

        {/* Features List */}
        {batch.features && batch.features.length > 0 && (
          <ul className="space-y-2 mb-6 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
            {batch.features.map((feat, idx) => (
              <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="text-cyan-400 text-xs">✓</span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pricing & CTA Button */}
      <div>
        <div className="flex items-baseline gap-2 mb-4 min-h-[32px]">
          {isPriceVisible ? (
            <>
              <span className="text-2xl font-black text-white">
                {typeof batch.price === 'number' ? `₹${batch.price}` : batch.price}
              </span>
              {batch.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">{batch.originalPrice}</span>
              )}
              <span className="text-[10px] text-zinc-400 block font-semibold">
                {isOnline 
                  ? `(${batch.billingType || 'Full Access'})` 
                  : '/ month (Pay at Center)'}
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                📍 Offline Classroom Batch
              </span>
              <span className="text-[10px] text-zinc-500">
                (Fee at Center)
              </span>
            </div>
          )}
        </div>

        {/* Action Button: Book Free Demo remains active regardless of price visibility */}
        {!isOnline ? (
          <button 
            onClick={onEnroll}
            className="w-full py-2.5 rounded-xl font-extrabold text-xs transition cursor-pointer bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-lg"
          >
            Book Free Demo Class 📍
          </button>
        ) : isEnrolled ? (
          <button 
            onClick={onEnroll}
            className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-xs cursor-pointer hover:bg-emerald-500/20 transition"
          >
            Enrolled • Open Dashboard ➔
          </button>
        ) : (
          <button 
            onClick={onEnroll}
            className="w-full py-2.5 rounded-xl font-extrabold text-xs transition cursor-pointer bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-lg"
          >
            {batch.price === 0 || batch.price === "0" || batch.price === "₹0" 
              ? 'Enroll Now (Free ₹0) 🚀' 
              : 'Buy Batch Now 💳'}
          </button>
        )}
      </div>

    </div>
  );
};

export default BatchCard;