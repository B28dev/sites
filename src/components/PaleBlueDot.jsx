import React from 'react';

export default function PaleBlueDot({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-[10px] h-[10px] bg-accent rounded-full z-10 animate-pulse drop-shadow-[0_0_8px_rgba(74,158,255,1)]"></div>
      <div className="absolute w-[10px] h-[10px] bg-accent rounded-full animate-ping opacity-50 drop-shadow-[0_0_15px_rgba(74,158,255,0.9)]"></div>
    </div>
  );
}
