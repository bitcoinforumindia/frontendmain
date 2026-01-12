import React, { useState } from "react";
import Button from "./Button";
import FadeIn from "./ui/FadeIn";

const Hero = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

        <section className="relative w-full min-h-[85vh] flex flex-col justify-end px-4 sm:px-8 lg:px-24 overflow-hidden pt-32 lg:pt-48 pb-12 lg:pb-24">

            <div className="z-10 w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
                {/* Content Section - Left Side */}
                <div className="flex flex-col items-center lg:items-start w-full lg:w-[60%] relative z-20 pointer-events-auto">
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

                    <FadeIn direction="up" delay={600} duration={800} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-8 lg:mt-10">
                        <Button
                            label="Get Free Tickets"
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

                {/* Bitcoin Image - Right Side (Refined size and 3D Tilt Position) */}
                <FadeIn direction="up" delay={200} className="relative w-[45%] sm:w-[40%] lg:w-[40%] lg:max-w-[500px] perspective-1000 mb-8 lg:mb-0">
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
                            src="/assets/imgs/logo/bitcoin.svg"
                            alt="Bitcoin"
                            className="w-full h-auto drop-shadow-[0_0_60px_rgba(255,153,0,0.5)] animate-float-fast pointer-events-none"
                        />
                    </div>
                </FadeIn>
            </div>

        </section>
    );
};

export default Hero;
