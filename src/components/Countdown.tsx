import React from 'react';

// @ts-ignore
const pad = (num, count = 2) => String(num).padStart(count, '0');

export default function Countdown({ duration }) {
  const minutes = pad(Math.floor(duration / 60));

  return (
    <span className="countdown">
      {minutes}:{pad(duration % 60)}
    </span>
  );
}
