import React, { useState, useEffect } from "react";

const ImageSlideReveal = ({ 
  topImage, 
  bottomImage, 
  topImageAlt = "Top Image", 
  bottomImageAlt = "Bottom Image",
  autoSlide = true,
  autoSlideInterval = 3000,
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(-1); // -1 for left, 1 for right

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || isDragging) return;

    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        // If reached left edge, change direction to right
        if (prev <= 0) {
          setDirection(1);
          return 0;
        }
        // If reached right edge, change direction to left
        if (prev >= 100) {
          setDirection(-1);
          return 100;
        }
        // Move in current direction
        return prev + direction * 2; // Adjust speed by changing the multiplier
      });
    }, autoSlideInterval / 50); // Smooth animation

    return () => clearInterval(interval);
  }, [autoSlide, isDragging, direction, autoSlideInterval]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;

    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;

    setSliderPosition(percent);
  };

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Bottom Image (Revealed Image) */}
      <div className="relative w-full h-full">
        <img
          src={bottomImage}
          alt={bottomImageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Image (Sliding Image) */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src={topImage}
          alt={topImageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-600"></div>
            <div className="w-0.5 h-4 bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Optional: Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm backdrop-blur-sm">
        {topImageAlt}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm backdrop-blur-sm">
        {bottomImageAlt}
      </div>
    </div>
  );
};

export default ImageSlideReveal;



