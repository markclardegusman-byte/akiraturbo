import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
      onAnimationComplete={onComplete}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0,
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: 1,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Rotating rings */}
        <motion.div
          className="absolute w-48 h-48 border-2 border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-40 h-40 border border-secondary/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo container */}
        <motion.div
          className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1, delay: 1, repeat: 2 }}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Zap className="w-14 h-14 text-background fill-current" />
          </motion.div>

          {/* Glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                '0 0 30px hsl(180 100% 50% / 0.4)',
                '0 0 60px hsl(180 100% 50% / 0.6)',
                '0 0 30px hsl(180 100% 50% / 0.4)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h1
            className="font-orbitron text-4xl font-bold tracking-wider mb-2"
            style={{
              background: 'linear-gradient(135deg, hsl(180 100% 60%), hsl(320 100% 70%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 10px hsl(180 100% 50% / 0.5))',
                'drop-shadow(0 0 20px hsl(180 100% 50% / 0.8))',
                'drop-shadow(0 0 10px hsl(180 100% 50% / 0.5))',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AKIRA
          </motion.h1>
          <motion.span
            className="font-orbitron text-sm tracking-[0.5em] text-primary/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            TURBO
          </motion.span>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1] }}
          transition={{ duration: 1, delay: 1.5, times: [0, 0.5, 0.5, 1] }}
        >
          Initializing boost systems...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
