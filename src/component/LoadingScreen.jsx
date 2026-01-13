import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.8 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    // Call onLoadComplete after animation completes
    const completeTimer = setTimeout(() => {
      onLoadComplete();
    }, 3600); // Total: 2.8s display + 0.8s fade out

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center justify-center w-full max-w-[1200px]">
        <img
          src="/loading.svg"
          alt="Loading..."
          className="w-[85%] md:w-full object-contain mb-12"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;




