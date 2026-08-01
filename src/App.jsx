import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordScreen from './components/PasswordScreen';
import HeroSection from './components/HeroSection';
import FloatingDecorations from './components/FloatingDecorations';
import BirthdayLetter from './components/BirthdayLetter';
import Timeline from './components/Timeline';
import ReasonsCards from './components/ReasonsCards';
import BirthdayWishes from './components/BirthdayWishes';
import BirthdayCake from './components/BirthdayCake';
import FinalSection from './components/FinalSection';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!authenticated ? (
          <PasswordScreen
            key="password"
            onSuccess={() => setAuthenticated(true)}
          />
        ) : (
          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Floating decorations across the entire page */}
            <FloatingDecorations />

            {/* Main content sections */}
            <main>
              <HeroSection />

              {/* Divider */}
              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(205, 180, 219, 0.5), transparent)',
                  }}
                />
              </div>

              <BirthdayLetter />

              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(248, 187, 208, 0.5), transparent)',
                  }}
                />
              </div>

              <Timeline />

              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 214, 165, 0.5), transparent)',
                  }}
                />
              </div>

              <ReasonsCards />

              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(244, 196, 48, 0.5), transparent)',
                  }}
                />
              </div>

              <BirthdayWishes />

              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent)',
                  }}
                />
              </div>

              <BirthdayCake />

              <div className="flex justify-center py-4">
                <div
                  className="w-24 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                  }}
                />
              </div>

              <FinalSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
