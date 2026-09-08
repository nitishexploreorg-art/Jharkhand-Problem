import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { User, ShieldCheck, GraduationCap, Building2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoJourneyGuideModal } from '../common/DemoJourneyGuide';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentRole, setCurrentRole } = useApp();
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const roles: { role: UserRole; labelEn: string; labelHi: string; icon: React.ReactNode; link: string }[] = [
    {
      role: 'citizen',
      labelEn: 'Citizen (Aam Nagrik)',
      labelHi: 'नागरिक',
      icon: <User className="w-3.5 h-3.5" />,
      link: '/report-issue',
    },
    {
      role: 'student',
      labelEn: 'Student / University',
      labelHi: 'छात्र / कॉलेज',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      link: '/student-dashboard',
    },
    {
      role: 'csr',
      labelEn: 'Industry / CSR Partner',
      labelHi: 'उद्योग / सीएसआर',
      icon: <Building2 className="w-3.5 h-3.5" />,
      link: '/csr-portal',
    },
    {
      role: 'admin',
      labelEn: 'District / Dept Admin',
      labelHi: 'जिला प्रशासन',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      link: '/admin',
    },
  ];

  return (
    <>
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded text-[11px]">
            डेमो रोल स्विचर (Prototype Role Switcher)
          </span>

          <button
            type="button"
            onClick={() => setGuideModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 hover:bg-amber-500/30 text-[11px] font-bold transition-all"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>⚡ 3–5 Min Judge Walkthrough (10 Steps)</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const isActive = currentRole === r.role;
            return (
              <Link
                key={r.role}
                to={r.link}
                onClick={() => setCurrentRole(r.role)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {r.icon}
                <span>{r.labelHi}</span>
                <span className="hidden lg:inline text-[10px] opacity-80">({r.role})</span>
              </Link>
            );
          })}
        </div>
      </div>

      <DemoJourneyGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
};
