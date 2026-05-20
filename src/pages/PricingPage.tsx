import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Shield, Brain } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 0.5,
      period: '%',
      description: 'Perfect for small teams',
      employees: 'Up to 10 employees',
      features: [
        'Real-time streaming payroll',
        'Basic dashboard',
        'Employee management',
        'Transaction history',
        'Email support',
        'Light/Dark theme',
        'Basic AI configuration',
      ],
      notIncluded: [
        'Advanced analytics',
        'Risk control panel',
        'Custom integrations',
        'Priority support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 0.75,
      period: '%',
      description: 'For growing organizations',
      employees: '11-100 employees',
      features: [
        'Everything in Starter',
        'Advanced analytics & insights',
        'Yield optimization',
        'Risk control panel',
        'Transparency dashboard',
        'Priority email support',
        'AI assistant chat',
        'Custom dashboards',
        '85/15 fund distribution',
      ],
      notIncluded: [
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      employees: '100+ employees',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'API access',
        'Dedicated account manager',
        '99.9% SLA guarantee',
        'Advanced compliance tools',
        'Multi-signature wallets',
        'White-label options',
        'Custom yield strategies',
        '24/7 phone support',
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const transactionFees = [
    { type: 'Payroll Transaction', from: '0.5%', to: '1%' },
    { type: 'Yield Withdrawal', from: '0.3%', to: '0.7%' },
    { type: 'Fund Transfer', from: '0.5%', to: '1%' },
    { type: 'API Call', from: 'Free', to: 'Free' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />

      <div className="relative with-navbar-offset pb-24 px-4 sm:px-6 lg:px-8">
        <div className="public-page-content max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="public-page-header"
          >
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Brain className="h-4 w-4" />
              Pricing Plans
            </div>
            <h1 className="public-page-title mb-5">
              Transparent Pricing for
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Every Scale
              </span>
            </h1>
            <p className="public-page-subtitle">
              No hidden fees. Pay only for what you use. Scale as you grow.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-20">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard
                  className={`public-feature-card flex flex-col ${
                    plan.highlighted ? 'md:scale-[1.02] ring-2 ring-primary/40' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="public-stat-chip mb-4 w-fit text-primary">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2 leading-tight">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-4 rounded-2xl border border-border/60 bg-background/40 p-4">
                    {typeof plan.price === 'number' ? (
                      <div>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-primary font-semibold">
                          {plan.period}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          per transaction
                        </p>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold">{plan.price}</div>
                    )}
                  </div>

                  <p className="text-sm font-semibold mb-6 text-muted-foreground tracking-wide uppercase">
                    {plan.employees}
                  </p>

                  <NeonButton className="w-full mb-6 justify-center">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </NeonButton>

                  {/* Features */}
                  <div className="space-y-3 flex-1">
                    <p className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">Included</p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="public-list-item">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.length > 0 && (
                      <>
                        <p className="font-semibold text-sm pt-4 tracking-wide uppercase text-muted-foreground">
                          Not included
                        </p>
                        {plan.notIncluded.map((feature) => (
                          <div key={feature} className="public-list-item">
                            <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Transaction Fees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <GlassCard className="public-section">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Transaction Fees</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                        Transaction Type
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                        Fee Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionFees.map((fee) => (
                      <tr key={fee.type} className="border-b border-border/40 last:border-b-0">
                        <td className="py-4 px-4 font-medium">{fee.type}</td>
                        <td className="text-right py-4 px-4 font-semibold">
                          {fee.from === 'Free' ? (
                            <span className="text-green-500">{fee.from}</span>
                          ) : (
                            `${fee.from} – ${fee.to}`
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                💡 Fees support platform operations, smart contract audits, yield
                optimization, and compliance infrastructure.
              </p>
            </GlassCard>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: Shield,
                title: 'Blockchain Backed',
                description:
                  'All transactions verified on BSC. No middle-men. Full transparency.',
              },
              {
                icon: Brain,
                title: 'AI-Powered Dashboards',
                description:
                  'Describe your organization. AI builds your custom ERP instantly.',
              },
              {
                icon: Zap,
                title: 'Yield Optimization',
                description:
                  '85% of funds locked generate yield. Turn payroll into income.',
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-6">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
