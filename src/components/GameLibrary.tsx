import { motion } from 'framer-motion';
import { Gamepad2, Rocket, Zap, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Game {
  id: number;
  name: string;
  lastPlayed: string;
  fpsGain: number;
  boostCount: number;
  color: string;
}

const games: Game[] = [
  { id: 1, name: 'Mobile Legends', lastPlayed: '2 hours ago', fpsGain: 25, boostCount: 45, color: 'from-blue-500 to-purple-500' },
  { id: 2, name: 'PUBG Mobile', lastPlayed: '1 day ago', fpsGain: 30, boostCount: 32, color: 'from-orange-500 to-yellow-500' },
  { id: 3, name: 'Call of Duty', lastPlayed: '3 days ago', fpsGain: 28, boostCount: 28, color: 'from-green-500 to-teal-500' },
  { id: 4, name: 'Genshin Impact', lastPlayed: '1 week ago', fpsGain: 35, boostCount: 21, color: 'from-pink-500 to-rose-500' },
  { id: 5, name: 'Free Fire', lastPlayed: '2 weeks ago', fpsGain: 22, boostCount: 16, color: 'from-red-500 to-orange-500' },
];

const GameLibrary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-orbitron text-xl text-primary flex items-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          Game Library
        </h2>
        <span className="text-muted-foreground text-sm">{games.length} games</span>
      </div>

      {/* Games List */}
      <div className="space-y-3">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-4 group hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Game icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center flex-shrink-0`}>
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>

              {/* Game info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-orbitron text-foreground truncate">{game.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {game.lastPlayed}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" />
                    {game.boostCount} boosts
                  </span>
                </div>
              </div>

              {/* FPS gain */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-neon-green">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-orbitron">+{game.fpsGain}</span>
                </div>
                <span className="text-xs text-muted-foreground">FPS</span>
              </div>

              {/* Boost button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Rocket className="w-5 h-5 text-background" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add game button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-xl border-2 border-dashed border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center gap-2"
      >
        <span className="text-2xl">+</span>
        <span>Detect More Games</span>
      </motion.button>
    </motion.div>
  );
};

export default GameLibrary;
