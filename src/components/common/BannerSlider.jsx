import { useState, useEffect } from 'react';
import Button from './Button';

const BannerSlider = ({ banners = [], autoSlideInterval = 4000 }) => {
    // Active slide index (0, 1, 2...)
    const [current, setCurrent] = useState(0);

    // 1. Loop Logic: Agle slide par jane ka function (2 ke baad wapas 0)
    const nextSlide = () => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    // 2. Reverse Loop Logic: Pichhle slide par jane ka function
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // 3. Auto-Play Timer: Har 4 second baad automatic nextSlide() chalega
    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, autoSlideInterval);

        // Cleanup timer (jab component unmount ho ya current state badle)
        return () => clearInterval(timer);
    }, [banners.length, autoSlideInterval]);

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">

            {/* BANNER CONTENT */}
            
            <div className="sm:p-7 min-h-60 sm:min-h-50 flex flex-col justify-center bg-linear-to-r from-zinc-900 via-zinc-900/90 to-cyan-950/30 transition-all duration-500">

                {/* Badge */}
                {banners[current].badge && (
                    <span className="w-fit text-xs font-bold px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full mb-3">
                        {banners[current].badge}
                    </span>
                )}

                {/* Title */}
                <h2 className="text-xl md:text-3xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                    {banners[current].title}
                </h2>

                {/* Subtitle */}
                <p className="text-zinc-400 text-sm sm:text-base mb-6 max-w-xl">
                    {banners[current].subtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    {banners[current].primaryBtnText && (
                        <Button variant="primary">
                            {banners[current].primaryBtnText}
                        </Button>
                    )}
                    {banners[current].secondaryBtnText && (
                        <Button variant="secondary">
                            {banners[current].secondaryBtnText}
                        </Button>
                    )}
                </div>

            </div>

            {/* MANUAL ARROWS (❮ & ❯) */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition active:scale-95 cursor-pointer"
                        aria-label="Previous Slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition active:scale-95 cursor-pointer"
                        aria-label="Next Slide"
                    >
                        ❯
                    </button>

                    {/* INDICATOR DOTS (• • •) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${current === index ? "w-6 bg-cyan-400" : "w-2 bg-zinc-600 hover:bg-zinc-500"
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