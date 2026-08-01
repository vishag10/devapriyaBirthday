import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [candlesOut, setCandlesOut] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandles = () => {
    if (candlesOut) return;
    setCandlesOut(true);

    // Confetti burst
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

    // Show wish after a moment
    setTimeout(() => setShowWish(true), 1500);
  };

  return (
    <section className="py-20 px-4 md:px-8" id="cake" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-4xl mb-3 block">🎂</span>
          <h2 className="section-title text-3xl md:text-5xl mb-3">Birthday Cake</h2>
        </motion.div>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 150 }}
          className="relative inline-block mb-10"
        >
          {/* Cake container */}
          <div className="relative" style={{ width: 280, margin: '0 auto' }}>
            {/* Candles */}
            <div className="flex justify-center gap-5 mb-2 relative" style={{ height: 60 }}>
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
                        className="w-3 h-5 rounded-full"
                        style={{
                          background: 'linear-gradient(to top, #ff6b35, #ffd700, #fff)',
                          animation: `candleFlicker ${0.8 + i * 0.15}s ease-in-out infinite`,
                          boxShadow: '0 0 8px 4px rgba(255, 165, 0, 0.3), 0 0 16px 8px rgba(255, 100, 0, 0.15)',
                        }}
                      />
                      {/* Glow effect */}
                      <div
                        className="absolute -inset-2 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3), transparent)',
                          animation: `candleGlow ${1 + i * 0.1}s ease-in-out infinite`,
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Smoke on blow */}
                  {candlesOut && (
                    <motion.div
                      initial={{ opacity: 0.6, y: 0 }}
                      animate={{ opacity: 0, y: -30 }}
                      transition={{ duration: 1.5 }}
                      className="w-1.5 rounded-full"
                      style={{
                        height: 20,
                        background: 'linear-gradient(to top, rgba(150,150,150,0.4), transparent)',
                      }}
                    />
                  )}

                  {/* Candle stick */}
                  <div
                    className="w-2 rounded-t-sm"
                    style={{
                      height: 30,
                      background: ['linear-gradient(to bottom, #ec4899, #f472b6)', 'linear-gradient(to bottom, #8b5cf6, #a78bfa)', 'linear-gradient(to bottom, #F4C430, #fde68a)', 'linear-gradient(to bottom, #ec4899, #f472b6)', 'linear-gradient(to bottom, #8b5cf6, #a78bfa)'][i],
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cake layers */}
            {/* Top layer (frosting) */}
            <div
              className="relative rounded-t-2xl"
              style={{
                height: 20,
                background: 'linear-gradient(135deg, #f9a8d4, #f472b6)',
                borderRadius: '16px 16px 0 0',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
              }}
            >
              {/* Frosting drips */}
              {[20, 60, 100, 150, 200, 240].map((left, i) => (
                <div
                  key={i}
                  className="absolute rounded-b-full"
                  style={{
                    left,
                    top: '100%',
                    width: 12 + (i % 3) * 4,
                    height: 12 + (i % 2) * 8,
                    background: 'linear-gradient(to bottom, #f9a8d4, #f472b6)',
                  }}
                />
              ))}
            </div>

            {/* Layer 1 */}
            <div
              style={{
                height: 50,
                background: 'linear-gradient(to bottom, #fce4ec, #f8bbd0)',
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.05)',
              }}
            />

            {/* Middle frosting line */}
            <div
              style={{
                height: 8,
                background: 'linear-gradient(90deg, #CDB4DB, #F8BBD0, #CDB4DB)',
              }}
            />

            {/* Layer 2 */}
            <div
              className="rounded-b-2xl"
              style={{
                height: 55,
                background: 'linear-gradient(to bottom, #fff3e0, #ffe0b2)',
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 8px 30px rgba(200, 150, 200, 0.2)',
              }}
            >
              {/* Decorative dots */}
              <div className="flex justify-center gap-6 pt-4">
                {['💖', '⭐', '💖', '⭐', '💖'].map((d, i) => (
                  <motion.span
                    key={i}
                    className="text-xs"
                    animate={
                      !candlesOut
                        ? {
                            y: [0, -2, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Cake plate */}
            <div
              className="mx-auto mt-1 rounded-full"
              style={{
                width: '110%',
                height: 12,
                background: 'linear-gradient(to bottom, #e0e0e0, #bdbdbd)',
                marginLeft: '-5%',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </motion.div>

        {/* Blow candles button */}
        {!candlesOut ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            onClick={blowCandles}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full text-white font-semibold text-lg cursor-pointer transition-all duration-300"
            style={{
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
                className="glass-strong rounded-2xl p-8 inline-block"
              >
                <motion.span
                  className="text-5xl block mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌟
                </motion.span>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    background: 'linear-gradient(135deg, #ec4899, #F4C430)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Make a Wish ❤️
                </h3>
                <p
                  className="text-base italic"
                  style={{ color: '#4a2d5e', fontFamily: 'Dancing Script, cursive' }}
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
