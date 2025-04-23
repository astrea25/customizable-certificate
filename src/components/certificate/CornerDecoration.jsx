import React from 'react';

const CornerDecoration = ({ position }) => {
  // Define the position styles based on the corner
  const positionStyles = {
    'top-left': 'top-8 left-8 rotate-0',
    'top-right': 'top-8 right-8 rotate-90',
    'bottom-right': 'bottom-8 right-8 rotate-180',
    'bottom-left': 'bottom-8 left-8 -rotate-90',
  };

  return (
    <div className={`absolute ${positionStyles[position]} w-16 h-16 pointer-events-none`}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0L64 0L64 16C64 24.8366 56.8366 32 48 32L16 32C7.16344 32 0 24.8366 0 16L0 0Z"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
        />
        <path
          d="M16 16L48 16"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 8L32 8"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CornerDecoration;
