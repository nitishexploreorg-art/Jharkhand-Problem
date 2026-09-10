import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'citizen-large'
  | 'outline'
  | 'danger'
  | 'success'
  | 'saffron'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  subText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  subText,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none cursor-pointer';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5 min-h-[48px]',
    xl: 'text-lg px-8 py-4 rounded-2xl gap-3 min-h-[56px]',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow focus:ring-emerald-400 border border-emerald-500/80 active:scale-[0.98]',
    secondary:
      'bg-[#13281f] hover:bg-[#1a3529] text-slate-100 shadow-sm hover:shadow focus:ring-emerald-600 border border-[#234838] active:scale-[0.98]',
    'citizen-large':
      'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black shadow-lg hover:shadow-xl focus:ring-emerald-400 border border-emerald-400/60 active:scale-[0.98] ring-2 ring-emerald-400/20 text-lg md:text-xl py-4 px-6 md:px-8 rounded-2xl',
    saffron:
      'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-sm hover:shadow focus:ring-amber-400 border border-amber-400 active:scale-[0.98]',
    outline:
      'bg-[#0f2119] hover:bg-[#162e23] text-slate-200 border border-[#203c2e] hover:border-emerald-500/60 focus:ring-emerald-500 active:scale-[0.98]',
    danger:
      'bg-rose-700 hover:bg-rose-600 text-white shadow-sm hover:shadow focus:ring-rose-500 border border-rose-600 active:scale-[0.98]',
    success:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow focus:ring-emerald-500 border border-emerald-500 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-[#12241c] text-slate-300 hover:text-white border border-transparent focus:ring-emerald-600',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}

      <div className="flex flex-col items-center leading-tight">
        <span>{children}</span>
        {subText && (
          <span className="text-xs font-normal opacity-90 tracking-wide mt-0.5">{subText}</span>
        )}
      </div>

      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
