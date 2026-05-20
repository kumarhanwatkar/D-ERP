import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Shield, TrendingUp, Wallet } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';
import { thesisApplications, thesisCoreFeatures, thesisOverview } from '@/lib/thesisData';

const features = [
  { title: 'Streaming Payroll', description: 'Hourly salary streams settle on-chain with transparent audit trails.', icon: Wallet, color: 'cyan' as const },
  { title: 'Yield Automation', description: 'Idle capital is routed to a monitored strategy with risk controls.', icon: TrendingUp, color: 'green' as const },
  { title: 'AI Dashboard Builder', description: 'Describe your org in natural language and generate dashboards instantly.', icon: Bot, color: 'purple' as const },
  { title: 'Security and Compliance', description: 'Role-based controls, transaction verification, and reporting built-in.', icon: Shield, color: 'orange' as const },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />
      <main className="with-navbar-offset pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="public-page-content max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="public-page-header">
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Bot className="h-4 w-4" />
              Platform Features
            </div>
            <h1 className="public-page-title mb-5">Platform Features</h1>
            <p className="public-page-subtitle">
              Core capabilities derived from the thesis design for {thesisOverview.blockchain}-based decentralized ERP.
            </p>
          </motion.div>
          <div className="public-grid-2">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                <GlassCard className="public-feature-card" variant="neon" neonColor={feature.color}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-2 leading-tight">{feature.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="public-grid-2 mt-6">
            <GlassCard className="public-feature-card" variant="default">
              <h2 className="text-xl font-display font-semibold mb-4 leading-tight">Thesis Applications</h2>
              <ul className="space-y-2">
                {thesisApplications.map((item) => (
                  <li key={item} className="public-mini-card text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="public-feature-card" variant="default">
              <h2 className="text-xl font-display font-semibold mb-4 leading-tight">Core Feature Checklist</h2>
              <ul className="space-y-2">
                {thesisCoreFeatures.map((item) => (
                  <li key={item} className="public-mini-card text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
