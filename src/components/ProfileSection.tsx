import { motion } from 'framer-motion';
import { User, Trophy, Zap, Clock, ExternalLink, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileSection = () => {
  const stats = [
    { label: 'Games Boosted', value: '142', icon: Zap },
    { label: 'Total FPS Gained', value: '12.4K', icon: Trophy },
    { label: 'Hours Saved', value: '89', icon: Clock },
  ];

  const socialLinks = [
    { name: 'TikTok', handle: '@hanji.kuroda', url: 'https://tiktok.com/@hanji.kuroda' },
    { name: 'Facebook', handle: 'Hanji Kuroda', url: 'https://facebook.com' },
    { name: 'YouTube', handle: 'Sasuke Hanji', url: 'https://youtube.com' },
  ];

  const credits = [
    { name: 'ROG ASUS', url: 'https://www.asus.com' },
    { name: 'Black Shark', url: 'https://www.blackshark.com' },
    { name: 'RedMagic', url: 'https://www.redmagic.gg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <motion.div
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary p-1"
          animate={{
            boxShadow: [
              '0 0 20px hsl(180 100% 50% / 0.5)',
              '0 0 40px hsl(320 100% 60% / 0.5)',
              '0 0 20px hsl(180 100% 50% / 0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        <h2 className="font-orbitron text-xl text-primary mb-1">GAMER_PRO</h2>
        <p className="text-muted-foreground text-sm mb-4">Elite Booster • Level 42</p>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-xl bg-muted/30 border border-primary/20"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="font-orbitron text-lg text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Developer Credits */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-orbitron text-primary mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Developer
        </h3>

        <motion.div
          className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 mb-4"
          animate={{
            boxShadow: [
              '0 0 10px hsl(180 100% 50% / 0.2)',
              '0 0 20px hsl(320 100% 60% / 0.2)',
              '0 0 10px hsl(180 100% 50% / 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h4 className="font-orbitron text-lg neon-text">Akira Hanji</h4>
          <p className="text-sm text-muted-foreground">Lead Developer & Designer</p>
        </motion.div>

        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <span className="text-foreground">{link.name}</span>
              <span className="text-muted-foreground text-sm">{link.handle}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Inspired By */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-orbitron text-secondary mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Inspired By
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {credits.map((credit, index) => (
            <motion.a
              key={credit.name}
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-secondary/20 hover:border-secondary/50 transition-all group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-foreground font-medium">{credit.name}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
