import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Mic, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there, gamer! 🎮 I'm Akira, your AI gaming companion. How can I boost your experience today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = [
    "Your device is running at optimal performance! 🚀 Current FPS: 120, Temperature: 42°C",
    "Pro tip: Enable battery saver mode for extended gaming sessions! 🔋",
    "I've analyzed your gaming patterns. You seem to enjoy competitive games. Want me to optimize settings for low latency?",
    "Fun fact: The first video game ever created was 'Tennis for Two' in 1958! 🎾",
    "Your boost history shows a 40% improvement in average FPS. Keep it up, champion! 🏆",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-primary/20 flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 10px hsl(180 100% 50% / 0.5)',
              '0 0 20px hsl(320 100% 60% / 0.5)',
              '0 0 10px hsl(180 100% 50% / 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot className="w-5 h-5 text-background" />
        </motion.div>
        <div>
          <h3 className="font-orbitron text-primary">Akira AI</h3>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
        <motion.div
          className="ml-auto"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-secondary" />
        </motion.div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-muted'
                }`}
              >
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-background" />
                ) : (
                  <User className="w-4 h-4 text-foreground" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-muted/50 rounded-tl-none'
                    : 'bg-gradient-to-r from-primary/20 to-secondary/20 rounded-tr-none border border-primary/30'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Bot className="w-4 h-4 text-background" />
            </div>
            <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-primary/20">
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mic className="w-5 h-5" />
          </motion.button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Akira anything..."
            className="flex-1 bg-muted/30 border-primary/20 focus:border-primary/50"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChat;
