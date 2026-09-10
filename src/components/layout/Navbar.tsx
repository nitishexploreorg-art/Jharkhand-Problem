import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  LogIn,
  LogOut,
  PhoneCall,
  Globe,
  GraduationCap,
  Building2,
  ShieldCheck,
  User,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, authSession, logout, language, setLanguage, t } = useApp();

  const isHi = language === 'hi';

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Check if link is active including query params if specified
  const isPathActive = (path: string) => {
    const currentFull = location.pathname + location.search;
    if (path.includes('?')) {
      return currentFull === path;
    }
    if (path === '/') {
      return location.pathname === '/' && !location.search;
    }
    return location.pathname === path && !location.search;
  };

  // 1. Citizen Navigation Links
  const citizenLinks = [
    { to: '/', label: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { to: '/report-issue', label: 'Report Problem', labelHi: 'समस्या दर्ज करें' },
    { to: '/track-problem', label: 'Track Problem', labelHi: 'समस्या ट्रैक करें' },
    { to: '/about', label: 'About Us', labelHi: 'हमारे बारे में' },
  ];

  // 2. Student Navigation Links
  const studentLinks = [
    { to: '/student-dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { to: '/challenges', label: 'Challenges', labelHi: 'चुनौतियाँ' },
    { to: '/student-dashboard?tab=my-projects', label: 'My Projects', labelHi: 'मेरे प्रोजेक्ट्स' },
    { to: '/student-dashboard?tab=my-team', label: 'My Team', labelHi: 'मेरी टीम' },
    { to: '/project-lifecycle', label: 'Milestones', labelHi: 'माइलस्टोन्स' },
    { to: '/student-dashboard?tab=documents', label: 'Documents', labelHi: 'दस्तावेज़' },
    { to: '/student-dashboard?tab=profile', label: 'Profile', labelHi: 'प्रोफ़ाइल' },
  ];

  // 3. CSR Navigation Links
  const csrLinks = [
    { to: '/csr-portal', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { to: '/csr-portal?tab=available', label: 'Available Projects', labelHi: 'उपलब्ध प्रोजेक्ट्स' },
    { to: '/csr-portal?tab=supported', label: 'Supported Projects', labelHi: 'सहयोगित प्रोजेक्ट्स' },
    { to: '/csr-portal?tab=funding', label: 'Funding', labelHi: 'अनुदान' },
    { to: '/csr-portal?tab=milestones', label: 'Milestones', labelHi: 'माइलस्टोन्स' },
    { to: '/csr-portal?tab=impact', label: 'Impact', labelHi: 'प्रभाव' },
    { to: '/csr-portal?tab=profile', label: 'Profile', labelHi: 'प्रोफ़ाइल' },
  ];

  // 4. District Admin Navigation Links
  const adminLinks = [
    { to: '/admin', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { to: '/admin?tab=verification', label: 'Problem Verification', labelHi: 'समस्या सत्यापन' },
    { to: '/admin?tab=queue', label: 'Problem Queue', labelHi: 'समस्या कतार' },
    { to: '/admin?tab=map', label: 'District Map', labelHi: 'जिला मानचित्र' },
    { to: '/admin?tab=projects', label: 'Projects', labelHi: 'परियोजनाएं' },
    { to: '/admin?tab=deployment', label: 'Deployment', labelHi: 'अधिष्ठापन' },
    { to: '/admin?tab=analytics', label: 'Analytics', labelHi: 'एनालिटिक्स' },
    { to: '/admin?tab=settings', label: 'Settings', labelHi: 'सेटिंग्स' },
  ];

  // Pick links based on active role
  const getNavLinks = () => {
    switch (currentRole) {
      case 'student':
        return studentLinks;
      case 'csr':
        return csrLinks;
      case 'admin':
        return adminLinks;
      default:
        return citizenLinks;
    }
  };

  const currentNavLinks = getNavLinks();

  const getPortalInfo = () => {
    switch (currentRole) {
      case 'student':
        return {
          title: isHi ? 'छात्र एवं विश्वविद्यालय पोर्टल' : 'Student & University Portal',
          badge: isHi ? '🎓 छात्र पोर्टल' : '🎓 Student Portal',
          badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
          activeBg: 'bg-[#0e2723] text-cyan-300 border-cyan-700/60',
          brandColor: 'text-cyan-400',
          accentGradient: 'from-cyan-700 to-teal-900',
          sessionInfo: authSession.org || 'BIT Mesra — Team JalShakti',
        };
      case 'csr':
        return {
          title: isHi ? 'उद्योग एवं सीएसआर अनुदान पोर्टल' : 'Industry & CSR Partner Portal',
          badge: isHi ? '🏢 सीएसआर पोर्टल' : '🏢 CSR Portal',
          badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
          activeBg: 'bg-[#1d162a] text-purple-300 border-purple-700/60',
          brandColor: 'text-purple-400',
          accentGradient: 'from-purple-800 to-indigo-950',
          sessionInfo: authSession.org || 'Tata Steel Foundation CSR',
        };
      case 'admin':
        return {
          title: isHi ? 'जिला प्रशासन एवं सत्यापन पोर्टल' : 'District Administration Portal',
          badge: isHi ? '🏛️ जिला प्रशासन' : '🏛️ District Admin',
          badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
          activeBg: 'bg-[#0f2237] text-blue-300 border-blue-700/60',
          brandColor: 'text-blue-400',
          accentGradient: 'from-blue-900 to-slate-950',
          sessionInfo: authSession.org || 'DC Office, Ranchi (ADC Triage)',
        };
      default:
        return {
          title: isHi ? 'आपकी समस्या, हमारा समाधान' : 'Grassroots Grievance to Engineering Solution',
          badge: isHi ? '👤 नागरिक सेवा' : '👤 Citizen Portal',
          badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
          activeBg: 'bg-[#0e291d] text-emerald-300 border-emerald-700/60',
          brandColor: 'text-emerald-400',
          accentGradient: 'from-emerald-700 to-teal-900',
          sessionInfo: isHi ? 'झारखंड नागरिक सेवा (100% निःशुल्क)' : 'Jharkhand Citizen Service (100% Free)',
        };
    }
  };

  const portalInfo = getPortalInfo();

  return (
    <header className="sticky top-0 z-40 bg-[#07130e] shadow-md border-b border-[#1b3628]">
      {/* Top Citizen Helpdesk / Portal Context Strip */}
      <div className="bg-[#040907] text-[#8ea598] px-4 sm:px-8 py-1 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#11241b]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">{t('nav.govtTag')}</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="font-bold text-amber-300">{portalInfo.badge}</span>
          <span className="hidden md:inline text-[#8ea598] text-[11px]">({portalInfo.sessionInfo})</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-slate-300 hidden sm:flex">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('nav.cmHelpline')}</span>
          </div>

          {currentRole !== 'citizen' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#8ea598]">
                लॉग इन: <strong className="text-white">{authSession.name}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-0.5 ml-1 cursor-pointer"
                title="लॉगआउट करें"
              >
                <LogOut className="w-3 h-3" />
                <span>लॉगआउट</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Logo & Portal Branding */}
          <Link
            to={
              currentRole === 'student'
                ? '/student-dashboard'
                : currentRole === 'csr'
                ? '/csr-portal'
                : currentRole === 'admin'
                ? '/admin'
                : '/'
            }
            className="flex items-center gap-3 shrink-0 group"
          >
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${portalInfo.accentGradient} text-white flex flex-col items-center justify-center shadow-md ring-1 ring-emerald-500/40 group-hover:scale-102 transition-transform`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">JH</span>
              <span className="text-xs font-black tracking-tight font-serif">समाधान</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Samadhan <span className={portalInfo.brandColor}>Jharkhand</span>
                </span>
              </div>
              <p className="text-[11px] text-[#8ea598] font-medium hidden sm:block">
                {portalInfo.title}
              </p>
            </div>
          </Link>

          {/* Role-Specific Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {currentNavLinks.map((link) => {
              const active = isPathActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? `${portalInfo.activeBg} font-black border shadow-2xs`
                      : 'text-[#a5b9ad] hover:text-white hover:bg-[#11261d]'
                  }`}
                >
                  {isHi ? link.labelHi : link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher: 🌐 हिंदी | English */}
            <div
              className="inline-flex items-center rounded-xl bg-[#0b1812] p-1 border border-[#1d392b] text-xs font-bold shrink-0 shadow-2xs"
              role="group"
              aria-label="Language selection"
            >
              <span className="pl-1.5 pr-1 text-[#8ea598] flex items-center">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
              </span>
              <button
                type="button"
                id="lang-btn-hindi"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                  isHi
                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                    : 'text-[#8ea598] hover:text-white hover:bg-[#13281e] font-medium'
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
              <span className="text-[#234838] mx-0.5 select-none">|</span>
              <button
                type="button"
                id="lang-btn-english"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                  !isHi
                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                    : 'text-[#8ea598] hover:text-white hover:bg-[#13281e] font-medium'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>

            {/* Role Action: Citizen sees Login & Report Issue; Other Roles see Switch/Logout */}
            {currentRole === 'citizen' ? (
              <>
                <Link to="/login" className="hidden sm:inline-flex">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<LogIn className="w-3.5 h-3.5 text-emerald-400" />}
                    className="text-xs font-bold"
                  >
                    {isHi ? 'पोर्टल लॉगिन' : 'Portal Login'}
                  </Button>
                </Link>

                <Link to="/report-issue" className="shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg ring-1 ring-emerald-400/50 hover:scale-102 transition-all cursor-pointer"
                  >
                    <span>{isHi ? '📸 अपनी समस्या दर्ज करें' : '📸 Report a Problem'}</span>
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#13271e] hover:bg-rose-950/80 text-slate-200 hover:text-rose-300 border border-[#234838] hover:border-rose-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isHi ? 'लॉगआउट' : 'Logout'}</span>
                </button>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-[#11261d] border border-[#1e382b] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1b3628] bg-[#07130e] px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Active Portal Banner */}
          <div className="p-2.5 rounded-xl bg-[#0b1812] border border-[#1d392b] flex items-center justify-between text-xs">
            <span className="font-bold text-white">{portalInfo.badge}</span>
            <span className="text-[#8ea598] font-medium">{authSession.name}</span>
          </div>

          <div className="flex flex-col gap-1">
            {currentNavLinks.map((link) => {
              const active = isPathActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-xl text-xs font-bold border flex items-center justify-between ${
                    active
                      ? `${portalInfo.activeBg} font-black`
                      : 'bg-[#0d1f17] text-slate-200 border-[#1d392b] hover:bg-[#142d21]'
                  }`}
                >
                  <span>{isHi ? link.labelHi : link.label}</span>
                  <span className="text-[10px] text-[#8ea598] font-normal">
                    {isHi ? link.label : link.labelHi}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1b3628] flex flex-col gap-2">
            {currentRole === 'citizen' ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{isHi ? 'पोर्टल लॉगिन / भूमिका चुनें' : 'Portal Login / Select Role'}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isHi ? 'लॉगआउट कर नागरिक पोर्टल पर लौटें' : 'Logout to Citizen Portal'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
