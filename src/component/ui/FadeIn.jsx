import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * FadeIn component - Wraps children with scroll-triggered fade-in animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.direction - Animation direction: 'up', 'down', 'left', 'right', 'none' (default: 'up')
 * @param {number} props.delay - Delay before animation starts in ms (default: 0)
 * @param {number} props.duration - Animation duration in ms (default: 600)
 * @param {number} props.distance - Distance to translate in px (default: 30)
 * @param {number} props.threshold - Intersection threshold 0-1 (default: 0.1)
 * @param {boolean} props.triggerOnce - Trigger animation only once (default: true)
 * @param {string} props.className - Additional CSS classes
 */
const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = 30,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...rest
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        default:
          return 'none';
      }
    }
    return 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default FadeIn;




