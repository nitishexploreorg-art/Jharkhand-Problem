import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'accent-green' | 'accent-saffron';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-2xl overflow-hidden transition-all duration-200';

  const variantClasses = {
    default: 'border border-slate-200 shadow-sm',
    elevated: 'border border-slate-200/80 shadow-md',
    bordered: 'border-2 border-slate-200 shadow-none',
    'accent-green': 'border-t-4 border-t-emerald-600 border-x border-b border-slate-200 shadow-sm',
    'accent-saffron': 'border-t-4 border-t-amber-500 border-x border-b border-slate-200 shadow-sm',
  };

  const hoverClasses = hoverable ? 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5' : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 pb-3 border-b border-slate-100 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-lg font-bold text-slate-900 tracking-tight leading-snug ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-sm text-slate-600 mt-1 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 pt-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
