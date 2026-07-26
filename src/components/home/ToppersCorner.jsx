import { toppersList, studentReviews } from '../../data/testimonialsData_&_Reviews';

const ToppersCorner = () => {
  return (
    <section className="mt-14 sm:mt-20">
      
      {/* 🏆 PART 1: TOPPERS SHOWCASE */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
          🏆 Wall of Fame 2025
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
          Meet Our Board Toppers
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Meet the outstanding achievers of Maa Vaishno Coaching Center who secured top ranks in their Board Examinations.
        </p>
      </div>

      {/* Toppers Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {toppersList.map((topper) => (
          <div 
            key={topper.id}
            className="bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 p-5 rounded-2xl transition duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col items-center text-center group"
          >
            {/* Top Score Badge */}
            <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-md">
              {topper.badge}
            </div>

            {/* Student Photo Placeholder */}
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-amber-400/80 p-1 mb-4 shadow-xl flex items-center justify-center text-zinc-500 text-2xl group-hover:scale-105 transition">
              🎓
            </div>

            <h3 className="text-base font-bold text-white mb-0.5">{topper.name}</h3>
            <p className="text-xs text-zinc-400 font-medium mb-3">{topper.classTarget} • {topper.board}</p>

            <div className="w-full bg-zinc-950/80 border border-zinc-800 py-2 rounded-xl mt-auto">
              <span className="block text-2xl font-black text-amber-400 leading-none">
                {topper.score}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">Board Exam {topper.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 💬 PART 2: STUDENT & PARENT REVIEWS */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              💬 Testimonials
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              Kya Kehte Hain Humare Bacche Aur Parents?
            </h3>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-bold bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-zinc-300 ml-1">4.9/5 Rating</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-zinc-950/70 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-4">
                "{rev.review}"
              </p>
              
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.studentName}</h4>
                  <span className="text-[11px] text-cyan-400 font-medium">{rev.role}</span>
                </div>
                <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ToppersCorner;