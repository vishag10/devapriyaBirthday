import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { BIRTHDAY_WISHES } from '../data/content';

function TypingText({ text, isActive }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayed('');
      setDone(false);
      return;
    }

    let i = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <span>
      {displayed}
      {isActive && !done && <span className="typing-cursor" />}
    </span>
  );
}

export default function BirthdayWishes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    let timeoutId;

    const showNext = () => {
      setActiveIndex(current);
      current++;
      if (current < BIRTHDAY_WISHES.length) {
        const textLength = BIRTHDAY_WISHES[current - 1].length;
        const typingTime = textLength * 50 + 800;
        timeoutId = setTimeout(showNext, typingTime);
      }
    };

    timeoutId = setTimeout(showNext, 500);
    return () => clearTimeout(timeoutId);
  }, [isInView]);

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="wishes"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">🌟</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Birthday Wishes
          </h2>
        </motion.div>

        {/* Wishes container */}
        <div className="space-y-4 sm:space-y-6">
          {BIRTHDAY_WISHES.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={
                i <= activeIndex
                  ? { opacity: 1, x: 0 }
                  : {}
              }
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 120,
              }}
              className="rounded-xl sm:rounded-2xl"
              style={{
                padding: 'clamp(0.875rem, 3vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 4px 20px rgba(200, 150, 200, 0.1)',
                display: i <= activeIndex ? 'block' : 'none',
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Star icon */}
                <motion.span
                  className="flex-shrink-0 mt-0.5"
                  style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)' }}
                  animate={
                    i === activeIndex
                      ? { rotate: [0, 360], scale: [1, 1.3, 1] }
                      : {}
                  }
                  transition={{ duration: 1 }}
                >
                  ⭐
                </motion.span>

                {/* Wish text */}
                <p
                  className="italic leading-relaxed"
                  style={{
                    color: '#2d1b3d',
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  }}
                >
                  {i === activeIndex ? (
                    <TypingText text={wish} isActive={true} />
                  ) : (
                    wish
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
