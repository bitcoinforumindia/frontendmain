import { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Custom hook for count-up animations
 * @param {number|string} end - The target number (can include suffixes like "50k+", "150+")
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Animation duration in ms (default: 2000)
 * @param {number} options.delay - Delay before animation starts in ms (default: 0)
 * @param {boolean} options.start - Whether to start the animation (default: false, triggered by scroll)
 * @returns {string} - The current count value with suffix
 */
export const useCountUp = (end, options = {}) => {
  const {
    duration = 2000,
    delay = 0,
    start = false
  } = options;

  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  // Parse the end value to extract number and suffix - memoized to prevent recalculation
  const { targetNumber, suffix, multiplier } = useMemo(() => {
    const parseValue = (value) => {
      if (typeof value === 'number') {
        return { targetNumber: value, suffix: '', multiplier: '' };
      }

      const stringValue = value.toString();

      // Handle cases like "50k+", "150+", "2 days", "1.4+"
      const match = stringValue.match(/^(\d+(?:\.\d+)?)([kKmM]?)(.*)$/);
      if (match) {
        let number = parseFloat(match[1]);
        const mult = match[2].toLowerCase();
        let suff = match[3]; // Only the part after k/m (e.g., "+" or " days")

        // Convert k/m to actual numbers for animation
        if (mult === 'k') number *= 1000;
        if (mult === 'm') number *= 1000000;

        // If there's no multiplier but there's a suffix that starts with a letter, add space
        if (!mult && suff && /^[a-zA-Z]/.test(suff)) {
          suff = ' ' + suff;
        }

        return { targetNumber: number, suffix: suff, multiplier: mult };
      }

      // If no number found, treat as static text (e.g., "Year-Round")
      return { targetNumber: 0, suffix: stringValue, multiplier: '', isStatic: true };
    };

    return parseValue(end);
  }, [end]);

  useEffect(() => {
    if (!start) return;

    // If target is 0 or static text, don't animate
    if (targetNumber === 0) {
      return;
    }

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    let isCanceled = false;

    const animate = () => {
      if (isCanceled) return;

      const now = Date.now();

      if (now < startTime) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (now >= endTime) {
        setCount(targetNumber);
        return;
      }

      const progress = (now - startTime) / duration;
      // Ease-out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(targetNumber * easeOut);

      setCount(currentCount);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isCanceled = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [start, targetNumber, duration, delay]);

  // Format the count with suffix - memoize to prevent unnecessary recalculations
  const formattedCount = useMemo(() => {
    // If targetNumber is 0, this is static text (like "Year-Round"), show suffix only
    if (targetNumber === 0) {
      return suffix;
    }

    // If multiplier is 'k' or 'm', display as simplified number
    if (multiplier === 'k') {
      const kValue = Math.floor(count / 1000);
      return `${kValue}k${suffix}`;
    }
    if (multiplier === 'm') {
      const mValue = Math.floor(count / 1000000);
      return `${mValue}m${suffix}`;
    }

    // Format large numbers with commas
    const formattedNumber = count >= 1000 ? count.toLocaleString('en-US') : count;
    return `${formattedNumber}${suffix}`;
  }, [count, multiplier, suffix, targetNumber]);

  return formattedCount;
};

/**
 * Hook to trigger count-up when element scrolls into view
 */
export const useCountUpOnScroll = (end, options = {}) => {
  const elementRef = useRef(null);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldStart) {
            setShouldStart(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [shouldStart]);

  const count = useCountUp(end, { ...options, start: shouldStart });

  return { ref: elementRef, count };
};




