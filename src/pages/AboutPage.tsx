import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, Users2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';
import {
  thesisImplementationMatrix,
  thesisMainObjective,
  thesisOverview,
  thesisSpecificObjectives,
} from '@/lib/thesisData';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />
      <main className="with-navbar-offset pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="public-page-content max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="public-page-header">
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Users2 className="h-4 w-4" />
              About the Platform
            </div>
            <h1 className="public-page-title mb-5">About D-ERP</h1>
            <p className="public-page-subtitle">
              {thesisOverview.title} is the thesis-backed foundation of this platform, focused on real-time payroll,
              transparent operations, and intelligent enterprise automation.
            </p>
          </motion.div>

          <GlassCard className="public-feature-card" variant="default">
            <h2 className="font-display font-semibold text-xl mb-3 leading-tight">Thesis Context</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {thesisOverview.department} | {thesisOverview.institution} | Session {thesisOverview.session}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {thesisMainObjective}
            </p>
          </GlassCard>

          <GlassCard className="public-feature-card" variant="default">
            <h2 className="font-display font-semibold text-xl mb-4 leading-tight">Specific Objectives</h2>
            <div className="space-y-3">
              {thesisSpecificObjectives.map((item, index) => (
                <div key={index} className="public-mini-card">
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="public-feature-card" variant="default">
            <h2 className="font-display font-semibold text-xl mb-4 leading-tight">Objectives Implementation Matrix</h2>
            <div className="space-y-3">
              {thesisImplementationMatrix.map((item) => (
                <div key={item.objective} className="public-mini-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold">{item.objective}</h3>
                    <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.implementation}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="public-grid-3">
            <GlassCard className="public-feature-card" variant="neon" neonColor="cyan">
              <Users2 className="w-5 h-5 text-primary mb-2" />
              <h2 className="font-semibold mb-1">Team-Centric</h2>
              <p className="text-sm text-muted-foreground">Built for admins, finance leads, and employees in one system.</p>
            </GlassCard>
            <GlassCard className="public-feature-card" variant="neon" neonColor="green">
              <Globe2 className="w-5 h-5 text-success mb-2" />
              <h2 className="font-semibold mb-1">Transparent</h2>
              <p className="text-sm text-muted-foreground">On-chain transaction trails keep operations auditable.</p>
            </GlassCard>
            <GlassCard className="public-feature-card" variant="neon" neonColor="purple">
              <Award className="w-5 h-5 text-secondary mb-2" />
              <h2 className="font-semibold mb-1">Production Ready</h2>
              <p className="text-sm text-muted-foreground">Role controls, observability, and clean UX for daily usage.</p>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
