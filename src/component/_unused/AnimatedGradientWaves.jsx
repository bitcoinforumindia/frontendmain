import React from 'react';

const AnimatedGradientWaves = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
            {/* Ambient glow that pulses */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 102, 255, 0.35), transparent 70%)',
                    animation: 'pulse-glow 8s ease-in-out infinite',
                    filter: 'blur(80px)',
                }}
            />
        </div>
    );
};

export default AnimatedGradientWaves;




