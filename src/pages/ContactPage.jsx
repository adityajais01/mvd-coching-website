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
              Visit our center directly or send an instant WhatsApp message for new batch admissions, course inquiries, or demo classes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Highly Interactive Info Cards */}
            <div className="lg:col-span-5 space-y-4">

              {/* 1. Address Card */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Maa+Vaishno+Coaching+Center+NKR+Maharaja+Agrasen+Bal+Vidya+Mandir+Pratibha+Beauty+Parlour+Mundera+Bazar+Chauri+Chaura+Gorakhpur+273201"
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
                        Maa Vaishno Coaching Center (N.K.R.)
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        महाराजा अग्रसेन बाल विद्या मंदिर, प्रतिभा ब्यूटी पार्लर के सामने, मुंडेरा बाज़ार, Chauri Chaura, Gorakhpur, UP (273201)
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

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-xl transition duration-200 shrink-0 ${
                      copied
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-300 group-hover:bg-amber-500 group-hover:text-zinc-950'
                    }`}
                  >
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

              {/* 5. Official Social Media Channels */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-3xl shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Social Channels</span>
                  <span className="text-[10px] text-zinc-500">Free Notes & Lectures</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-1">
  {/* YouTube */}
  <a
    href="https://youtube.com/@your_channel"
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 group shadow-md"
    title="Subscribe on YouTube"
  >
    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition duration-300 shadow-inner">
      <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </div>
    <span className="text-[11px] font-bold text-zinc-300 group-hover:text-red-400 transition tracking-wide">YouTube</span>
  </a>

  {/* Instagram */}
  <a
    href="https://instagram.com/your_instagram"
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 group shadow-md"
    title="Follow on Instagram"
  >
    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:border-transparent transition duration-300 shadow-inner">
      <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </div>
    <span className="text-[11px] font-bold text-zinc-300 group-hover:text-pink-400 transition tracking-wide">Instagram</span>
  </a>

  {/* Facebook */}
  <a
    href="https://facebook.com/your_facebook"
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group shadow-md"
    title="Connect on Facebook"
  >
    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-[#1877F2] group-hover:border-[#1877F2] transition duration-300 shadow-inner">
      <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.054-2.797 2.656v1.319h4.37l-.712 3.667h-3.658v7.98h-4.997z"/>
      </svg>
    </div>
    <span className="text-[11px] font-bold text-zinc-300 group-hover:text-blue-400 transition tracking-wide">Facebook</span>
  </a>
</div>
              </div>

            </div>

            {/* Right: WhatsApp Form */}
            <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800/80 p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">

              <div className="mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full inline-block">
                  ⚡ Fast Response
                </span>
                <h2 className="text-2xl font-black text-white mt-2">Send Direct Inquiry</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill in your question or course details to start a direct WhatsApp conversation.
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
                    placeholder="Which class (9th–12th) or course (UP/CBSE/Computer) would you like to enroll in?"
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