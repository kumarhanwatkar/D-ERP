import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { LightModeShapes } from '@/components/ui/LightModeShapes';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ROICalculatorPage: React.FC = () => {
  const [salary, setSalary] = useState(50000);
  const [employees, setEmployees] = useState(10);
  const [months, setMonths] = useState(12);
  const [yieldAPY, setYieldAPY] = useState(15);
  const [bankInterestRate, setBankInterestRate] = useState(0.5);

  // Calculations
  const calculations = useMemo(() => {
    const monthlyPayroll = (salary / 12) * employees;
    const totalPayroll = monthlyPayroll * months;

    // 85/15 split
    const lockedAmount = totalPayroll * 0.85;
    const accessibleAmount = totalPayroll * 0.15;

    // Yield calculation (simplified - daily compounding)
    const dailyYieldRate = (yieldAPY / 100) / 365;
    let yieldGenerated = 0;
    let currentLocked = 0;

    for (let day = 0; day < months * 30; day++) {
      currentLocked = (monthlyPayroll * (day / (months * 30))) * 0.85;
      yieldGenerated += currentLocked * dailyYieldRate;
    }

    // Bank interest comparison
    const bankInterestGenerated = (totalPayroll * 0.85) * (bankInterestRate / 100) * (months / 12);

    // Fees (0.75% average)
    const platformFees = totalPayroll * 0.0075;

    // Net gain
    const derPTotal = accessibleAmount + yieldGenerated - platformFees;
    const bankAccountTotal = totalPayroll + bankInterestGenerated;
    const savings = derPTotal - bankAccountTotal;

    return {
      monthlyPayroll,
      totalPayroll,
      lockedAmount,
      accessibleAmount,
      yieldGenerated,
      bankInterestGenerated,
      platformFees,
      derPTotal,
      bankAccountTotal,
      savings,
    };
  }, [salary, employees, months, yieldAPY, bankInterestRate]);

  // Generate monthly projection data
  const projectionData = useMemo(() => {
    const data = [];
    const monthlyPayroll = (salary / 12) * employees;

    for (let i = 1; i <= months; i++) {
      const totalPayrollToDate = monthlyPayroll * i;
      const lockedAmount = totalPayrollToDate * 0.85;

      // Calculate yield to date
      const dailyYieldRate = (yieldAPY / 100) / 365;
      let yieldToDate = 0;
      for (let day = 0; day < i * 30; day++) {
        const dailyLockedAmount = (monthlyPayroll * (day / (i * 30))) * 0.85;
        yieldToDate += dailyLockedAmount * dailyYieldRate;
      }

      data.push({
        month: i,
        derP: (totalPayrollToDate * 0.15) + yieldToDate,
        bank: totalPayrollToDate + (totalPayrollToDate * 0.85) * (bankInterestRate / 100) * (i / 12),
      });
    }

    return data;
  }, [salary, employees, months, yieldAPY, bankInterestRate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />

      <div className="relative with-navbar-offset pb-24 px-4 sm:px-6 lg:px-8">
        <div className="public-page-content max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="public-page-header"
          >
            <div className="eyebrow mb-5 mx-auto w-fit">
              <Target className="h-4 w-4" />
              ROI Insights
            </div>
            <h1 className="public-page-title mb-5">
              DERP ROI
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Calculator
              </span>
            </h1>
            <p className="public-page-subtitle">
              See how much you can save and earn with DERP compared to traditional payroll
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Calculator Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <GlassCard className="public-feature-card">
                <h3 className="text-xl font-bold mb-6 leading-tight">Your Inputs</h3>

                {/* Salary Input */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block tracking-wide uppercase text-muted-foreground">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Average Annual Salary
                  </label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-background border border-border/70 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    ${(salary / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}/month
                  </p>
                </div>

                {/* Employees Input */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block tracking-wide uppercase text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full bg-background border border-border/70 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Total payroll: $
                    {calculations.monthlyPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}/month
                  </p>
                </div>

                {/* Duration Input */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block tracking-wide uppercase text-muted-foreground">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Time Period (Months)
                  </label>
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    min="1"
                    max="60"
                    className="w-full bg-background border border-border/70 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Years: {Math.floor(months / 12)} years
                  </p>
                </div>

                {/* Yield APY Input */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block tracking-wide uppercase text-muted-foreground">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    DERP Yield APY
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={yieldAPY}
                      onChange={(e) => setYieldAPY(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary">{yieldAPY}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Conservative estimate for algorithmic trading yield
                  </p>
                </div>

                {/* Bank Interest Input */}
                <div className="mb-6">
                  <label className="text-sm font-semibold mb-2 block tracking-wide uppercase text-muted-foreground">
                    Bank Interest Rate (Comparison)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={bankInterestRate}
                      onChange={(e) => setBankInterestRate(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="font-bold text-primary">{bankInterestRate}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Current high-yield savings account rates
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <GlassCard className="public-feature-card">
                  <p className="text-sm text-muted-foreground mb-2">Total Payroll Over Period</p>
                  <p className="text-3xl font-bold leading-tight">
                    ${calculations.totalPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </GlassCard>

                <GlassCard className="public-feature-card">
                  <p className="text-sm text-muted-foreground mb-2">Yield Generated</p>
                  <p className="text-3xl font-bold text-green-500 leading-tight">
                    +${calculations.yieldGenerated.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </GlassCard>

                <GlassCard className="public-feature-card">
                  <p className="text-sm text-muted-foreground mb-2">Platform Fees</p>
                  <p className="text-3xl font-bold text-orange-500 leading-tight">
                    -${calculations.platformFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </GlassCard>

                <GlassCard className="public-feature-card">
                  <p className="text-sm text-muted-foreground mb-2">Net Savings vs Bank</p>
                  <p className={`text-3xl font-bold ${calculations.savings > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {calculations.savings > 0 ? '+' : ''}${calculations.savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </GlassCard>
              </div>

              {/* Comparison Table */}
              <GlassCard className="public-section">
                <h3 className="text-xl font-bold mb-4 leading-tight">DERP vs Traditional Bank</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left py-3 px-4 font-semibold uppercase tracking-wide text-xs text-muted-foreground">Metric</th>
                        <th className="text-right py-3 px-4 font-semibold uppercase tracking-wide text-xs text-muted-foreground">DERP Platform</th>
                        <th className="text-right py-3 px-4 font-semibold uppercase tracking-wide text-xs text-muted-foreground">
                          Traditional Bank ({bankInterestRate}% APY)
                        </th>
                        <th className="text-right py-3 px-4 font-semibold uppercase tracking-wide text-xs text-muted-foreground">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/40">
                        <td className="py-4 px-4 font-medium">Total Payroll</td>
                        <td className="text-right py-3 px-4">
                          ${calculations.totalPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-3 px-4">
                          ${calculations.totalPayroll.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-3 px-4 font-semibold">-</td>
                      </tr>
                      <tr className="border-b border-border/40">
                        <td className="py-4 px-4 font-medium">Interest/Yield Generated</td>
                        <td className="text-right py-3 px-4 text-green-500">
                          +${calculations.yieldGenerated.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-3 px-4 text-green-500">
                          +${calculations.bankInterestGenerated.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-3 px-4 font-semibold text-green-500">
                          +${(calculations.yieldGenerated - calculations.bankInterestGenerated).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                      <tr className="border-b border-border/40">
                        <td className="py-4 px-4 font-medium">Fees</td>
                        <td className="text-right py-3 px-4 text-orange-500">
                          -${calculations.platformFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-3 px-4">-</td>
                        <td className="text-right py-3 px-4">-</td>
                      </tr>
                      <tr className="bg-primary/10">
                        <td className="py-4 px-4 font-bold">Final Total</td>
                        <td className="text-right py-4 px-4 font-bold">
                          ${calculations.derPTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-4 px-4 font-bold">
                          ${calculations.bankAccountTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className={`text-right py-4 px-4 font-bold ${calculations.savings > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {calculations.savings > 0 ? '+' : ''}${calculations.savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              {/* Projection Chart */}
              <GlassCard className="public-section">
                <h3 className="text-xl font-bold mb-4 leading-tight">Growth Projection Over Time</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="colorDerP" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBank" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                      formatter={(value) =>
                        `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="derP"
                      stroke="hsl(217 91% 60%)"
                      fillOpacity={1}
                      fill="url(#colorDerP)"
                      name="DERP Platform"
                    />
                    <Area
                      type="monotone"
                      dataKey="bank"
                      stroke="hsl(142 76% 36%)"
                      fillOpacity={1}
                      fill="url(#colorBank)"
                      name="Traditional Bank"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <GlassCard className="public-section border border-yellow-500/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>⚠️ Disclaimer:</strong> This calculator is for illustrative purposes only.
                Actual yields, fees, and returns may vary based on market conditions, yield
                strategy performance, and platform changes. These projections are NOT guarantees.
                Cryptocurrency investments carry risk. Please consult with financial advisors
                before making decisions.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorPage;
