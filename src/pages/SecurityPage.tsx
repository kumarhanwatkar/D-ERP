import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  Landmark,
  Scale,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const SecurityPage: React.FC = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Smart Contract Security',
      description:
        'All payroll and transaction logic is executed through audited smart contracts on Binance Smart Chain.',
      details: [
        'Code audited by leading blockchain security firms',
        'Multi-signature wallet implementation',
        'Reentrancy protection and overflow guards',
        'Pausable contract for emergency situations',
        'Timelock mechanisms for critical upgrades',
      ],
    },
    {
      icon: Eye,
      title: 'Blockchain Transparency',
      description:
        'Every transaction is recorded on-chain and publicly verifiable. No hidden operations or centralized databases.',
      details: [
        'All transactions visible on BSC explorer',
        'Real-time transaction verification',
        'Immutable transaction history',
        'Public wallet address tracking',
        'Transparent fee structure',
      ],
    },
    {
      icon: Zap,
      title: 'Encrypted Communications',
      description:
        'User data and sensitive information are encrypted both in transit and at rest using industry-standard protocols.',
      details: [
        'TLS 1.3 encryption for all connections',
        'End-to-end encryption for sensitive data',
        'Hardware security module support',
        'Regular security audits',
        'Penetration testing quarterly',
      ],
    },
    {
      icon: Landmark,
      title: 'Regulatory Compliance',
      description:
        'DERP operates in compliance with global crypto regulations and financial laws.',
      details: [
        'KYC/AML compliance where required',
        'GDPR compliant data handling',
        'Regular compliance audits',
        'Partnership with legal experts',
        'Tax reporting integration',
      ],
    },
  ];

  const riskFactors = [
    {
      level: 'Critical',
      title: 'Crypto Market Volatility',
      description:
        'Stablecoin prices can fluctuate. While USDT and BUSD are pegged to USD, depeg events have historically occurred.',
      mitigation: 'Keep emergency funds accessible (15%). Diversify yield strategies.',
      icon: '🔴',
    },
    {
      level: 'High',
      title: 'Smart Contract Bugs',
      description:
        'Despite audits, undiscovered vulnerabilities could lead to fund loss.',
      mitigation: 'Audits by leading firms. Bug bounty program. Staged rollout of funds.',
      icon: '🟠',
    },
    {
      level: 'High',
      title: 'Regulatory Changes',
      description:
        'Future crypto regulations could impact platform operations or fund accessibility.',
      mitigation: 'Legal team monitoring. Adaptable architecture. Regional customization.',
      icon: '🟠',
    },
    {
      level: 'Medium',
      title: 'Yield Strategy Risk',
      description:
        'Algorithmic trading strategies may underperform in adverse market conditions.',
      mitigation:
        'Multiple yield strategies. Stop-loss mechanisms. Conservative APY projections.',
      icon: '🟡',
    },
    {
      level: 'Medium',
      title: 'Wallet Security',
      description:
        'Employee wallets can be compromised if private keys are exposed.',
      mitigation: 'Hardware wallet support. 2FA. MetaMask security recommendations.',
      icon: '🟡',
    },
    {
      level: 'Low',
      title: 'Network Congestion',
      description:
        'Binance Smart Chain congestion could delay transactions temporarily.',
      mitigation: 'Dynamic gas fee handling. Queue management. Alternative networks.',
      icon: '🟢',
    },
  ];

  const bestPractices = [
    'Always use hardware wallets for large holdings',
    'Enable 2-factor authentication on all accounts',
    'Never share private keys or seed phrases',
    'Verify smart contract addresses before transactions',
    'Start with small test amounts before large transfers',
    'Keep emergency funds in accessible personal wallets',
    'Regularly check blockchain explorers for transaction verification',
    'Report suspicious activity immediately',
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
              <Shield className="h-4 w-4" />
              Security First
            </div>
            <h1 className="public-page-title mb-5">
              Security & Risk
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Management
              </span>
            </h1>
            <p className="public-page-subtitle">
              Understanding the security measures and risks involved in blockchain-based
              payroll
            </p>
          </motion.div>

          {/* Security Features */}
          <div className="public-grid-2 mb-20">
            {securityFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="public-feature-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>

                  <ul className="space-y-2 public-bullet-list">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Risk Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <GlassCard className="public-section border-2 border-yellow-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">Important Risk Disclaimer</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Cryptocurrency and blockchain-based financial systems involve significant
                    risks. This platform is NOT a traditional financial service and does NOT
                    provide the same protections as banks or regulated financial institutions.
                  </p>
                  <ul className="space-y-2 text-sm public-bullet-list">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>
                        <strong>No FDIC/Government Protection:</strong> Your funds are not
                        insured. Loss of funds due to contract errors, hacks, or market crashes
                        is possible.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>
                        <strong>Experimental Technology:</strong> Smart contracts may contain
                        undiscovered vulnerabilities despite audits.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>
                        <strong>Regulatory Uncertainty:</strong> Crypto regulations are evolving.
                        Future laws could impact platform operations.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>
                        <strong>Yield Not Guaranteed:</strong> Projected yields are estimates and
                        may not materialize. Past performance is not indicative of future results.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>
                        <strong>Stablecoin Risk:</strong> While USDT and BUSD are backed, depeg
                        risks exist.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Risk Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="section-heading mb-8">Known Risk Factors</h2>

            <div className="space-y-4">
              {riskFactors.map((risk) => (
                <GlassCard key={risk.title} className="public-section">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{risk.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg leading-tight">{risk.title}</h4>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            risk.level === 'Critical'
                              ? 'bg-red-500/20 text-red-500'
                              : risk.level === 'High'
                                ? 'bg-orange-500/20 text-orange-500'
                                : risk.level === 'Medium'
                                  ? 'bg-yellow-500/20 text-yellow-500'
                                  : 'bg-green-500/20 text-green-500'
                          }`}
                        >
                          {risk.level}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{risk.description}</p>
                      <p className="text-sm font-semibold mb-1">Mitigation</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{risk.mitigation}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <GlassCard className="public-section">
              <h3 className="text-2xl font-bold mb-6 leading-tight">Security Best Practices</h3>

              <div className="public-grid-2 gap-4">
                {bestPractices.map((practice) => (
                  <div key={practice} className="public-mini-card flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="leading-relaxed">{practice}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Legal & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <GlassCard className="public-feature-card">
              <Scale className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold mb-3 leading-tight">Legal Compliance</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                DERP operates under established blockchain guidelines. However, users are
                responsible for understanding their local crypto tax and legal obligations.
              </p>
              <button className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1">
                View Legal Terms →
              </button>
            </GlassCard>

            <GlassCard className="public-feature-card">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold mb-3 leading-tight">Security Support</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Report security vulnerabilities responsibly. We maintain a bug bounty program
                and respond to security reports within 24 hours.
              </p>
              <button className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1">
                Report Security Issue →
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
