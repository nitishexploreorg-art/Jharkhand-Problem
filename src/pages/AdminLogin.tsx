import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Building,
  KeyRound,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const AdminLogin: React.FC = () => {
  const { login, addNotification, language } = useApp();
  const navigate = useNavigate();
  const isHi = language === 'hi';

  const [officerId, setOfficerId] = useState('JH-ADM-RNC-01');
  const [password, setPassword] = useState('demo');
  const [district, setDistrict] = useState('Ranchi');
  const [designation, setDesignation] = useState('Additional District Collector (ADC) / Nodal Officer');
  const [officerName, setOfficerName] = useState('Rahul Prasad, IAS');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setError('कृपया सरकारी नोडल अधिकारी आईडी दर्ज करें।');
      return;
    }

    login('admin', {
      name: `${officerName} (${designation})`,
      org: `District Administration, ${district} — Govt of Jharkhand`,
      id: officerId,
    });

    addNotification({
      title: 'प्रशासनिक लॉगिन सफल (Admin Session Started)',
      message: `सत्यापित सत्र सक्रिय: उपायुक्त कार्यालय, जिला ${district}`,
      type: 'success',
    });

    navigate('/admin');
  };

  const handleQuickDemoLogin = () => {
    login('admin', {
      name: 'Rahul Prasad, IAS (ADC & Nodal Officer)',
      org: 'District Administration, Ranchi — Govt of Jharkhand',
      id: 'JH-ADM-RNC-01',
    });

    addNotification({
      title: 'त्वरित डेमो प्रशासनिक लॉगिन (DEMO Admin Login)',
      message: 'उपायुक्त कार्यालय, राँची के रूप में अधिकृत प्रशासनिक सत्र प्रारंभ हुआ।',
      type: 'success',
    });

    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#060d0a] via-[#091f16] to-[#060d0a] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Back navigation */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8ea598] hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← भूमिका चयन (Role Selection) पर लौटें</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#0e1d2b] text-blue-400 border-2 border-blue-500/40 mx-auto flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0e1d2b] text-blue-300 border border-blue-600/40 text-xs font-bold">
            <span>झारखंड सरकार • जिला प्रशासन एवं सत्यापन पोर्टल</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            District Administration Login
          </h1>

          <p className="text-xs sm:text-sm text-[#a5b9ad]">
            शिकायतों की जमीनी जांच, समस्या सत्यापन एवं तकनीकी परियोजना स्वीकृति हेतु प्रवेश करें
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
            हैकथॉन मूल्यांकन के लिए आप बिना टाइप किए सीधे एक क्लिक में उपायुक्त कार्यालय प्रशासक के रूप में लॉगिन कर सकते हैं:
          </p>

          <button
            type="button"
            id="btn-quick-demo-admin"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>🏛️ त्वरित डेमो प्रशासन लॉगिन (DC Office Ranchi - ADC Triage)</span>
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
                जिला अधिकार क्षेत्र (District Jurisdiction)
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#0d1e17] text-white font-medium"
              >
                <option value="Ranchi">राँची (Ranchi District)</option>
                <option value="Khunti">खूंटी (Khunti District)</option>
                <option value="Dhanbad">धनबाद (Dhanbad District)</option>
                <option value="Dumka">दुमका (Dumka District)</option>
                <option value="East Singhbhum">पूर्वी सिंहभूम (Jamshedpur)</option>
                <option value="Bokaro">बोकारो (Bokaro)</option>
                <option value="Hazaribagh">हजारीबाग (Hazaribagh)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a5b9ad] font-bold mb-1">
                अधिकारी पदनाम (Designation / Office)
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#a5b9ad] font-bold">
                  सरकारी अधिकारी आईडी (Govt Officer ID)
                </label>
                <span className="text-[10px] text-[#8ea598] font-mono">[DEMO: JH-ADM-RNC-01]</span>
              </div>
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#a5b9ad] font-bold">
                  सुरक्षा पिन / पासवर्ड (Security PIN / Password)
                </label>
                <span className="text-[10px] text-[#8ea598] font-mono">[DEMO: demo]</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white font-mono"
                />
                <KeyRound className="w-4 h-4 text-[#8ea598] absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-admin-login"
              className="w-full py-3 px-4 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-950 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>प्रशासनिक डैशबोर्ड में प्रवेश करें (Enter Dashboard)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-[#1e382b] text-center text-[11px] text-[#8ea598]">
            <span>NIC एवं ई-गवर्नेंस सुरक्षा सहायता: </span>
            <span className="text-blue-400 font-semibold">dc-techsupport@jharkhand.gov.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
