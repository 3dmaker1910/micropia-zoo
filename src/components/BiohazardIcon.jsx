import React from 'react';

export default function BiohazardIcon({ size = 48, color = '#facc15' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" opacity="0.3" />
      <path d="M50 15 C38 30, 28 45, 42 55 L50 50 L58 55 C72 45, 62 30, 50 15Z" fill={color} opacity="0.8" />
      <path d="M20 75 C30 60, 35 48, 42 55 L50 50 L46 60 C40 72, 25 78, 20 75Z" fill={color} opacity="0.8" />
      <path d="M80 75 C75 78, 60 72, 54 60 L50 50 L58 55 C65 48, 70 60, 80 75Z" fill={color} opacity="0.8" />
      <circle cx="50" cy="50" r="8" fill={color} />
    </svg>
  );
}
