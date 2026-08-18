import { useState } from 'react';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    classCourse: 'Class 10th Board',
    medium: 'Hindi Medium',
    mode: 'Offline Center'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create direct WhatsApp text message
    const msg = `Hello Maa Vaishno Coaching! New Demo/Admission Request:%0A%0A👤 *Name:* ${formData.name}%0A📞 *Phone:* ${formData.phone}%0A📚 *Target:* ${formData.classCourse}%0A🗣️ *Medium:* ${formData.medium}%0A🏫 *Preferred Mode:* ${formData.mode}`;
    
    // Redirect to WhatsApp with pre-filled message
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full cursor-pointer"
        >
          ✕
        </button>

        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
          Free Demo & Admission
        </span>
        <h3 className="text-xl font-extrabold text-white mt-2 mb-1">Book Free Seat Now 🚀</h3>
        <p className="text-xs text-zinc-400 mb-6">Apni details bharein, hamari team 10 minute me callback karegi.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Student Full Name *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile / WhatsApp Number *</label>
            <input 
              type="tel" 
              required 
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Class / Course</label>
              <select 
                value={formData.classCourse}
                onChange={(e) => setFormData({...formData, classCourse: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option>Class 9th</option>
                <option>Class 10th Board</option>
                <option>Class 11th</option>
                <option>Class 12th PCM/PCB</option>
                <option>DCA / ADCA Computer</option>
                <option>Tally + GST</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Preferred Mode</label>
              <select 
                value={formData.mode}
                onChange={(e) => setFormData({...formData, mode: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option>Offline Center</option>
                <option>Online Batch</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black py-3 rounded-xl transition cursor-pointer text-sm shadow-lg shadow-cyan-500/20"
          >
            Submit & Connect on WhatsApp 📲
          </button>
        </form>

      </div>
    </div>
  );
};

export default EnquiryModal;