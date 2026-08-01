import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TIMELINE_EVENTS } from '../data/content';

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-20 px-4 md:px-8" id="timeline" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-4xl mb-3 block">📅</span>
          <h2 className="section-title text-3xl md:text-5xl mb-3">Our Journey</h2>
          <p className="text-base italic" style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive' }}>
            "The best stories are the ones we live together"
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: 'linear-gradient(180deg, #F8BBD0, #CDB4DB, #FFD6A5, #F4C430)',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Timeline items */}
          {TIMELINE_EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isLeft
                    ? 'md:flex-row flex-row'
                    : 'md:flex-row-reverse flex-row'
                }`}
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
                  className="absolute left-6 md:left-1/2 z-10 flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                    transform: 'translate(-50%, 0)',
                    border: '3px solid white',
                  }}
                >
                  <span className="text-lg">{event.emoji}</span>
                </motion.div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-2xl p-5 md:p-6 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: '0 8px 32px rgba(200, 150, 200, 0.12)',
                    }}
                  >
                    <h3
                      className="text-lg md:text-xl font-bold mb-2"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: '#2d1b3d',
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
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
