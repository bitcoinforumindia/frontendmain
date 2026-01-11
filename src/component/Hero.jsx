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

        <section className="relative w-full min-h-[85vh] flex flex-col justify-end px-4 sm:px-8 lg:px-24 overflow-hidden pt-32 lg:pt-72 pb-16">

            <div className="z-10 w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-12">
                {/* Content Section - Left Side */}
                <div className="flex flex-col items-center lg:items-start w-full lg:w-[55%]">
                    <FadeIn direction="up" delay={400} duration={800} className="w-full">
                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed text-center lg:text-left">
                            India's premier Bitcoin gathering is coming to Hyderabad. <br />
                            Join <span className="text-[#ff6501] font-bold">50,000+</span> attendees, <span className="text-[#ff6501] font-bold">150+</span> speakers, and industry leaders for a historic event.
                        </p>
                    </FadeIn>

                    <FadeIn direction="up" delay={600} duration={800} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 mt-6 sm:mt-8">
                        <Button
                            label="Get Free Tickets"
                            variant="primary"
                            className="px-5 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg font-bold shadow-lg shadow-btc-gold/20"
                            onClick={handleWinFreeTickets}
                        />
                        <a href="/#sponsors-cta">
                            <Button
                                label="Become a Sponsor"
                                variant="secondary"
                                className="px-5 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg font-bold !border-[#ff6501] !text-[#ff6501]"
                            />
                        </a>
                    </FadeIn>
                </div>

                {/* Bitcoin Image - Right Side (Refined size and 3D Tilt Position) */}
                <FadeIn direction="up" delay={200} className="relative w-[65%] sm:w-[55%] lg:w-[45%] lg:max-w-[450px] lg:-mt-20 perspective-1000">
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
                            className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,101,1,0.3)] animate-float-fast pointer-events-none"
                        />
                    </div>
                </FadeIn>
            </div>

        </section>
    );
};

export default Hero;
