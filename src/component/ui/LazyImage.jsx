import React, { useState, useEffect } from 'react';

/**
 * LazyImage component with skeleton loading state
 * Shows shimmer animation while image loads
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for image
 * @param {string} props.className - CSS classes for the image
 * @param {string} props.skeletonClassName - CSS classes for skeleton loader
 * @param {function} props.onLoad - Callback when image loads
 * @param {function} props.onError - Callback when image fails to load
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  skeletonClassName = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#1F1F1F] text-white/50`}>
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`skeleton skeleton-image ${skeletonClassName}`} />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'hidden' : 'block'}`}
          {...props}
        />
      )}
    </>
  );
};

export default LazyImage;




