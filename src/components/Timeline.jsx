import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TIMELINE_EVENTS } from '../data/content';

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="timeline"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">📅</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Our Journey
          </h2>
          <p
            className="italic px-4"
            style={{
              color: '#4a2d5e',
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            }}
          >
            "The best stories are the ones we live together"
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - left on mobile, center on desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: 'linear-gradient(180deg, #F8BBD0, #CDB4DB, #FFD6A5, #F4C430)',
              left: '20px',
            }}
          />

          {/* Desktop center line overlay - hidden on mobile */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 w-0.5 origin-top hidden md:block"
            style={{
              background: 'linear-gradient(180deg, #F8BBD0, #CDB4DB, #FFD6A5, #F4C430)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Hide mobile line on desktop */}
          <style>{`
            @media (min-width: 768px) {
              .timeline-line-mobile { display: none !important; }
            }
          `}</style>

          {/* Timeline items */}
          {TIMELINE_EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="relative mb-8 sm:mb-12 last:mb-0"
              >
                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="absolute z-10 flex items-center justify-center"
                  style={{
                    width: 'clamp(36px, 8vw, 44px)',
                    height: 'clamp(36px, 8vw, 44px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                    left: '20px',
                    transform: 'translateX(-50%)',
                    border: '3px solid white',
                  }}
                >
                  <span style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}>{event.emoji}</span>
                </motion.div>

                {/* Desktop dot - centered */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="absolute z-10 hidden md:flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '3px solid white',
                  }}
                >
                  <span className="text-lg">{event.emoji}</span>
                </motion.div>

                {/* Mobile: always left-aligned content */}
                <div className="md:hidden" style={{ marginLeft: '50px' }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 8px 32px rgba(200, 150, 200, 0.12)',
                    }}
                  >
                    <h3
                      className="font-bold mb-1.5"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#2d1b3d',
                        fontSize: 'clamp(0.95rem, 3vw, 1.25rem)',
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: '#4a2d5e',
                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      }}
                    >
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Desktop: alternating left/right content */}
                <div
                  className={`hidden md:block md:w-[calc(50%-40px)] ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left md:ml-auto'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-2xl p-6 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 8px 32px rgba(200, 150, 200, 0.12)',
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#2d1b3d',
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: '#4a2d5e' }}
                    >
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
