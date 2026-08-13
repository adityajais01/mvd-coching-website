import { useState, useEffect } from 'react';

const BannerSlider = ({ banners = [], autoSlideInterval = 4000 }) => {
    const [current, setCurrent] = useState(0);

    // Loop Logic
    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // Auto-Play Timer
    useEffect(() => {
        if (!banners || banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, autoSlideInterval);

        return () => clearInterval(timer);
    }, [banners.length, autoSlideInterval]);

    if (!banners || banners.length === 0) return null;

    const currentBanner = banners[current];

    return (
        <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl select-none flex items-center justify-center">

            {/* 🟢 PURE IMAGE DISPLAY (NO OVERLAY TEXTS, FULL STRETCH FIT) */}
            <div className="w-full h-full relative">
                <img 
                    src={currentBanner.image} 
                    alt="Home Banner" 
                    className="w-full h-full object-fill rounded-3xl"
                />
            </div>

            {/* 🎯 SLIDER CONTROLS (ARROWS & DOTS) */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/80 transition active:scale-95 cursor-pointer shadow-xl backdrop-blur-sm"
                        aria-label="Previous Slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/80 transition active:scale-95 cursor-pointer shadow-xl backdrop-blur-sm"
                        aria-label="Next Slide"
                    >
                        ❯
                    </button>

                    {/* INDICATOR DOTS */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    current === index ? "w-5 sm:w-6 bg-cyan-400" : "w-1.5 sm:w-2 bg-zinc-600/80 hover:bg-zinc-400"
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