import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Award,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const CSRLogin: React.FC = () => {
  const { login, addNotification, language } = useApp();
  const navigate = useNavigate();
  const isHi = language === 'hi';

  const [partnerId, setPartnerId] = useState('TSF-CSR-JH09');
  const [password, setPassword] = useState('demo');
  const [orgName, setOrgName] = useState('Tata Steel Foundation');
  const [contactPerson, setContactPerson] = useState('Sunita Soren (CSR Head - Jharkhand)');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId.trim()) {
      setError('कृपया सीएसआर पार्टनर आईडी या ईमेल दर्ज करें।');
      return;
    }

    login('csr', {
      name: contactPerson || 'Sunita Soren (CSR Lead)',
      org: orgName || 'Tata Steel Foundation CSR',
      id: partnerId,
    });

    addNotification({
      title: 'सीएसआर पोर्टल लॉगिन सफल (CSR Login Successful)',
      message: `स्वागत है ${orgName}! उद्योग-सामाजिक नवाचार मंच में आपका स्वागत है।`,
      type: 'success',
    });

    navigate('/csr-portal');
  };

  const handleQuickDemoLogin = () => {
    login('csr', {
      name: 'Sunita Soren (CSR Head - Jharkhand)',
      org: 'Tata Steel Foundation CSR',
      id: 'TSF-CSR-JH09',
    });

    addNotification({
      title: 'त्वरित डेमो सीएसआर लॉगिन संपन्न (DEMO Login)',
      message: 'टाटा स्टील फाउंडेशन सीएसआर पार्टनर के रूप में प्रमाणीकरण सफल।',
      type: 'success',
    });

    navigate('/csr-portal');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#060d0a] via-[#091f16] to-[#060d0a] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Back navigation */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8ea598] hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← भूमिका चयन (Role Selection) पर लौटें</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#24132b] text-purple-400 border-2 border-purple-500/40 mx-auto flex items-center justify-center shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#24132b] text-purple-300 border border-purple-600/40 text-xs font-bold">
            <span>उद्योग एवं कॉर्पोरेट सीएसआर अनुदान पोर्टल</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CSR Partner Login
          </h1>

          <p className="text-xs sm:text-sm text-[#a5b9ad]">
            ग्रामीण नवाचारों को सीएसआर ग्रांट, उपकरण एवं मेंटरशिप सहयोग प्रदान करें
          </p>
        </div>

        {/* DEMO Notice & One-Click Login */}
        <div className="bg-[#11231b] border border-amber-500/40 rounded-2xl p-4 space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>[DEMO] परीक्षक त्वरित लॉगिन</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-700/60 text-amber-300 px-2 py-0.5 rounded">
              DEMO CREDENTIALS
            </span>
          </div>

          <p className="text-xs text-[#d1e0d7]">
            हैकथॉन मूल्यांकन के लिए आप बिना टाइप किए सीधे एक क्लिक में पंजीकृत सीएसआर पार्टनर के रूप में लॉगिन कर सकते हैं:
          </p>

          <button
            type="button"
            id="btn-quick-demo-csr"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>🏢 त्वरित डेमो सीएसआर लॉगिन (Tata Steel Foundation)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Standard Login Form */}
        <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] shadow-2xl p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#a5b9ad] font-bold mb-1">
                उद्योग / संगठन का नाम (Organization)
              </label>
              <select
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#0d1e17] text-white font-medium"
              >
                <option value="Tata Steel Foundation">Tata Steel Foundation (TSF)</option>
                <option value="Coal India CSR Foundation">Coal India / CCL CSR</option>
                <option value="SAIL (Steel Authority of India) Bokaro">SAIL Bokaro Steel Plant</option>
                <option value="Jindal Steel & Power CSR">Jindal Steel & Power</option>
                <option value="Adani Foundation Jharkhand">Adani Foundation</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a5b9ad] font-bold mb-1">
                सीएसआर प्रतिनिधि नाम (Authorized Representative)
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="उदा. Sunita Soren"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#a5b9ad] font-bold">
                  सीएसआर पार्टनर आईडी (CSR Partner ID / Corporate Email)
                </label>
                <span className="text-[10px] text-[#8ea598] font-mono">[DEMO: TSF-CSR-JH09]</span>
              </div>
              <input
                type="text"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#a5b9ad] font-bold">
                  पासवर्ड (Password)
                </label>
                <span className="text-[10px] text-[#8ea598] font-mono">[DEMO: demo]</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-mono"
                />
                <Lock className="w-4 h-4 text-[#8ea598] absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-csr-login"
              className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-950 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>सीएसआर पोर्टल में प्रवेश करें (Enter Portal)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-[#1e382b] text-center text-[11px] text-[#8ea598]">
            <span>सीएसआर साझेदारी एवं 80G रसीद सहायता: </span>
            <span className="text-purple-400 font-semibold">csr-desk@jharkhand.gov.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
