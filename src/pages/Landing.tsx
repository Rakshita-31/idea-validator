import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shield, Target, Zap, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Get insights from an AI trained on thousands of startup success and failure patterns.',
  },
  {
    icon: Target,
    title: 'Assumption Detection',
    description: 'Identify the risky assumptions in your business model before investors do.',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Understand potential pitfalls and get actionable mitigation strategies.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive comprehensive feedback in seconds, not weeks.',
  },
];

const benefits = [
  'Validate ideas before investing time',
  'Identify blind spots in your strategy',
  'Strengthen your pitch deck',
  'Reduce startup failure risk',
];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
        
        <div className="container relative py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Startup Validation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Validate your startup idea{' '}
              <span className="text-gradient">before you build it</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              Get VC-grade AI analysis of your startup idea. Identify risks, validate assumptions, 
              and strengthen your pitch in minutes—not months.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button size="lg" asChild className="group text-base">
                <Link to={isAuthenticated ? '/analyze' : '/auth'}>
                  Analyze My Idea
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
            >
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="border-t border-border py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How IdeaValidator Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI analyzes your idea across multiple dimensions, just like a seasoned VC would.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-lg sm:p-12"
          >
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to validate your idea?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of founders who've strengthened their pitch before going to market.
            </p>
            <Button size="lg" className="mt-8 group" asChild>
              <Link to={isAuthenticated ? '/analyze' : '/auth'}>
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-primary">
              <Brain className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>IdeaValidator © 2024</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for founders, by founders.
          </p>
        </div>
      </footer>
    </div>
  );
}
