import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { User, ShieldCheck, GraduationCap, Building2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoJourneyGuideModal } from '../common/DemoJourneyGuide';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentRole, login, language } = useApp();
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const isHi = language === 'hi';

  const roles: { role: UserRole; labelEn: string; labelHi: string; icon: React.ReactNode; link: string }[] = [
    {
      role: 'citizen',
      labelEn: 'Citizen',
      labelHi: 'नागरिक',
      icon: <User className="w-3.5 h-3.5" />,
      link: '/',
    },
    {
      role: 'student',
      labelEn: 'Student / Univ',
      labelHi: 'छात्र / कॉलेज',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      link: '/student-dashboard',
    },
    {
      role: 'csr',
      labelEn: 'CSR Partner',
      labelHi: 'उद्योग / सीएसआर',
      icon: <Building2 className="w-3.5 h-3.5" />,
      link: '/csr-portal',
    },
    {
      role: 'admin',
      labelEn: 'District Admin',
      labelHi: 'जिला प्रशासन',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      link: '/admin',
    },
  ];

  return (
    <>
      <div className="bg-[#040806] text-slate-200 text-xs py-1.5 px-3 sm:px-6 border-b border-[#13271d] flex flex-wrap items-center justify-between gap-2 z-50">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-amber-300 bg-amber-950/80 border border-amber-700/60 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono">
            [DEMO] पोर्टल स्विचर
          </span>

          <button
            type="button"
            onClick={() => setGuideModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-900 text-[11px] font-bold transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>
              {isHi ? '⚡ 3–5 मिनट जज गाइड (10 चरण)' : '⚡ 3–5 Min Judge Walkthrough (10 Steps)'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-[#8ea598] hidden sm:inline">सक्रिय पोर्टल (Active):</span>
          {roles.map((r) => {
            const isActive = currentRole === r.role;
            return (
              <Link
                key={r.role}
                to={r.link}
                onClick={() => login(r.role)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400'
                    : 'bg-[#0e2118] hover:bg-[#142d21] text-[#9db3a6] hover:text-white border border-[#1b3829]'
                }`}
              >
                {r.icon}
                <span>{isHi ? r.labelHi : r.labelEn}</span>
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
