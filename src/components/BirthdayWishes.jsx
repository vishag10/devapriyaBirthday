import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { BIRTHDAY_WISHES } from '../data/content';

function TypingText({ text, delay = 0, isActive }) {
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

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, isActive]);

  return (
    <span>
      {displayed}
      {isActive && !done && <span className="typing-cursor" />}
    </span>
  );
}

export default function BirthdayWishes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const showNext = () => {
      setActiveIndex(current);
      current++;
      if (current < BIRTHDAY_WISHES.length) {
        // Calculate delay based on text length
        const textLength = BIRTHDAY_WISHES[current - 1].length;
        const typingTime = textLength * 50 + 800; // typing + pause
        setTimeout(showNext, typingTime);
      }
    };

    const startTimer = setTimeout(showNext, 500);
    return () => clearTimeout(startTimer);
  }, [isInView]);

  return (
    <section className="py-20 px-4 md:px-8" id="wishes" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-4xl mb-3 block">🌟</span>
          <h2 className="section-title text-3xl md:text-5xl mb-3">Birthday Wishes</h2>
        </motion.div>

        {/* Wishes container */}
        <div className="space-y-6">
          {BIRTHDAY_WISHES.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
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
              className="rounded-2xl p-5 md:p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 4px 20px rgba(200, 150, 200, 0.1)',
                display: i <= activeIndex ? 'block' : 'none',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Star icon */}
                <motion.span
                  className="text-2xl flex-shrink-0 mt-0.5"
                  animate={
                    i === activeIndex
                      ? {
                          rotate: [0, 360],
                          scale: [1, 1.3, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 1 }}
                >
                  ⭐
                </motion.span>

                {/* Wish text */}
                <p
                  className="text-base md:text-lg italic leading-relaxed"
                  style={{
                    color: '#2d1b3d',
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: '1.3rem',
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
