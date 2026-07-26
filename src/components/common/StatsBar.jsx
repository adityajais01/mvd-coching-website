import React from 'react';

const stats = [
  { label: "Active Students", value: "1000+" },
  { label: "Board Success Rate", value: "98%" },
  { label: "Free Study Material", value: "500+ PDFs" },
  { label: "Expert Educators", value: "25+" }
];

const StatsBar = () => {
  return (
    <div className="w-full mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-lg">
      {stats.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl sm:text-3xl font-black text-cyan-400">
            {item.value}
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;