import React, { useState } from "react";
import Button from "./Button";
import FadeIn from "./ui/FadeIn";
import { useCountUpOnScroll } from '../hooks/useCountUp';

const Hero = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    // Count up animations for mobile stats
    const { ref: attendeesRef, count: attendeesCount } = useCountUpOnScroll("50k+", { duration: 2000, delay: 0 });
    const { ref: speakersRef, count: speakersCount } = useCountUpOnScroll("150+", { duration: 2000, delay: 100 });
    const { ref: sponsorsRef, count: sponsorsCount } = useCountUpOnScroll("100+", { duration: 2000, delay: 200 });
    const { ref: daysRef, count: daysCount } = useCountUpOnScroll("2 days", { duration: 2000, delay: 300 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    const handleWinFreeTickets = () => {
        // Get referral code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const referralCode = urlParams.get('referralCode');

        // Direct redirect to dashboard with referral code
        const base = import.meta.env.VITE_DASHBOARD_URL;
        const params = new URLSearchParams({
            ...(referralCode && { referralCode: referralCode })
        });

        window.location.href = `${base.replace(/\/$/, '')}?${params.toString()}`;
    };

    return (

        <section className="relative w-full min-h-[65vh] lg:min-h-[85vh] flex flex-col justify-end px-4 sm:px-8 lg:px-24 overflow-hidden pt-44 lg:pt-48 pb-12 lg:pb-24">

            <div className="z-10 w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
                {/* Content Section - Left Side */}
                <div className="flex flex-col items-center lg:items-start w-full lg:w-[60%] relative z-20">
                    <FadeIn direction="up" delay={400} duration={800} className="w-full">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tighter text-center lg:text-left font-heading text-white">
                            INDIA'S PREMIER <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFC04D] drop-shadow-[0_0_20px_rgba(255,153,0,0.3)]">
                                BITCOIN
                            </span> GATHERING
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                            Here in Hyderabad. Join <span className="text-[#FF9900] font-bold">50,000+</span> attendees, <span className="text-[#FF9900] font-bold">150+</span> speakers, and industry leaders for a historic event.
                        </p>
                    </FadeIn>

                    {/* Mobile-Only Enhanced Description */}
                    <FadeIn direction="up" delay={500} duration={800} className="lg:hidden w-full mt-8 space-y-4">
                        <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
                            <div ref={attendeesRef} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-[#FF9900]/10">
                                <div className="text-2xl font-bold text-[#FF9900] mb-1">{attendeesCount}</div>
                                <div className="text-gray-300 text-sm uppercase tracking-wide">Expected Attendees</div>
                            </div>
                            <div ref={speakersRef} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-[#FF9900]/10">
                                <div className="text-2xl font-bold text-[#FF9900] mb-1">{speakersCount}</div>
                                <div className="text-gray-300 text-sm uppercase tracking-wide">Global Speakers</div>
                            </div>
                            <div ref={sponsorsRef} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-[#FF9900]/10">
                                <div className="text-2xl font-bold text-[#FF9900] mb-1">{sponsorsCount}</div>
                                <div className="text-gray-300 text-sm uppercase tracking-wide">Industry Sponsors</div>
                            </div>
                            <div ref={daysRef} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-[#FF9900]/10">
                                <div className="text-2xl font-bold text-[#FF9900] mb-1">{daysCount}</div>
                                <div className="text-gray-300 text-sm uppercase tracking-wide">Days of Networking</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm text-center leading-relaxed max-w-xl mx-auto px-2">
                            Join the movement shaping India's Bitcoin future through technology, education, and innovation
                        </p>
                    </FadeIn>

                    <FadeIn direction="up" delay={600} duration={800} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-8 lg:mt-10">
                        <Button
                            label="Get Tickets"
                            variant="primary"
                            className="px-5 py-3 text-sm sm:px-8 sm:py-4 sm:text-lg font-bold shadow-[0_0_20px_rgba(255,153,0,0.4)] hover:shadow-[0_0_30px_rgba(255,153,0,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                            onClick={handleWinFreeTickets}
                        />
                        <a href="/#sponsors-cta">
                            <Button
                                label="Become a Sponsor"
                                variant="secondary"
                                className="px-5 py-3 text-sm sm:px-8 sm:py-4 sm:text-lg font-bold border-2 border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-black transition-all duration-300"
                            />
                        </a>
                    </FadeIn>
                </div>

                {/* Bitcoin Image - Right Side (Refined size and 3D Tilt Position) - Hidden on Mobile */}
                <FadeIn direction="up" delay={200} className="hidden lg:block relative w-[45%] sm:w-[40%] lg:w-[40%] lg:max-w-[500px] lg:-mt-12 perspective-1000 mb-8 lg:mb-0">
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                        className="w-full h-auto cursor-pointer pointer-events-auto"
                    >
                        <img
                            src="/assets/imgs/logo/logo.svg"
                            alt="Bitcoin India Forum"
                            className="w-full h-auto drop-shadow-[0_0_60px_rgba(255,153,0,0.5)] animate-float-fast pointer-events-none"
                        />
                    </div>
                </FadeIn>
            </div>

        </section>
    );
};

export default Hero;
