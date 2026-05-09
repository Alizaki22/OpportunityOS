import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Bot, CheckCircle2, Sparkles, User, GraduationCap, Target, Briefcase } from 'lucide-react';
import { useApp } from '@/lib/context';

const steps = [
  { id: 'basics', title: 'The Basics', icon: User },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'goals', title: 'Career Goals', icon: Target },
  { id: 'ai', title: 'AI Copilot', icon: Bot },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding, login } = useApp();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    educationLevel: 'Undergraduate',
    university: '',
    skills: [] as string[],
    interests: [] as string[],
    careerGoals: '',
  });

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
      if (step === steps.length - 2) {
        // Entering AI step
        setGenerating(true);
        setTimeout(() => setGenerating(false), 2000);
      }
    } else {
      login(undefined); // use mock user for now, but mark onboarding complete
      completeOnboarding(formData);
      navigate('/dashboard');
    }
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-background flex flex-col page-enter">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-secondary/50">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: \`\${((step + 1) / steps.length) * 100}%\` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-lg mx-auto w-full">
        
        {/* Step Header */}
        <div className="w-full mb-8 text-center">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
          >
            <currentStep.icon className="w-6 h-6" />
          </motion.div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {currentStep.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-5"
          >
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@university.edu"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Current Level</label>
                  <select 
                    value={formData.educationLevel}
                    onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option>High School</option>
                    <option>Undergraduate</option>
                    <option>Master's</option>
                    <option>PhD</option>
                    <option>Bootcamp/Self-Taught</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">University / Institution</label>
                  <input 
                    type="text" 
                    value={formData.university}
                    onChange={e => setFormData({ ...formData, university: e.target.value })}
                    placeholder="e.g. MIT, NUS, Self-taught"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Primary Career Goal</label>
                  <input 
                    type="text" 
                    value={formData.careerGoals}
                    onChange={e => setFormData({ ...formData, careerGoals: e.target.value })}
                    placeholder="e.g. AI Engineer, Web3 Founder"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Key Skills (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.skills.join(', ')}
                    onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="React, Python, Solidity"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center">
                {generating ? (
                  <div className="py-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Sparkles className="w-8 h-8 text-primary animate-pulse-live" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-2">AI is analyzing your profile...</p>
                    <p className="text-xs text-muted-foreground">Generating personalized recommendations</p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-xl border border-border bg-card text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary">AI-Generated Profile Summary</span>
                      </div>
                      <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                        {formData.name || 'You'} {formData.educationLevel ? \`is a \${formData.educationLevel} student\` : 'is a student'} {formData.university ? \`at \${formData.university}\` : ''} with strong skills in {formData.skills.length ? formData.skills.slice(0, 3).join(', ') : 'technology'}. Passionate about {formData.interests.length ? formData.interests.slice(0, 2).join(' and ') : 'innovation'}, with aspirations in {formData.careerGoals || 'tech leadership'}. Recommended focus: AI-powered opportunities, competitive scholarships, and industry hackathons.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card text-left">
                      <p className="text-xs font-semibold text-foreground mb-3">Recommended Next Steps</p>
                      {['Apply to Google Summer of Code', 'Explore Chevening Scholarship', 'Join Solana Hyperdrive Hackathon'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-sm text-secondary-foreground/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-4 sm:p-6 max-w-lg mx-auto w-full flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="px-6 py-3 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={next}
          disabled={generating}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {step === steps.length - 1 ? (generating ? 'Generating...' : 'Launch Dashboard') : 'Continue'}
          {!generating && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
