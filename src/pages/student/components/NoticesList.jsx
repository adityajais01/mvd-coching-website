import React from 'react';

const NoticesList = ({ notices }) => {
  if (!notices || notices.length === 0) {
    return (
      <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <span className="text-4xl block mb-2">📢</span>
        <h3 className="text-base font-bold text-white">No Announcements Available</h3>
        <p className="text-xs text-zinc-500 mt-1">There are no active notices for your class at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <div key={notice.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
              {notice.targetClass || 'All Classes'}
            </span>
            <span className="text-xs text-zinc-500">
              {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : 'Official Notice'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">{notice.title}</h3>
          <p className="text-xs text-zinc-300 mt-2 whitespace-pre-line leading-relaxed">{notice.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticesList;