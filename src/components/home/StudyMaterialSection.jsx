import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import { db } from '../../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const StudyMaterialSection = () => {
  const [freeResources, setFreeResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreeResources = async () => {
      try {
        setLoading(true);
        // Step 1: All materials fetch karein
        const querySnapshot = await getDocs(collection(db, 'study_materials'));
        const list = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Logic:
          // 1. Paid nahi hona chahiye (!isPaid)
          // 2. showOnHome explicitly false NAHI hona chahiye (by default true maana jayega agar set na ho)
          const isFree = !data.isPaid;
          const isHomeVisible = data.showOnHome !== false;

          if (isFree && isHomeVisible) {
            list.push({ id: doc.id, ...data });
          }
        });

        // Step 2: Date ke hisab se reverse (Latest first) karke sirf TOP 4 items dikhayein
        const latestFour = list.reverse().slice(0, 4);
        setFreeResources(latestFour);
      } catch (err) {
        console.error("Error fetching free resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeResources();
  }, []);

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("PDF link is not available!");
    }
  };

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
          href="/store" 
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 w-fit bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-cyan-500/40"
        >
          Explore All Notes & Store ➔
        </a>
      </div>

      {/* Grid Cards OR Empty State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-zinc-500 text-sm">
            Fetching latest study materials...
          </div>
        ) : freeResources.length > 0 ? (
          freeResources.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col justify-between bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 p-5 rounded-2xl transition duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">
                    {item.subject || 'Notes'}
                  </span>
                  <span className="text-[10px] font-semibold text-cyan-400">
                    {item.targetClass || item.class || 'Class 10th'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-3 mb-5">
                  <span>📥 {item.downloads || '1k+'} Downloads</span>
                  <span>•</span>
                  <span>💾 PDF</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="w-full text-xs py-2 cursor-pointer"
                onClick={() => handleDownload(item.pdfUrl)}
              >
                Download PDF 📄
              </Button>
            </div>
          ))
        ) : (
          /* PROFESSIONAL EMPTY STATE */
          <div className="col-span-full text-center py-12 px-4 bg-zinc-900/40 rounded-3xl border border-zinc-800/80">
            <span className="text-3xl block mb-2">📭</span>
            <h4 className="text-base font-bold text-white">No Free Study Materials Uploaded Yet</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Our faculty is currently preparing new chapter notes and model papers. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudyMaterialSection;