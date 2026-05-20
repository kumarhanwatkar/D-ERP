import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Wallet, Users, Settings, Target } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  completed: boolean;
}

interface OnboardingWizardProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    orgName: '',
    orgSize: '',
    riskProfile: 'balanced',
    notifications: true,
  });

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Welcome to D-ERP',
      description: 'Lets set up your account in 5 quick steps',
      icon: <Target className="w-12 h-12 text-primary" />,
      completed: true,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              Welcome! We'll guide you through the setup process to get you started with real-time
              payroll and passive income generation.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
            <p>✨ What you'll set up:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Your role (Admin or Employee)</li>
              <li>• Organization details</li>
              <li>• Risk preferences</li>
              <li>• Notification settings</li>
              <li>• Account verification</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Choose Your Role',
      description: 'Are you an admin or employee?',
      icon: <Users className="w-12 h-12 text-primary" />,
      completed: !!formData.role,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">What's your role in the organization?</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                value: 'admin',
                label: 'Admin',
                description: 'Manage organization & payroll',
              },
              {
                value: 'employee',
                label: 'Employee',
                description: 'Receive payroll & manage funds',
              },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFormData({ ...formData, role: option.value })}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.role === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-bold">{option.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: formData.role === 'admin' ? 'Organization Details' : 'Your Profile',
      description: formData.role === 'admin' ? 'Tell us about your organization' : 'Complete your profile',
      icon: <Settings className="w-12 h-12 text-primary" />,
      completed: !!formData.orgName && !!formData.orgSize,
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              {formData.role === 'admin' ? 'Organization Name' : 'Full Name'}
            </label>
            <input
              type="text"
              value={formData.orgName}
              onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
              placeholder={formData.role === 'admin' ? 'Acme Corp' : 'John Doe'}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              {formData.role === 'admin' ? 'Organization Size' : 'Department'}
            </label>
            <select
              value={formData.orgSize}
              onChange={(e) => setFormData({ ...formData, orgSize: e.target.value })}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none transition-all"
            >
              <option value="">
                {formData.role === 'admin' ? 'Select size...' : 'Select department...'}
              </option>
              {formData.role === 'admin'
                ? [
                    { value: '1-10', label: '1-10 employees' },
                    { value: '11-50', label: '11-50 employees' },
                    { value: '51-200', label: '51-200 employees' },
                    { value: '200+', label: '200+ employees' },
                  ]
                : [
                    { value: 'engineering', label: 'Engineering' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'operations', label: 'Operations' },
                    { value: 'support', label: 'Support' },
                    { value: 'other', label: 'Other' },
                  ]
              }
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Risk Preferences',
      description: 'How aggressive should your yield strategy be?',
      icon: <Target className="w-12 h-12 text-primary" />,
      completed: !!formData.riskProfile,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'conservative', label: 'Conservative', apy: '5-8%' },
              { value: 'balanced', label: 'Balanced', apy: '10-15%' },
              { value: 'aggressive', label: 'Aggressive', apy: '15-25%' },
            ].map((profile) => (
              <button
                key={profile.value}
                onClick={() => setFormData({ ...formData, riskProfile: profile.value })}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.riskProfile === profile.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-bold text-sm">{profile.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{profile.apy}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
            <p className="font-medium">
              {formData.riskProfile === 'conservative'
                ? '🛡️ Conservative Profile'
                : formData.riskProfile === 'aggressive'
                  ? '🚀 Aggressive Profile'
                  : '⚖️ Balanced Profile'}
            </p>
            <p className="text-muted-foreground">
              {formData.riskProfile === 'conservative'
                ? 'Lower yield, lower volatility. Best for risk-averse organizations.'
                : formData.riskProfile === 'aggressive'
                  ? 'Higher yield potential, higher volatility. Best for growth-focused organizations.'
                  : 'Balanced approach with moderate yield and reasonable risk exposure.'}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Notifications',
      description: 'How would you like to stay updated?',
      icon: <Wallet className="w-12 h-12 text-primary" />,
      completed: true,
      content: (
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Enable Notifications</p>
              <p className="text-sm text-muted-foreground">Get alerts for payroll, yield, and transactions</p>
            </div>
          </label>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
            <p className="font-medium">You'll receive notifications for:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>✓ Payroll processed</li>
              <li>✓ Yield generated</li>
              <li>✓ Large transactions</li>
              <li>✓ Security alerts</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return !!formData.role;
    if (currentStep === 2) return !!formData.orgName && !!formData.orgSize;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  animate={{
                    opacity: idx <= currentStep ? 1 : 0.5,
                  }}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    idx < currentStep
                      ? 'bg-primary'
                      : idx === currentStep
                        ? 'bg-primary/50'
                        : 'bg-muted'
                  } ${idx !== steps.length - 1 ? 'mr-2' : ''}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">{steps[currentStep].icon}</div>

              {/* Title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>

              {/* Content */}
              <div>{steps[currentStep].content}</div>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-8 flex gap-3 justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="p-2 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="p-2 rounded-lg border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onSkip}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Complete Setup
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard;
