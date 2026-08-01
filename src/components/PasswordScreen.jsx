import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BIRTHDAY_PASSWORD,
  WELCOME_SUBTITLE,
  PASSWORD_HINT,
  PASSWORD_FORMAT_HINT,
  WRONG_PASSWORD_MSG,
} from '../data/content';

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === BIRTHDAY_PASSWORD) {
      setError('');
      setIsCorrect(true);
      setTimeout(() => onSuccess(), 2000);
    } else {
      setError(WRONG_PASSWORD_MSG);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 30%, #fff3e0 60%, #fce4ec 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      {/* Sparkle particles on correct password */}
      <AnimatePresence>
        {isCorrect && (
          <>
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * 360;
              const distance = 100 + (i % 5) * 60;
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + (i % 3) * 4,
                    height: 4 + (i % 3) * 4,
                    background: ['#F4C430', '#F8BBD0', '#CDB4DB', '#FFD6A5', '#fff'][i % 5],
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    opacity: 0,
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.02 }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Floating background decorations */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`bg-deco-${i}`}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          {['✨', '🌸', '💫', '🎀', '⭐', '🦋', '💖', '🌺', '🎈', '🎂', '🌟', '💐'][i]}
        </motion.div>
      ))}

      {/* Main card */}
      <AnimatePresence>
        {!isCorrect ? (
          <motion.div
            key="password-card"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: shake ? [0, -10, 10, -10, 10, -5, 5, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: -40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="glass-strong rounded-3xl p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden"
          >
            {/* Gold accent border top */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, #F4C430, #FFD6A5, #F4C430, transparent)',
              }}
            />

            {/* Cake emoji */}
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎂
            </motion.div>

            {/* Welcome title */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Birthday Girl!
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm md:text-base mb-8 italic"
              style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive', fontSize: '1.1rem' }}
            >
              "{WELCOME_SUBTITLE}"
            </p>

            {/* Lock icon */}
            <motion.div
              className="text-3xl mb-2"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              🔒
            </motion.div>
            <p className="text-sm font-medium mb-4" style={{ color: '#4a2d5e' }}>
              Enter the Secret Password
            </p>

            {/* Password form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter password..."
                  className="w-full px-5 py-3.5 rounded-2xl text-center text-lg font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: error
                      ? '2px solid #f87171'
                      : '2px solid rgba(205, 180, 219, 0.4)',
                    color: '#2d1b3d',
                    backdropFilter: 'blur(10px)',
                  }}
                  onFocus={(e) => {
                    if (!error) e.target.style.borderColor = '#CDB4DB';
                  }}
                  onBlur={(e) => {
                    if (!error) e.target.style.borderColor = 'rgba(205, 180, 219, 0.4)';
                  }}
                />
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="text-sm rounded-xl px-4 py-2"
                    style={{
                      background: 'rgba(248, 113, 113, 0.1)',
                      color: '#e11d48',
                      border: '1px solid rgba(248, 113, 113, 0.2)',
                    }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-2xl text-white font-semibold text-lg cursor-pointer transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.25)',
                }}
              >
                Open My Surprise ❤️
              </motion.button>
            </form>

            {/* Hints */}
            <div className="mt-6 space-y-2">
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(244, 196, 48, 0.08)',
                  border: '1px solid rgba(244, 196, 48, 0.2)',
                }}
              >
                <p className="text-xs font-medium" style={{ color: '#b8860b' }}>
                  💡 Hint
                </p>
                <p className="text-xs mt-1 italic" style={{ color: '#4a2d5e' }}>
                  "{PASSWORD_HINT}"
                </p>
              </div>
              <p className="text-xs" style={{ color: 'rgba(74, 45, 94, 0.5)' }}>
                {PASSWORD_FORMAT_HINT}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              🎉
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #F4C430)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome, Birthday Girl!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-lg"
              style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive' }}
            >
              Your surprise is loading... ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
