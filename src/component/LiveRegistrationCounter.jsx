import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine } from 'react-icons/fa';
import { useCountUpOnScroll } from '../hooks/useCountUp';

const LiveRegistrationCounter = () => {
  const INITIAL_COUNT = 60300;
  const UPDATE_INTERVAL = 370000; // 10 seconds
  const BASE_DATE = new Date('2025-11-06T00:00:00').getTime();

  // Count-up animations for metric boxes - trigger on scroll
  const { ref: attendeesRef, count: attendeesCount } = useCountUpOnScroll("50k+", { duration: 2000, delay: 0 });
  const { ref: speakersRef, count: speakersCount } = useCountUpOnScroll("150+", { duration: 2000, delay: 100 });
  const { ref: sponsorsRef, count: sponsorsCount } = useCountUpOnScroll("100+", { duration: 2000, delay: 200 });
  const { ref: daysRef, count: daysCount } = useCountUpOnScroll("2 days", { duration: 2000, delay: 300 });

  // Calculate global count based on time since BASE_DATE with deterministic increases
  const getGlobalBaseCount = () => {
    const now = Date.now();
    const timeSinceBase = now - BASE_DATE;
    const intervalsSinceBase = Math.floor(timeSinceBase / UPDATE_INTERVAL);

    // Use deterministic random based on interval number for consistency
    // Include the current interval in the calculation
    let totalIncrease = 0;
    for (let i = 0; i <= intervalsSinceBase; i++) {
      // Use the same seed every time - this ensures identical results
      const seed = i;
      const randomValue = Math.sin(seed) * 10000;
      // Generate 0-1 registrations per interval (realistic: ~6 per minute, ~360 per hour)
      const increase = Math.floor((Math.abs(randomValue) % 2)); // 0-1 range
      totalIncrease += increase;
    }

    return INITIAL_COUNT + totalIncrease;
  };

  // Get initial count - always use calculated count for true global consistency
  const getInitialCount = () => {
    return getGlobalBaseCount();
  };

  const [registrationCount, setRegistrationCount] = useState(getInitialCount);
  const [recentIncrease, setRecentIncrease] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const updateCounter = () => {
      const now = Date.now();
      const timeSinceBase = now - BASE_DATE;
      const intervalsSinceBase = Math.floor(timeSinceBase / UPDATE_INTERVAL);

      // Calculate current count with deterministic random increases
      // Include the current interval in the calculation
      let totalIncrease = 0;
      for (let i = 0; i <= intervalsSinceBase; i++) {
        const seed = i;
        const randomValue = Math.sin(seed) * 10000;
        // Generate 0-1 registrations per interval (realistic: ~6 per minute, ~360 per hour)
        const increase = Math.floor((Math.abs(randomValue) % 2)); // 0-1 range
        totalIncrease += increase;
      }

      const finalCount = INITIAL_COUNT + totalIncrease;

      // Calculate the increase for the current interval only
      const currentIntervalSeed = intervalsSinceBase;
      const currentRandomValue = Math.sin(currentIntervalSeed) * 10000;
      const currentIncrease = Math.floor((Math.abs(currentRandomValue) % 2)); // 0-1 range

      // Set the calculated count (deterministic for all users)
      setRegistrationCount(finalCount);

      setRecentIncrease(currentIncrease);
      setShowPulse(true);

      // Remove pulse effect after animation
      setTimeout(() => setShowPulse(false), 1000);
    };

    // Update immediately
    updateCounter();

    // Then update every UPDATE_INTERVAL (10 seconds)
    const interval = setInterval(updateCounter, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="max-w-6xl mx-auto relative z-10 p-4">

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">

        {/* 1. THE GLASS SHARD (Main Counter) - Asymmetric & Dominant */}
        <div className="relative flex-grow lg:w-2/3 group">
          <div className="absolute inset-0 bg-[#FF9900] blur-[60px] opacity-10 rounded-full"></div>

          <div className="relative h-full bg-black/60 backdrop-blur-xl border border-[#FF9900]/30 p-8 md:p-12 overflow-hidden
                          lg:rounded-l-[3rem] lg:rounded-tr-[1rem] lg:rounded-br-[5rem] rounded-3xl
                          shadow-[0_0_40px_rgba(255,153,0,0.1)] transition-all duration-500">



            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-[#FF9900]/10 text-[#FF9900] ${showPulse ? 'animate-pulse' : ''}`}>
                    <FaUsers className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 font-medium tracking-wide uppercase text-sm">Live Registrations</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                      <span className="text-green-400 text-xs font-bold tracking-wider">ONLINE NOW</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className={`text-6xl sm:text-7xl lg:text-8xl font-black text-[#FF9900] tracking-[0.05em] transition-all duration-300 ${showPulse ? 'scale-105' : 'scale-100'}`}>
                  {formatNumber(registrationCount)}
                </div>

                {recentIncrease > 0 && (
                  <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium transition-opacity duration-500 ${showPulse ? 'opacity-100' : 'opacity-0'}`}>
                    <FaChartLine />
                    <span>+{recentIncrease} just joined</span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#FF9900]/30 flex items-center justify-between text-sm text-gray-400">
                <p>Join the revolution.</p>
                <span className="text-[#FF9900]">Bitcoin Forum India 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE FLOATING STACK (Sub-stats) - Detached & Vertical - Hidden on Mobile */}
        <div className="hidden lg:flex flex-col gap-4 lg:w-1/3 justify-center">

          <StatsPill ref={attendeesRef} value={attendeesCount} label="Expected Attendees" delay={0} />
          <StatsPill ref={speakersRef} value={speakersCount} label="Global Speakers" delay={100} />
          <StatsPill ref={sponsorsRef} value={sponsorsCount} label="Industry Sponsors" delay={200} />
          <StatsPill ref={daysRef} value={daysCount} label="Days of Networking" delay={300} />

        </div>

      </div>
    </div>
  );
};

// Reusable "Pill" Component for the stack
// eslint-disable-next-line react/display-name
const StatsPill = React.forwardRef(({ value, label, delay }, ref) => (
  <div ref={ref} className="group relative bg-black/50 hover:bg-black/70 border border-[#FF9900]/30 hover:border-[#FF9900]/50 p-5 rounded-2xl transition-all duration-300 hover:translate-x-2 shadow-lg backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold text-[#FF9900] group-hover:text-[#FF9900] transition-colors">{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
      </div>
      <div className="h-8 w-1 bg-[#FF9900] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  </div>
));

export default LiveRegistrationCounter;




