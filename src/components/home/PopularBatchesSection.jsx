import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import BatchCard from '../common/BatchCard';
import { getPopularBatches, getAllBatches, enrollStudentInBatch } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const PopularBatchesSection = () => {
  const [popularBatches, setPopularBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    setLoading(true);
    let data = await getPopularBatches();
    
    // Fallback: If no batch is explicitly marked as popular, pick first 3
    if (data.length === 0) {
      const allData = await getAllBatches();
      data = allData.slice(0, 3);
    }

    setPopularBatches(data);
    setLoading(false);
  };

  const enrolledIds = (userData?.enrolledBatches || []).map((b) => b.id);

  const handleCardClick = (batch) => {
    if (!currentUser) {
      alert("Please login or sign up to purchase or enroll in this batch.");
      navigate('/login');
      return;
    }
    // If logged in, navigate to catalog page to complete buy/enroll
    navigate('/courses');
  };

  if (loading) return null;

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              POPULAR BATCHES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">🔥 Featured Coaching Courses</h2>
          </div>

          <Link to="/courses">
            <Button variant="secondary" className="text-xs py-2 px-4 cursor-pointer">
              View All Courses ➔
            </Button>
          </Link>
        </div>

        {/* Empty State vs Batches Grid */}
        {popularBatches.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6">
            <span className="text-3xl block mb-2">📢</span>
            <h3 className="text-sm font-bold text-white">New Session Batches Launching Soon!</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Classes 9th–12th UP/CBSE Board special batches are being scheduled.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBatches.map((batch) => (
              <BatchCard 
                key={batch.id} 
                batch={batch} 
                isEnrolled={enrolledIds.includes(batch.id)}
                onEnroll={() => handleCardClick(batch)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PopularBatchesSection;