import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Layers, Wallet } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';
import { thesisOverview } from '@/lib/thesisData';

const layers = [
  { name: 'Wallet & Identity', icon: Wallet, detail: 'Secure wallet-based authentication with role mapping.' },
  { name: 'Application Layer', icon: Layers, detail: 'Payroll, resources, and transaction workflows in modular services.' },
  { name: 'Data & Analytics', icon: Database, detail: 'Ledger events, KPI aggregation, and reporting pipelines.' },
  { name: 'AI Services', icon: Brain, detail: 'Prompt-driven dashboard generation and operational recommendations.' },
];

const functionalRequirements = [
  'Blockchain platform using Binance Smart Chain for transparent, tamper-proof financial records',
  'Smart contracts for streaming payroll, 85/15 split, lock period, and automated release',
  'Stablecoin integration for low-volatility salary disbursement',
  'Digital wallet model with hot/cold fund management and traceable activity',
  'Algorithmic trading layer for passive yield with capital protection constraints',
];

const ArchitecturePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <h1 className="text-4xl font-display font-bold">System Architecture</h1>
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
              A layered platform balancing transparency, automation, and operational control on {thesisOverview.blockchain}.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-5">
            {layers.map((layer, index) => (
              <motion.div key={layer.name} initial={{ opacity: 0, x: index % 2 ? 12 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                <GlassCard className="p-6 h-full" variant="default">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <layer.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold">{layer.name}</h2>
                      <p className="text-muted-foreground mt-2">{layer.detail}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <GlassCard className="p-6 mt-6" variant="default">
            <h2 className="text-xl font-display font-semibold mb-3">Functional Requirements Implemented</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {functionalRequirements.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-card/70 p-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default ArchitecturePage;
