import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Thermometer, Battery, Gauge } from 'lucide-react';
import BoostButton from './BoostButton';
import StatsCard from './StatsCard';

const HomeScreen = () => {
  const [isBoosting, setIsBoosting] = useState(false);
  const [stats, setStats] = useState({
    fps: 60,
    cpu: 45,
    gpu: 52,
    ram: 68,
    temp: 42,
    battery: 78,
  });

  const handleBoost = () => {
    setIsBoosting(true);
    
    // Simulate boost effect
    const interval = setInterval(() => {
      setStats((prev) => ({
        fps: Math.min(120, prev.fps + Math.floor(Math.random() * 10)),
        cpu: Math.max(20, prev.cpu - Math.floor(Math.random() * 5)),
        gpu: Math.max(25, prev.gpu - Math.floor(Math.random() * 5)),
        ram: Math.max(30, prev.ram - Math.floor(Math.random() * 8)),
        temp: Math.max(35, prev.temp - Math.floor(Math.random() * 3)),
        battery: prev.battery,
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsBoosting(false);
      setStats({
        fps: 120,
        cpu: 25,
        gpu: 30,
        ram: 42,
        temp: 38,
        battery: 78,
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-24"
    >
      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-3 h-3 rounded-full ${isBoosting ? 'bg-neon-green' : 'bg-primary'}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-medium">
            {isBoosting ? 'Optimizing Performance...' : 'System Ready'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Battery className="w-4 h-4" />
          <span>{stats.battery}%</span>
        </div>
      </motion.div>

      {/* Boost Button */}
      <div className="flex justify-center py-8">
        <BoostButton onBoost={handleBoost} isBoosting={isBoosting} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          icon={Gauge}
          label="FPS"
          value={stats.fps}
          unit="fps"
          color="cyan"
          delay={0}
        />
        <StatsCard
          icon={Cpu}
          label="CPU Usage"
          value={stats.cpu}
          unit="%"
          color="pink"
          delay={0.1}
        />
        <StatsCard
          icon={HardDrive}
          label="GPU Usage"
          value={stats.gpu}
          unit="%"
          color="purple"
          delay={0.2}
        />
        <StatsCard
          icon={HardDrive}
          label="RAM Usage"
          value={stats.ram}
          unit="%"
          color="green"
          delay={0.3}
        />
      </div>

      {/* Temperature Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/20">
              <Thermometer className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Device Temperature</p>
              <p className="font-orbitron text-2xl text-secondary">{stats.temp}°C</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            stats.temp < 40 
              ? 'bg-neon-green/20 text-neon-green' 
              : stats.temp < 50 
                ? 'bg-yellow-500/20 text-yellow-500'
                : 'bg-destructive/20 text-destructive'
          }`}>
            {stats.temp < 40 ? 'Optimal' : stats.temp < 50 ? 'Normal' : 'Hot'}
          </span>
        </div>

        {/* Temperature bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green via-yellow-500 to-destructive"
            initial={{ width: 0 }}
            animate={{ width: `${(stats.temp / 80) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {['Battery Saver', 'Game Mode', 'Cool Down'].map((action, index) => (
          <motion.button
            key={action}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-xl bg-muted/30 border border-primary/20 hover:border-primary/50 transition-all"
          >
            <span className="text-sm font-medium">{action}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeScreen;
