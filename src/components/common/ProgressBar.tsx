import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ProgressBarProps {
  percentage: number;
  label?: string;
  subLabel?: string;
  color?: 'emerald' | 'blue' | 'amber' | 'purple' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  showPercentageText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  subLabel,
  color = 'emerald',
  size = 'md',
  showPercentageText = true,
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));
  const shouldReduceMotion = useReducedMotion();

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    emerald: 'bg-emerald-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500',
    purple: 'bg-purple-600',
    slate: 'bg-slate-700',
  };

  return (
    <div className="w-full">
      {(label || showPercentageText) && (
        <div className="flex justify-between items-baseline mb-1.5 text-xs font-semibold text-slate-200">
          <span>{label}</span>
          {showPercentageText && (
            <span className="font-mono text-emerald-400">{Math.round(clamped)}%</span>
          )}
        </div>
      )}

      <div className={`w-full bg-[#0a1510] rounded-full overflow-hidden border border-[#1d382b] ${heightClasses[size]}`}>
        <motion.div
          initial={shouldReduceMotion ? { width: `${clamped}%` } : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
          className={`${heightClasses[size]} ${colorClasses[color]} rounded-full`}
        />
      </div>

      {subLabel && (
        <div className="text-[11px] text-[#8ea598] mt-1">
          {subLabel}
        </div>
      )}
    </div>
  );
};

export interface MilestoneProgressBarProps {
  completed: number;
  total: number;
  title?: string;
}

export const MilestoneProgressBar: React.FC<MilestoneProgressBarProps> = ({
  completed,
  total,
  title = 'प्रोटोटाइप विकास चरण (Milestone Progress)',
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-[#0e2017] p-3.5 rounded-xl border border-[#1d3a2d]">
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="font-semibold text-slate-200">{title}</span>
        <span className="font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
          {completed} / {total} Completed
        </span>
      </div>
      <ProgressBar percentage={percentage} color="emerald" size="sm" showPercentageText={false} />
    </div>
  );
};

export interface FundingProgressBarProps {
  fundedInr: number;
  requiredInr: number;
  sponsorName?: string;
}

export const FundingProgressBar: React.FC<FundingProgressBarProps> = ({
  fundedInr,
  requiredInr,
  sponsorName,
}) => {
  const percentage = requiredInr > 0 ? (fundedInr / requiredInr) * 100 : 0;

  const formatInr = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-[#121924] p-3.5 rounded-xl border border-purple-900/60">
      <div className="flex justify-between items-baseline text-xs mb-1.5">
        <span className="font-semibold text-purple-200">
          सीएसआर अनुदान (CSR Grant Allocation)
        </span>
        <span className="font-mono font-bold text-purple-300">
          {formatInr(fundedInr)} / {formatInr(requiredInr)}
        </span>
      </div>
      <ProgressBar percentage={percentage} color="purple" size="sm" showPercentageText={false} />
      {sponsorName && (
        <div className="text-[11px] text-purple-300/80 mt-1.5 flex items-center gap-1">
          <span>अनुदानकर्ता:</span> <strong className="font-semibold text-purple-200">{sponsorName}</strong>
        </div>
      )}
    </div>
  );
};
