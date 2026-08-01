import { useEffect, useState, useRef } from 'react';

const DECORATIONS = [
  { emoji: '🎈', size: 28, speed: 18 },
  { emoji: '⭐', size: 16, speed: 22 },
  { emoji: '🌸', size: 20, speed: 25 },
  { emoji: '✨', size: 14, speed: 15 },
  { emoji: '💖', size: 18, speed: 20 },
  { emoji: '🎀', size: 22, speed: 24 },
  { emoji: '🦋', size: 20, speed: 19 },
  { emoji: '🌺', size: 18, speed: 26 },
  { emoji: '💫', size: 16, speed: 17 },
  { emoji: '🎈', size: 30, speed: 21 },
  { emoji: '⭐', size: 12, speed: 23 },
  { emoji: '💖', size: 14, speed: 16 },
  { emoji: '🌟', size: 18, speed: 28 },
  { emoji: '🎈', size: 24, speed: 14 },
  { emoji: '✨', size: 10, speed: 20 },
  { emoji: '🌸', size: 16, speed: 22 },
  { emoji: '💕', size: 14, speed: 19 },
  { emoji: '🎈', size: 26, speed: 25 },
  { emoji: '⭐', size: 14, speed: 18 },
  { emoji: '🌺', size: 16, speed: 23 },
];

// Deterministic pseudo-random from index (no Math.random)
function seededValue(index, offset = 0) {
  const val = ((index * 2654435761 + offset * 40503) & 0x7fffffff) / 0x7fffffff;
  return val;
}

export default function FloatingDecorations() {
  const [particles, setParticles] = useState([]);
  const animRef = useRef(null);

  useEffect(() => {
    const items = DECORATIONS.map((dec, i) => ({
      ...dec,
      id: i,
      left: seededValue(i, 1) * 100,
      delay: seededValue(i, 2) * 10,
      opacity: 0.3 + seededValue(i, 3) * 0.4,
      swayAmplitude: 10 + seededValue(i, 4) * 30,
    }));
    setParticles(items);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.speed}s linear ${p.delay}s infinite`,
            filter: 'drop-shadow(0 0 4px rgba(244, 196, 48, 0.2))',
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Sparkle dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            left: `${seededValue(i, 10) * 100}%`,
            top: `${seededValue(i, 20) * 100}%`,
            background: ['#F4C430', '#F8BBD0', '#CDB4DB'][i % 3],
            animation: `twinkle ${2 + seededValue(i, 30) * 3}s ease-in-out ${seededValue(i, 40) * 5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
