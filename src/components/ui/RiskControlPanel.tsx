import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Target, Shield } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';

interface RiskControlPanelProps {
  onRiskChange?: (level: 'low' | 'medium' | 'high') => void;
  onConfirmRiskLevel?: (level: 'low' | 'medium' | 'high') => void;
}

const RiskControlPanel: React.FC<RiskControlPanelProps> = ({ onRiskChange, onConfirmRiskLevel }) => {
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const riskProfiles = [
    {
      level: 'low' as const,
      title: 'Conservative',
      icon: Shield,
      expectedReturn: '5-8%',
      description: 'Lower risk. Focus on capital preservation',
      features: [
        'Stable coin pairs only',
        'Low leverage strategies',
        'Regular profit-taking',
        '95% allocation to safe assets',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      level: 'medium' as const,
      title: 'Balanced',
      icon: TrendingUp,
      expectedReturn: '10-15%',
      description: 'Moderate risk. Balance growth and safety',
      features: [
        'Diversified yield strategies',
        'Medium volatility tolerance',
        'Dynamic rebalancing',
        '60/40 safe/aggressive split',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      level: 'high' as const,
      title: 'Aggressive',
      icon: Target,
      expectedReturn: '15-25%',
      description: 'Higher risk. Maximum growth potential',
      features: [
        'Advanced trading strategies',
        'Higher leverage enabled',
        'Market-timing algorithms',
        '30/70 safe/aggressive split',
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleRiskChange = (level: 'low' | 'medium' | 'high') => {
    setRiskLevel(level);
    onRiskChange?.(level);
  };

  const currentProfile = riskProfiles.find((p) => p.level === riskLevel);

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex items-start gap-4 mb-6">
          <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2">Yield Risk Management</h3>
            <p className="text-sm text-muted-foreground">
              Control the risk/reward balance of algorithmic yield strategies. Higher risk = higher potential returns.
            </p>
          </div>
        </div>

        {/* Risk Profiles */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {riskProfiles.map((profile) => {
            const Selected = profile.level === riskLevel;
            return (
              <motion.div
                key={profile.level}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleRiskChange(profile.level)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  Selected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <profile.icon className={`w-6 h-6 mb-3 ${Selected ? 'text-primary' : 'text-muted-foreground'}`} />
                <h4 className="font-bold mb-1">{profile.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{profile.description}</p>
                <p className={`text-sm font-semibold ${Selected ? 'text-primary' : 'text-foreground'}`}>
                  {profile.expectedReturn} APY
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Current Profile Details */}
        {currentProfile && (
          <motion.div
            key={currentProfile.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-6"
          >
            <h4 className="font-bold mb-4">{currentProfile.title} Profile Details</h4>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Expected Return
                </p>
                <p className="text-2xl font-bold text-primary">{currentProfile.expectedReturn}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Risk Level
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full ${
                        i <= (currentProfile.level === 'low' ? 1 : currentProfile.level === 'medium' ? 2 : 3)
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Strategy Features</p>
                <ul className="grid md:grid-cols-2 gap-2">
                  {currentProfile.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-primary/20">
              <p className="text-xs text-muted-foreground mb-4">
                💡 Risk levels can be adjusted weekly. Past performance is not indicative of future results.
              </p>
              <NeonButton className="w-full" onClick={() => onConfirmRiskLevel?.(riskLevel)}>
                Confirm Risk Level
              </NeonButton>
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Risk Disclaimer */}
      <GlassCard className="border border-yellow-500/30 bg-yellow-500/5">
        <p className="text-xs text-muted-foreground">
          <strong>⚠️ Disclaimer:</strong> Higher risk profiles may result in greater losses. All yield strategies
          involve risk. Monitor your positions regularly. Consider professional financial advice before
          changing risk levels.
        </p>
      </GlassCard>
    </div>
  );
};

export default RiskControlPanel;
