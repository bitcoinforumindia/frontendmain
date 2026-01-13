import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star particles
    const stars = [];
    const starCount = 300; // Adjusted count for cleaner look

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5, // Slightly larger
        opacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas (Transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        // Add subtle glow effect - Orange
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(0, 102, 255, ${star.opacity})`;

        ctx.fillStyle = `rgba(0, 102, 255, ${star.opacity})`; // Blue in rgba
        ctx.fill();

        // Reset shadow for next draw
        ctx.shadowBlur = 0;

        // Twinkle effect
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity > 0.7 || star.opacity < 0.2) {
          star.twinkleDirection *= -1;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }} // Layer above gradient but below content
    />
  );
};

export default StarfieldBackground;




