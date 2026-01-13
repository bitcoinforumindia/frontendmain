import React from "react";
import FadeIn from "../component/ui/FadeIn";

const WhyAttend = () => {
  return (
    <div id="why-attend" className="space-y-12 max-w-7xl mx-auto">
      <FadeIn direction="up" duration={800}>
        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Attend</span> ?
          </h2>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Experience The Future</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            What to expect at <span className="text-white font-semibold">Bitcoin Forum India 2026</span>
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        <FadeIn direction="up" delay={200} duration={800}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Satoshi Lounge (Wide) */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-2xl lg:text-3xl mb-4 tracking-tight">Satoshi Lounge</h3>
                  <p className="metric-label text-base sm:text-lg max-w-2xl">
                    A private space for founders, investors, and policymakers to connect, share insights, and spark high-value conversations that shape Bitcoin's future in India.
                  </p>
                </div>
                {/* Decorative Gradient Blob */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.15] group-hover:opacity-25 transition-opacity"></div>
              </div>
            </div>

            {/* 2. Bitcoin Bazaar (Tall/Standard) */}
            <div className="lg:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-xl lg:text-2xl mb-4 tracking-tight">Bitcoin Bazaar</h3>
                  <p className="metric-label text-base sm:text-lg">
                    The heart of innovation where startups, miners, and builders showcase real products and infrastructure.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Bitcoin Art District (Standard) */}
            <div className="lg:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-xl lg:text-2xl mb-4 tracking-tight">Art District</h3>
                  <p className="metric-label text-base sm:text-lg">
                    Experience Bitcoin through creativity. Installations, live art, and digital displays inspired by freedom.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Network Square (Wide) */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-2xl lg:text-3xl mb-4 tracking-tight">Network Square</h3>
                  <p className="metric-label text-base sm:text-lg max-w-2xl">
                    Meet the people building the future. Curated meetups, partnerships, and collaborations designed to help every conversation turn into opportunity.
                  </p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
              </div>
            </div>

            {/* 5. Main Stage (Wide) - Creating a ZigZag ( 2-1, 1-2, 2-1 ) */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-2xl lg:text-3xl mb-4 tracking-tight">Main Stage</h3>
                  <p className="metric-label text-base sm:text-lg max-w-2xl">
                    The center of it all. Global Bitcoin leaders, innovators, and policymakers come together to discuss, debate, and define what's next.
                  </p>
                </div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
              </div>
            </div>

            {/* 6. Merch (Standard) */}
            <div className="lg:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-[#FF9900] font-sora font-semibold text-xl lg:text-2xl mb-4 tracking-tight">Merch</h3>
                  <p className="metric-label text-base sm:text-lg">
                    Limited edition gear, art collabs, and memorabilia. Once it's gone, it's gone.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default WhyAttend;




