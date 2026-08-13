import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import BannerSlider from '../components/common/BannerSlider';
import StatsBar from '../components/common/StatsBar';
import FeaturedBatches from '../components/home/PopularBatchesSection';
import StudyMaterialSection from '../components/home/StudyMaterialSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import DirectorMessage from '../components/home/DirectorMessage';
import StarFaculty from '../components/home/StarFaculty';
import ToppersCorner from '../components/home/ToppersCorner';
import FAQSection from '../components/home/FAQSection';
import AdmissionCTA from '../components/home/AdmissionCTA';
import Footer from '../components/common/Footer';
import FloatingContact from '../components/common/FloatingContact';
import EnquiryModal from '../components/common/EnquiryModal';

import { homeBanners as defaultBanners } from '../components/common/Homebanner';
import { getHomeBanners } from '../services/adminService';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banners, setBanners] = useState(defaultBanners);

  useEffect(() => {
    loadDynamicBanners();
  }, []);

  const loadDynamicBanners = async () => {
    const dbBanners = await getHomeBanners();
    if (dbBanners && dbBanners.length > 0) {
      setBanners(dbBanners);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-zinc-950 flex flex-col justify-between relative">
      <div>
        {/* 1. TOP NAVBAR */}
        <Navbar onOpenEnquiry={() => setIsModalOpen(true)} />

        {/* 2. MAIN CONTENT AREA */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-16">
          <BannerSlider banners={banners} autoSlideInterval={4000} />
          <DirectorMessage />
          <StatsBar />
          <FeaturedBatches onOpenEnquiry={() => setIsModalOpen(true)} />
          <StarFaculty />
          <ToppersCorner />
          <StudyMaterialSection />
          <WhyChooseUs />
          <FAQSection />
          <AdmissionCTA onOpenEnquiry={() => setIsModalOpen(true)} />
        </main>
      </div>

      {/* 3. FOOTER */}
      <Footer />

      {/* 4. REAL FLOATING WHATSAPP & CALL BUTTONS */}
      <FloatingContact />

      {/* 5. FUNCTIONAL ENQUIRY MODAL */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;