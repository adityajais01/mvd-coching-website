import React from 'react';

// 📱 REAL PRODUCTION NUMBERS & CONFIGURATION
const PHONE_NUMBER = "+919876543210"; // ⚠️ Replace with your Real Mobile Number
const WHATSAPP_NUMBER = "919876543210"; // ⚠️ Replace with your Real WhatsApp Number (with country code, no +)

const FloatingContact = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello Maa Vaishno Coaching / MVD Computer Center! I want to inquire about Admission, Batches & Demo Classes."
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
      
      {/* 📞 Direct Call Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex items-center justify-center w-12 h-12 bg-zinc-800 border border-zinc-400 text-cyan-400 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="Call Admission Desk"
      >
        <span className="text-xl">📞</span>
        <span className="absolute right-14 bg-zinc-900 text-white text-xs font-semibold px-3 py-1 rounded-lg border border-zinc-600 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap shadow-md pointer-events-none">
          Call Admission Desk
        </span>
      </a>

      {/* 💬 WhatsApp Direct Action Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className=" flex items-center justify-centerh-11 w-11  bg-white text-white rounded-full hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <span className="text-xl"><img src="https://marketplace.canva.com/uUd6Q/MAGzNuuUd6Q/1/tl/canva-whatsapp-icon-MAGzNuuUd6Q.png" alt="" /></span>
        
        {/* Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>

        {/* Hover Tooltip */}
        <span className="absolute right-16 bg-zinc-900 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-700 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap shadow-md pointer-events-none">
          Chat on WhatsApp (Instant Reply)
        </span>
      </a>

    </div>
  );
};

export default FloatingContact;