import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import FloatingContact from '../components/common/FloatingContact';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('maavaishnocoaching7@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName || !cleanPhone || !cleanMessage) return;

    const textMessage = `Hello Maa Vaishno Coaching! New Message from Website Contact Page:\n\n👤 *Name:* ${cleanName}\n📞 *Phone:* ${cleanPhone}\n💬 *Message:* ${cleanMessage}`;
    const encodedMsg = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919235763122?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-100 selection:bg-cyan-500 selection:text-zinc-950 flex flex-col justify-between antialiased">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-20">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full inline-block">
              📍 Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
              Visit Center or Contact Us
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
              New Batch Admissions, Course Enquiries ya Demo Classes ke liye direct center visit karein ya instant WhatsApp message bhejein.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Highly Interactive Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* 1. Address Card */}
              <a 
                href="https://maps.google.com/?q=Hanuman+Mandir+Mundera+Bazar+Chauri-Chaura+Gorakhpur+273201"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-cyan-500/50 p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500 pointer-events-none" />
                
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 rounded-2xl flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition duration-300 shrink-0 shadow-inner">
                      📍
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Head Office</span>
                      <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-cyan-300 transition">
                        Maa Vaishno Coaching / MVD Hub
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        Hanuman Mandir, Mundera Bazar, Chauri-Chaura, Gorakhpur (273201)
                      </p>
                    </div>
                  </div>

                  <span className="text-zinc-500 group-hover:text-cyan-400 text-xs font-mono font-bold shrink-0 mt-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform">
                    ↗
                  </span>
                </div>
              </a>

              {/* 2. Direct Call Card */}
              <a 
                href="tel:+919235763122"
                className="group relative block bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-500 pointer-events-none" />

                <div className="flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 transition duration-300 shrink-0 shadow-inner">
                      📞
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Call Support</span>
                      <h3 className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 group-hover:text-emerald-300 transition">
                        +91 92357 63122
                      </h3>
                      <p className="text-[11px] text-zinc-500">Available during office hours</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl opacity-80 group-hover:opacity-100 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition duration-200">
                    Call Now
                  </span>
                </div>
              </a>

              {/* 3. Email Card with Interactive Copy */}
              <div 
                onClick={handleCopyEmail}
                className="group relative block bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-500 pointer-events-none" />

                <div className="flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/50 rounded-2xl flex items-center justify-center text-amber-400 text-xl group-hover:scale-110 transition duration-300 shrink-0 shadow-inner">
                      ✉️
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Email Inquiry</span>
                      <h3 className="text-xs sm:text-sm font-semibold text-white truncate mt-0.5 group-hover:text-amber-300 transition">
                        maavaishnocoaching7@gmail.com
                      </h3>
                      <p className="text-[11px] text-zinc-500">Click to copy address</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl transition duration-200 shrink-0 ${
                    copied 
                      ? 'bg-emerald-500 text-zinc-950' 
                      : 'bg-zinc-800 text-zinc-300 group-hover:bg-amber-500 group-hover:text-zinc-950'
                  }`}>
                    {copied ? 'Copied! ✓' : 'Copy 📋'}
                  </span>
                </div>
              </div>

              {/* 4. Timings Card */}
              <div className="relative bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-3xl overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 text-xl shrink-0 shadow-inner">
                    ⏰
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Institute Timings</span>
                    <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      Mon - Sat: <span className="text-zinc-300 font-normal">6:00 AM - 10:00 AM</span> & <span className="text-zinc-300 font-normal">2:00 PM - 5:00 PM</span>
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1">Sunday: Weekly Test Series & Doubt Desk</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: WhatsApp Form */}
            <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800/80 p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              <div className="mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full inline-block">
                  ⚡ Fast Response
                </span>
                <h2 className="text-2xl font-black text-white mt-2">Send Direct Enquiry</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Apna question ya course details fill karein, direct WhatsApp conversation start ho jayegi.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Your Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition shadow-inner"
                  />
                </div>

                {/* 10-Digit Mobile Input */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    10-Digit WhatsApp / Mobile Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    value={formData.phone}
                    onKeyDown={(e) => {
                      if (
                        ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                        ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
                      ) {
                        return;
                      }
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: onlyNumbers });
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono transition shadow-inner"
                  />
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Message / Question <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows="4"
                    required
                    maxLength={500}
                    placeholder="Aapko kis class (9th-12th) ya course (UP/CBSE/Computer) ke liye admission lena hai?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Submit CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-xs sm:text-sm font-black cursor-pointer shadow-lg shadow-cyan-500/10 mt-2"
                >
                  Send Message on WhatsApp 💬
                </Button>

              </form>

            </div>

          </div>
        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ContactPage;