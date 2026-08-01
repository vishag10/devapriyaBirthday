import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [candlesOut, setCandlesOut] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandles = () => {
    if (candlesOut) return;
    setCandlesOut(true);

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60 + Math.random() * 60,
        spread: 60,
        origin: { x: Math.random(), y: 0.6 },
        colors: ['#F8BBD0', '#CDB4DB', '#FFD6A5', '#F4C430', '#ec4899', '#8b5cf6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => setShowWish(true), 1500);
  };

  // Responsive cake width
  const cakeWidth = 'clamp(220px, 60vw, 280px)';

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="cake"
      ref={ref}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">🎂</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Birthday Cake
          </h2>
        </motion.div>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 150 }}
          className="relative inline-block mb-8 sm:mb-10"
        >
          {/* Cake container - responsive width */}
          <div className="relative mx-auto" style={{ width: cakeWidth }}>
            {/* Candles */}
            <div
              className="flex justify-center mb-2 relative"
              style={{ gap: 'clamp(10px, 3vw, 20px)', height: 'clamp(45px, 10vw, 60px)' }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Flame */}
                  {!candlesOut && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="relative"
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: 'clamp(8px, 2vw, 12px)',
                          height: 'clamp(14px, 3vw, 20px)',
                          background: 'linear-gradient(to top, #ff6b35, #ffd700, #fff)',
                          animation: `candleFlicker ${0.8 + i * 0.15}s ease-in-out infinite`,
                          boxShadow: '0 0 8px 4px rgba(255, 165, 0, 0.3), 0 0 16px 8px rgba(255, 100, 0, 0.15)',
                        }}
                      />
                      <div
                        className="absolute -inset-2 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3), transparent)',
                          animation: `candleGlow ${1 + i * 0.1}s ease-in-out infinite`,
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Smoke */}
                  {candlesOut && (
                    <motion.div
                      initial={{ opacity: 0.6, y: 0 }}
                      animate={{ opacity: 0, y: -30 }}
                      transition={{ duration: 1.5 }}
                      className="rounded-full"
                      style={{
                        width: 'clamp(4px, 1vw, 6px)',
                        height: 'clamp(12px, 3vw, 20px)',
                        background: 'linear-gradient(to top, rgba(150,150,150,0.4), transparent)',
                      }}
                    />
                  )}

                  {/* Candle stick */}
                  <div
                    className="rounded-t-sm"
                    style={{
                      width: 'clamp(6px, 1.5vw, 8px)',
                      height: 'clamp(20px, 5vw, 30px)',
                      background: [
                        'linear-gradient(to bottom, #ec4899, #f472b6)',
                        'linear-gradient(to bottom, #8b5cf6, #a78bfa)',
                        'linear-gradient(to bottom, #F4C430, #fde68a)',
                        'linear-gradient(to bottom, #ec4899, #f472b6)',
                        'linear-gradient(to bottom, #8b5cf6, #a78bfa)',
                      ][i],
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cake layers */}
            <div
              className="relative rounded-t-2xl"
              style={{
                height: 'clamp(14px, 3vw, 20px)',
                background: 'linear-gradient(135deg, #f9a8d4, #f472b6)',
                borderRadius: '16px 16px 0 0',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
              }}
            >
              {/* Frosting drips - fewer on mobile */}
              {[0.07, 0.21, 0.36, 0.54, 0.71, 0.86].map((pct, i) => (
                <div
                  key={i}
                  className="absolute rounded-b-full"
                  style={{
                    left: `${pct * 100}%`,
                    top: '100%',
                    width: `clamp(8px, 2vw, ${12 + (i % 3) * 4}px)`,
                    height: `clamp(8px, 2vw, ${12 + (i % 2) * 8}px)`,
                    background: 'linear-gradient(to bottom, #f9a8d4, #f472b6)',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                height: 'clamp(35px, 8vw, 50px)',
                background: 'linear-gradient(to bottom, #fce4ec, #f8bbd0)',
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.05)',
              }}
            />

            <div
              style={{
                height: 'clamp(5px, 1.5vw, 8px)',
                background: 'linear-gradient(90deg, #CDB4DB, #F8BBD0, #CDB4DB)',
              }}
            />

            <div
              className="rounded-b-2xl"
              style={{
                height: 'clamp(38px, 9vw, 55px)',
                background: 'linear-gradient(to bottom, #fff3e0, #ffe0b2)',
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 8px 30px rgba(200, 150, 200, 0.2)',
              }}
            >
              <div className="flex justify-center pt-2 sm:pt-4" style={{ gap: 'clamp(8px, 2vw, 24px)' }}>
                {['💖', '⭐', '💖', '⭐', '💖'].map((d, i) => (
                  <motion.span
                    key={i}
                    style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}
                    animate={
                      !candlesOut
                        ? { y: [0, -2, 0], scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Plate */}
            <div
              className="mx-auto mt-1 rounded-full"
              style={{
                width: '110%',
                height: 'clamp(8px, 2vw, 12px)',
                background: 'linear-gradient(to bottom, #e0e0e0, #bdbdbd)',
                marginLeft: '-5%',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </motion.div>

        {/* Button / Wish */}
        {!candlesOut ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            onClick={blowCandles}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full text-white font-semibold cursor-pointer transition-all duration-300"
            style={{
              padding: 'clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              border: 'none',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.25)',
            }}
          >
            🎂 Blow the Candles
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {showWish && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-strong rounded-2xl inline-block"
                style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}
              >
                <motion.span
                  className="block mb-3 sm:mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌟
                </motion.span>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    background: 'linear-gradient(135deg, #ec4899, #F4C430)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
                  }}
                >
                  Make a Wish ❤️
                </h3>
                <p
                  className="italic"
                  style={{
                    color: '#4a2d5e',
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  }}
                >
                  "May every wish you make come true"
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
