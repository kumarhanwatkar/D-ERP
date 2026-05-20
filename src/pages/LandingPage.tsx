import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Bot, 
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const features = [
  {
    icon: Wallet,
    title: 'Streaming Payroll',
    description: 'Pay employees hourly in stablecoins. Instant settlement. No bank fees or delays.',
    color: 'cyan',
  },
  {
    icon: TrendingUp,
    title: 'Yield Generation',
    description: 'Earn 10-15% APY on 85% of payroll funds through algorithmic trading. Passive income.',
    color: 'green',
  },
  {
    icon: Bot,
    title: 'AI-Powered Dashboards',
    description: 'Describe your organization. AI generates custom ERPs with real-time analytics.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Blockchain Verified',
    description: 'Every transaction on BSC. Full audit trail. 0% hidden fees. Complete transparency.',
    color: 'orange',
  },
] as const;

const stats = [
  { value: '$2.4M+', label: 'Payroll Processed' },
  { value: '12.5%', label: 'Average Yield' },
  { value: '50%', label: 'Fee Savings' },
  { value: '0ms', label: 'Settlement Time' },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <LightModeShapes variant="public" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative with-navbar-offset pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

        <div className="relative public-page-content max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Built on Binance Smart Chain
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 leading-[0.95] tracking-tight"
          >
            <span className="gradient-text">Real-Time Payroll</span>
            <br />
            <span className="text-foreground">+ Passive Income Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Pay employees hourly on blockchain, lock 85% of funds to generate 10-15% APY yield,
            and save 50-70% on payroll fees. All transparent, auditable, and automated with AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login">
              <NeonButton size="lg">
                <Wallet className="w-5 h-5 mr-2" />
                Start for Free
              </NeonButton>
            </Link>
            <Link to="/roi-calculator">
              <NeonButton variant="outline" size="lg">
                Calculate Your ROI
                <TrendingUp className="w-5 h-5 ml-2" />
              </NeonButton>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-5xl mx-auto mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((stat, index) => (
            <GlassCard key={index} className="public-feature-card text-center" variant="glow" neonColor="cyan">
              <p className="text-3xl sm:text-4xl font-display font-bold gradient-text leading-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="public-page-content max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="public-page-header"
          >
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Shield className="h-4 w-4" />
              Why D-ERP
            </div>
            <h2 className="section-heading mb-4">
              Revolutionary <span className="gradient-text">Features</span>
            </h2>
            <p className="section-subheading mx-auto">
              Combining blockchain technology, AI automation, and DeFi yield strategies
              to create the next generation of enterprise resource planning.
            </p>
          </motion.div>

          <div className="public-grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="public-feature-card h-full" variant="neon" neonColor={feature.color}>
                  <div className={`w-14 h-14 rounded-2xl bg-neon-${feature.color}/10 flex items-center justify-center mb-6`}>
                    <feature.icon className={`w-7 h-7 text-neon-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="public-page-content max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="public-page-header"
          >
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Cpu className="h-4 w-4" />
              Workflow
            </div>
            <h2 className="section-heading mb-4">
              How <span className="gradient-text">D-ERP</span> Works
            </h2>
            <p className="section-subheading mx-auto">
              From wallet connection to continuous payroll streaming, the system is designed to stay clear, auditable, and easy to operate.
            </p>
          </motion.div>

          <div className="public-grid-3 lg:grid-cols-3">
            {[
              {
                step: '01',
                icon: Globe,
                title: 'Connect & Configure',
                description: 'Connect your wallet and describe your organization. Our AI generates your custom ERP dashboard instantly.',
              },
              {
                step: '02',
                icon: Lock,
                title: 'Smart Capital Split',
                description: '15% stays liquid in Cold Wallet for payroll. 85% enters Hot Wallet for yield generation via trading bots.',
              },
              {
                step: '03',
                icon: Cpu,
                title: 'Automated Operations',
                description: 'Employees receive hourly payments automatically. Track everything on-chain with full transparency.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard className="public-feature-card h-full relative" variant="glow">
                  <span className="absolute top-6 right-6 text-5xl font-display font-bold text-muted/20">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 leading-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="public-feature-card text-center" variant="glow" neonColor="purple">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-heading mb-4">
                Ready to Save 50% on Payroll + Earn Yield?
              </h2>
              <p className="section-subheading mx-auto mb-8">
                Join organizations saving thousands monthly with real-time streaming payroll,
                passive yield generation, and AI-powered analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <NeonButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </NeonButton>
                </Link>
                <Link to="/pricing">
                  <NeonButton variant="outline" size="lg">
                    View Plans
                  </NeonButton>
                </Link>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-lg font-semibold mb-8">Trusted by leading organizations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '✅', label: 'Smart Contracts Audited' },
              { icon: '🔐', label: '0% Hidden Fees' },
              { icon: '⚡', label: 'Instant Settlements' },
              { icon: '📊', label: 'Blockchain Verified' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="font-display font-bold">D-ERP</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Real-time payroll + passive yield on blockchain
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/roi-calculator" className="text-sm text-muted-foreground hover:text-foreground">ROI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link></li>
                <li><Link to="/use-cases" className="text-sm text-muted-foreground hover:text-foreground">Use Cases</Link></li>
                <li><Link to="/security" className="text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/compliance" className="text-sm text-muted-foreground hover:text-foreground">Compliance</Link></li>
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 D-ERP. Priyadarshini College of Engineering, Nagpur.
            </p>
            <p className="text-xs text-muted-foreground">
              Built on Binance Smart Chain | Powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
