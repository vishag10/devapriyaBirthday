import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { REASONS } from '../data/content';

export default function ReasonsCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 px-4 md:px-8" id="reasons" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-4xl mb-3 block">✨</span>
          <h2 className="section-title text-3xl md:text-5xl mb-3">Reasons You're Amazing</h2>
          <p className="text-base italic" style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive' }}>
            "Just a few of the million reasons why you're special"
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                y: -10,
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-2xl p-6 text-center cursor-default group"
              style={{
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
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(248,187,208,0.15), rgba(205,180,219,0.15))',
                  boxShadow: '0 8px 40px rgba(236, 72, 153, 0.15)',
                }}
              />

              {/* Emoji */}
              <motion.span
                className="text-4xl md:text-5xl block mb-3"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              >
                {reason.emoji}
              </motion.span>

              {/* Quality text */}
              <p
                className="font-semibold text-sm md:text-base"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2d1b3d',
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
