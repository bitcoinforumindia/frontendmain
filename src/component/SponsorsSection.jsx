import React from "react";
import Button from "./Button";
import FadeIn from "./ui/FadeIn";
import { useCountUpOnScroll } from '../hooks/useCountUp';

const SponsorsSection = () => {
  // Count-up animations for metric boxes - trigger on scroll
  const { ref: onSiteRef, count: onSiteCount } = useCountUpOnScroll("50000+", { duration: 2000, delay: 0 });
  const { ref: speakersRef, count: speakersCount } = useCountUpOnScroll("150+", { duration: 2000, delay: 100 });
  const { ref: partnersRef, count: partnersCount } = useCountUpOnScroll("200+", { duration: 2000, delay: 200 });

  return (
    <div id="why-sponsor" className="max-w-6xl mx-auto">
      {/* Headline */}
      <FadeIn direction="up" duration={800}>
        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Sponsor</span> ?
          </h2>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Build The Future</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Partner with <span className="text-white font-semibold">India's Premier Bitcoin Conference</span>
          </p>
        </div>
      </FadeIn>

      {/* Value Props Strip */}
      <FadeIn direction="up" delay={200} duration={800}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <h3 className="text-[#FF9900] font-sora font-semibold text-lg sm:text-xl mb-4 tracking-tight">Unmatched Exposure</h3>
              <p className="metric-label">Headline stage slots, high‑visibility branding at key touchpoints, and always‑on digital presence before, during, and after the event.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
          </div>
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <h3 className="text-[#FF9900] font-sora font-semibold text-lg sm:text-xl mb-4 tracking-tight">High‑Intent Audience</h3>
              <p className="metric-label">Decision‑makers across exchanges, infra, wallets, dev tools, VC, media and enterprise, pre‑qualified and ready for real conversations.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
          </div>
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <h3 className="text-[#FF9900] font-sora font-semibold text-lg sm:text-xl mb-4 tracking-tight">Measurable Results</h3>
              <p className="metric-label">Qualified lead capture, pre‑scheduled buyer meetings, product demo sessions, and post‑event follow‑ups that translate conversations into opportunities.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
          </div>
        </div>
      </FadeIn>

      {/* Impact Metrics */}
      <FadeIn direction="up" delay={400} duration={800}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div ref={onSiteRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 text-center transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <div className="text-[#FF9900] font-sora text-2xl sm:text-3xl font-bold leading-none tracking-tight">{onSiteCount}</div>
              <div className="metric-label mt-2">On‑site Attendees</div>
            </div>
          </div>
          <div ref={speakersRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 text-center transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <div className="text-[#FF9900] font-sora text-2xl sm:text-3xl font-bold leading-none tracking-tight">{speakersCount}</div>
              <div className="metric-label mt-2">Global Speakers & Leaders</div>
            </div>
          </div>
          <div ref={partnersRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 text-center transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <div className="text-[#FF9900] font-sora text-2xl sm:text-3xl font-bold leading-none tracking-tight">{partnersCount}</div>
              <div className="metric-label mt-2">Partners & Exhibitors</div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Narrative Block */}
      <FadeIn direction="up" delay={600} duration={800}>
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 mb-10 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
          <div className="relative z-10">
            <p className="metric-label mb-4">
              Showcase your brand at the epicenter of Bitcoin in Asia. Beyond floor space, we design outcome‑driven
              activations that accelerate brand awareness, partnerships, and revenue.
            </p>
            <ul className="list-disc list-inside metric-label space-y-2">
              <li>Keynotes, launches, and press moments amplified across official and partner channels</li>
              <li>Conversion‑focused booth placement and attendee flow mapping</li>
              <li>Curated investor and enterprise introductions with tracked follow‑ups</li>
              <li>Content capture: reels, interviews, and snackable clips for your campaigns</li>
            </ul>
          </div>
          {/* Subtle background glow for large card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#FF9900] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] group-hover:opacity-10 transition-opacity"></div>
        </div>
      </FadeIn>

      {/* CTA */}
      <div id="sponsors-cta" className="text-center scroll-mt-24">
        <a href="/apply/sponsor">
          <div className="inline-block">
            <Button label="Become a Sponsor" variant="primary" withStarBorder={true} starSpeed="5s" className="px-8 py-3 text-base !bg-[#FF9900] text-black" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SponsorsSection;




