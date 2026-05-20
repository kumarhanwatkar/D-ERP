import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Clock3, DollarSign } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';
import { useRealtime } from '@/context/RealtimeContext';
import { backendApi } from '@/lib/backendApi';

const earningsData = [
  { day: 'Mon', value: 185 },
  { day: 'Tue', value: 200 },
  { day: 'Wed', value: 195 },
  { day: 'Thu', value: 210 },
  { day: 'Fri', value: 205 },
  { day: 'Sat', value: 120 },
  { day: 'Sun', value: 140 },
];

const EmployeeEarningsPage: React.FC = () => {
  const { user } = useAuth();
  const { socket } = useRealtime();
  const [earningsSummary, setEarningsSummary] = React.useState<{ total: number; charts: typeof earningsData } | null>(null);

  const loadEarnings = React.useCallback(() => {
    if (!user) return;
    backendApi.getEmployeeEarnings(user.id).then((response) => {
      const totalValue = Array.isArray(response.charts?.weeklyEarnings)
        ? response.charts.weeklyEarnings.reduce((sum: number, row: { earnings: number }) => sum + row.earnings, 0)
        : earningsData.reduce((sum, row) => sum + row.value, 0);

      setEarningsSummary({
        total: totalValue,
        charts: response.charts?.weeklyEarnings?.length ? response.charts.weeklyEarnings : earningsData,
      });
    }).catch(() => {
      setEarningsSummary(null);
    });
  }, [user]);

  React.useEffect(() => {
    loadEarnings();
  }, [loadEarnings]);

  React.useEffect(() => {
    if (!socket || !user) return;
    const refresh = () => loadEarnings();
    socket.on('payroll:update', refresh);
    return () => {
      socket.off('payroll:update', refresh);
    };
  }, [socket, user, loadEarnings]);

  const total = earningsSummary?.total ?? earningsData.reduce((sum, row) => sum + row.value, 0);
  const chartData = earningsSummary?.charts ?? earningsData;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">Earnings Overview</h1>
          <p className="text-muted-foreground">Track your streaming payroll and weekly payout trends.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-5" variant="glow" neonColor="cyan">
            <div className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-primary" /><div><p className="text-xs text-muted-foreground">This Week</p><p className="text-xl font-semibold">${total}</p></div></div>
          </GlassCard>
          <GlassCard className="p-5" variant="glow" neonColor="green">
            <div className="flex items-center gap-3"><ArrowUpRight className="w-5 h-5 text-success" /><div><p className="text-xs text-muted-foreground">Growth</p><p className="text-xl font-semibold">+8.0%</p></div></div>
          </GlassCard>
          <GlassCard className="p-5" variant="glow" neonColor="purple">
            <div className="flex items-center gap-3"><Clock3 className="w-5 h-5 text-secondary" /><div><p className="text-xs text-muted-foreground">Hourly Rate</p><p className="text-xl font-semibold">$25/hr</p></div></div>
          </GlassCard>
          <GlassCard className="p-5" variant="glow" neonColor="orange">
            <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-warning" /><div><p className="text-xs text-muted-foreground">Projected Month</p><p className="text-xl font-semibold">$3,980</p></div></div>
          </GlassCard>
        </div>

        <GlassCard className="p-6" variant="default">
          <h2 className="font-display font-semibold mb-4">Weekly Earnings</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '10px',
                }}
              />
              <Area dataKey="value" stroke="hsl(217 91% 60%)" fill="url(#earningsFill)" strokeWidth={2.2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeEarningsPage;
