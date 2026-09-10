import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SuccessCheckAnimationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  subtitle?: string;
  className?: string;
}

export const SuccessCheckAnimation: React.FC<SuccessCheckAnimationProps> = ({
  size = 'md',
  title,
  subtitle,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sizeMap = {
    sm: { box: 'w-12 h-12', svg: 32, stroke: 3 },
    md: { box: 'w-16 h-16', svg: 44, stroke: 3.5 },
    lg: { box: 'w-20 h-20', svg: 56, stroke: 4 },
    xl: { box: 'w-24 h-24', svg: 64, stroke: 4 },
  };

  const { box, svg, stroke } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${box} rounded-full bg-emerald-950/90 border border-emerald-500/60 shadow-lg shadow-emerald-900/30 flex items-center justify-center`}
      >
        {/* Subtle ambient glow ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 pointer-events-none" />

        <svg
          width={svg}
          height={svg}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-emerald-400"
        >
          {/* Circular outline */}
          <motion.circle
            cx="25"
            cy="25"
            r="21"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />

          {/* Checkmark mark */}
          <motion.path
            d="M15 26 L22 33 L35 18"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      {title && (
        <motion.h4
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="mt-3 text-base sm:text-lg font-black text-white"
        >
          {title}
        </motion.h4>
      )}

      {subtitle && (
        <motion.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-1 text-xs text-[#8ea598] max-w-sm leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
