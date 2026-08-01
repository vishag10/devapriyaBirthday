import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BIRTHDAY_GIRL_NAME, BIRTHDAY_AGE, HERO_SUBTITLE } from '../data/content';

export default function HeroSection() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasConfettied = useRef(false);

  useEffect(() => {
    // Initial confetti burst on mount
    if (!hasConfettied.current) {
      hasConfettied.current = true;
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#F8BBD0', '#CDB4DB', '#FFD6A5', '#F4C430', '#ec4899'],
        });
      }, 500);
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = createBirthdayAudio();
    }

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '100svh', padding: '5rem 1rem 3rem' }}
      id="hero"
    >
      {/* Animated gradient circles - smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'min(400px, 70vw)',
            height: 'min(400px, 70vw)',
            background: 'radial-gradient(circle, rgba(248,187,208,0.3) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'min(350px, 60vw)',
            height: 'min(350px, 60vw)',
            background: 'radial-gradient(circle, rgba(205,180,219,0.3) 0%, transparent 70%)',
            top: '30%',
            right: '-10%',
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, -25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 'min(300px, 55vw)',
            height: 'min(300px, 55vw)',
            background: 'radial-gradient(circle, rgba(255,214,165,0.25) 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Age badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-4 sm:mb-6"
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 'clamp(80px, 20vw, 128px)',
            height: 'clamp(80px, 20vw, 128px)',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            boxShadow: '0 8px 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(139, 92, 246, 0.15)',
          }}
        >
          <span
            className="text-white font-bold"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.25rem)',
            }}
          >
            {BIRTHDAY_AGE}
          </span>
        </div>
        {/* Orbiting sparkle */}
        <motion.span
          className="absolute text-base sm:text-xl"
          style={{ top: -5, right: -5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          ✨
        </motion.span>
      </motion.div>

      {/* Party emojis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-3 sm:mb-4 select-none"
        style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}
      >
        🎉🎊🎈
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
        className="font-extrabold mb-4 sm:mb-6 leading-tight px-2"
        style={{
          fontSize: 'clamp(1.8rem, 7vw, 4.5rem)',
        }}
      >
        <span
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 40%, #F4C430 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Happy Birthday
        </span>
        <br />
        <motion.span
          style={{
            background: 'linear-gradient(135deg, #ec4899, #F4C430)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '105%',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {BIRTHDAY_GIRL_NAME}
        </motion.span>
        <span className="inline-block ml-1 sm:ml-2">🎉</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-sm sm:max-w-lg mx-auto mb-8 sm:mb-10 font-medium px-4"
        style={{
          color: '#4a2d5e',
          fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
        }}
      >
        "{HERO_SUBTITLE}"
      </motion.p>

      {/* Music button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-strong rounded-full font-medium cursor-pointer flex items-center gap-2 transition-all duration-300"
        style={{
          color: '#4a2d5e',
          boxShadow: '0 4px 20px rgba(200, 150, 200, 0.2)',
          padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(1.25rem, 4vw, 2rem)',
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
        }}
      >
        <span style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>{musicPlaying ? '🔊' : '🎵'}</span>
        {musicPlaying ? 'Music Playing...' : 'Play Birthday Music'}
        {musicPlaying && (
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-1"
          >
            ♪
          </motion.span>
        )}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute text-center"
        style={{ bottom: 'clamp(1rem, 3vw, 2rem)', color: '#4a2d5e' }}
      >
        <p className="text-xs mb-1 tracking-widest uppercase" style={{ opacity: 0.5 }}>
          Scroll Down
        </p>
        <span className="text-xl sm:text-2xl">↓</span>
      </motion.div>

      {/* Persistent music button (fixed position) */}
      {musicPlaying && (
        <button
          onClick={toggleMusic}
          className={`music-btn ${musicPlaying ? 'playing' : ''}`}
          title={musicPlaying ? 'Pause Music' : 'Play Music'}
        >
          {musicPlaying ? '🔊' : '🎵'}
        </button>
      )}
    </section>
  );
}

// Simple birthday melody using Web Audio API
function createBirthdayAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  let isPlaying = false;
  let timeoutIds = [];

  const notes = [
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
    { freq: 262, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 1.0 },
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
    { freq: 262, dur: 0.6 }, { freq: 392, dur: 0.6 }, { freq: 349, dur: 1.0 },
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 523, dur: 0.6 },
    { freq: 440, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 0.6 }, { freq: 294, dur: 1.0 },
    { freq: 466, dur: 0.4 }, { freq: 466, dur: 0.2 }, { freq: 440, dur: 0.6 },
    { freq: 349, dur: 0.6 }, { freq: 392, dur: 0.6 }, { freq: 349, dur: 1.0 },
  ];

  function playNote(freq, startTime, duration) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function playMelody() {
    if (ctx.state === 'suspended') ctx.resume();
    let time = ctx.currentTime + 0.1;
    notes.forEach((note) => {
      playNote(note.freq, time, note.dur);
      time += note.dur;
    });
    const totalDuration = notes.reduce((sum, n) => sum + n.dur, 0);
    const id = setTimeout(() => {
      if (isPlaying) playMelody();
    }, totalDuration * 1000 + 500);
    timeoutIds.push(id);
  }

  return {
    play() {
      isPlaying = true;
      playMelody();
    },
    pause() {
      isPlaying = false;
      timeoutIds.forEach(clearTimeout);
      timeoutIds = [];
    },
  };
}
