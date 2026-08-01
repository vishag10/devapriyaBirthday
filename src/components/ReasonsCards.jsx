import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { REASONS } from '../data/content';

export default function ReasonsCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="reasons"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">✨</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Reasons You're Amazing
          </h2>
          <p
            className="font-medium px-4"
            style={{
              color: '#4a2d5e',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            }}
          >
            "Just a few of the million reasons why you're special"
          </p>
        </motion.div>

        {/* Cards grid - 2 cols on mobile, 3 on sm, 4 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                y: -8,
                scale: 1.06,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-xl sm:rounded-2xl text-center cursor-default group"
              style={{
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px rgba(200, 150, 200, 0.12)',
                animation: `gentleFloat ${3 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(248,187,208,0.15), rgba(205,180,219,0.15))',
                  boxShadow: '0 8px 40px rgba(236, 72, 153, 0.15)',
                }}
              />

              {/* Emoji */}
              <motion.span
                className="block mb-2 sm:mb-3"
                style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              >
                {reason.emoji}
              </motion.span>

              {/* Quality */}
              <p
                className="font-semibold"
                style={{
                  color: '#2d1b3d',
                  fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                }}
              >
                {reason.quality}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
