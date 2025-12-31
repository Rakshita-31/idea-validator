import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Header } from '@/components/layout/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useIdea, type IdeaFormData } from '@/hooks/useIdea';
import { useToast } from '@/hooks/use-toast';

const steps = ['Basic Info', 'Problem & Users', 'Solution', 'Settings'];

const initialFormData: IdeaFormData = {
  ideaName: '',
  oneLinePitch: '',
  problemStatement: '',
  targetAudience: '',
  proposedSolution: '',
  revenueModel: '',
  currentStage: 'student',
  brutallyHonest: false,
};

export default function Analyze() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IdeaFormData>(initialFormData);
  const { analyzeIdea, isLoading, setResult } = useIdea();
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateFormData = (field: keyof IdeaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.ideaName.trim() && formData.oneLinePitch.trim();
      case 1:
        return formData.problemStatement.trim() && formData.targetAudience.trim();
      case 2:
        return formData.proposedSolution.trim() && formData.revenueModel.trim();
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const result = await analyzeIdea(formData);
    if (result) {
      setResult(result);
      navigate('/results', { state: { result } });
    } else {
      // Demo mode: generate mock results
      const mockResult = {
        id: crypto.randomUUID(),
        ideaName: formData.ideaName,
        createdAt: new Date().toISOString(),
        sanity_score: 7.2,
        category_scores: {
          market_size: 7.5,
          competition: 6.8,
          feasibility: 8.0,
          scalability: 7.0,
          revenue_potential: 6.5,
          team_fit: 7.8,
        },
        key_assumptions: [
          { assumption: 'Target market is willing to pay for this solution', risk_level: 'risky' as const, explanation: 'Market validation needed through customer interviews and landing page tests.' },
          { assumption: 'Technical implementation is feasible with current resources', risk_level: 'safe' as const, explanation: 'Core technology is well-established and documented.' },
          { assumption: 'Competitors won\'t respond aggressively', risk_level: 'dangerous' as const, explanation: 'Large incumbents may have resources to quickly replicate features.' },
        ],
        major_risks: [
          { risk: 'Market adoption may be slower than expected', severity: 'medium' as const, mitigation: 'Start with a focused niche market and expand gradually.' },
          { risk: 'Funding may be required before profitability', severity: 'high' as const, mitigation: 'Plan for 18-24 month runway and identify key milestones for fundraising.' },
          { risk: 'Key talent acquisition could be challenging', severity: 'low' as const, mitigation: 'Consider remote work options and equity compensation packages.' },
        ],
        improvement_suggestions: [
          'Conduct 50+ customer discovery interviews before building',
          'Create a landing page to test market interest and collect emails',
          'Identify 3-5 early adopters willing to be design partners',
          'Map out competitive differentiation more clearly',
        ],
        overall_feedback: `## Executive Summary\n\nYour idea for **${formData.ideaName}** shows promising potential with a clear problem-solution fit. The market opportunity appears significant, though competition analysis suggests you'll need strong differentiation.\n\n## Strengths\n- Clear problem identification\n- Feasible technical approach\n- Reasonable revenue model\n\n## Areas for Improvement\n- More detailed competitive analysis needed\n- Customer validation should be prioritized\n- Consider unit economics more carefully\n\n## Recommended Next Steps\n1. Validate core assumptions with target users\n2. Build an MVP focusing on the core value proposition\n3. Establish key metrics for success`,
      };
      
      const history = JSON.parse(localStorage.getItem('ideaHistory') || '[]');
      history.unshift(mockResult);
      localStorage.setItem('ideaHistory', JSON.stringify(history.slice(0, 50)));
      
      toast({ 
        title: 'Demo Mode', 
        description: 'Backend not connected. Showing sample results.' 
      });
      navigate('/results', { state: { result: mockResult } });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-3xl py-12">
        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Tell us about your idea</h2>
                  <p className="mt-1 text-muted-foreground">Start with the basics</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ideaName">Idea Name</Label>
                    <Input
                      id="ideaName"
                      placeholder="e.g., TaskFlow, FoodieConnect"
                      value={formData.ideaName}
                      onChange={(e) => updateFormData('ideaName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="oneLinePitch">One-line Pitch</Label>
                    <Textarea
                      id="oneLinePitch"
                      placeholder="Describe your idea in one sentence..."
                      value={formData.oneLinePitch}
                      onChange={(e) => updateFormData('oneLinePitch', e.target.value)}
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: "We help [target audience] do [action] by [how]."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Problem & Target Users</h2>
                  <p className="mt-1 text-muted-foreground">Who are you helping and why?</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="problemStatement">Problem Statement</Label>
                    <Textarea
                      id="problemStatement"
                      placeholder="What specific problem are you solving? Why does it matter?"
                      value={formData.problemStatement}
                      onChange={(e) => updateFormData('problemStatement', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      placeholder="Who are your ideal customers? Be specific about demographics, behaviors, and pain points."
                      value={formData.targetAudience}
                      onChange={(e) => updateFormData('targetAudience', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Your Solution</h2>
                  <p className="mt-1 text-muted-foreground">How will you solve this problem?</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proposedSolution">Proposed Solution</Label>
                    <Textarea
                      id="proposedSolution"
                      placeholder="Describe your product or service. What makes it unique?"
                      value={formData.proposedSolution}
                      onChange={(e) => updateFormData('proposedSolution', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="revenueModel">Revenue Model</Label>
                    <Textarea
                      id="revenueModel"
                      placeholder="How will you make money? (e.g., subscription, one-time purchase, freemium, marketplace fees)"
                      value={formData.revenueModel}
                      onChange={(e) => updateFormData('revenueModel', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Current Stage</Label>
                    <RadioGroup
                      value={formData.currentStage}
                      onValueChange={(value) => updateFormData('currentStage', value)}
                      className="grid grid-cols-3 gap-4"
                    >
                      {[
                        { value: 'student', label: 'Student/Idea' },
                        { value: 'mvp', label: 'Building MVP' },
                        { value: 'startup', label: 'Active Startup' },
                      ].map((option) => (
                        <div key={option.value}>
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.value}
                            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card p-4 text-center transition-all hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Analysis Settings</h2>
                  <p className="mt-1 text-muted-foreground">Customize your feedback</p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-warning" />
                        <Label htmlFor="brutallyHonest" className="text-base font-medium">
                          Brutally Honest Mode
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get no-holds-barred feedback like a tough VC would give.
                      </p>
                    </div>
                    <Switch
                      id="brutallyHonest"
                      checked={formData.brutallyHonest}
                      onCheckedChange={(checked) => updateFormData('brutallyHonest', checked)}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-4 font-semibold">Summary</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Idea:</dt>
                      <dd className="font-medium">{formData.ideaName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Stage:</dt>
                      <dd className="font-medium capitalize">{formData.currentStage}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Feedback Style:</dt>
                      <dd className="font-medium">
                        {formData.brutallyHonest ? 'Brutally Honest' : 'Constructive'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Idea
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
