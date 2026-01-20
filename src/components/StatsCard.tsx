import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  color: 'cyan' | 'pink' | 'green' | 'purple';
  delay?: number;
}

const colorClasses = {
  cyan: {
    text: 'text-primary',
    bg: 'from-primary/20 to-primary/5',
    glow: 'shadow-[0_0_20px_hsl(180_100%_50%/0.3)]',
    border: 'border-primary/30',
  },
  pink: {
    text: 'text-secondary',
    bg: 'from-secondary/20 to-secondary/5',
    glow: 'shadow-[0_0_20px_hsl(320_100%_60%/0.3)]',
    border: 'border-secondary/30',
  },
  green: {
    text: 'text-neon-green',
    bg: 'from-neon-green/20 to-neon-green/5',
    glow: 'shadow-[0_0_20px_hsl(150_100%_50%/0.3)]',
    border: 'border-neon-green/30',
  },
  purple: {
    text: 'text-accent',
    bg: 'from-accent/20 to-accent/5',
    glow: 'shadow-[0_0_20px_hsl(260_100%_60%/0.3)]',
    border: 'border-accent/30',
  },
};

const StatsCard = ({ icon: Icon, label, value, unit, color, delay = 0 }: StatsCardProps) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative p-4 rounded-xl bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} ${colors.glow}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-card/50 ${colors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-1">
            <motion.span
              className={`text-2xl font-orbitron font-bold ${colors.text}`}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {value}
            </motion.span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color === 'cyan' ? 'hsl(180 100% 50% / 0.3)' : color === 'pink' ? 'hsl(320 100% 60% / 0.3)' : color === 'green' ? 'hsl(150 100% 50% / 0.3)' : 'hsl(260 100% 60% / 0.3)'}, transparent)`,
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, delay: delay }}
        />
      </div>
    </motion.div>
  );
};

export default StatsCard;
