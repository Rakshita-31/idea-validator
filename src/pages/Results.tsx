import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Lightbulb, RefreshCw, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { SanityGauge } from '@/components/SanityGauge';
import { CategoryScoreBar } from '@/components/CategoryScoreBar';
import { AssumptionCard } from '@/components/AssumptionCard';
import { RiskCard } from '@/components/RiskCard';
import type { AnalysisResult } from '@/hooks/useIdea';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as AnalysisResult | undefined;

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container flex flex-col items-center justify-center py-24">
          <p className="mb-4 text-muted-foreground">No results found.</p>
          <Button asChild>
            <Link to="/analyze">Start New Analysis</Link>
          </Button>
        </main>
      </div>
    );
  }

  const categoryScores = Object.entries(result.category_scores);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">{result.ideaName}</h1>
            <p className="text-muted-foreground">
              Analyzed on {new Date(result.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" asChild>
              <Link to="/analyze">
                <RefreshCw className="mr-2 h-4 w-4" />
                New Analysis
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Score & Categories */}
          <div className="space-y-8">
            {/* Sanity Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <h2 className="mb-6 text-lg font-semibold">Sanity Score</h2>
              <SanityGauge score={result.sanity_score} />
            </motion.div>

            {/* Category Scores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Category Scores</h2>
              </div>
              <div className="space-y-4">
                {categoryScores.map(([key, value], index) => (
                  <CategoryScoreBar
                    key={key}
                    label={key}
                    score={value}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Assumptions & Risks */}
          <div className="space-y-8 lg:col-span-2">
            {/* Key Assumptions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="mb-6 text-lg font-semibold">Assumption Detector</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {result.key_assumptions.map((assumption, index) => (
                  <AssumptionCard key={index} assumption={assumption} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Risk Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="mb-6 text-lg font-semibold">Risk Radar</h2>
              <div className="space-y-4">
                {result.major_risks.map((risk, index) => (
                  <RiskCard key={index} risk={risk} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Improvement Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Improvement Suggestions</h2>
              </div>
              <ul className="space-y-3">
                {result.improvement_suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Overall Verdict */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="mb-6 text-lg font-semibold">Overall Verdict</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {result.overall_feedback.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={index} className="mt-4 text-base font-semibold">{paragraph.replace('## ', '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={index} className="text-sm text-muted-foreground">{paragraph.replace('- ', '')}</li>;
                  }
                  if (paragraph.match(/^\d+\. /)) {
                    return <li key={index} className="text-sm text-muted-foreground">{paragraph.replace(/^\d+\. /, '')}</li>;
                  }
                  if (paragraph.trim()) {
                    return <p key={index} className="text-sm text-muted-foreground">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
