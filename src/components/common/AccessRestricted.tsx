import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ShieldAlert, ArrowLeft, LogIn, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface AccessRestrictedProps {
  requiredRole: UserRole | UserRole[];
  pageTitle?: string;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({
  requiredRole,
  pageTitle,
}) => {
  const { currentRole, authSession, login } = useApp();

  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'student':
        return { en: 'Student / University', hi: 'छात्र / विश्वविद्यालय', icon: '🎓', loginUrl: '/student-login' };
      case 'csr':
        return { en: 'CSR Partner', hi: 'उद्योग / सीएसआर सहयोगी', icon: '🏢', loginUrl: '/csr-login' };
      case 'admin':
        return { en: 'District Administration', hi: 'जिला प्रशासन', icon: '🏛️', loginUrl: '/admin-login' };
      default:
        return { en: 'Citizen', hi: 'नागरिक', icon: '👤', loginUrl: '/' };
    }
  };

  const currentInfo = getRoleLabel(currentRole);
  const primaryRequired = requiredRoles[0];
  const requiredInfo = getRoleLabel(primaryRequired);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#11231b] rounded-3xl border border-[#1e382b] shadow-2xl p-6 sm:p-10 text-center space-y-6 text-slate-100">
        {/* Shield Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-950/80 border-2 border-rose-800/60 flex items-center justify-center text-rose-400 shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>

        {/* Primary Alert Headers */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 text-xs font-bold border border-rose-800/60">
            <Lock className="w-3.5 h-3.5" />
            <span>सुरक्षित आंतरिक पोर्टल (Role-Protected Access)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Access Restricted
          </h1>

          <p className="text-lg sm:text-xl font-bold text-rose-400 font-serif">
            “आपको इस पेज को देखने की अनुमति नहीं है।”
          </p>

          <p className="text-xs sm:text-sm text-[#8ea598] max-w-md mx-auto">
            यह पृष्ठ केवल अधिकृत <span className="font-semibold text-slate-200">{requiredInfo.hi} ({requiredInfo.en})</span> के लिए सुरक्षित है।
          </p>
        </div>

        {/* Role Comparison Card */}
        <div className="bg-[#0a1510] border border-[#1e382b] rounded-2xl p-4 text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-[#0f2119] rounded-xl border border-[#203f31] space-y-1">
            <span className="text-[#8ea598] block text-[11px] font-medium">आपकी वर्तमान भूमिका (Your Role):</span>
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
              <span>{currentInfo.icon}</span>
              <span>{currentInfo.hi}</span>
            </div>
            <span className="text-[11px] text-[#6e8a7c] block">{authSession.name}</span>
          </div>

          <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-800/50 space-y-1">
            <span className="text-rose-400 block text-[11px] font-bold">आवश्यक अनुमति (Required Role):</span>
            <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
              <span>{requiredInfo.icon}</span>
              <span>{requiredInfo.hi}</span>
            </div>
            <span className="text-[11px] text-rose-300/80 font-medium block">
              {requiredRoles.map((r) => getRoleLabel(r).en).join(' / ')}
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to={requiredInfo.loginUrl} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              icon={<LogIn className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {requiredInfo.hi} से लॉगिन करें
            </Button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              नागरिक पोर्टल पर जाएं
            </Button>
          </Link>
        </div>

        {/* Quick Demo Bypass for Hackathon Judges */}
        <div className="pt-4 border-t border-[#1b3427] text-xs text-[#8ea598]">
          <span className="font-semibold text-slate-300 block mb-2">
            [DEMO] जज / परीक्षक त्वरित भूमिका स्विच (Quick Switch):
          </span>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => login(primaryRequired)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-700/60 hover:bg-emerald-900 transition-colors cursor-pointer text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{requiredInfo.icon} {requiredInfo.hi} के रूप में तुरंत स्विच करें</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
