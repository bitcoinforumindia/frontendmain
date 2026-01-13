import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered fade-in animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin for IntersectionObserver, default '0px'
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once, default true
 * @returns {Object} - { ref, isVisible }
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

/**
 * Custom hook for staggered scroll animations (for lists/grids)
 * @param {number} itemCount - Number of items to animate
 * @param {Object} options - Configuration options
 * @returns {Object} - { containerRef, getItemProps }
 */
export const useStaggeredScrollAnimation = (itemCount, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    staggerDelay = 100, // milliseconds between each item
  } = options;

  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the visibility of items
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * staggerDelay);
          }
          observer.unobserve(container);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, threshold, rootMargin, staggerDelay]);

  const getItemProps = (index) => ({
    'data-visible': visibleItems.has(index),
    style: {
      opacity: visibleItems.has(index) ? 1 : 0,
      transform: visibleItems.has(index) ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease-out, transform 0.6s ease-out`
    }
  });

  return { containerRef, getItemProps };
};




