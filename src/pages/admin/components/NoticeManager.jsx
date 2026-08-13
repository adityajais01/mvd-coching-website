import React, { useState } from 'react';
import Button from '../../../components/common/Button';

const NoticeManager = ({ notices, onPost, onDelete }) => {
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    message: '',
    targetClass: 'All Classes'
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    await onPost(noticeForm);
    setNoticeForm({ title: '', message: '', targetClass: 'All Classes' });
    setFormLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* CREATE NOTICE FORM */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl h-fit">
        <h2 className="text-lg font-bold mb-4 text-emerald-400">📢 Post New Notice</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Notice Heading / Title</label>
            <input 
              type="text" 
              required
              value={noticeForm.title}
              onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              placeholder="e.g. Test Series Schedule Released!"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Target Class</label>
            <select 
              value={noticeForm.targetClass}
              onChange={(e) => setNoticeForm({ ...noticeForm, targetClass: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All Classes">All Classes & Boards</option>
              <option value="Class 9th">Class 9th</option>
              <option value="Class 10th">Class 10th</option>
              <option value="Class 11th">Class 11th</option>
              <option value="Class 12th">Class 12th</option>
              <option value="ADCA / DCA">Computer Courses</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Notice Message Details</label>
            <textarea 
              rows="4"
              required
              value={noticeForm.message}
              onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
              placeholder="Type the full notice announcement text here..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={formLoading} 
            className="w-full py-2.5 text-xs"
          >
            {formLoading ? 'Posting...' : 'Broadcast Notice 🚀'}
          </Button>
        </form>
      </div>

      {/* ACTIVE NOTICES LIST */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-cyan-400">📋 Published Notices</h2>
        
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice.id} className="bg-zinc-950 border border-zinc-800/80 p-5 rounded-2xl relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {notice.targetClass}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white">{notice.title}</h3>
                <p className="text-xs text-zinc-300 mt-1 whitespace-pre-line leading-relaxed">{notice.message}</p>

                <div className="flex justify-end mt-3">
                  <button 
                    onClick={() => onDelete(notice.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 px-3 py-1 rounded-xl font-bold transition cursor-pointer"
                  >
                    Delete Notice 🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-zinc-500 py-8">No notices posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeManager;