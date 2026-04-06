"use client";

import { motion } from "framer-motion";

export default function MouseFloat() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Mouse body - styled div */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {/* Mouse shape */}
        <div className="relative w-40 h-56 md:w-48 md:h-64 rounded-[40%_40%_45%_45%] border border-cyan-400/30 bg-gradient-to-b from-[#0a0f1a] to-[#080c14] glow-cyan backdrop-blur-sm">
          {/* Center line */}
          <div className="absolute left-1/2 top-[15%] h-[30%] w-[1px] -translate-x-1/2 bg-cyan-400/40" />

          {/* Scroll wheel */}
          <div className="absolute left-1/2 top-[18%] w-3 h-6 -translate-x-1/2 rounded-full border border-cyan-400/50 bg-[#060a12]">
            <div className="absolute inset-x-[1px] top-[1px] bottom-[1px] rounded-full bg-cyan-400/20" />
          </div>

          {/* Left / Right button split */}
          <div className="absolute left-[8%] top-[5%] bottom-[48%] w-[44%] rounded-b-lg border-b border-r border-cyan-400/15" />
          <div className="absolute right-[8%] top-[5%] bottom-[48%] w-[44%] rounded-b-lg border-b border-l border-cyan-400/15" />

          {/* LED strip */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] h-[2px] w-[60%] rounded-full bg-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.5)]" />

          {/* Side grips */}
          <div className="absolute -left-[3px] top-[35%] h-[25%] w-[3px] rounded-l bg-cyan-400/20" />
          <div className="absolute -right-[3px] top-[35%] h-[25%] w-[3px] rounded-r bg-cyan-400/20" />
        </div>
      </motion.div>

      {/* Dynamic shadow */}
      <motion.div
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.35, 0.1, 0.35],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-50px] h-6 w-44 md:w-52 rounded-full bg-cyan-400/30 blur-xl"
      />
    </div>
  );
}
