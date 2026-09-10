import React from 'react';

export interface StatCardProps {
  title: string;
  titleHi?: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    text: string;
    isPositive?: boolean;
  };
  colorScheme?: 'emerald' | 'blue' | 'amber' | 'purple' | 'slate';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  titleHi,
  value,
  subtitle,
  icon,
  trend,
  colorScheme = 'emerald',
  onClick,
}) => {
  const colorClasses = {
    emerald: {
      iconBg: 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/50',
      borderTop: 'border-t-emerald-500',
    },
    blue: {
      iconBg: 'bg-blue-950/80 text-blue-400 border border-blue-700/50',
      borderTop: 'border-t-blue-500',
    },
    amber: {
      iconBg: 'bg-amber-950/80 text-amber-400 border border-amber-600/50',
      borderTop: 'border-t-amber-400',
    },
    purple: {
      iconBg: 'bg-purple-950/80 text-purple-400 border border-purple-700/50',
      borderTop: 'border-t-purple-500',
    },
    slate: {
      iconBg: 'bg-[#142820] text-slate-300 border border-[#234838]',
      borderTop: 'border-t-emerald-600',
    },
  };

  const c = colorClasses[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`bg-[#11231b] p-5 rounded-2xl border border-[#1e382b] shadow-xs border-t-4 ${c.borderTop} transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[#2a4e3c] ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          {titleHi && (
            <span className="text-xs font-semibold text-[#8ea598] block mb-0.5">
              {titleHi}
            </span>
          )}
          <h4 className="text-sm font-bold text-slate-200 leading-tight">{title}</h4>
        </div>
        <div className={`p-2.5 rounded-xl ${c.iconBg}`}>{icon}</div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              trend.isPositive
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
            }`}
          >
            {trend.text}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-[#8ea598] mt-1.5 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};
