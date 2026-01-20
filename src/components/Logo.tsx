import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Icon */}
      <motion.div 
        className="relative"
        animate={{ 
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          <Zap className="w-7 h-7 text-background fill-current" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-primary/30 blur-xl -z-10" />
      </motion.div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <motion.h1 
          className="font-orbitron text-2xl font-bold tracking-wider"
          style={{
            background: 'linear-gradient(135deg, hsl(180 100% 60%), hsl(320 100% 70%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px hsl(180 100% 50% / 0.5))',
          }}
        >
          AKIRA
        </motion.h1>
        <motion.span 
          className="font-orbitron text-xs tracking-[0.3em] text-primary/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          TURBO
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Logo;
