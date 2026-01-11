import FadeIn from "./ui/FadeIn";
import { useCountUpOnScroll } from '../hooks/useCountUp';
// import Button from "./Button"; // Commented out - button is hidden for now

import IndiaMapSvg from "./IndiaMapSvg";

const IndianStatesSection = () => {
  // Count-up animations for metric boxes - trigger on scroll
  const { ref: statesRef, count: statesCount } = useCountUpOnScroll("35+", { duration: 2000, delay: 0 });
  const { ref: languagesRef, count: languagesCount } = useCountUpOnScroll("30+", { duration: 2000, delay: 100 });
  const { ref: peopleRef, count: peopleCount } = useCountUpOnScroll("1.4+", { duration: 2000, delay: 200 });
  const { ref: educationRef, count: educationText } = useCountUpOnScroll("Year-Round", { duration: 2000, delay: 300 });
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      {/* SEO-friendly heading */}
      <h2 className="sr-only">Bitcoin Conferences Across All 35 Indian States and Union Territories</h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* LEFT COLUMN: Content + Asymmetric Stats Grid */}
        <div className="w-full lg:w-[45%] flex flex-col gap-10">
          {/* Header Content - Left Aligned */}
          <FadeIn direction="right" duration={800}>
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tighter uppercase font-heading">
                One <span className="text-[#ff6501]">Nation</span> <br />
                One <span className="text-[#ff6501]">Mission</span>
              </h2>
              <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed max-w-xl border-l-2 border-[#ff6501] pl-6">
                Regional Node Bitcoin Conferences across all 27 States & 8 Union Territories in their vernacular languages, spreading Bitcoin awareness and education Nationwide.
              </p>
            </div>
          </FadeIn>

          {/* Asymmetric Stats Grid - 2x2 Aligned */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-lg">
            <FadeIn direction="up" delay={200} duration={800}>
              <div ref={statesRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#ff6501]/10 p-6 transition-all hover:border-[#ff6501]/30 hover:bg-[#ff6501]/15 h-full flex flex-col justify-center min-h-[160px]">
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 font-heading">{statesCount}</div>
                  <div className="text-[#ff6501] uppercase tracking-wider text-xs font-bold">States & UTs</div>
                </div>
                {/* Decorative Blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ff6501] rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={300} duration={800}>
              <div ref={languagesRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#ff6501]/10 p-6 transition-all hover:border-[#ff6501]/30 hover:bg-[#ff6501]/15 h-full flex flex-col justify-center min-h-[160px]">
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 font-heading">{languagesCount}</div>
                  <div className="text-[#ff6501] uppercase tracking-wider text-xs font-bold">Languages</div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={400} duration={800}>
              <div ref={peopleRef} className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#ff6501]/10 p-6 transition-all hover:border-[#ff6501]/30 hover:bg-[#ff6501]/15 h-full flex flex-col justify-center min-h-[160px]">
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 font-heading">{peopleCount}</div>
                  <div className="text-[#ff6501] uppercase tracking-wider text-xs font-bold">Billion People</div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] opacity-[0.1] group-hover:opacity-20 transition-opacity"></div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={500} duration={800}>
              <div ref={educationRef} className="relative group overflow-hidden rounded-3xl border border-[#ff6501] bg-[#ff6501] p-6 transition-all hover:bg-[#ff6501]/90 h-full flex flex-col justify-center min-h-[160px] shadow-[0_0_30px_rgba(255,101,1,0.3)]">
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-black text-black mb-2 font-heading leading-tight">{educationText}</div>
                  <div className="text-black uppercase tracking-wider text-xs font-bold">Of Education</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* RIGHT COLUMN: The Map (Adjusted Size) */}
        <div className="w-full lg:w-[55%] relative z-20">
          <FadeIn direction="left" delay={200} duration={1000} className="relative z-20">
            <div className="relative aspect-square w-full pointer-events-auto">
              <IndiaMapSvg
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,101,1,0.15)] scale-105 lg:scale-110 origin-center translate-x-12 lg:translate-x-24 relative z-20"
              />
              {/* Dynamic Back Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-tr from-[#ff6501]/10 to-transparent rounded-full blur-[80px] -z-10"></div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div >
  );
};

export default IndianStatesSection;
