'use client';

import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 py-4 group">
      {/* Modern Brain Icon */}
      <div className="relative w-12 h-12 logo-icon">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB86FC]/40 to-[#3700B3]/40 rounded-xl blur-xl transform group-hover:scale-110 transition-transform duration-300" />
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Neural Network Design */}
            <circle cx="20" cy="20" r="16" className="fill-[#BB86FC]/20" />
            <circle cx="20" cy="20" r="12" className="fill-[#BB86FC]/40" />
            <circle cx="20" cy="20" r="8" className="fill-[#BB86FC]" />
            
            {/* Connection Lines */}
            <path
              d="M20 12v16M12 20h16M16 16l8 8M24 16l-8 8"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              className="opacity-70"
            />
            
            {/* Outer Glow */}
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-[#BB86FC]/40"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* Modern Typography */}
      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold uppercase logo-text tracking-widest">
          <span className="text-white">Brain</span>
          <span className="bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/90 bg-clip-text text-transparent">Thought</span>
          <span className="logo-dots ml-1" aria-hidden="true">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </h1>
      </div>
    </div>
  );
} 