import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`} aria-label="FluxusAI Logo">
      <svg
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Infinity symbol with interlocking loops */}
        {/* Left loop - Blue (passes under on left, over on right) */}
        <path
          d="M 30 50 
             Q 20 30, 40 30 
             Q 60 30, 70 50 
             Q 80 70, 100 70 
             Q 120 70, 130 50 
             Q 140 30, 160 30 
             Q 180 30, 170 50"
          fill="url(#blueGradient)"
          stroke="url(#blueGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Right loop - Fuchsia (passes over on left, under on right) */}
        <path
          d="M 170 50 
             Q 180 30, 160 30 
             Q 140 30, 130 50 
             Q 120 70, 100 70 
             Q 80 70, 70 50 
             Q 60 30, 40 30 
             Q 20 30, 30 50"
          fill="url(#fuchsiaGradient)"
          stroke="url(#fuchsiaGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Center connection - Blue passes over */}
        <ellipse
          cx="100"
          cy="50"
          rx="15"
          ry="20"
          fill="url(#blueGradient)"
          opacity="0.95"
        />
        
        {/* Center connection - Fuchsia passes under */}
        <ellipse
          cx="100"
          cy="50"
          rx="12"
          ry="17"
          fill="url(#fuchsiaGradient)"
          opacity="0.9"
        />
        
        {/* Gradients with highlights */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="1" />
            <stop offset="30%" stopColor="#1e3a8a" stopOpacity="1" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="70%" stopColor="#1e40af" stopOpacity="1" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
          </linearGradient>
          
          <linearGradient id="fuchsiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#701a75" stopOpacity="1" />
            <stop offset="30%" stopColor="#a21caf" stopOpacity="1" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
            <stop offset="70%" stopColor="#c026d3" stopOpacity="1" />
            <stop offset="100%" stopColor="#86198f" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

