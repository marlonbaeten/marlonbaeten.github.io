import React, { useRef, useState } from 'react';

// @ts-ignore
const pad = (num, count = 2) => String(num).padStart(count, '0');

export default function Countdown({ running, duration }) {
  const minutes = pad(Math.floor(duration / 60));
  const [state, setState] = useState(99);
  const startTime = useRef(0);
  const requestRef = useRef(null);

  React.useEffect(() => {
    const animate = () => {
      if (running) {
        setState(Math.round(99 - ((new Date()).getTime() - startTime.current) / 10));
      }
      requestRef.current = requestAnimationFrame(animate);
    }

    startTime.current = (new Date()).getTime();
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [duration, running]);

  return (
    <div className="config">
      {minutes}:{pad(duration % 60)}:{pad(state)}
    </div>
  );
}
