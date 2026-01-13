import React, { useState, useEffect } from "react";
import { CanvasRevealEffect } from "./CanvasRevealEffect";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";

const BitcoinRevealBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (char === '₿') ctx.shadowColor = '#FF9900';
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, [isHovering, mouseX, mouseY]);

    return (
        <div className="h-full w-full bg-white relative pointer-events-none">
            {/* 1. PASSIVE LAYER: Subtle Gray Grid (Always Visible) */}
            <div className="h-full w-full absolute inset-0">
                <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-[#fff]"
                    colors={[
                        [210, 210, 210], // Light Gray/Silver
                        [230, 230, 230]  // Very Faint
                    ]}
                    opacities={[0.1, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.5, 0.8]}
                    dotSize={3} // Increased size
                    showGradient={false}
                />
            </div>

            {/* 2. ACTIVE LAYER: Bitcoin Orange (Spotlight Reveal) */}
            <motion.div
                className="h-full w-full absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: isHovering ? 1 : 0,
                    maskImage: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            black,
                            transparent 80%
                        )
                    `,
                }}
            >
                <CanvasRevealEffect
                    animationSpeed={5}
                    containerClassName="bg-[#fff]"
                    colors={[
                        [0, 102, 255], // Blue
                        [0, 120, 255] // Lighter Blue
                    ]}
                    opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
                    dotSize={3} // Increased size
                    showGradient={false}
                />
            </motion.div>

            {/* Overlay to ensure text readability if needed */}
            <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        </div>
    );
};

export default BitcoinRevealBackground;




