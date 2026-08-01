import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PHOTOS } from '../data/content';

// Placeholder gradient for missing photos
function PhotoPlaceholder({ index, caption }) {
  const gradients = [
    'linear-gradient(135deg, #F8BBD0 0%, #CDB4DB 100%)',
    'linear-gradient(135deg, #CDB4DB 0%, #FFD6A5 100%)',
    'linear-gradient(135deg, #FFD6A5 0%, #F8BBD0 100%)',
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #F4C430 100%)',
    'linear-gradient(135deg, #F4C430 0%, #ec4899 100%)',
  ];

  const emojis = ['📸', '🌟', '💕', '🎈', '✨', '🌺'];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: gradients[index % gradients.length] }}
    >
      <span className="text-4xl sm:text-5xl mb-2">{emojis[index % emojis.length]}</span>
      <p
        className="text-white font-medium px-3 text-center"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)', fontSize: 'clamp(0.7rem, 2.5vw, 0.875rem)' }}
      >
        {caption}
      </p>
      <p className="text-white mt-1 opacity-60" style={{ fontSize: '0.65rem' }}>
        Replace in content.js
      </p>
    </div>
  );
}

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      className="px-4 sm:px-6 md:px-8"
      style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
      id="gallery"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">📸</span>
          <h2
            className="section-title mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Our Memories
          </h2>
          <p
            className="italic px-4"
            style={{
              color: '#4a2d5e',
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            }}
          >
            "Every picture holds a thousand beautiful words"
          </p>
        </motion.div>

        {/* Photo grid - 1 col on tiny, 2 col on small, 3 col on large */}
        <div
          className="grid gap-4 sm:gap-6 md:gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                type: 'spring',
                stiffness: 150,
                damping: 20,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 8px 32px rgba(200, 150, 200, 0.15)',
              }}
            >
              {/* Photo container */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Placeholder fallback */}
                <div className="absolute inset-0 hidden">
                  <PhotoPlaceholder index={i} caption={photo.caption} />
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(to top, rgba(45, 27, 61, 0.5) 0%, transparent 60%)',
                  }}
                >
                  <span className="text-3xl">💖</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3 sm:p-4 text-center">
                <p
                  className="font-medium"
                  style={{ color: '#4a2d5e', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
                >
                  {photo.caption}
                </p>
              </div>

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(244, 196, 48, 0.1), 0 8px 40px rgba(236, 72, 153, 0.15)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
