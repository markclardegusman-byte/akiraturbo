import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Thermometer, Cpu, MonitorSpeaker, Wifi, WifiOff,
  Volume2, Sun, Moon, Camera, Video, BellOff, Bell,
  Battery, BatteryCharging, Gamepad2, ChevronUp, ChevronDown,
  Grip, X, Gauge, Activity, Signal, Settings, Maximize2, Minimize2
} from 'lucide-react';

interface FloatingPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const FloatingPanel = ({ isVisible, onClose }: FloatingPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<'battery' | 'balanced' | 'performance'>('balanced');
  const [dndEnabled, setDndEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(70);
  const [networkMode, setNetworkMode] = useState<'wifi' | 'mobile'>('wifi');
  
  // Simulated real-time stats
  const [stats, setStats] = useState({
    fps: 60,
    cpuTemp: 45,
    gpuTemp: 42,
    cpuUsage: 35,
    gpuUsage: 40,
    ramUsage: 55,
    battery: 78,
    isCharging: false,
    ping: 23
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Simulate real-time stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        fps: Math.floor(55 + Math.random() * 10),
        cpuTemp: Math.floor(40 + Math.random() * 20),
        gpuTemp: Math.floor(38 + Math.random() * 18),
        cpuUsage: Math.floor(25 + Math.random() * 50),
        gpuUsage: Math.floor(30 + Math.random() * 45),
        ramUsage: Math.floor(50 + Math.random() * 30),
        ping: Math.floor(15 + Math.random() * 30)
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 300, clientX - dragStartPos.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 100, clientY - dragStartPos.current.y))
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handleBoost = () => {
    // Trigger boost animation
    setStats(prev => ({
      ...prev,
      fps: Math.min(120, prev.fps + 15),
      cpuTemp: Math.max(35, prev.cpuTemp - 8),
      gpuTemp: Math.max(32, prev.gpuTemp - 6),
      ramUsage: Math.max(30, prev.ramUsage - 20)
    }));
  };

  const getTempColor = (temp: number) => {
    if (temp >= 70) return 'text-red-500';
    if (temp >= 55) return 'text-orange-400';
    return 'text-neon-green';
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-neon-green';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-500';
  };

  const recentGames = [
    { name: 'PUBG Mobile', icon: '🎯' },
    { name: 'Genshin Impact', icon: '⚔️' },
    { name: 'COD Mobile', icon: '🔫' },
    { name: 'Mobile Legends', icon: '🛡️' }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.8, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      style={{ left: position.x, top: position.y }}
      className={`fixed z-50 ${isCompact ? 'w-auto' : 'w-80'}`}
    >
      {/* Compact Mode - Mini Dashboard */}
      <AnimatePresence mode="wait">
        {isCompact ? (
          <motion.div
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-black/90 backdrop-blur-xl border border-neon-red/50 rounded-full px-3 py-2 shadow-[0_0_20px_rgba(255,0,68,0.3)]"
          >
            {/* Drag Handle */}
            <div
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Grip className="w-4 h-4 text-neon-red" />
            </div>

            {/* Quick Stats */}
            <div className={`flex items-center gap-1 ${getFpsColor(stats.fps)}`}>
              <Gauge className="w-3 h-3" />
              <span className="text-xs font-bold">{stats.fps}</span>
            </div>

            <div className={`flex items-center gap-1 ${getTempColor(stats.cpuTemp)}`}>
              <Thermometer className="w-3 h-3" />
              <span className="text-xs font-bold">{stats.cpuTemp}°</span>
            </div>

            {/* Boost Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBoost}
              className="p-1.5 bg-gradient-to-r from-neon-red to-neon-orange rounded-full shadow-[0_0_10px_rgba(255,0,68,0.5)]"
            >
              <Zap className="w-3 h-3 text-white" />
            </motion.button>

            {/* Expand Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCompact(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-white/70" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/95 backdrop-blur-xl border border-neon-red/40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,0,68,0.2)]"
          >
            {/* Panel Header with Drag Handle */}
            <div
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-neon-red/20 to-transparent border-b border-neon-red/30 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-2">
                <Grip className="w-4 h-4 text-neon-red" />
                <span className="text-sm font-bold text-white tracking-wider">GAME PANEL</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCompact(true)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-white/70" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 hover:bg-red-500/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
            </div>

            {/* Real-Time Stats Bar */}
            <div className="grid grid-cols-4 gap-2 p-3 border-b border-white/10">
              <div className="text-center">
                <div className={`text-lg font-bold ${getFpsColor(stats.fps)}`}>{stats.fps}</div>
                <div className="text-[10px] text-white/50">FPS</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${getTempColor(stats.cpuTemp)}`}>{stats.cpuTemp}°</div>
                <div className="text-[10px] text-white/50">CPU</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${getTempColor(stats.gpuTemp)}`}>{stats.gpuTemp}°</div>
                <div className="text-[10px] text-white/50">GPU</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-cyan">{stats.ping}ms</div>
                <div className="text-[10px] text-white/50">PING</div>
              </div>
            </div>

            {/* Usage Bars */}
            <div className="px-3 py-2 space-y-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-neon-red" />
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-red to-neon-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.cpuUsage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[10px] text-white/70 w-8">{stats.cpuUsage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <MonitorSpeaker className="w-3 h-3 text-neon-purple" />
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.gpuUsage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[10px] text-white/70 w-8">{stats.gpuUsage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-neon-green" />
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-green to-neon-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.ramUsage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[10px] text-white/70 w-8">{stats.ramUsage}%</span>
              </div>
            </div>

            {/* Main Boost Button */}
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBoost}
                className="w-full py-3 bg-gradient-to-r from-neon-red via-neon-orange to-neon-red bg-[length:200%_100%] animate-pulse rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,68,0.4)] border border-neon-red/50"
              >
                <Zap className="w-5 h-5 text-white" />
                <span className="text-white font-bold tracking-wider">ONE-TAP BOOST</span>
              </motion.button>
            </div>

            {/* Performance Mode Selector */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
                {(['battery', 'balanced', 'performance'] as const).map((mode) => (
                  <motion.button
                    key={mode}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPerformanceMode(mode)}
                    className={`flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                      performanceMode === mode
                        ? mode === 'performance'
                          ? 'bg-gradient-to-r from-neon-red to-neon-orange text-white shadow-[0_0_10px_rgba(255,0,68,0.3)]'
                          : mode === 'balanced'
                          ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-[0_0_10px_rgba(0,255,255,0.3)]'
                          : 'bg-gradient-to-r from-neon-green to-neon-cyan text-white shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    {mode}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Expandable Section */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-4 gap-2 px-3 pb-3">
                <QuickActionButton
                  icon={dndEnabled ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  label="DND"
                  active={dndEnabled}
                  onClick={() => setDndEnabled(!dndEnabled)}
                />
                <QuickActionButton
                  icon={<Camera className="w-4 h-4" />}
                  label="Shot"
                  onClick={() => {}}
                />
                <QuickActionButton
                  icon={<Video className="w-4 h-4" />}
                  label="Record"
                  active={isRecording}
                  onClick={() => setIsRecording(!isRecording)}
                />
                <QuickActionButton
                  icon={networkMode === 'wifi' ? <Wifi className="w-4 h-4" /> : <Signal className="w-4 h-4" />}
                  label={networkMode === 'wifi' ? 'WiFi' : 'Data'}
                  onClick={() => setNetworkMode(networkMode === 'wifi' ? 'mobile' : 'wifi')}
                />
              </div>

              {/* Sliders */}
              <div className="px-3 pb-3 space-y-3">
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  />
                  <span className="text-[10px] text-white/70 w-8">{brightness}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-neon-cyan" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-neon-cyan [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                  />
                  <span className="text-[10px] text-white/70 w-8">{volume}%</span>
                </div>
              </div>

              {/* Recent Games */}
              <div className="px-3 pb-3">
                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Quick Launch</div>
                <div className="grid grid-cols-4 gap-2">
                  {recentGames.map((game, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-neon-red/30 transition-all"
                    >
                      <span className="text-xl">{game.icon}</span>
                      <span className="text-[8px] text-white/70 truncate w-full text-center">{game.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Battery Status */}
              <div className="px-3 pb-3">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    {stats.isCharging ? (
                      <BatteryCharging className="w-5 h-5 text-neon-green" />
                    ) : (
                      <Battery className={`w-5 h-5 ${stats.battery > 20 ? 'text-neon-green' : 'text-red-500'}`} />
                    )}
                    <span className="text-sm font-bold text-white">{stats.battery}%</span>
                  </div>
                  <span className="text-[10px] text-white/50">
                    {stats.isCharging ? 'Charging...' : '~3h 20m remaining'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Expand/Collapse Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-2 flex items-center justify-center gap-1 text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors border-t border-white/10"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider">Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider">More</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({
  icon,
  label,
  active = false,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
      active
        ? 'bg-neon-red/20 border-neon-red/50 text-neon-red shadow-[0_0_10px_rgba(255,0,68,0.2)]'
        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
    }`}
  >
    {icon}
    <span className="text-[9px] uppercase tracking-wider">{label}</span>
  </motion.button>
);

export default FloatingPanel;
