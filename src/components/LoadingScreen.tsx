import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const loadingMessages = [
  "Our AI VC is reviewing your deck...",
  "Analyzing market potential...",
  "Evaluating competitive landscape...",
  "Assessing technical feasibility...",
  "Calculating risk factors...",
];

export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-full gradient-primary shadow-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="h-12 w-12 text-primary-foreground" />
          </motion.div>
          <motion.div
            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <motion.p
            className="text-xl font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
          </motion.p>
          <p className="text-sm text-muted-foreground">
            This typically takes 10-15 seconds
          </p>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
