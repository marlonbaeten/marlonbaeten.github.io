import React, { useRef, useState } from 'react';

// @ts-ignore
const pad = (num, count = 2) => String(num).padStart(count, '0');

export default function Countdown({ running, duration }) {
  const minutes = pad(Math.floor(duration / 60));

  return (
    <div className="countdown">
      {minutes}:{pad(duration % 60)}
    </div>
  );
}
