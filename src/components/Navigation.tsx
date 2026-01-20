import { motion } from 'framer-motion';
import { Home, Gamepad2, Bot, Music, User, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'games', icon: Gamepad2, label: 'Games' },
  { id: 'ai', icon: Bot, label: 'AI Bot' },
  { id: 'music', icon: Music, label: 'Music' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="glass-card rounded-2xl p-2 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-2"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    color: isActive ? 'hsl(180 100% 50%)' : 'hsl(180 20% 60%)',
                    filter: isActive ? 'drop-shadow(0 0 8px hsl(180 100% 50% / 0.8))' : 'none',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 left-1/2 w-8 h-1 rounded-full bg-primary"
                    style={{ translateX: '-50%', boxShadow: '0 0 10px hsl(180 100% 50%)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
