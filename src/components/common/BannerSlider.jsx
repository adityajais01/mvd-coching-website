import { useState, useEffect } from 'react';

// 🛠️ Robust Universal Image Formatter
const getDirectImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const cleanUrl = url.trim();

    if (cleanUrl.includes('drive.google.com')) {
        let fileId = '';

        const fileIdMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            fileId = fileIdMatch[1];
        }

        if (!fileId) {
            const matchDirectD = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (matchDirectD && matchDirectD[1]) fileId = matchDirectD[1];
        }

        if (!fileId) {
            const idParamMatch = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (idParamMatch && idParamMatch[1]) {
                fileId = idParamMatch[1];
            }
        }

        if (fileId) {
            return `https://lh3.googleusercontent.com/d/${fileId}`;
        }
    }

    return cleanUrl;
};

const BannerSlider = ({ banners = [], autoSlideInterval = 4500 }) => {
    const [current, setCurrent] = useState(0);

    // Reset index if banners array changes
    useEffect(() => {
        if (current >= banners.length) {
            setCurrent(0);
        }
    }, [banners.length, current]);

    // Auto-Play Timer
    useEffect(() => {
        if (!banners || banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
        }, autoSlideInterval);

        return () => clearInterval(timer);
    }, [banners.length, autoSlideInterval]);

    if (!banners || banners.length === 0) return null;

    const nextSlide = () => {
        setCurrent((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev <= 0 ? banners.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl select-none group">
            
            {/* 🌟 ANIMATED SLIDES CONTAINER */}
            <div className="relative w-full h-full">
                {banners.map((item, index) => {
                    const rawSrc = item?.image || item?.imageUrl || item?.url || '';
                    const imgSrc = getDirectImageUrl(rawSrc) || '/images/mvd-admission-banner.png';
                    const isActive = index === current;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                                isActive 
                                    ? 'opacity-100 scale-100 z-10' 
                                    : 'opacity-0 scale-105 pointer-events-none z-0'
                            }`}
                        >
                            <img 
                                src={imgSrc} 
                                alt={`Banner ${index + 1}`} 
                                className="w-full h-full object-fill rounded-3xl transition-transform duration-[4500ms] ease-out"
                                loading={index === 0 ? "eager" : "lazy"}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    const fileId = rawSrc.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || 
                                                   rawSrc.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || 
                                                   rawSrc.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
                                    if (fileId && !e.target.dataset.tried) {
                                        e.target.dataset.tried = "true";
                                        e.target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
                                        return;
                                    }
                                    e.target.src = '/images/mvd-admission-banner.png';
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* 🕹️ CONTROLS (ARROWS & PROGRESS DOTS) */}
            {banners.length > 1 && (
                <>
                    {/* Left Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 text-white flex items-center justify-center border border-zinc-700/80 transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-md opacity-80 hover:opacity-100"
                        aria-label="Previous Slide"
                    >
                        ❮
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 text-white flex items-center justify-center border border-zinc-700/80 transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-md opacity-80 hover:opacity-100"
                        aria-label="Next Slide"
                    >
                        ❯
                    </button>

                    {/* Interactive Indicators */}
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-3 py-1.5 rounded-full bg-zinc-950/50 backdrop-blur-md border border-zinc-800/60">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                                    current === index 
                                        ? "w-6 bg-cyan-400 shadow-md shadow-cyan-400/50" 
                                        : "w-2 bg-zinc-600/80 hover:bg-zinc-400"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BannerSlider;