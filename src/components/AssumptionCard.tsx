import { motion } from 'framer-motion';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import type { KeyAssumption } from '@/hooks/useIdea';

interface AssumptionCardProps {
  assumption: KeyAssumption;
  index: number;
}

export function AssumptionCard({ assumption, index }: AssumptionCardProps) {
  const config = {
    safe: {
      icon: Shield,
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      label: 'Safe Assumption',
    },
    risky: {
      icon: AlertTriangle,
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      label: 'Risky Assumption',
    },
    dangerous: {
      icon: XCircle,
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      text: 'text-destructive',
      label: 'Dangerous Assumption',
    },
  };

  const { icon: Icon, bg, border, text, label } = config[assumption.risk_level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`rounded-lg border ${border} ${bg} p-4`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
          <Icon className={`h-4 w-4 ${text}`} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium uppercase tracking-wide ${text}`}>
              {label}
            </span>
          </div>
          <p className="font-medium">{assumption.assumption}</p>
          <p className="text-sm text-muted-foreground">{assumption.explanation}</p>
        </div>
      </div>
    </motion.div>
  );
}
