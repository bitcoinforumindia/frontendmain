import React, { useState } from 'react';
import Button from './Button';
import FadeIn from './ui/FadeIn';

const TicketTiersSection = () => {
  const [activeTierIndex, setActiveTierIndex] = useState(1); // Default to VIP

  // ... (keep handleWinFreeTickets and ticketTiers array same as before)
  const handleWinFreeTickets = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('referralCode');
    const base = import.meta.env.VITE_DASHBOARD_URL;
    const params = new URLSearchParams({
      ...(referralCode && { referralCode: referralCode })
    });
    window.location.href = `${base.replace(/\/$/, '')}?${params.toString()}`;
  };

  const ticketTiers = [
    // ... (same data as before)
    {
      title: "General Admission",
      price: "99",
      currency: "USD",
      image: '/assets/imgs/ticketTiers/Bitcoin India Pass - GA.svg',
      features: [
        "Access to Bitcoin Forum India 2026",
        "Explore India's most significant Bitcoin Expo & Experience Zone",
        "Attend Main Stage sessions, panels, and community talks",
        "Entry to interactive workshops and demo spaces",
        "Meet and network with Bitcoin builders, investors, and enthusiasts"
      ]
    },
    {
      title: "VIP Pass",
      price: "599",
      currency: "USD",
      image: '/assets/imgs/ticketTiers/Bitcoin India Pass - VIP.svg',
      features: [
        "Everything in General Admission",
        "Priority check-in and express entry at all gates",
        "Access to the exclusive VIP Lounge with refreshments and networking zones",
        "Private roundtable discussions with speakers and partners",
        "Evening VIP Mixer invite with investors and ecosystem leaders",
        "Curated Bitcoin Forum India merchandise kit"
      ]
    },
    {
      title: "Satoshi Pass",
      price: "2999",
      currency: "USD",
      image: '/assets/imgs/ticketTiers/Bitcoin India Pass - WHALE.svg',
      features: [
        "All VIP benefits included",
        "Personal concierge for entry, seating, and support",
        "Access to Satoshi Lounge, private sessions with global speakers",
        "Reserved seating at all Main Stage events",
        "Gourmet dining and premium beverage service",
        "Exclusive Satoshi Night, a private celebration with key leaders",
        "Invitation-only Investor & Policy Roundtable",
        "Media and press visibility as a Whale supporter"
      ]
    }
  ];

  const activeTier = ticketTiers[activeTierIndex];

  return (
    <div id="tickets" className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="w-full flex justify-center mb-16">
        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      </div>
      <FadeIn direction="up" duration={800}>
        <div className="text-center mb-16 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-[#FF9900]/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Grab Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFC04D]">Tickets</span>
          </h2>

          <div className="flex items-center justify-center gap-4 text-[#FF9900]/80 mb-4">
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Limited Availability</span>
            <div className="h-[1px] w-12 bg-[#FF9900]"></div>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Choose your level of access to <span className="text-white font-semibold">India's Definitive Bitcoin Experience</span>.
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-8 lg:h-[600px]">

        {/* LEFT PANEL: The "Power View" (Details) */}
        <div className="lg:w-2/3 h-full">
          <div className="relative h-full bg-black/60 backdrop-blur-xl border border-[#FF9900]/30 rounded-3xl p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row gap-8 transition-all duration-500 shadow-2xl">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9900]/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Image Side */}
            <div className="lg:w-[50%] flex flex-col items-center justify-center">
              <img
                src={activeTier.image}
                alt={activeTier.title}
                className="w-full h-auto max-h-[550px] object-contain drop-shadow-[0_0_30px_rgba(255,153,0,0.3)] transform transition-transform duration-500 key={activeTierIndex} animate-in fade-in zoom-in-95"
              />
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold text-[#FF9900] mb-1"><span className="text-[#FF9900]">$</span>{activeTier.price}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">{activeTier.currency}</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-[50%] flex flex-col relative z-10 h-full">
              <h3 className="text-3xl lg:text-5xl font-bold text-[#FF9900] mb-6 font-heading tracking-tight">{activeTier.title}</h3>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-8 pointer-events-auto">
                {activeTier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#FF9900] group-hover:shadow-[0_0_8px_#FF9900] transition-all flex-shrink-0"></div>
                    <span className="text-gray-200 text-lg leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                label="Coming Soon"
                variant="primary"
                disabled={true}
                className="w-full lg:w-auto self-start mt-auto !bg-[#FF9900] !text-black font-bold text-lg px-8 py-4 opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: The "Selector Strips" */}
        <div className="lg:w-1/3 flex flex-col gap-4 justify-center">
          {ticketTiers.map((tier, index) => {
            const isActive = activeTierIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTierIndex(index)}
                className={`relative p-6 rounded-2xl text-left transition-all duration-300 group border backdrop-blur-sm
                   ${isActive
                    ? 'bg-black/70 border-[#FF9900] shadow-[0_0_30px_rgba(255,153,0,0.15)] scale-105 z-10'
                    : 'bg-black/40 border-[#FF9900]/30 hover:bg-black/60 hover:border-[#FF9900]/50 opacity-70 hover:opacity-100'
                  }
                 `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-xl font-bold mb-1 transition-colors text-[#FF9900]`}>
                      {tier.title}
                    </div>
                    <div className="text-white font-bold font-mono">${tier.price}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

      </div>

      {/* Event Details Footer */}
      <FadeIn direction="up" delay={400} duration={800}>
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white max-w-4xl mx-auto">
            <div className="text-center card-hover-lift">
              <div className="text-[#FF9900] font-sora font-bold text-3xl mb-2">Hyderabad</div>
              <div className="metric-label text-sm">Location</div>
            </div>
            <div className="text-center card-hover-lift">
              <div className="text-[#FF9900] font-sora font-bold text-3xl mb-2">2026</div>
              <div className="metric-label text-sm">Year</div>
            </div>
            <div className="text-center card-hover-lift">
              <div className="text-[#FF9900] font-sora font-bold text-3xl mb-2">MARCH</div>
              <div className="metric-label text-sm">Date</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="w-full flex justify-center mt-12 mb-20">
        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#FF9900]/30 to-transparent"></div>
      </div>

    </div>
  );
};

export default TicketTiersSection;




