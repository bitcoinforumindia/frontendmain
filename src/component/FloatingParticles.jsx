import { useEffect, useRef } from 'react';

const FloatingParticles = () => {
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

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 10;
                this.size = Math.random() * 4 + 2;
                this.speedY = Math.random() * 0.5 + 0.2;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.pulsePhase += this.pulseSpeed;

                // Reset particle when it goes off screen
                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }

            draw() {
                const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
                const currentOpacity = this.opacity * pulse;

                // Draw circle particle
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Gradient fill for glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 2
                );
                gradient.addColorStop(0, `rgba(255, 101, 1, ${currentOpacity})`);
                gradient.addColorStop(0.5, `rgba(255, 101, 1, ${currentOpacity * 0.5})`);
                gradient.addColorStop(1, `rgba(255, 101, 1, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        // Create particles - responsive count
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 20 : 50; // 20 on mobile, 50 on desktop

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
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
            style={{ zIndex: 2 }}
        />
    );
};

export default FloatingParticles;




