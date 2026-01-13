import { useState, useEffect } from "react";
import Button from "../component/Button";
import FadeIn from "../component/ui/FadeIn";

// Quote images for desktop carousel
const Quote3 = "/assets/imgs/quote/Quote (3).png";
const Quote4 = "/assets/imgs/quote/Quote (4).png";
const Quote5 = "/assets/imgs/quote/Quote (5).png";
const Quote6 = "/assets/imgs/quote/Quote (6).png";
const Quote7 = "/assets/imgs/quote/Quote (7).png";
const Quote8 = "/assets/imgs/quote/Quote (8).png";

// Mobile static image
const QuoteMobile = "/assets/imgs/quote/Frame 47488.png";

const Speakers = () => {
  // Carousel state for desktop quote images
  const [currentQuote, setCurrentQuote] = useState(0);

  const quoteImages = [Quote3, Quote4, Quote5, Quote6, Quote7, Quote8];

  // Auto-slide carousel every 5 seconds (slow animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quoteImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quoteImages.length]);
  return (
    <div id="speakers" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-8">

      {/* 1. Header Section - The "Hook" */}
      <FadeIn direction="up" duration={800}>
        <div className="text-center mb-20 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#FF9900]/15 blur-[100px] rounded-full pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10 font-heading">
            World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FF9900]">Voices</span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-8">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Applications Open</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>
        </div>
      </FadeIn>

      {/* 2. The "Access Terminal" - Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

        {/* Left: The Manifesto */}
        <FadeIn direction="right" delay={200} duration={800}>
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#FF9900]/10 p-8 transition-all hover:border-[#FF9900]/30 hover:bg-[#FF9900]/15">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl text-white font-bold mb-6 leading-tight">
                Shape the Future of <br />
                <span className="text-[#FF9900]">Global Finance</span>
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                Share your expertise with a high-intent audience of builders, investors, and media.
                Our top speaker lineup is being curated and will be revealed soon.
              </p>


            </div>
          </div>
        </FadeIn>

        {/* Right: The Portal Card */}
        <FadeIn direction="left" delay={400} duration={800}>
          <div className="relative group">
            {/* Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9900]/10 to-[#FF9900]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative bg-black/60 backdrop-blur-xl border border-[#FF9900]/30 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden hover:border-[#FF9900] transition-colors">
              {/* Top Status Bar */}


              <h4 className="text-xl text-[#FF9900] font-bold mb-2">Ready to Speak?</h4>
              <p className="text-gray-300 text-sm mb-8 font-medium">Join the ranks of industry leaders defining the Bitcoin narrative.</p>

              <a href="/apply/speaker" className="block">
                <Button
                  label="Apply Now"
                  variant="primary"
                  className="w-full !py-4 text-lg font-bold shadow-[0_0_20px_rgba(255,153,0,0.2)] hover:shadow-[0_0_40px_rgba(255,153,0,0.4)] text-black"
                />
              </a>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Separation Line */}
      {/* Separation Line - HIDDEN since quotes are hidden */}
      {/* 
      <div className="w-full flex justify-center mt-16 sm:mt-24 mb-16">
        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      </div> 
      */}

      {/* Quote images - carousel for desktop, static for mobile - HIDDEN for now */}
      {/* 
      <FadeIn direction="up" delay={400} duration={1000}>
        <div className="flex justify-center overflow-hidden">
          <div className="lg:hidden w-full max-w-3xl">
            <img
              src={QuoteMobile}
              alt="Bitcoin Forum India 2026 Quote"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="hidden lg:block w-full max-w-7xl relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentQuote * 100}%)` }}
              >
                {quoteImages.map((quote, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <img
                      src={quote}
                      alt={`Bitcoin Forum India 2026 Quote ${index + 1}`}
                      className="w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {quoteImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className="group relative"
                  aria-label={`Go to quote ${index + 1}`}
                >
                  <div
                    className={`h-1 transition-all duration-500 ease-out ${currentQuote === index
                      ? "w-24 bg-[#FF9900]"
                      : "w-12 bg-gray-600 group-hover:bg-gray-400 group-hover:w-16"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn> 
      */}
    </div>
  );

};

export default Speakers;




