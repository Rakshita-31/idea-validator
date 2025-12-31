import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb } from 'lucide-react';
import type { MajorRisk } from '@/hooks/useIdea';

interface RiskCardProps {
  risk: MajorRisk;
  index: number;
}

export function RiskCard({ risk, index }: RiskCardProps) {
  const severityConfig = {
    low: { bg: 'bg-muted', text: 'text-muted-foreground' },
    medium: { bg: 'bg-warning/10', text: 'text-warning' },
    high: { bg: 'bg-destructive/10', text: 'text-destructive' },
  };

  const { bg, text } = severityConfig[risk.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
          <AlertCircle className={`h-4 w-4 ${text}`} />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">{risk.risk}</p>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${bg} ${text}`}>
              {risk.severity}
            </span>
          </div>
          <div className="flex items-start gap-2 rounded-md bg-secondary/50 p-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
