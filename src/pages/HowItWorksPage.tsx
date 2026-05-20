import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Play,
  Split,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowDown,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: Wallet,
      number: 1,
      title: 'Company Deposits Funds',
      description:
        'Organization deposits stablecoins (USDT/BUSD) into the DERP contract on Binance Smart Chain. Funds are secured via smart contracts.',
      details: [
        'No intermediaries needed',
        'Instant deposit processing',
        'Transparent on-chain recording',
        'Multi-signature wallet support',
      ],
    },
    {
      icon: Play,
      number: 2,
      title: 'Streaming Payroll Begins',
      description:
        'Once funds are deposited, employees immediately start receiving hourly payments. Payment streams directly to employee wallets in real-time.',
      details: [
        'Real-time hourly payments',
        'Streaming to employee wallets',
        'No delays or batching',
        'Employee receives instant notifications',
      ],
    },
    {
      icon: Split,
      number: 3,
      title: '85/15 Split Happens',
      description:
        'Each payment is automatically split: 15% goes to employee hot wallet for immediate access, 85% goes to lock contract for yield generation.',
      details: [
        '85% locked for yield generation',
        '15% immediately accessible',
        'Customizable split ratios available',
        'Automatic distribution via smart contract',
      ],
    },
    {
      icon: TrendingUp,
      number: 4,
      title: 'Yield Generation Occurs',
      description:
        'The 85% locked funds are deployed via algorithmic trading. Returns are generated continuously and added to employee accounts.',
      details: [
        'Algorithmic trading strategies',
        'Daily yield calculations',
        'Performance-based returns',
        'Risk-adjusted strategies',
      ],
    },
    {
      icon: Lock,
      number: 5,
      title: 'Funds Release & Optimize',
      description:
        'Locked funds can be released based on unlock schedules. Employees have full transparency of all transactions and yields on blockchain.',
      details: [
        'Scheduled unlock options',
        'Employee-initiated withdrawals',
        'Blockchain verification',
        'Complete audit trail',
      ],
    },
  ];

  const benefits = [
    {
      title: 'For Companies',
      items: [
        '💰 Reduce payroll costs through yield generation',
        '📊 Real-time payroll analytics and transparency',
        '🤖 AI-powered insights for optimization',
        '⚡ Instant global payments with no banks',
        '🔐 Smart contract-based security',
      ],
    },
    {
      title: 'For Employees',
      items: [
        '⏱️ Real-time hourly payments as they work',
        '💵 Passive income from yield generation',
        '🔓 Control over fund allocation (85/15 customizable)',
        '📱 Mobile-friendly wallet access',
        '🌍 Global payroll, anywhere with a wallet',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />

      <div className="relative with-navbar-offset pb-24 px-4 sm:px-6 lg:px-8">
        <div className="public-page-content max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="public-page-header"
          >
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Play className="h-4 w-4" />
              Workflow Overview
            </div>
            <h1 className="public-page-title mb-5">
              How DERP Works
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Step by Step
              </span>
            </h1>
            <p className="public-page-subtitle">
              A revolutionary approach to payroll that turns employment into a
              yield-generating experience
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="mb-20">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-12"
              >
                <div
                  className={`flex gap-8 items-start ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  {/* Left Side - Content */}
                  <div className="flex-1">
                    <GlassCard className="public-feature-card">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="public-stat-chip mb-2 w-fit text-primary">
                            Step {step.number}
                          </div>
                          <h3 className="text-2xl font-bold leading-tight">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.details.map((detail) => (
                          <div key={detail} className="public-list-item flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="flex-1 hidden lg:block">
                    <div className="h-full flex items-center justify-center">
                      <div className="relative w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-border/50 flex items-center justify-center">
                        <div className="text-center">
                          <step.icon className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Visual Step {step.number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {idx < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowDown className="w-6 h-6 text-primary/50 animate-bounce" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid gap-8 md:grid-cols-2 mb-20"
          >
            {benefits.map((section) => (
              <GlassCard key={section.title} className="public-feature-card">
                <h3 className="text-2xl font-bold mb-6 leading-tight">{section.title}</h3>
                <ul className="space-y-3 public-bullet-list">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </motion.div>

          {/* Timeline Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <GlassCard className="public-section">
              <h3 className="text-2xl font-bold mb-8 leading-tight">Complete Timeline</h3>

              <div className="space-y-6">
                <div className="flex gap-4 items-start public-mini-card">
                  <div className="text-sm font-bold text-primary bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    0h
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 leading-tight">Funds Deposited</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Company deposits stablecoins into smart contract
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start public-mini-card">
                  <div className="text-sm font-bold text-primary bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    0-1h
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 leading-tight">First Payments Stream</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Employees receive first hourly payment automatically
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start public-mini-card">
                  <div className="text-sm font-bold text-primary bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    1h+
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 leading-tight">Continuous Streaming</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Payroll continues hourly, 85% locked for yield generation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start public-mini-card">
                  <div className="text-sm font-bold text-primary bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    24h+
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 leading-tight">Yield Generation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Locked funds begin generating yield through algorithmic
                      trading
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start public-mini-card">
                  <div className="text-sm font-bold text-primary bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    Ongoing
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 leading-tight">Transparency & Control</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Real-time blockchain verification, full withdrawal control
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-6 leading-tight">Ready to Transform Payroll?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton>Get Started Now</NeonButton>
              <button className="px-8 py-3 rounded-full border border-border/70 bg-card/70 hover:border-primary/40 hover:bg-primary/10 transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
