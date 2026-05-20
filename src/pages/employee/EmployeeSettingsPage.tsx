import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Save, ShieldCheck, UserRound } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import FundAllocationControl from '@/components/ui/FundAllocationControl';
import { useAuth } from '@/context/AuthContext';
import { useRealtime } from '@/context/RealtimeContext';
import { backendApi } from '@/lib/backendApi';

const EmployeeSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { socket } = useRealtime();
  const [alerts, setAlerts] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [lockedPercentage, setLockedPercentage] = useState(85);
  const [accessiblePercentage, setAccessiblePercentage] = useState(15);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (!user) return;

    backendApi.getEmployeeSettings(user.id).then((response) => {
      const settings = response.settings || {};
      setAlerts(Boolean(settings.alerts));
      setAutoLock(Boolean(settings.autoLock));
      setLockedPercentage(Number(settings.lockedPercentage ?? 85));
      setAccessiblePercentage(Number(settings.accessiblePercentage ?? 15));
    }).catch(() => {
      // Keep local defaults when backend is unavailable.
    });
  }, [user]);

  React.useEffect(() => {
    if (!socket || !user) return;
    const refresh = (payload: { userId?: string }) => {
      if (!payload.userId || payload.userId === user.id) {
        backendApi.getEmployeeSettings(user.id).then((response) => {
          const settings = response.settings || {};
          setAlerts(Boolean(settings.alerts));
          setAutoLock(Boolean(settings.autoLock));
          setLockedPercentage(Number(settings.lockedPercentage ?? 85));
          setAccessiblePercentage(Number(settings.accessiblePercentage ?? 15));
        });
      }
    };
    socket.on('settings:update', refresh);
    return () => {
      socket.off('settings:update', refresh);
    };
  }, [socket, user]);

  const savePreferences = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await backendApi.updateEmployeeSettings(user.id, {
        alerts,
        autoLock,
        lockedPercentage,
        accessiblePercentage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and security controls.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard className="p-6" variant="default">
            <div className="flex items-center gap-2 mb-5"><UserRound className="w-5 h-5 text-primary" /><h2 className="font-display font-semibold">Profile</h2></div>
            <div className="space-y-3">
              <input value="Kumar Hanwatkar" readOnly className="w-full rounded-lg bg-muted px-3 py-2" />
              <input value="kumar@derp.io" readOnly className="w-full rounded-lg bg-muted px-3 py-2" />
              <input value="Engineering" readOnly className="w-full rounded-lg bg-muted px-3 py-2" />
            </div>
          </GlassCard>

          <GlassCard className="p-6" variant="default">
            <div className="flex items-center gap-2 mb-5"><ShieldCheck className="w-5 h-5 text-primary" /><h2 className="font-display font-semibold">Preferences</h2></div>
            <div className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="flex items-center gap-2 text-sm"><Bell className="w-4 h-4 text-muted-foreground" />Salary notifications</span>
                <input type="checkbox" checked={alerts} onChange={(event) => setAlerts(event.target.checked)} className="h-4 w-4 accent-primary" />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="flex items-center gap-2 text-sm"><Lock className="w-4 h-4 text-muted-foreground" />Auto-lock after payout</span>
                <input type="checkbox" checked={autoLock} onChange={(event) => setAutoLock(event.target.checked)} className="h-4 w-4 accent-primary" />
              </label>
            </div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FundAllocationControl
            defaultLocked={lockedPercentage}
            defaultAccessible={accessiblePercentage}
            onAllocationChange={(locked, accessible) => {
              setLockedPercentage(locked);
              setAccessiblePercentage(accessible);
            }}
            onSaveAllocation={(locked, accessible) => {
              setLockedPercentage(locked);
              setAccessiblePercentage(accessible);
              if (user) {
                backendApi.updateEmployeeSettings(user.id, {
                  alerts,
                  autoLock,
                  lockedPercentage: locked,
                  accessiblePercentage: accessible,
                });
              }
            }}
          />
        </motion.div>

        <div className="flex justify-end">
          <NeonButton onClick={savePreferences} loading={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </NeonButton>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeSettingsPage;
