import { motion } from 'framer-motion';

interface SanityGaugeProps {
  score: number;
  size?: number;
}

export function SanityGauge({ score, size = 200 }: SanityGaugeProps) {
  const percentage = (score / 10) * 100;
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'hsl(var(--success))';
    if (score >= 4) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Promising';
    if (score >= 4) return 'Needs Work';
    return 'High Risk';
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-sm text-muted-foreground">out of 10</span>
        <motion.span
          className="mt-1 text-sm font-medium"
          style={{ color: getScoreColor(score) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {getScoreLabel(score)}
        </motion.span>
      </div>
    </div>
  );
}
