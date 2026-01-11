import React, { useEffect, useRef, useState } from "react";

export const BorderBeam = ({
    className,
    duration = 15,
    borderWidth = 3,
    colorFrom = "#ff6501",
    colorTo = "#ff6501",
    delay = 0,
}) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(element);
        return () => resizeObserver.disconnect();
    }, []);

    // Use 16px radius to exactly match rounded-2xl (Tailwind's rounded-2xl = 16px)
    const rx = 16;
    const { width: w, height: h } = dimensions;

    // Path: Top-Left -> Clockwise (Rounded Rectangle)
    const pathData = w > 0 ? `
    M ${rx} 0
    L ${w - rx} 0
    A ${rx} ${rx} 0 0 1 ${w} ${rx}
    L ${w} ${h - rx}
    A ${rx} ${rx} 0 0 1 ${w - rx} ${h}
    L ${rx} ${h}
    A ${rx} ${rx} 0 0 1 0 ${h - rx}
    L 0 ${rx}
    A ${rx} ${rx} 0 0 1 ${rx} 0
    Z
  `.replace(/\s+/g, ' ') : '';

    // Config for "Solid Line" Comet
    const particleCount = 40;

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-none z-[10] rounded-[inherit] ${className}`}
        >
            {/* Render Two Beams: Index 0 and 1 */}
            {w > 0 && [0, 1].map((beamIndex) => (
                <React.Fragment key={beamIndex}>
                    {Array.from({ length: particleCount }).map((_, i) => {
                        const t = i / (particleCount - 1);
                        const opacity = Math.pow(1 - t, 1.5);

                        // Tighter packing: overlapping creates solid look
                        const delayOffset = i * 0.02;

                        // Beam 2 is offset by half the duration (180 degrees opposite)
                        const beamOffset = beamIndex * (duration / 2);

                        return (
                            <div
                                key={`${beamIndex}-${i}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,

                                    // Long dashes = Solid Line
                                    width: '60px',
                                    height: `${borderWidth}px`,
                                    borderRadius: '2px',

                                    // Head (i===0) gets a White-Hot Tip
                                    background: i === 0
                                        ? `linear-gradient(90deg, ${colorFrom}, #ffffff)`
                                        : colorFrom,

                                    // Glow for Head
                                    boxShadow: i === 0
                                        ? `0 0 10px 1px #fff, 0 0 20px 2px ${colorFrom}`
                                        : 'none',

                                    zIndex: i === 0 ? 20 : 10,

                                    offsetPath: `path('${pathData}')`,
                                    offsetDistance: '0%',
                                    offsetRotate: 'auto',

                                    opacity: opacity,

                                    animation: `travel ${duration}s linear infinite`,
                                    // Apply offset for the second beam
                                    animationDelay: `${-(delay) - beamOffset + delayOffset}s`,
                                    willChange: 'offset-distance',
                                }}
                            />
                        );
                    })}
                </React.Fragment>
            ))}

            <style>{`
            @keyframes travel {
                from { offset-distance: 0%; }
                to { offset-distance: 100%; }
            }
        `}</style>
        </div>
    );
};

export default BorderBeam;
