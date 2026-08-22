import React, { useState } from 'react';

const faqs = [
  {
    q: "Can I get a free demo class at Maa Vaishno Coaching Center?",
    a: "Yes! You can attend a free 3-day demo class for any Class (9th, 10th, 11th, or 12th) or any course at Maa Vaishno Coaching Center & Computer Institute."
  },
  {
    q: "What is the fee structure for offline batches?",
    a: "Our offline batches follow a monthly fee system. There is no pressure to pay a large amount in advance, making it convenient and affordable for students."
  },
  {
    q: "Are the certificates from Maa Vaishno Coaching Center & Computer Institute valid?",
    a: "Yes! Certificates for courses such as DCA, ADCA, Tally, and Computer Typing are ISO Certified and are recognized for both Government and Private sector job opportunities."
  },
  {
    q: "How do parents receive updates about attendance and test performance?",
    a: "Weekly board-pattern tests are conducted every Sunday. Test reports and attendance updates are shared directly with parents through WhatsApp, and regular Parent-Teacher Meetings (PTMs) are also organized."
  },
  {
    q: "Do online batches include PDF notes and homework?",
    a: "Yes! Students enrolled in both online and offline batches receive chapter-wise handwritten notes, Daily Practice Problems (DPPs), and previous years' solved question papers in PDF format."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First question remains open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 sm:mt-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
          ❓ Got Questions?
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Find answers to the most common questions about admissions, batches, fees, and courses at Maa Vaishno Coaching Center & Computer Institute.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base cursor-pointer hover:text-cyan-300 transition"
            >
              <span>{faq.q}</span>
              <span className={`text-cyan-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/60 pt-3 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;