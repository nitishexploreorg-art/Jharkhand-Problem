import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  PlusCircle,
  LogIn,
  UserCheck,
  UserX,
  PhoneCall,
  Globe,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [guestMode, setGuestMode] = useState(true);
  const location = useLocation();
  const { language, setLanguage, userRole, setUserRole, t } = useApp();

  const isHi = language === 'hi';

  const navLinks = [
    { to: '/', label: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { to: '/report-issue', label: 'Report Problem', labelHi: 'समस्या दर्ज करें', highlight: true },
    { to: '/track-problem', label: 'Track Problem', labelHi: 'समस्या ट्रैक करें' },
    { to: '/challenges', label: 'Challenges', labelHi: 'नवाचार चुनौतियाँ' },
    { to: '/project-lifecycle', label: 'Project Lifecycle', labelHi: 'प्रोजेक्ट लाइफसाइकिल' },
    { to: '/ground-deployment', label: 'Ground Deployment', labelHi: 'जमीनी सत्यापन' },
    { to: '/social-audit', label: 'Social Audit', labelHi: 'सामाजिक ऑडिट' },
    { to: '/csr-portal', label: 'CSR Portal', labelHi: 'सीएसआर पोर्टल' },
    { to: '/about', label: 'About', labelHi: 'हमारे बारे में' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleRoleSelect = (role: 'citizen' | 'admin' | 'student' | 'csr') => {
    setUserRole(role);
    setGuestMode(false);
    setLoginModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Citizen Helpdesk Strip */}
      <div className="bg-slate-900 text-slate-300 px-4 sm:px-8 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">{t('nav.govtTag')}</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">{t('nav.platformTag')}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('nav.cmHelpline')}</span>
          </div>

          {/* Guest Mode Indicator */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700">
            {guestMode ? (
              <>
                <UserX className="w-3 h-3 text-amber-400" />
                <span>{isHi ? 'अतिथि मोड (Guest)' : 'Guest Mode'}</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span className="capitalize">{userRole}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Logo: Samadhan Jharkhand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex flex-col items-center justify-center shadow-md ring-2 ring-emerald-500/20 group-hover:scale-102 transition-transform">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">JH</span>
              <span className="text-xs font-black tracking-tight font-serif">समाधान</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Samadhan <span className="text-emerald-700">Jharkhand</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {isHi ? 'समाधान झारखंड • आपकी समस्या, हमारा समाधान' : 'Grassroots Grievance to Engineering Solution'}
              </p>
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  {isHi ? link.labelHi : link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Requested Language Switcher: 🌐 हिंदी | English */}
            <div
              className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold shrink-0 shadow-2xs"
              role="group"
              aria-label="Language selection"
            >
              <span className="pl-1.5 pr-1 text-slate-500 flex items-center">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
              </span>
              <button
                type="button"
                id="lang-btn-hindi"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg transition-all text-xs ${
                  isHi
                    ? 'bg-emerald-700 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70 font-medium'
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
              <span className="text-slate-300 mx-0.5 select-none">|</span>
              <button
                type="button"
                id="lang-btn-english"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all text-xs ${
                  !isHi
                    ? 'bg-emerald-700 text-white font-extrabold shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70 font-medium'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>

            {/* Login / Role Selector */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
              icon={<LogIn className="w-3.5 h-3.5 text-emerald-700" />}
              className="hidden sm:inline-flex text-xs"
            >
              {t('nav.login')}
            </Button>

            {/* Direct citizen action CTA */}
            <Link to="/report-issue" className="shrink-0">
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle className="w-4 h-4" />}
                className="text-xs font-bold"
              >
                {t('nav.reportIssue')}
              </Button>
            </Link>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? 'भाषा (Language):' : 'Language:'}</span>
            </span>
            <div className="inline-flex rounded-lg bg-slate-200 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-md transition-all ${
                  isHi ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md transition-all ${
                  !isHi ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-sm font-semibold border flex items-center justify-between ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <span>{isHi ? link.labelHi : link.label}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {isHi ? link.label : link.labelHi}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setGuestMode(!guestMode)}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-center"
            >
              {guestMode ? (isHi ? '✓ अतिथि मोड ऑन' : '✓ Guest Mode On') : 'Guest Mode Off'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-700 text-white text-center flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('nav.login')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Role Selection / Login Modal */}
      <Modal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title={t('nav.loginTitle')}
        maxWidth="md"
        footer={
          <div className="flex justify-between items-center w-full text-xs">
            <button
              type="button"
              onClick={() => {
                setGuestMode(true);
                setUserRole('citizen');
                setLoginModalOpen(false);
              }}
              className="text-emerald-700 font-bold hover:underline"
            >
              {t('nav.continueAsGuest')}
            </button>
            <Button variant="outline" size="sm" onClick={() => setLoginModalOpen(false)}>
              {t('nav.close')}
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-2 text-xs">
          <p className="text-slate-600 leading-relaxed font-medium">
            {t('nav.selectRolePrompt')}
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => handleRoleSelect('citizen')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  {t('nav.roleCitizenTitle')}
                </strong>
                <span className="text-slate-500 text-[11px] mt-0.5 block">
                  {t('nav.roleCitizenDesc')}
                </span>
              </div>
              <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-cyan-600 hover:bg-cyan-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  {t('nav.roleStudentTitle')}
                </strong>
                <span className="text-slate-500 text-[11px] mt-0.5 block">
                  {t('nav.roleStudentDesc')}
                </span>
              </div>
              <span className="text-cyan-700 font-bold group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('csr')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-600 hover:bg-purple-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  {t('nav.roleCsrTitle')}
                </strong>
                <span className="text-slate-500 text-[11px] mt-0.5 block">
                  {t('nav.roleCsrDesc')}
                </span>
              </div>
              <span className="text-purple-700 font-bold group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  {t('nav.roleAdminTitle')}
                </strong>
                <span className="text-slate-500 text-[11px] mt-0.5 block">
                  {t('nav.roleAdminDesc')}
                </span>
              </div>
              <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
