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

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello Maa Vaishno Coaching! New Message from Website Contact Page:%0A%0A👤 *Name:* ${formData.name}%0A📞 *Phone:* ${formData.phone}%0A💬 *Message:* ${formData.message}`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              📍 Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Visit Center or Contact Us
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Kisi bhi inquiry, demo class ya admission ke liye direct office visit karein ya message bhejein.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 font-bold shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Main Office Address</h4>
                  <p className="text-sm font-semibold text-white mt-1">
                    Maa Vaishno Coaching Center / MVD Computer Center,<br />
                    Coaching Market Hub, Near Main Railway Station Road.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-bold shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone & WhatsApp</h4>
                  <p className="text-sm font-semibold text-white mt-1">+91 98765 43210</p>
                  <p className="text-xs text-zinc-400">+91 91234 56789 (Helpline Desk)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 font-bold shrink-0">
                  ⏰
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Office Timings</h4>
                  <p className="text-sm font-semibold text-white mt-1">Monday - Saturday: 8:00 AM - 7:00 PM</p>
                  <p className="text-xs text-zinc-400">Sunday: 9:00 AM - 1:00 PM (Test Center)</p>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-2">Send Direct Enquiry</h3>
              <p className="text-xs text-zinc-400 mb-6">Form bharein, direct WhatsApp message open hoga.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Message / Question *</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Aapko kis course ya batch ki enquiry karni hai?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                  ></textarea>
                </div>

                <Button variant="primary" className="w-full py-3 text-sm font-bold">
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