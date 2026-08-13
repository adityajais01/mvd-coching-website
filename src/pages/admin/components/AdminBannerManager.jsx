import React, { useState, useEffect } from 'react';
import { getHomeBanner, updateHomeBanner } from '../../../services/adminService';

const AdminBannerManager = () => {
  const [banner, setBanner] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    badgeText: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadBannerData();
  }, []);

  const loadBannerData = async () => {
    setFetching(true);
    const data = await getHomeBanner();
    if (data) {
      setBanner(data);
    }
    setFetching(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateHomeBanner(banner);
    if (res.success) {
      alert("🎉 Home Banner updated successfully!");
    } else {
      alert("Failed to update banner: " + res.error);
    }
    setLoading(false);
  };

  if (fetching) {
    return <div className="text-zinc-500 text-xs py-6">Loading banner settings...</div>;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl max-w-3xl">
      <h2 className="text-lg font-black text-white mb-1">🖼️ Home Page Hero Banner Manager</h2>
      <p className="text-xs text-zinc-400 mb-6">Home page ke main hero banner ka content aur image link yahan se update karein.</p>

      <form onSubmit={handleSave} className="space-y-4">
        
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1">Badge / Tagline Text</label>
          <input
            type="text"
            placeholder="e.g. 🎓 ADMISSIONS OPEN FOR 2024-25"
            value={banner.badgeText}
            onChange={(e) => setBanner({ ...banner, badgeText: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1">Main Heading / Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Target Batches For UP & CBSE Board Exams"
            value={banner.title}
            onChange={(e) => setBanner({ ...banner, title: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1">Sub Heading / Description</label>
          <textarea
            rows="3"
            placeholder="e.g. Complete preparation for Class 9th-12th students with daily practice papers and weekly tests."
            value={banner.subtitle}
            onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-1">Banner Image URL (Upload Link)</label>
          <input
            type="url"
            placeholder="e.g. https://images.unsplash.com/photo-... or PostImg / ImgBB URL"
            value={banner.imageUrl}
            onChange={(e) => setBanner({ ...banner, imageUrl: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <p className="text-[10px] text-zinc-500 mt-1">Tip: Aap kisi bhi image link ya PostImg / ImgBB service par image upload karke uska Direct Link yahan daal sakte hain.</p>
        </div>

        {/* Live Preview */}
        {banner.imageUrl && (
          <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Image Preview</span>
            <img 
              src={banner.imageUrl} 
              alt="Banner Preview" 
              className="w-full h-40 object-cover rounded-xl border border-zinc-800"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x300?text=Invalid+Image+Url'; }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs transition cursor-pointer mt-4"
        >
          {loading ? 'Saving Changes...' : 'Publish Banner Changes 🚀'}
        </button>

      </form>
    </div>
  );
};

export default AdminBannerManager;