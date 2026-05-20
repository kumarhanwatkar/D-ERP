import React from 'react';
import { motion } from 'framer-motion';
import {
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const CompliancePage: React.FC = () => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const complianceSections = [
    {
      id: 'overview',
      title: 'Legal Compliance Overview',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p>
            DERP operates as a blockchain-based payroll services platform. While cutting-edge,
            we committed to regulatory compliance and work with legal experts across multiple
            jurisdictions.
          </p>
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="font-semibold mb-2">⚠️ Important Note:</p>
            <p className="text-sm">
              This page is for informational purposes. DERP is not a bank, money transmitter (in
              most jurisdictions), or investment advisor. Users should consult their own legal and
              tax professionals before using DERP.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'taxTreatment',
      title: 'Tax Treatment & Reporting',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <h4 className="font-bold">Employee Taxation</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Gross Income:</strong> All streamed payments count as taxable income.
                DERP provides tax reporting tools via integrated reporting partners.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Yield Income:</strong> Generated yield is treated as investment income
                (interest/capital gains depending on jurisdiction).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Crypto Gains:</strong> Any growth in stablecoin value or trading gains may
                have tax implications.
              </span>
            </li>
          </ul>

          <h4 className="font-bold mt-6">Employer Deductions</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Payroll Expense:</strong> Streamed employee wages are deductible business
                expenses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Platform Fees:</strong> DERP platform fees (0.5-1%) are business expenses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Yield Income:</strong> Employer yield earnings may be taxable income or
                business revenue.
              </span>
            </li>
          </ul>

          <p className="text-sm text-muted-foreground mt-4">
            💡 <strong>Recommendation:</strong> Work with a CPA or tax professional familiar with
            crypto transactions for your specific jurisdiction.
          </p>
        </div>
      ),
    },
    {
      id: 'payrollRegulations',
      title: 'Payroll Regulations',
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <h4 className="font-bold">Wage & Hour Laws</h4>
          <p className="text-sm text-muted-foreground">
            DERP is a payment platform, not a payroll processor. Employers remain responsible for:
          </p>
          <ul className="space-y-2 text-sm mt-3">
            <li>✓ Calculating wage amounts (minimum wage, overtime)</li>
            <li>✓ Tracking hours worked</li>
            <li>✓ Ensuring compliance with local labor laws</li>
            <li>✓ Maintaining wage records</li>
            <li>✓ Issuing pay stubs and documentation</li>
          </ul>

          <h4 className="font-bold mt-6">Employment Classifications</h4>
          <p className="text-sm text-muted-foreground">
            DERP works with both:
          </p>
          <ul className="space-y-2 text-sm mt-3">
            <li>
              <strong>W-2 Employees:</strong> DERP can stream wages to employee's personal wallet.
              Employer maintains traditional employment relationship.
            </li>
            <li>
              <strong>1099 Contractors:</strong> DERP supports contractor payments with proper
              documentation.
            </li>
            <li>
              <strong>International Workers:</strong> Country-specific considerations apply.
              Consult local payroll experts.
            </li>
          </ul>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
            <p className="text-sm">
              ⚠️ <strong>Compliance Responsibility:</strong> Employers must ensure proper
              classification and wage calculations. DERP is not responsible for wage law violations.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'antiMoneyLaundering',
      title: 'AML/KYC Compliance',
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            DERP implements anti-money laundering and know-your-customer procedures to comply with
            FinCEN and international standards.
          </p>

          <h4 className="font-bold mt-4">KYC Requirements</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Organizations must complete KYC verification to operate accounts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Beneficial owners/signatories must be identified</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Employees may need basic verification for large transfers</span>
            </li>
          </ul>

          <h4 className="font-bold mt-4">AML Monitoring</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Transaction monitoring for suspicious patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>OFAC screening for sanctioned jurisdictions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Suspicious Activity Reporting (SAR) when required</span>
            </li>
          </ul>

          <p className="text-xs text-muted-foreground mt-4">
            Note: Specific AML requirements vary by jurisdiction. DERP adapts procedures based on
            local regulations.
          </p>
        </div>
      ),
    },
    {
      id: 'dataPrivacy',
      title: 'Data Privacy & GDPR',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            DERP respects user privacy and complies with GDPR, CCPA, and other privacy regulations.
          </p>

          <h4 className="font-bold mt-4">Data Collection</h4>
          <ul className="space-y-2 text-sm">
            <li>✓ Wallet addresses and transaction history (blockchain-public)</li>
            <li>✓ KYC information (segregated, encrypted)</li>
            <li>✓ Email communications (for notifications/support)</li>
            <li>✓ Usage analytics (anonymized, aggregated)</li>
          </ul>

          <h4 className="font-bold mt-4">User Rights</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Access:</strong> Users can request their personal data held by DERP
            </li>
            <li>
              <strong>Portability:</strong> Data can be exported in machine-readable format
            </li>
            <li>
              <strong>Deletion:</strong> Request to delete personal data (blockchain history
              retained per immutability)
            </li>
            <li>
              <strong>Correction:</strong> Users can update inaccurate personal information
            </li>
          </ul>

          <p className="text-xs text-muted-foreground mt-4">
            For privacy inquiries: privacy@derp.platform
          </p>
        </div>
      ),
    },
  ];

  const regionalConsiderations = [
    {
      region: '🇺🇸 United States',
      considerations: [
        'FinCEN Money Services Business (MSB) regulations may apply depending on structure',
        'State-level money transmitter licenses being evaluated',
        'SEC securities laws for staked/yield products',
        'IRS classifies crypto transactions as taxable events',
        'State wage laws must be followed for employees',
      ],
    },
    {
      region: '🇪🇺 European Union',
      considerations: [
        'GDPR compliance mandatory for all EU resident data',
        'MiCA (Markets in Crypto Assets Regulation) when it takes effect',
        'PSD2 open banking considerations',
        'Employment laws vary by country within EU',
        'Withholding tax on payments varies by country',
      ],
    },
    {
      region: '🇬🇧 United Kingdom',
      considerations: [
        'FCA regulatory consultation on stablecoin payroll',
        'Employment Rights Act compliance required',
        'GDPR continues post-Brexit (UK-GDPR)',
        'Crypto tax reporting to HMRC',
        'National Insurance contributions considerations',
      ],
    },
    {
      region: '🇸🇬 Singapore',
      considerations: [
        'MAS (Monetary Authority of Singapore) crypto payment regulations',
        'Payment Services Act (PSA) licensing considerations',
        'Employment Act compliance required',
        'Income tax on received wages standard',
        'Stablecoin/crypto forward-friendly environment',
      ],
    },
    {
      region: '🇯🇵 Japan',
      considerations: [
        'Payment Services Act (PSA) regulated',
        'Crypto exchanges regulated, payroll platform less clear',
        'Labor Standards Law for wage payment timing',
        'Corporate and income tax on gains',
        'Tax reporting to National Tax Agency required',
      ],
    },
    {
      region: '🌍 Other Regions',
      considerations: [
        'Emerging crypto regulations worldwide',
        'Bank wire requirements for certain jurisdictions',
        'International tax treaties affect employer/employee taxation',
        'Local labor law compliance mandatory',
        'Recommend legal consultation before deployment',
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
              <Scale className="h-4 w-4" />
              Legal Standards
            </div>
            <h1 className="public-page-title mb-5">
              Compliance &
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Legal Overview
              </span>
            </h1>
            <p className="public-page-subtitle">
              Understanding regulatory requirements for blockchain-based payroll services
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-4 mb-20">
            {complianceSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <GlassCard
                  className="public-section cursor-pointer"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{section.title}</h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedSection === section.id && (
                    <div className="mt-6 pt-6 border-t border-border">
                      {section.content}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Regional Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="section-heading mb-8">Regional Considerations</h2>

            <div className="public-grid-2">
              {regionalConsiderations.map((item) => (
                <GlassCard key={item.region} className="public-feature-card">
                  <h4 className="font-bold mb-4 text-lg leading-tight">{item.region}</h4>
                  <ul className="space-y-2 text-sm public-bullet-list">
                    {item.considerations.map((consideration) => (
                      <li key={consideration} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="leading-relaxed">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-sm leading-relaxed">
                <strong>💡 Geography-Specific Action:</strong> Before deploying DERP in a new
                region, consult with local tax counsel and employment law experts. Crypto
                regulations are evolving globally. DERP provides tools, but legal compliance is
                your responsibility.
              </p>
            </div>
          </motion.div>

          {/* Compliance Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <GlassCard className="public-section">
              <h2 className="section-heading mb-8">Pre-Launch Compliance Checklist</h2>

              <div className="public-grid-2 gap-4">
                {[
                  'Consult with employment law attorney in your jurisdiction',
                  'Verify wage and hour law compliance for your state/country',
                  'Establish proper employee classification (W-2 vs 1099)',
                  'Implement tax withholding procedures (if required)',
                  'Document KYC/AML procedures for regulatory audit',
                  'Create employee agreements explaining crypto payroll',
                  'Set up accounting and audit trail recording',
                  'Train HR team on crypto payroll processes',
                  'Consult with CPA for tax treatment guidance',
                  'Create incident response plan for smart contract issues',
                ].map((item) => (
                  <div key={item} className="public-mini-card flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Legal Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <GlassCard className="public-section border-2 border-red-500/30 bg-red-500/5">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">Legal Disclaimer</h3>
                  <ul className="space-y-2 text-sm public-bullet-list">
                    <li>
                      <strong>Not Legal Advice:</strong> This page is informational only. It is not
                      legal advice. You must consult qualified legal professionals.
                    </li>
                    <li>
                      <strong>No Warranty:</strong> DERP makes no warranty about compliance. Users
                      are fully responsible for legal compliance.
                    </li>
                    <li>
                      <strong>Regulatory Changes:</strong> Regulations evolve. What is compliant
                      today may change tomorrow.
                    </li>
                    <li>
                      <strong>Jurisdiction Specific:</strong> Laws vary drastically by location.
                      Your jurisdiction may have unique requirements.
                    </li>
                    <li>
                      <strong>Risk Assumption:</strong> Using DERP means accepting legal and
                      regulatory risks associated with blockchain-based payroll.
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4 leading-tight">Questions About Compliance?</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Contact our compliance team or consult with your legal advisors
            </p>
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
              Contact Compliance Team
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
