import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BIRTHDAY_LETTER } from '../data/content';

export default function BirthdayLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Split letter into paragraphs
  const paragraphs = BIRTHDAY_LETTER.split('\n').filter((p) => p.trim());

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="letter"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">💌</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            A Letter For You
          </h2>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl sm:rounded-3xl"
          style={{
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow:
              '0 16px 60px rgba(200, 150, 200, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Decorative corners */}
          <div
            className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 opacity-20"
            style={{
              borderTop: '3px solid #F4C430',
              borderLeft: '3px solid #F4C430',
              borderRadius: '8px 0 0 0',
            }}
          />
          <div
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 opacity-20"
            style={{
              borderBottom: '3px solid #F4C430',
              borderRight: '3px solid #F4C430',
              borderRadius: '0 0 8px 0',
            }}
          />

          {/* Gold accent top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-16 sm:w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, #F4C430, transparent)',
            }}
          />

          {/* Letter content */}
          <div className="space-y-3 sm:space-y-4">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="leading-relaxed"
                style={{
                  color: '#2d1b3d',
                  fontFamily: i === 0 ? 'Dancing Script, cursive' : 'Inter, sans-serif',
                  fontSize: i === 0
                    ? 'clamp(1.2rem, 3.5vw, 1.6rem)'
                    : 'clamp(0.85rem, 2.5vw, 1.125rem)',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Decorative hearts */}
          <motion.div
            className="flex justify-center mt-6 sm:mt-8 gap-3 text-xl sm:text-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          >
            {['💖', '💕', '💖'].map((heart, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              >
                {heart}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
