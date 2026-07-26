import React, { useState } from 'react';

const faqs = [
  {
    q: "Kya Maa Vaishno Coaching me Demo Class free mil sakti hai?",
    a: "Haan, aap 3 days tak kisi bhi Class (9th, 10th, 11th, 12th) ya Computer Course me bilkul Free Demo Class attend kar sakte hain."
  },
  {
    q: "Offline batches me fees structure kaisa hota hai?",
    a: "Offline center me aap Monthly Fees submit kar sakte hain. Koi advance lump sum pressure nahi hota. Har month pocket-friendly per-month fees li jaati hai."
  },
  {
    q: "Kya MVD Computer Center ke certificates valid hain?",
    a: "Bilkul! MVD Computer Center ke DCA, ADCA, Tally aur Computer Typing certificates ISO Certified hain jo sabhi Govt & Private Jobs me valid hain."
  },
  {
    q: "Bacchon ke test results aur attendance ki jankari parents ko kaise milti hai?",
    a: "Hum har Sunday Board Pattern Weekly Test karate hain aur test report card + attendance direct parents ke WhatsApp number par send ki jaati hai. Regular PTM bhi hoti hai."
  },
  {
    q: "Kya Online Batches ke saath PDF Notes aur Homework milta hai?",
    a: "Haan, Online + Offline sabhi students ko Chapterwise NCERT Handwritten Notes, Daily Practice Problems (DPP) aur 5 Years PYQ Solutions PDF Free milte hain."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Pehla question default open rahega

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
          Admission, Batches, Fees aur Computer Center se jude sabhi aam sawalon ke jawab yahan padhein.
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