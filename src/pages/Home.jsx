import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/common/Navbar';
import BannerSlider from '../components/common/BannerSlider';
import DirectorMessage from '../components/home/DirectorMessage';
import FeaturedBatches from '../components/home/PopularBatchesSection';
import Footer from '../components/common/Footer';
import FloatingContact from '../components/common/FloatingContact';

import { homeBanners as defaultBanners } from '../components/common/Homebanner';
import { getHomeBanners } from '../services/adminService';

// Below-the-fold & Secondary Components (Code-split for fast First Contentful Paint)
const StarFaculty = lazy(() => import('../components/home/StarFaculty'));
const ToppersCorner = lazy(() => import('../components/home/ToppersCorner'));
const EventSlider = lazy(() => import('../components/home/EventSlider'));
const StudyMaterialSection = lazy(() => import('../components/home/StudyMaterialSection'));
const WhyChooseUs = lazy(() => import('../components/home/WhyChooseUs'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const AdmissionCTA = lazy(() => import('../components/home/AdmissionCTA'));
const EnquiryModal = lazy(() => import('../components/common/EnquiryModal'));

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banners, setBanners] = useState(defaultBanners || []);
  const [bannersLoading, setBannersLoading] = useState(true);

  useEffect(() => {
    loadDynamicBanners();
  }, []);

  const loadDynamicBanners = async () => {
    try {
      const dbBanners = await getHomeBanners();
      if (Array.isArray(dbBanners) && dbBanners.length > 0) {
        setBanners(dbBanners);
      }
    } catch (error) {
      console.warn("Dynamic banners load failed, using fallback:", error.message);
    } finally {
      setBannersLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-zinc-950 flex flex-col justify-between relative">
      <div>
        {/* 1. TOP NAVBAR */}
        <Navbar onOpenEnquiry={() => setIsModalOpen(true)} />

        {/* 2. MAIN CONTENT AREA */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-16">
          {/* Banner Slider with safety fallback */}
          {banners && banners.length > 0 ? (
            <BannerSlider banners={banners} autoSlideInterval={4000} />
          ) : (
            <div className="w-full h-56 sm:h-72 md:h-80 rounded-3xl bg-zinc-900 border border-zinc-800 animate-pulse flex items-center justify-center">
              <span className="text-zinc-500 text-sm">
                {bannersLoading ? "Loading updates..." : "Maa Vaishno Coaching Center"}
              </span>
            </div>
          )}

          {/* Above-the-fold priority sections */}
          <DirectorMessage />
          <FeaturedBatches onOpenEnquiry={() => setIsModalOpen(true)} />

          {/* Below-the-fold deferred sections */}
          <Suspense fallback={<div className="h-24" />}>
            <StarFaculty />
            <ToppersCorner />
            <EventSlider />
            <StudyMaterialSection />
            <WhyChooseUs />
            <FAQSection />
            <AdmissionCTA onOpenEnquiry={() => setIsModalOpen(true)} />
          </Suspense>
        </main>
      </div>

      {/* 3. FOOTER */}
      <Footer />

      {/* 4. REAL FLOATING WHATSAPP & CALL BUTTONS */}
      <FloatingContact />

      {/* 5. FUNCTIONAL ENQUIRY MODAL (Rendered only when open to save DOM memory) */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default Home;