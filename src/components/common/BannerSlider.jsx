import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. Import Fix
import Button from './Button';

const BannerSlider = ({ banners = [], autoSlideInterval = 4000 }) => {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    // Loop Logic
    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // Auto-Play Timer
    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, autoSlideInterval);

        return () => clearInterval(timer);
    }, [banners.length, autoSlideInterval]);

    if (!banners || banners.length === 0) return null;

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const currentBanner = banners[current];

    return (
        <div className="relative w-full h-60 sm:h-65 md:h-70 overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl select-none">

            {/* 🖼️ BACKGROUND IMAGE + OVERLAY GRADIENT */}
            {currentBanner.image ? (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={currentBanner.image} 
                        alt="img" 
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/30  to-transparent" />
                </div>
            ) : (
                <div className="absolute inset-0 z-0 bg-linear-to-r from-zinc-950 via-cyan-950/30 to-zinc-950" />
            )}

            {/* BANNER CONTENT */}
            <div className="w-full h-full p-6 sm:p-8 md:p-10 flex flex-col justify-center relative z-10">

                {/* Badge */}
                {currentBanner.badge && (
                    <span className="w-fit text-xs font-bold px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full mb-3">
                        {currentBanner.badge}
                    </span>
                )}

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight line-clamp-2 max-w-2xl">
                    {currentBanner.title}
                </h2>

                {/* Subtitle */}
                <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-6 max-w-xl line-clamp-2">
                    {currentBanner.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    {currentBanner.primaryBtnText && (
                        <Button 
                            variant="primary"
                            onClick={() => handleNavigation(currentBanner.primaryBtnLink)}
                        >
                            {currentBanner.primaryBtnText}
                        </Button>
                    )}
                    
                    {currentBanner.secondaryBtnText && (
                        <Button 
                            variant="secondary"
                            onClick={() => handleNavigation(currentBanner.secondaryBtnLink)}
                        >
                            {currentBanner.secondaryBtnText}
                        </Button>
                    )}
                </div>

            </div>

            {/* MANUAL ARROWS */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition active:scale-95 cursor-pointer shadow-lg"
                        aria-label="Previous Slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition active:scale-95 cursor-pointer shadow-lg"
                        aria-label="Next Slide"
                    >
                        ❯
                    </button>

                    {/* INDICATOR DOTS */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    current === index ? "w-6 bg-cyan-400" : "w-2 bg-zinc-600 hover:bg-zinc-500"
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