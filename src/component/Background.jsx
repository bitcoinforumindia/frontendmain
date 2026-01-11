import React from 'react';
import BackgroundRippleEffect from './ui/BackgroundRippleEffect';
import FloatingParticles from './FloatingParticles';

const Background = () => {
    return (
        <>
            {/* Non-interactive background elements at z-[-1] - BEHIND everything */}
            <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#ffffff] pointer-events-none">
                {/* Floating Particles - White bubbles */}
                <FloatingParticles />

                {/* Subtle gradient overlay at top */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f5f5f5_0%,transparent_50%)]" />
            </div>

            {/* Interactive grid at z-10 - between background and content */}
            <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
                <div className="pointer-events-auto">
                    <BackgroundRippleEffect rows={20} cols={60} cellSize={40} />
                </div>
            </div>
        </>
    );
};

export default Background;
