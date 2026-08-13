import React from 'react';

const CleanYouTubePlayer = ({ youtubeId, title }) => {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  if (!youtubeId) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
        No Video Selected
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&iv_load_policy=3&controls=1`;

  return (
    <div className="w-full h-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
      
      {/* 🔴 Top Cover Bar to Hide Title & Channel Icon */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-10 pointer-events-none transition-opacity opacity-100 group-hover:opacity-40" />

      {/* YouTube Iframe */}
      <iframe
        src={embedUrl}
        title={title || 'Video Lecture'}
        className="w-full h-full border-0 absolute inset-0 scale-[1.03]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default CleanYouTubePlayer;