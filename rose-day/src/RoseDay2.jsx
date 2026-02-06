import React, { useState } from 'react';
import Rose from './components/Rose';

export default function RoseDayApp() {
  const TOTAL_TAPS = 12;

  const messages = [

    `তোমার জীবন ফুটে উঠুক গোলাপের মতো 
ভালোবাসার ছোঁয়ায়,
উষ্ণতার আবেশে,
আর এমন মুহূর্তে ভরা
যেগুলো হৃদয়ে থেকে যায়|`,

`ভালোবাসা তোমাকে ছুঁয়ে যাক নীরবে,
উষ্ণতা থাকুক সবসময় পাশে,
আর তোমার জীবন
গোলাপের মতো সুন্দরভাবে ফুটে উঠুক।`,

`ভালোবাসায় ভরে উঠুক তোমার দিন,
উষ্ণতায় আলো পাক প্রতিটি মুহূর্ত 
গোলাপের মতো,
শুধু তোমার জন্য।`

  ]

  const [roses, setRoses] = useState([]);
  const [tapCount, setTapCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const handleTap = () => {
    if (tapCount < TOTAL_TAPS) {
      setRoses(r => [
        ...r,
        {
          id: Date.now(),
          x: 8 + Math.random() * 84,
          scale: 0.9 + Math.random() * 0.2
        }
      ]);
      setTapCount(c => c + 1);

      if (tapCount + 1 === TOTAL_TAPS) {
        setTimeout(() => setShowCard(true), 600);

        setMessageIndex(i => (i + 1) % messages.length);

        return 0;
      }
    } else {
      setShowCard(true);
    }
  };

  return (
    <div
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
        touchAction: 'manipulation'
      }}
    >
      {/* Tap counter */}
      {tapCount >= 0 && tapCount < TOTAL_TAPS && (
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ff9ec4',
          fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
          fontFamily: 'serif'
        }}>
          {/* tap {TOTAL_TAPS - tapCount} more times */}
           {tapCount === 0
      ? `Tap ${TOTAL_TAPS} times`
      : `Tap ${TOTAL_TAPS - tapCount} more times`}
        </div>
      )}

      {tapCount >= TOTAL_TAPS && (
  <div
    style={{
      position: 'absolute',
      top: '25%',
      left: '50%',
      transform: 'translateX(-50%)',
      color: '#ff5fa2',
      fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
      fontFamily: 'serif',
      fontWeight: '600'
    }}
  >
    Happy Rose Day 🌹
  </div>
)}

      {/* Ground */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        height: '18vh',
        width: '100%',
        background: 'linear-gradient(to bottom, #123012, #0b1b0b)',
        borderTop: '2px solid rgba(100,160,100,.3)'
      }} />

      {/* Roses */}
      {roses.map(rose => (
        <div
          key={rose.id}
          style={{
            position: 'absolute',
            bottom: '18vh',
            left: `${rose.x}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <Rose scale={rose.scale} />
        </div>
      ))}

      {/* Card */}
      {showCard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        animation: 'fadeIn 0.3s ease-out',
          zIndex: 10
        }}>
          <div style={{
            width: 'min(90vw, 420px)',
            background: '#1a0f1e',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            color: '#ffb3d9',
              animation: 'cardSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTapCount(0);
                setRoses([]);
                setShowCard(false);
              }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: '#ff9ec4',
                fontSize: '22px'
              }}
            >
              ×
            </button>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
              Happy Rose Day 🌹
            </h1>
            {/* <p>
             ভালোবাসা তোমাকে ছুঁয়ে যাক নীরবে,
             উষ্ণতা থাকুক সবসময় পাশে,
             আর তোমার জীবন
             গোলাপের মতো সুন্দরভাবে ফুটে উঠুক।
            </p> */}
            <p style={{ whiteSpace: 'pre-line' }}>
              {messages[messageIndex]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}