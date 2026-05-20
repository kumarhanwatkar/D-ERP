import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Lock, Wallet } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';

interface FundAllocationProps {
  defaultLocked?: number;
  defaultAccessible?: number;
  onAllocationChange?: (locked: number, accessible: number) => void;
  onSaveAllocation?: (locked: number, accessible: number) => void;
}

const FundAllocationControl: React.FC<FundAllocationProps> = ({
  defaultLocked = 85,
  defaultAccessible = 15,
  onAllocationChange,
  onSaveAllocation,
}) => {
  const [lockedPercentage, setLockedPercentage] = useState(defaultLocked);
  const [accessiblePercentage, setAccessiblePercentage] = useState(defaultAccessible);

  const presets = [
    { name: 'Conservative', locked: 95, accessible: 5 },
    { name: 'Standard (Default)', locked: 85, accessible: 15 },
    { name: 'Balanced', locked: 70, accessible: 30 },
    { name: 'Flexible', locked: 50, accessible: 50 },
    { name: 'Immediate Access', locked: 15, accessible: 85 },
  ];

  const handleSliderChange = (locked: number) => {
    const accessible = 100 - locked;
    setLockedPercentage(locked);
    setAccessiblePercentage(accessible);
    onAllocationChange?.(locked, accessible);
  };

  const handlePreset = (locked: number, accessible: number) => {
    setLockedPercentage(locked);
    setAccessiblePercentage(accessible);
    onAllocationChange?.(locked, accessible);
  };

  const yieldMultiplier = (lockedPercentage / 85) * 12.5; // Base: 85% @ 12.5% APY

  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Fund Allocation Control
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Choose how to split your earnings: locked for yield vs. accessible immediately.
        </p>

        {/* Visual Allocation Pie */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-64 h-64">
            {/* Pie Chart SVG */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(217 91% 60% / 0.2)"
                strokeWidth="25"
                strokeDasharray={`${(lockedPercentage / 100) * 282.6} 282.6`}
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(217 91% 60%)"
                strokeWidth="20"
                strokeDasharray={`${(lockedPercentage / 100) * 282.6} 282.6`}
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-muted-foreground">Locked for Yield</p>
              <p className="text-3xl font-bold text-primary">{lockedPercentage}%</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center gap-4 ml-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded" />
              <div>
                <p className="text-sm font-semibold">Locked (Yield-Bearing)</p>
                <p className="text-xs text-muted-foreground">{lockedPercentage}% - Earns ~{yieldMultiplier.toFixed(1)}% APY</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-muted rounded" />
              <div>
                <p className="text-sm font-semibold">Accessible (Spend Now)</p>
                <p className="text-xs text-muted-foreground">{accessiblePercentage}% - Available immediately</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-8">
          <label className="text-sm font-semibold mb-3 block">Fine-Tune Allocation</label>
          <input
            type="range"
            min="0"
            max="100"
            value={lockedPercentage}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0% Locked (All Spend)</span>
            <span>100% Locked (All Yield)</span>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="mb-8">
          <label className="text-sm font-semibold mb-3 block">Quick Presets</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {presets.map((preset) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => handlePreset(preset.locked, preset.accessible)}
                className={`p-3 rounded-lg border-2 transition-all text-xs font-semibold ${
                  lockedPercentage === preset.locked
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div>{preset.name}</div>
                <div className={lockedPercentage === preset.locked ? 'text-primary' : 'text-muted-foreground'}>
                  {preset.locked}/{preset.accessible}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Display Current Yields */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
          <h4 className="font-bold mb-4">Estimated Monthly Earnings</h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Example: $3,000 Monthly Payment
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Direct Access (15% rule):</span>
                  <span className="font-bold">${((3000 * accessiblePercentage) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Locked for Yield ({yieldMultiplier.toFixed(1)}% APY):</span>
                  <span className="font-bold text-green-500">
                    +${((3000 * (lockedPercentage / 100) * yieldMultiplier) / 100 / 12).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-semibold">Total Monthly</span>
                  <span className="font-bold text-lg">
                    ${(3000 + (3000 * (lockedPercentage / 100) * yieldMultiplier) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Your Configuration
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-sm">{lockedPercentage}% Locked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span className="text-sm">{accessiblePercentage}% Accessible</span>
                  </div>
                </div>
              </div>

              <NeonButton className="w-full" onClick={() => onSaveAllocation?.(lockedPercentage, accessiblePercentage)}>
                Save Allocation
              </NeonButton>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> You can change your allocation monthly. The 85/15 default is optimized for
          both safety and yield generation. Locking less means less yield but more immediate spending power.
        </p>
      </GlassCard>
    </div>
  );
};

export default FundAllocationControl;
