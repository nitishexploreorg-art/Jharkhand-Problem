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
      iconBg: 'bg-emerald-100 text-emerald-800',
      borderTop: 'border-t-emerald-600',
    },
    blue: {
      iconBg: 'bg-blue-100 text-blue-800',
      borderTop: 'border-t-blue-600',
    },
    amber: {
      iconBg: 'bg-amber-100 text-amber-800',
      borderTop: 'border-t-amber-500',
    },
    purple: {
      iconBg: 'bg-purple-100 text-purple-800',
      borderTop: 'border-t-purple-600',
    },
    slate: {
      iconBg: 'bg-slate-100 text-slate-800',
      borderTop: 'border-t-slate-700',
    },
  };

  const c = colorClasses[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-xs border-t-4 ${c.borderTop} transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          {titleHi && (
            <span className="text-xs font-semibold text-slate-500 block mb-0.5">
              {titleHi}
            </span>
          )}
          <h4 className="text-sm font-bold text-slate-800 leading-tight">{title}</h4>
        </div>
        <div className={`p-2.5 rounded-xl ${c.iconBg}`}>{icon}</div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend.text}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};
