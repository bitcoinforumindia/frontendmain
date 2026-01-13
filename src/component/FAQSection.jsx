import React, { useState } from 'react';
import FadeIn from './ui/FadeIn';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Bitcoin Forum India?",
      answer: "Bitcoin Forum India is the country's premier gathering for Bitcoin enthusiasts, builders, investors, and policymakers. It's a platform to explore Bitcoin's impact on India's economy, connect with global leaders, and experience the future of decentralized finance through engaging discussions, exhibitions, and networking opportunities."
    },
    {
      question: "When and where is Bitcoin Forum India 2026?",
      answer: "Bitcoin Forum India 2026 will be held in March 2026 in Hyderabad, India. Exact dates will be announced soon."
    },
    {
      question: "What can I expect at the conference?",
      answer: "Experience the Satoshi Lounge - a private space for founders, investors, and policymakers. Explore the Bitcoin Bazaar where startups and miners showcase real products. Visit the Bitcoin Art District featuring installations and live art. Connect at Network Square with curated meetups and partnerships. Shop limited edition Merch & Collectibles. And attend the Main Stage where global Bitcoin leaders discuss and debate what's next for Bitcoin."
    },
    {
      question: "Are there volunteer opportunities?",
      answer: "Yes! We have a dedicated Student Volunteer program - visit our Volunteer page to learn more and apply for exciting opportunities to be part of India's Premier Bitcoin conference."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="max-w-4xl mx-auto px-4 py-16">
      <FadeIn direction="up" duration={800}>
        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#F69415]">Asked</span> Questions
          </h2>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Knowledge Base</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about <span className="text-white font-semibold">Bitcoin Forum India 2026</span>
          </p>
        </div>
      </FadeIn>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FadeIn key={index} direction="up" delay={index * 100} duration={600}>
            <div
              className={`
                group rounded-2xl border transition-all duration-300 overflow-hidden
                ${openIndex === index
                  ? 'bg-[#FF9900]/15 border-[#FF9900]/50 shadow-[0_0_30px_rgba(255,153,0,0.1)]'
                  : 'bg-[#FF9900]/10 border-white/10 hover:bg-[#FF9900]/15 hover:border-[#FF9900]/30'
                }
              `}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
              >
                <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${openIndex === index ? 'text-[#FF9900]' : 'text-white group-hover:text-[#FF9900]'}`}>
                  {faq.question}
                </span>
                <div className={`
                   w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                   ${openIndex === index ? 'border-[#FF9900] bg-[#FF9900] text-black rotate-180' : 'border-white/20 text-white group-hover:border-[#FF9900]'}
                `}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-8 pb-6 text-gray-300 text-base md:text-lg leading-relaxed border-t border-[#FF9900]/30 pt-4 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;




