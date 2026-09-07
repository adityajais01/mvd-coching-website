import React, { useState, useEffect, useRef } from 'react';
import { slides } from '../../data/eventsData';

export default function EventSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 5-Card infinite curve maintain karne ke liye structured mirror array
  const displaySlides =
    slides && slides.length > 0 && slides.length < 5
      ? [
          ...slides,
          ...slides.map((s, idx) => ({ ...s, _dupId: `${s.id || idx}-dup1` })),
          ...slides.map((s, idx) => ({ ...s, _dupId: `${s.id || idx}-dup2` })),
        ]
      : slides || [];

  const total = displaySlides.length;

  // Uninterrupted Auto-play: har 4 second me bina ruke chalega
  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [total]);

  if (!slides || slides.length === 0) return null;

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  // Mobile/Tablet swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextSlide();
    if (diff < -45) prevSlide();
  };

  // 5-Card 3D Curved Perspective Matrix
  const getCardStyle = (index) => {
    let offset = (index - current + total) % total;
    if (offset > total / 2) offset -= total;

    if (offset === 0) {
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (offset === 1) {
      return {
        transform: 'translateX(54%) scale(0.86) rotateY(-18deg)',
        zIndex: 20,
        opacity: 0.75,
      };
    } else if (offset === -1) {
      return {
        transform: 'translateX(-54%) scale(0.86) rotateY(18deg)',
        zIndex: 20,
        opacity: 0.75,
      };
    } else if (offset === 2) {
      return {
        transform: 'translateX(96%) scale(0.72) rotateY(-28deg)',
        zIndex: 10,
        opacity: 0.42,
      };
    } else if (offset === -2) {
      return {
        transform: 'translateX(-96%) scale(0.72) rotateY(28deg)',
        zIndex: 10,
        opacity: 0.42,
      };
    } else {
      return {
        transform: 'translateX(0%) scale(0.5)',
        zIndex: 0,
        opacity: 0,
        pointerEvents: 'none',
      };
    }
  };

  const activeSlide = slides[current % slides.length];

  return (
    <section className="my-14 sm:my-20 select-none overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <span className="inline-block text-cyan-400 font-semibold tracking-widest text-xs uppercase px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          Campus Life & Proof of Excellence
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2.5 tracking-tight">
          Moments & Milestones
        </h2>
      </div>

      {/* 3D Perspective Curved Arena */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1200px' }}
        className="relative w-full max-w-7xl mx-auto h-[220px] sm:h-[280px] md:h-[330px] lg:h-[360px] flex items-center justify-center overflow-hidden px-2 sm:px-6"
      >
        {displaySlides.map((slide, index) => {
          let offset = (index - current + total) % total;
          if (offset > total / 2) offset -= total;
          const isCenter = offset === 0;

          return (
            <div
              key={slide._dupId || slide.id || index}
              onClick={() => setCurrent(index)}
              style={getCardStyle(index)}
              className={`absolute w-[68%] sm:w-[54%] md:w-[46%] lg:w-[38%] h-full rounded-2xl overflow-hidden border transition-all duration-700 ease-out cursor-pointer ${
                isCenter
                  ? 'border-cyan-500/80 shadow-[0_15px_45px_-10px_rgba(6,182,212,0.4)] ring-1 ring-cyan-500/30'
                  : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading={isCenter ? 'eager' : 'lazy'}
              />

              {/* Side cards par subtle shadow shade for depth */}
              {!isCenter && (
                <div className="absolute inset-0 bg-black/35 transition-opacity duration-500" />
              )}
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-6 z-40 bg-zinc-950/85 hover:bg-cyan-500 hover:text-zinc-950 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-zinc-700/80 transition-all shadow-xl backdrop-blur-md group"
        >
          <span className="text-lg transition-transform group-hover:-translate-x-0.5">&#10094;</span>
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-6 z-40 bg-zinc-950/85 hover:bg-cyan-500 hover:text-zinc-950 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-zinc-700/80 transition-all shadow-xl backdrop-blur-md group"
        >
          <span className="text-lg transition-transform group-hover:translate-x-0.5">&#10095;</span>
        </button>
      </div>

      {/* External Meta & Details Area (Zero CLS) */}
      <div className="max-w-xl mx-auto text-center mt-6 px-4 min-h-[96px] flex flex-col justify-center">
        <div>
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium text-xs px-3 py-0.5 rounded-full mb-1.5">
            {activeSlide.tag}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide transition-all duration-300">
            {activeSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed line-clamp-2">
            {activeSlide.desc}
          </p>
        </div>

        {/* Smooth Indicator Bars */}
        <div className="flex justify-center items-center space-x-2 mt-5">
          {slides.map((_, idx) => {
            const isActive = idx === current % slides.length;
            return (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.85)]'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}