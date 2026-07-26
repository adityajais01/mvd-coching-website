import React from 'react';
import Button from '../common/Button';

const AdmissionCTA = () => {
  return (
    <section className="mt-16 sm:mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-cyan-950/40 to-zinc-900 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl">
      {/* Background Subtle Glow Effect */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
            🔥 Admissions Open 2026-27
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-4 leading-tight">
            Start Your Journey Towards Board Exam Success!
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Join MVD Coaching for expert guidance, personalized learning, and proven strategies to achieve outstanding results in Class 9th–12th Board Exams. Book your free demo class or visit our center today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-sm font-bold">
            Book Free Demo Class 🚀
          </Button>
          <a
            href="tel:+919876543210"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm transition bg-zinc-900/80"
          >
            📞 Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdmissionCTA;