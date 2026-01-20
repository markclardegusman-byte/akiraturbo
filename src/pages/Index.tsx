import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import SplashScreen from '@/components/SplashScreen';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import HomeScreen from '@/components/HomeScreen';
import GameLibrary from '@/components/GameLibrary';
import AIChat from '@/components/AIChat';
import MusicPlayer from '@/components/MusicPlayer';
import ProfileSection from '@/components/ProfileSection';
import FloatingPanel from '@/components/FloatingPanel';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'games':
        return <GameLibrary />;
      case 'ai':
        return <AIChat />;
      case 'music':
        return <MusicPlayer />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen relative overflow-hidden">
        <ParticleBackground />

        {/* Main content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-lg mx-auto px-4 py-6"
        >
          {/* Header */}
          <header className="mb-8">
            <Logo />
          </header>

          {/* Content area with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.main>

        {/* Navigation */}
        {!showSplash && (
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {/* Floating Panel Trigger Button */}
        {!showSplash && !showFloatingPanel && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFloatingPanel(true)}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-gradient-to-br from-neon-red to-neon-orange rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,68,0.5)] border border-neon-red/50 animate-pulse"
          >
            <Gamepad2 className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Floating Game Panel */}
        <AnimatePresence>
          {showFloatingPanel && (
            <FloatingPanel
              isVisible={showFloatingPanel}
              onClose={() => setShowFloatingPanel(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Index;
