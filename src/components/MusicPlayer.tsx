import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Music } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // Visualizer bars
  const bars = Array.from({ length: 32 }, () => Math.random());

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      {/* Album art and visualizer */}
      <div className="relative mb-6 aspect-square max-w-[200px] mx-auto">
        <motion.div
          className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center overflow-hidden"
          animate={isPlaying ? { 
            boxShadow: [
              '0 0 30px hsl(180 100% 50% / 0.3)',
              '0 0 50px hsl(320 100% 60% / 0.3)',
              '0 0 30px hsl(180 100% 50% / 0.3)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Music className="w-20 h-20 text-primary/50" />
          
          {/* Visualizer overlay */}
          {isPlaying && (
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-center gap-0.5 h-16">
              {bars.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                  animate={{
                    height: [
                      `${20 + Math.random() * 40}%`,
                      `${40 + Math.random() * 50}%`,
                      `${20 + Math.random() * 40}%`,
                    ],
                  }}
                  transition={{
                    duration: 0.3 + Math.random() * 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Rotating ring */}
        <motion.div
          className="absolute -inset-2 border-2 border-primary/20 rounded-2xl"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Song info */}
      <div className="text-center mb-6">
        <h3 className="font-orbitron text-lg text-primary mb-1">Huling Sandali</h3>
        <p className="text-muted-foreground text-sm">December Avenue</p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={(value) => setProgress(value[0])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.floor(progress * 2.4 / 60)}:{String(Math.floor(progress * 2.4 % 60)).padStart(2, '0')}</span>
          <span>4:00</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsShuffle(!isShuffle)}
          className={`p-2 rounded-full ${isShuffle ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Shuffle className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 text-foreground"
        >
          <SkipBack className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
          style={{ boxShadow: '0 0 20px hsl(180 100% 50% / 0.5)' }}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-background" />
          ) : (
            <Play className="w-7 h-7 text-background ml-1" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 text-foreground"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsRepeat(!isRepeat)}
          className={`p-2 rounded-full ${isRepeat ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Repeat className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 mt-6">
        <Volume2 className="w-5 h-5 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="flex-1"
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
