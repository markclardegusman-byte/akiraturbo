import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Rocket } from 'lucide-react';

interface BoostButtonProps {
  onBoost: () => void;
  isBoosting: boolean;
}

const BoostButton = ({ onBoost, isBoosting }: BoostButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const handleBoost = () => {
    if (isBoosting) return;
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 800);
    onBoost();
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ring animations */}
      <motion.div
        className="absolute w-56 h-56 rounded-full border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-secondary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Explosion effect */}
      <AnimatePresence>
        {showExplosion && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-primary"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [1, 0],
                  x: Math.cos((i * Math.PI * 2) / 8) * 150,
                  y: Math.sin((i * Math.PI * 2) / 8) * 150,
                  opacity: [1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 20px hsl(180 100% 50%)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={handleBoost}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={isBoosting}
        className="relative w-40 h-40 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isBoosting
            ? [
                '0 0 30px hsl(180 100% 50% / 0.8), 0 0 60px hsl(180 100% 50% / 0.4)',
                '0 0 50px hsl(150 100% 50% / 0.8), 0 0 100px hsl(150 100% 50% / 0.4)',
                '0 0 30px hsl(180 100% 50% / 0.8), 0 0 60px hsl(180 100% 50% / 0.4)',
              ]
            : '0 0 30px hsl(180 100% 50% / 0.5), 0 0 60px hsl(180 100% 50% / 0.2)',
        }}
        transition={{ duration: 1, repeat: isBoosting ? Infinity : 0 }}
      >
        {/* Button background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-2 border-primary/50" />
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-neon-green"
          animate={isBoosting ? {
            background: [
              'linear-gradient(135deg, hsl(180 100% 50%), hsl(150 100% 50%))',
              'linear-gradient(135deg, hsl(150 100% 50%), hsl(180 100% 50%))',
            ],
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-4 rounded-full overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={isBoosting ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isBoosting ? Infinity : 0, ease: "linear" }}
        >
          {isBoosting ? (
            <Rocket className="w-16 h-16 text-background" />
          ) : (
            <Zap className="w-16 h-16 text-background fill-current" />
          )}
        </motion.div>
      </motion.button>

      {/* Button label */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-orbitron text-lg tracking-wider text-primary">
          {isBoosting ? 'BOOSTING...' : 'TAP TO BOOST'}
        </span>
      </motion.div>
    </div>
  );
};

export default BoostButton;
