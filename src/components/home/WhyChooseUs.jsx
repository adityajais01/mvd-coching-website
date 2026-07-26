import React from 'react';

const features = [
  {
    icon: "👨‍🏫",
    title: "Expert & Dedicated Faculty",
    description: "Experienced educators with deep expertise in NCERT and board exam patterns, delivering concept-based learning with clarity."
  },
  {
    icon: "📚",
    title: "Comprehensive Study Materials",
    description: "Get well-structured notes, formula sheets, and revision resources designed for effective learning and exam preparation."
  },
  {
    icon: "❓",
    title: "Personalized Doubt Support",
    description: "Receive one-on-one guidance through dedicated doubt-solving sessions, ensuring every concept is clearly understood."
  },
  {
    icon: "📝",
    title: "Weekly Tests & Performance Analysis",
    description: "Regular board-pattern assessments with detailed feedback to monitor progress and improve academic performance."
  },
  {
    icon: "👨‍👩‍👦",
    title: "Regular Parent-Teacher Meetings",
    description: "Continuous communication with parents through progress updates, attendance reviews, and personalized academic discussions."
  },
  {
    icon: "🏆",
    title: "Proven Academic Excellence",
    description: "A strong track record of outstanding board results, consistently helping students achieve academic success."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="mt-14 sm:mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Why MVD Coaching
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
          Why Choose MVD Coaching?
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          We go beyond teaching by providing structured guidance, personalized mentoring, and dedicated support to help every student achieve academic excellence.
        </p>
      </div>

      {/* Grid Features Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div 
            key={index}
            className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl hover:border-cyan-500/40 transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700/80 rounded-xl flex items-center justify-center text-2xl mb-4 text-cyan-400">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;