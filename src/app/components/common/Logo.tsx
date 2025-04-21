'use client';

import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Set dimensions based on size
  let width = 120;
  let height = 40;
  
  switch (size) {
    case 'small':
      width = 90;
      height = 30;
      break;
    case 'large':
      width = 180;
      height = 60;
      break;
    default:
      break;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg width={width} height={height} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="30" height="30" rx="4" fill="#01311F" />
        <path d="M15 15 L25 25 M15 25 L25 15" stroke="#C6AA58" strokeWidth="3" strokeLinecap="round" />
        <text x="45" y="28" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#01311F">
          Roots IMS
        </text>
      </svg>
    </div>
  );
};

export default Logo; 