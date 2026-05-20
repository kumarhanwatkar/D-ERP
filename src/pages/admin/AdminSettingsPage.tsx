import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Building2, Lock, Save, Shield, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import RiskControlPanel from '@/components/ui/RiskControlPanel';
import { backendApi } from '@/lib/backendApi';

const AdminSettingsPage: React.FC = () => {
  const [orgName, setOrgName] = useState('TechForge Industries');
  const [payrollApproval, setPayrollApproval] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    backendApi.getAdminSettings().then((settings) => {
      setOrgName(settings.orgName || 'TechForge Industries');
      setPayrollApproval(Boolean(settings.payrollApproval));
      setEmailAlerts(Boolean(settings.emailAlerts));
      setRiskLevel(settings.riskLevel || 'medium');
    }).catch(() => {
      // Keep local defaults when backend is unavailable.
    });
  }, []);

  const saveSettings = async (nextRiskLevel: 'low' | 'medium' | 'high' = riskLevel) => {
    setIsSaving(true);
    try {
      await backendApi.updateAdminSettings({
        orgName,
        payrollApproval,
        emailAlerts,
        riskLevel: nextRiskLevel,
      });
      setRiskLevel(nextRiskLevel);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">Control your admin preferences, security, and workflows.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6" variant="default">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold">Organization Profile</h2>
            </div>
            <label className="text-sm text-muted-foreground">Organization Name</label>
            <input
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
              className="mt-2 w-full rounded-lg bg-muted px-3 py-2 outline-none ring-2 ring-transparent focus:ring-primary"
            />
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-3 bg-card/70">
                <p className="text-xs text-muted-foreground">Active Departments</p>
                <p className="text-lg font-semibold">5</p>
              </div>
              <div className="rounded-lg border border-border p-3 bg-card/70">
                <p className="text-xs text-muted-foreground">Employees</p>
                <p className="text-lg font-semibold">55</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" variant="default">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold">Payroll Controls</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-border p-3 bg-card/70">
                <span className="text-sm">Require manual payroll approval</span>
                <input
                  type="checkbox"
                  checked={payrollApproval}
                  onChange={(event) => setPayrollApproval(event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-border p-3 bg-card/70">
                <span className="text-sm">Email alerts for failed transactions</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(event) => setEmailAlerts(event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <GlassCard className="p-5" variant="neon" neonColor="cyan">
            <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-primary" /><p className="font-medium">Role Policy</p></div>
            <p className="text-sm text-muted-foreground">Admins can approve payroll and modify wallet policies.</p>
          </GlassCard>
          <GlassCard className="p-5" variant="neon" neonColor="green">
            <div className="flex items-center gap-2 mb-2"><Bell className="w-4 h-4 text-success" /><p className="font-medium">Notification Policy</p></div>
            <p className="text-sm text-muted-foreground">Slack and email alerts are configured for all critical incidents.</p>
          </GlassCard>
          <GlassCard className="p-5" variant="neon" neonColor="purple">
            <div className="flex items-center gap-2 mb-2"><Lock className="w-4 h-4 text-secondary" /><p className="font-medium">Security Policy</p></div>
            <p className="text-sm text-muted-foreground">2FA is mandatory for all admin wallet connections.</p>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RiskControlPanel
            onRiskChange={(profile) => {
              setRiskLevel(profile);
            }}
            onConfirmRiskLevel={(profile) => {
              saveSettings(profile);
            }}
          />
        </motion.div>

        <div className="flex justify-end">
          <NeonButton onClick={() => saveSettings()} loading={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </NeonButton>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;
