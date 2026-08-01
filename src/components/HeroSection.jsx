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
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4 },
          colors: ['#F8BBD0', '#CDB4DB', '#FFD6A5', '#F4C430', '#ec4899'],
        });
      }, 500);
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Create a simple birthday melody using Web Audio API
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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
      id="hero"
    >
      {/* Animated gradient circles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(248,187,208,0.3) 0%, transparent 70%)',
            top: '10%',
            left: '-5%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(205,180,219,0.3) 0%, transparent 70%)',
            top: '30%',
            right: '-5%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(255,214,165,0.25) 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 20, 0],
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
        className="relative mb-6"
      >
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            boxShadow: '0 8px 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(139, 92, 246, 0.15)',
          }}
        >
          <span className="text-white font-bold text-4xl md:text-5xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {BIRTHDAY_AGE}
          </span>
        </div>
        {/* Orbiting sparkle */}
        <motion.span
          className="absolute text-xl"
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
        className="text-4xl md:text-5xl mb-4 select-none"
      >
        🎉🎊🎈
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif' }}
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
            fontFamily: 'Dancing Script, cursive',
            background: 'linear-gradient(135deg, #ec4899, #F4C430)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '110%',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {BIRTHDAY_GIRL_NAME}
        </motion.span>
        <span className="inline-block ml-2">🎉</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-lg md:text-xl max-w-lg mx-auto mb-10 italic"
        style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive', fontSize: '1.3rem' }}
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
        className="glass-strong px-8 py-3.5 rounded-full font-medium text-base cursor-pointer flex items-center gap-2.5 transition-all duration-300"
        style={{
          color: '#4a2d5e',
          boxShadow: '0 4px 20px rgba(200, 150, 200, 0.2)',
        }}
      >
        <span className="text-xl">{musicPlaying ? '🔊' : '🎵'}</span>
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
        className="absolute bottom-8 text-center"
        style={{ color: '#4a2d5e' }}
      >
        <p className="text-xs mb-2 tracking-widest uppercase" style={{ opacity: 0.5 }}>
          Scroll Down
        </p>
        <span className="text-2xl">↓</span>
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

  // Happy Birthday melody (simplified)
  const notes = [
    // "Happy Birthday to you"
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
    { freq: 262, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 1.0 },
    // "Happy Birthday to you"
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 294, dur: 0.6 },
    { freq: 262, dur: 0.6 }, { freq: 392, dur: 0.6 }, { freq: 349, dur: 1.0 },
    // "Happy Birthday dear..."
    { freq: 262, dur: 0.4 }, { freq: 262, dur: 0.2 }, { freq: 523, dur: 0.6 },
    { freq: 440, dur: 0.6 }, { freq: 349, dur: 0.6 }, { freq: 330, dur: 0.6 }, { freq: 294, dur: 1.0 },
    // "Happy Birthday to you"
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
    // Loop after melody
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
