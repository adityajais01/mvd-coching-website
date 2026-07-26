import React from 'react';
import { freeResources } from '../../data/studyMaterialData';
import Button from '../common/Button';

const StudyMaterialSection = () => {
  return (
    <section className="mt-14 sm:mt-20">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            🎁 100% Free Study Vault
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Free Notes & Board PYQs
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Download free NCERT chapter-wise notes, formula sheets, and previous years' solved question papers.
          </p>
        </div>

        <a 
          href="/free-notes" 
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 w-fit"
        >
          Explore All Free PDFs ➔
        </a>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {freeResources.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col justify-between bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 p-5 rounded-2xl transition duration-300 hover:-translate-y-1 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">
                  {item.category}
                </span>
                <span className="text-[10px] font-semibold text-cyan-400">
                  {item.classTarget}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition line-clamp-2">
                {item.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-3 mb-5">
                <span>📥 {item.downloads}</span>
                <span>•</span>
                <span>💾 {item.fileSize}</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full text-xs py-2">
              Download PDF 📄
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyMaterialSection;