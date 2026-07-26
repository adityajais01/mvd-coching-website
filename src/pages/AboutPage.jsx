import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DirectorMessage from '../components/home/DirectorMessage';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FloatingContact from '../components/common/FloatingContact';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              🏛️ About Our Institute
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 leading-tight">
              Maa Vaishno Coaching & MVD Computer Center
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Building Strong Academic Foundation for Board Exams & Technical Excellence in IT since 2012.
            </p>
          </div>

          {/* Director & Vision Banner */}
          <DirectorMessage />

          {/* Core Values / Features */}
          <WhyChooseUs />
        </main>
      </div>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default AboutPage;