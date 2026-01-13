import React from 'react';

/**
 * MoltenAurora - Premium dark gradient background with animated aurora orbs
 * Creates a sophisticated "Bitcoin forge" aesthetic with deep blacks and orange/amber glows
 */
const MoltenAurora = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Base gradient - deep black to charcoal */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#0d0d0d]" />

            {/* Subtle radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,102,255,0.15),transparent_50%)]" />

            {/* Top vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_0%,rgba(5,5,5,0.8)_70%)]" />

            {/* Aurora Orb 1 - Large primary orb, top-left area */}
            <div
                className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full animate-aurora-1"
                style={{
                    top: '-20%',
                    left: '-10%',
                    background: 'radial-gradient(circle, rgba(0,102,255,0.25) 0%, rgba(0,102,255,0.1) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Aurora Orb 2 - Secondary orb, right side */}
            <div
                className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full animate-aurora-2"
                style={{
                    top: '10%',
                    right: '-15%',
                    background: 'radial-gradient(circle, rgba(0,102,255,0.2) 0%, rgba(0,102,255,0.08) 40%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
            />

            {/* Aurora Orb 3 - Deep orange accent, bottom area */}
            <div
                className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full animate-aurora-3"
                style={{
                    bottom: '-10%',
                    left: '20%',
                    background: 'radial-gradient(circle, rgba(0,82,204,0.18) 0%, rgba(0,82,204,0.05) 50%, transparent 70%)',
                    filter: 'blur(90px)',
                }}
            />

            {/* Aurora Orb 4 - Subtle amber glow, center-right */}
            <div
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full animate-aurora-4"
                style={{
                    top: '40%',
                    right: '10%',
                    background: 'radial-gradient(circle, rgba(0,120,255,0.12) 0%, transparent 60%)',
                    filter: 'blur(70px)',
                }}
            />

            {/* Hero spotlight - draws focus to center-top */}
            <div
                className="absolute w-full h-[80vh] top-0 left-0"
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(0,102,255,0.08) 0%, transparent 60%)',
                }}
            />

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Bottom edge fade for smooth transitions */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
    );
};

export default MoltenAurora;




