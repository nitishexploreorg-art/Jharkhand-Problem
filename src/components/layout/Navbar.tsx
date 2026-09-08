import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  PlusCircle,
  Search,
  Award,
  Info,
  LogIn,
  UserCheck,
  UserX,
  PhoneCall,
  Languages,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [guestMode, setGuestMode] = useState(true);
  const location = useLocation();
  const { language, toggleLanguage, userRole, setUserRole } = useApp();

  const navLinks = [
    { to: '/', label: 'Home', labelHi: 'होम' },
    { to: '/report-issue', label: 'Report Problem', labelHi: 'समस्या दर्ज करें', highlight: true },
    { to: '/track-problem', label: 'Track Problem', labelHi: 'समस्या ट्रैक करें' },
    { to: '/challenges', label: 'Challenges', labelHi: 'चुनौतियाँ' },
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
          <span className="font-semibold text-white">झारखण्ड सरकार • Government of Jharkhand</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">नागरिक समाधान एवं नवाचार मंच</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>सीएम हेल्पलाइन: <strong className="text-white">181</strong> (निःशुल्क)</span>
          </div>

          {/* Guest Mode Indicator */}
          <div className="flex items-center gap-1 bg-slate-800 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700">
            {guestMode ? (
              <>
                <UserX className="w-3 h-3 text-amber-400" />
                <span>Guest Mode (अतिथि मोड)</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span className="capitalize">{userRole} Logged In</span>
              </>
            )}
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Languages className="w-3 h-3 text-emerald-400" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
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
              <p className="text-[11px] text-slate-500 font-medium">
                समाधान झारखंड • आपकी समस्या, हमारा समाधान
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  {language === 'hi' ? link.labelHi : link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Login / Guest Mode Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Guest Mode Badge / Toggle */}
            <button
              onClick={() => setGuestMode(!guestMode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                guestMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Click to toggle guest mode"
            >
              {guestMode ? '✓ Guest Mode Active' : 'Enable Guest Mode'}
            </button>

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
              icon={<LogIn className="w-4 h-4 text-emerald-700" />}
            >
              Login / प्रवेश
            </Button>

            {/* Direct citizen action */}
            <Link to="/report-issue">
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle className="w-4 h-4" />}
              >
                + समस्या दर्ज करें
              </Button>
            </Link>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/report-issue">
              <button className="p-2 bg-emerald-700 text-white rounded-xl shadow-xs text-xs font-bold flex items-center gap-1">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden xs:inline">Report</span>
              </button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-sm font-semibold border flex items-center justify-between ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-normal">{link.labelHi}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              onClick={() => setGuestMode(!guestMode)}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-center"
            >
              {guestMode ? '✓ Guest Mode On' : 'Guest Mode Off'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-700 text-white text-center flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / प्रवेश</span>
            </button>
          </div>
        </div>
      )}

      {/* Role Selection / Login Modal */}
      <Modal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="प्रवेश / Login (Select Role)"
        titleHi="नागरिक एवं हितधारक लॉगिन"
        maxWidth="md"
        footer={
          <div className="flex justify-between items-center w-full text-xs">
            <button
              onClick={() => {
                setGuestMode(true);
                setUserRole('citizen');
                setLoginModalOpen(false);
              }}
              className="text-emerald-700 font-bold hover:underline"
            >
              अतिथि रूप में जारी रखें (Continue as Guest)
            </button>
            <Button variant="outline" size="sm" onClick={() => setLoginModalOpen(false)}>
              बंद करें
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-2 text-xs">
          <p className="text-slate-600 leading-relaxed">
            प्रोटोटाइप का मूल्यांकन करने हेतु अपनी भूमिका का चयन करें (Select your role to explore features):
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => handleRoleSelect('citizen')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  👤 आम नागरिक (Citizen / Aam Aadmi)
                </strong>
                <span className="text-slate-500 text-[11px]">
                  समस्या रिपोर्ट करें, फोटो अपलोड करें व स्थिति ट्रैक करें
                </span>
              </div>
              <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-cyan-600 hover:bg-cyan-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  🎓 छात्र / विश्वविद्यालय (Student / University)
                </strong>
                <span className="text-slate-500 text-[11px]">
                  नवाचार चुनौतियाँ अंगीकार करें व माइलस्टोन साक्ष्य जमा करें
                </span>
              </div>
              <span className="text-cyan-700 font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('csr')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-600 hover:bg-purple-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  🏢 उद्योग सीएसआर (CSR / Industry Partner)
                </strong>
                <span className="text-slate-500 text-[11px]">
                  छात्र नवाचारों को कॉर्पोरेट सीएसआर अनुदान स्वीकृत करें
                </span>
              </div>
              <span className="text-purple-700 font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <strong className="text-slate-900 block font-bold text-sm">
                  🛡️ जिला प्रशासन (District Admin / Nodal)
                </strong>
                <span className="text-slate-500 text-[11px]">
                  एआई डुप्लीकेट जांच, प्राथमिकता निर्धारण व चुनौती अनुमोदन
                </span>
              </div>
              <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
