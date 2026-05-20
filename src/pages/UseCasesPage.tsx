import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Rocket,
  Globe,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const UseCasesPage: React.FC = () => {
  const useCases = [
    {
      icon: Briefcase,
      title: 'Small & Medium Enterprises (SMEs)',
      subtitle: '10-500 employees',
      description:
        'SMEs face high operational costs and complex payroll management. DERP allows them to optimize payroll expenses while providing transparent, real-time payments to employees.',
      benefits: [
        'Reduce payroll processing costs by up to 30%',
        'Instant international payments without bank fees',
        'Real-time expense tracking and analytics',
        'Access to yield generation for cash flow optimization',
        'Simple compliance with blockchain transparency',
      ],
      challenge:
        'Traditional payroll systems charge 0.5-2% per transaction; multiple payment methods create tracking complexity.',
      solution:
        'DERP provides unified, transparent payroll on blockchain with 0.5-1% fees and integrated yield generation.',
      example:
        '50-person tech company processes $250K monthly payroll. Traditional bank costs: $2,500/month. DERP saves $1,500/month + generates $5K-$10K/month in yield.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Rocket,
      title: 'Startups & Scale-ups',
      subtitle: '5-200 employees',
      description:
        'Fast-growing startups need flexible, cost-effective payroll that doesn\'t require DevOps expertise. DERP enables them to focus on growth while payroll operates automatically.',
      benefits: [
        'No infrastructure setup or maintenance',
        'Automatic smart contract execution',
        'Attract global talent with crypto-friendly payroll',
        'Generate sustainable yield to extend runway',
        'Transparent fund flow for investors',
      ],
      challenge:
        'Startups need cost flexibility and don\'t want to manage complex traditional payroll infrastructure.',
      solution:
        'DERP is plug-and-play with no upfront infrastructure costs. Smart contracts handle all logic automatically.',
      example:
        'Series B startup with 80 employees and $50K monthly payroll. DERP setup takes 1 day (vs 2-3 weeks for traditional). Monthly yield generation: $2K-$5K.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Remote & Distributed Teams',
      subtitle: '10-1000+ employees globally',
      description:
        'Global companies face routing delays, high international transfer fees, and complex multi-currency management. DERP enables instant, global payments in stablecoins.',
      benefits: [
        'Instant payments regardless of location',
        'No currency conversion delays',
        'Single streamlined wallet for all employees',
        'Transparent transaction history',
        'Compliance-ready audit trails',
      ],
      challenge:
        'International payroll takes 3-5 days, costs $10-50 per employee per payment, and requires multiple payment methods.',
      solution:
        'DERP streams hourly payments to any BSC wallet globally in real-time with <1% fees.',
      example:
        'Global SaaS company with 200 employees across 30 countries paying $400K/month. Traditional costs: $50K-$100K/month in fees + delays. DERP reduces to $3K-$4K/month.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const industries = [
    {
      industry: 'Tech & Software',
      use: 'Global development teams, cost optimization, YC-backed startups',
      icon: '💻',
    },
    {
      industry: 'Freelance Platforms',
      use: 'Creator payments, gig worker management, instant settlements',
      icon: '🎨',
    },
    {
      industry: 'E-Commerce',
      use: 'Vendor payments, global supplier management, inventory optimization',
      icon: '🛍️',
    },
    {
      industry: 'Logistics & Supply Chain',
      use: 'Real-time worker tracking, instant gig payments, fleet management',
      icon: '📦',
    },
    {
      industry: 'Education',
      use: 'Teacher payments, research stipends, student worker management',
      icon: '📚',
    },
    {
      industry: 'Healthcare',
      use: 'Contractor payments, clinical trial participant compensation',
      icon: '⚕️',
    },
    {
      industry: 'Non-Profits',
      use: 'Volunteer payments, grant fund distribution, transparent accounting',
      icon: '🤝',
    },
    {
      industry: 'Gaming & Metaverse',
      use: 'Player payments, creator royalties, in-game economy management',
      icon: '🎮',
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
              <Briefcase className="h-4 w-4" />
              Business Use Cases
            </div>
            <h1 className="public-page-title mb-5">
              Real-World
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Use Cases
              </span>
            </h1>
            <p className="public-page-subtitle">
              See how different organizations are transforming payroll with DERP
            </p>
          </motion.div>

          {/* Main Use Cases */}
          <div className="space-y-16 mb-20">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="public-feature-card">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side */}
                    <div className="lg:w-1/2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`bg-gradient-to-br ${useCase.color} p-3 rounded-2xl shadow-[0_12px_28px_hsl(222_40%_10%/0.12)]`}>
                          <useCase.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold leading-tight">{useCase.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 tracking-wide uppercase">
                            {useCase.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{useCase.description}</p>

                      <div className="mb-6">
                        <h4 className="font-bold mb-3 text-sm tracking-wide uppercase text-muted-foreground">Key Benefits</h4>
                        <ul className="space-y-2 public-bullet-list">
                          {useCase.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:w-1/2 space-y-4">
                      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                        <h4 className="font-bold mb-2 text-red-500">The Challenge</h4>
                        <p className="text-sm leading-relaxed">{useCase.challenge}</p>
                      </div>

                      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                        <h4 className="font-bold mb-2 text-green-500">DERP Solution</h4>
                        <p className="text-sm leading-relaxed">{useCase.solution}</p>
                      </div>

                      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
                        <h4 className="font-bold mb-2">Real Example</h4>
                        <p className="text-sm leading-relaxed">{useCase.example}</p>
                      </div>

                      <NeonButton className="w-full justify-center">
                        Learn More
                      </NeonButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Industry Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="section-heading mb-8">Industry Applications</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <GlassCard key={item.industry} className="public-feature-card">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold mb-2 leading-tight">{item.industry}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.use}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Success Stories / Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="section-heading mb-8">Why Organizations Choose DERP</h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Immediate Cost Savings',
                  description:
                    'Reduce payroll processing fees from 1-2% to just 0.5-1% per transaction. Average savings: $10K-$50K annually.',
                  icon: '💰',
                },
                {
                  title: 'Passive Income Generation',
                  description:
                    'Turn employee payments into yield-generating assets. 85% of funds locked generate 10-15% APY.',
                  icon: '📈',
                },
                {
                  title: 'Global Reach',
                  description:
                    'Hire and pay employees anywhere in the world instantly. No geographic limitations.',
                  icon: '🌍',
                },
                {
                  title: 'Real-Time Transparency',
                  description:
                    'Every transaction recordedon blockchain. Full audit trail. No hidden fees or delays.',
                  icon: '👁️',
                },
                {
                  title: 'Employee Satisfaction',
                  description:
                    'Employees receive real-time payments. Access to yield earnings. Full control over funds.',
                  icon: '😊',
                },
                {
                  title: 'AI-Powered Analytics',
                  description:
                    'Get instant insights about payroll efficiency, yield performance,and organizational metrics.',
                  icon: '🤖',
                },
              ].map((item) => (
                <GlassCard key={item.title} className="public-feature-card">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold mb-2 leading-tight">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-3xl font-bold mb-4 leading-tight">Ready to Transform Your Payroll?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              See how DERP can help your organization reduce costs, generate yield, and
              provide transparency to employees. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton>Start Free Trial</NeonButton>
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

export default UseCasesPage;
