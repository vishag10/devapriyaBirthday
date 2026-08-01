import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { THANK_YOU_MESSAGE, FINAL_SURPRISE_MESSAGE } from '../data/content';

export default function FinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [showSurprise, setShowSurprise] = useState(false);

  const handleSurprise = () => {
    setShowSurprise(true);

    // Big celebration confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F8BBD0', '#CDB4DB', '#FFD6A5', '#F4C430', '#ec4899', '#8b5cf6', '#fff'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.25),
      spread: 26,
      startVelocity: 55,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.2),
      spread: 60,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.35),
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.1),
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.1),
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section className="py-20 px-4 md:px-8 pb-32" id="final" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="section-title text-3xl md:text-5xl mb-4">Thank You</h2>
          <p
            className="text-lg md:text-xl italic max-w-lg mx-auto"
            style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive', fontSize: '1.4rem' }}
          >
            "{THANK_YOU_MESSAGE}"
          </p>
        </motion.div>

        {/* Large heart animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 12 }}
          className="mb-10"
        >
          <motion.div
            className="text-8xl md:text-9xl inline-block"
            animate={{
              scale: [1, 1.15, 1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))',
            }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Surprise button */}
        <AnimatePresence mode="wait">
          {!showSurprise ? (
            <motion.button
              key="surprise-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6 }}
              onClick={handleSurprise}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(236, 72, 153, 0.35)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full text-white font-semibold text-lg cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #F4C430)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
                border: 'none',
                boxShadow: '0 4px 25px rgba(236, 72, 153, 0.3)',
              }}
            >
              ❤️ One Last Surprise
            </motion.button>
          ) : (
            <motion.div
              key="surprise-message"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 16px 60px rgba(200, 150, 200, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              {/* Sparkle decorations */}
              <div className="flex justify-center gap-3 mb-6 text-3xl">
                {['✨', '💖', '🌟', '💖', '✨'].map((e, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl leading-relaxed italic"
                style={{
                  color: '#2d1b3d',
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: '1.4rem',
                }}
              >
                "{FINAL_SURPRISE_MESSAGE}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 flex justify-center gap-2 text-2xl"
              >
                {['💕', '🌸', '💕'].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {h}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}
        >
          <p className="text-sm" style={{ color: '#4a2d5e', opacity: 0.7 }}>
            Made with{' '}
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤️
            </motion.span>{' '}
            especially for you.
          </p>
          <p className="text-xs mt-2" style={{ color: '#4a2d5e', opacity: 0.4 }}>
            Happy 22nd Birthday, Devapriya! 🎂
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
