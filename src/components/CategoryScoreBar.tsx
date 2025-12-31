import { motion } from 'framer-motion';

interface CategoryScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  delay?: number;
}

export function CategoryScoreBar({ label, score, maxScore = 10, delay = 0 }: CategoryScoreBarProps) {
  const percentage = (score / maxScore) * 100;

  const getBarColor = (score: number) => {
    if (score >= 7) return 'bg-success';
    if (score >= 4) return 'bg-warning';
    return 'bg-destructive';
  };

  const formatLabel = (label: string) => {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{formatLabel(label)}</span>
        <span className="text-muted-foreground">{score.toFixed(1)}/{maxScore}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full rounded-full ${getBarColor(score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
