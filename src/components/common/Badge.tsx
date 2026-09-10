import React from 'react';
import { PlatformStage, PriorityLevel } from '../../types';
import { PLATFORM_STAGES } from '../../data/jharkhandData';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Coins,
  Hammer,
  MapPin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface StatusBadgeProps {
  stage: PlatformStage;
  showHindi?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  stage,
  size = 'md',
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const stageDef = PLATFORM_STAGES.find((s) => s.stage === stage) || PLATFORM_STAGES[0];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs md:text-sm px-3 py-1 rounded-lg gap-1.5 font-semibold',
    lg: 'text-sm md:text-base px-4 py-1.5 rounded-xl gap-2 font-bold',
  };

  const getStageIcon = () => {
    switch (stage) {
      case 'REPORTED':
        return <Clock className="w-3.5 h-3.5" />;
      case 'AI_PROCESSED':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-200" />;
      case 'ADMIN_VERIFIED':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'CHALLENGE_PUBLISHED':
        return <Award className="w-3.5 h-3.5" />;
      case 'STUDENT_ADOPTED':
        return <Users className="w-3.5 h-3.5" />;
      case 'CSR_FUNDED':
        return <Coins className="w-3.5 h-3.5" />;
      case 'IN_DEVELOPMENT':
        return <Hammer className="w-3.5 h-3.5 animate-pulse" />;
      case 'GROUND_DEPLOYED':
        return <MapPin className="w-3.5 h-3.5" />;
      case 'CITIZEN_AUDIT':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'RESOLVED':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const displayText = isHi ? stageDef.labelHi : stageDef.labelEn;

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap shadow-xs ${sizeClasses[size]} ${stageDef.color}`}
      title={isHi ? stageDef.shortDescHi : stageDef.shortDescEn}
    >
      {getStageIcon()}
      <span>{displayText}</span>
    </span>
  );
};

export interface PriorityBadgeProps {
  priority: PriorityLevel;
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, showIcon = true }) => {
  const { language } = useApp();
  const isHi = language === 'hi';

  const configs: Record<
    PriorityLevel,
    { labelEn: string; labelHi: string; class: string; iconClass: string }
  > = {
    critical: {
      labelEn: 'Critical',
      labelHi: 'अति-संवेदनशील',
      class: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
      iconClass: 'text-rose-400',
    },
    high: {
      labelEn: 'High Priority',
      labelHi: 'उच्च प्राथमिकता',
      class: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
      iconClass: 'text-amber-400',
    },
    medium: {
      labelEn: 'Medium Priority',
      labelHi: 'मध्यम',
      class: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
      iconClass: 'text-blue-400',
    },
    low: {
      labelEn: 'Routine',
      labelHi: 'सामान्य',
      class: 'bg-[#13271e] text-slate-300 border-[#203f31]',
      iconClass: 'text-slate-400',
    },
  };

  const c = configs[priority] || configs.medium;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border whitespace-nowrap gap-1.5 ${c.class}`}
    >
      {showIcon && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            priority === 'critical'
              ? 'bg-rose-400 animate-ping'
              : priority === 'high'
              ? 'bg-amber-400'
              : 'bg-blue-400'
          }`}
        />
      )}
      <span>{isHi ? c.labelHi : c.labelEn}</span>
    </span>
  );
};

export const CategoryBadge: React.FC<{ nameEn: string; nameHi?: string }> = ({
  nameEn,
  nameHi,
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const label = isHi ? nameHi || nameEn : nameEn;

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#13271e] text-slate-200 border border-[#203f31] whitespace-nowrap">
      {label}
    </span>
  );
};
