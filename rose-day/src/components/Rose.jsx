
import React, { useEffect, useRef, useState } from 'react';

export default function Rose({ scale = 1, sway = 5, duration = 7 }) {
  const stemRef = useRef(null);
  const [bloom, setBloom] = useState({ x: 60, y: 20, angle: 0 });

  useEffect(() => {
    if (!stemRef.current) return;

    const path = stemRef.current;
    const len = path.getTotalLength();

    const end = path.getPointAtLength(0);
    const prev = path.getPointAtLength(6);

    const angle =
      Math.atan2(end.y - prev.y, end.x - prev.x) * (180 / Math.PI)-270;

    setBloom({ x: end.x, y: end.y, angle });
  }, []);

  return (
    <svg
      viewBox="0 0 120 220"
      style={{
        width: '60px',
        height: 'auto',
        overflow: 'visible',
        transform: `scale(${scale})`
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="petalOuter" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff7aa2" />
          <stop offset="60%" stopColor="#ff2f6a" />
          <stop offset="100%" stopColor="#b1003a" />
        </radialGradient>

        <radialGradient id="petalInner" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff9ab8" />
          <stop offset="100%" stopColor="#cc003d" />
        </radialGradient>

        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a4d0d" />
          <stop offset="50%" stopColor="#5ea843" />
          <stop offset="100%" stopColor="#1a4d0d" />
        </linearGradient>
      </defs>

      {/* Wind sway */}
      <g
        style={{
          transformBox: 'fill-box',
          transformOrigin: '50% 100%',
          animation: `sway ${duration}s ease-in-out infinite`
        }}
      >
        {/* Stem */}
        <path
          ref={stemRef}
          d="M60 18 C56 100, 64 180, 60 210"
          stroke="url(#stemGrad)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Leaf */}
        <path
          d="M60 155 C30 145, 25 165, 45 175 C55 180, 65 170, 60 155"
          fill="#4a8c2a"
        />

        {/* Bloom (LOCKED to stem tip) */}
        <g
          transform={`
            translate(${bloom.x} ${bloom.y})
            rotate(${bloom.angle})
          `}
        >
          <g transform="rotate(0)">
            <path
              d="M0 -38 C22 -34, 28 -10, 0 8 C-28 -10, -22 -34, 0 -38"
              fill="url(#petalOuter)"
            />
            <path
              d="M0 -36 C18 -32, 24 -8, 0 6 C-24 -8, -18 -32, 0 -36"
              fill="url(#petalOuter)"
              transform="rotate(38)"
              opacity="0.9"
            />
            <path
              d="M0 -36 C18 -32, 24 -8, 0 6 C-24 -8, -18 -32, 0 -36"
              fill="url(#petalOuter)"
              transform="rotate(-42)"
              opacity="0.88"
            />
          </g>

          <g transform="rotate(8)">
            <path
              d="M0 -26 C14 -24, 18 -6, 0 6 C-18 -6, -14 -24, 0 -26"
              fill="url(#petalInner)"
            />
          </g>
        </g>
      </g>

      <style>{`
        @keyframes sway {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(${sway}deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-${sway}deg); }
        }
      `}</style>
    </svg>
  );
}