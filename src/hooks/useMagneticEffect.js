import { useRef, useEffect } from 'react';

/**
 * Custom hook for magnetic button effect
 * Button moves toward cursor when hovering nearby
 * @param {Object} options - Configuration options
 * @param {number} options.magneticRadius - Radius in pixels where magnetic effect activates (default: 80)
 * @param {number} options.magneticStrength - How much the button moves (0-1), default: 0.3
 * @param {number} options.transitionSpeed - Transition speed in ms (default: 200)
 * @returns {Object} - { ref }
 */
export const useMagneticEffect = (options = {}) => {
  const {
    magneticRadius = 80,
    magneticStrength = 0.3,
    transitionSpeed = 200
  } = options;

  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticRadius) {
        // Calculate magnetic pull
        const pullX = distanceX * magneticStrength;
        const pullY = distanceY * magneticStrength;

        button.style.transform = `translate(${pullX}px, ${pullY}px)`;
        button.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      } else {
        // Reset when outside magnetic field
        button.style.transform = 'translate(0, 0)';
        button.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
      button.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    };

    // Add event listeners to document for wide detection area
    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticRadius, magneticStrength, transitionSpeed]);

  return { ref: buttonRef };
};




