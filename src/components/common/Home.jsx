import Navbar from '../components/common/Navbar';
import BannerSlider  from '../components/common/BannerSlider'; // ✅ Corrected
import { homeBanners } from '../components/common/Homebanner';
import StatsBar from '../components/common/StatsBar';
import FeaturedBatches from '../components/home/FeaturedBatches';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-zinc-950">
      
      {/* 1. TOP NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-16">
        {/* Banner Slider Section */}
        <BannerSlider banners={homeBanners} autoSlideInterval={4000} />
        {/* Stats Highlights Bar */}
        <StatsBar />

        {/* Featured Batches Section */}
        <FeaturedBatches />
      </main>

    </div>
  );
};

export default Home;