import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const StudentLogin: React.FC = () => {
  const { login, addNotification, language } = useApp();
  const navigate = useNavigate();
  const isHi = language === 'hi';

  const [studentId, setStudentId] = useState('BITM-2023-ENV-04');
  const [password, setPassword] = useState('demo');
  const [university, setUniversity] = useState('Birla Institute of Technology (BIT) Mesra');
  const [teamLeadName, setTeamLeadName] = useState('Priya Murmu');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setError('कृपया छात्र रोल नंबर या संस्थान ईमेल आईडी दर्ज करें।');
      return;
    }

    login('student', {
      name: teamLeadName || 'Priya Murmu (Team Lead)',
      org: `${university} — Team JalShakti`,
      id: studentId,
    });

    addNotification({
      title: 'छात्र लॉगिन सफल (Student Login Successful)',
      message: `स्वागत है ${teamLeadName || 'छात्र'}! आपके विश्वविद्यालय नवाचार डैशबोर्ड में प्रवेश स्वीकृत हुआ।`,
      type: 'success',
    });

    navigate('/student-dashboard');
  };

  const handleQuickDemoLogin = () => {
    login('student', {
      name: 'Priya Murmu (Team Lead)',
      org: 'Birla Institute of Technology (BIT) Mesra — Team JalShakti',
      id: 'BITM-2023-ENV-04',
    });

    addNotification({
      title: 'त्वरित डेमो छात्र लॉगिन संपन्न (DEMO Login)',
      message: 'बीआईटी मेसरा कैपस्टोन टीम के रूप में प्रमाणीकरण सफल।',
      type: 'success',
    });

    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#060d0a] via-[#091f16] to-[#060d0a] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Back navigation */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8ea598] hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← भूमिका चयन (Role Selection) पर लौटें</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#0e2936] text-cyan-400 border-2 border-cyan-500/40 mx-auto flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0e2936] text-cyan-300 border border-cyan-600/40 text-xs font-bold">
            <span>विश्वविद्यालय एवं छात्र नवाचार पोर्टल</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Student / University Login
          </h1>

          <p className="text-xs sm:text-sm text-[#a5b9ad]">
            ग्रामीण समस्याओं को कैपस्टोन प्रोजेक्ट के रूप में अंगीकार करने हेतु प्रवेश करें
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
            हैकथॉन मूल्यांकन के लिए आप बिना टाइप किए सीधे एक क्लिक में डेमो टीम के रूप में लॉगिन कर सकते हैं:
          </p>

          <button
            type="button"
            id="btn-quick-demo-student"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>🎓 त्वरित डेमो छात्र लॉगिन (BIT Mesra - Team JalShakti)</span>
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
                विश्वविद्यालय / कॉलेज (Institution)
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-[#0d1e17] text-white font-medium"
              >
                <option value="Birla Institute of Technology (BIT) Mesra">BIT Mesra, Ranchi</option>
                <option value="National Institute of Technology (NIT) Jamshedpur">NIT Jamshedpur</option>
                <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad</option>
                <option value="Birsa Agricultural University (BAU) Ranchi">BAU Kanke, Ranchi</option>
                <option value="R.D. Engineering College">R.D. Engineering College</option>
                <option value="Government Polytechnic Ranchi">Govt Polytechnic Ranchi</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a5b9ad] font-bold mb-1">
                छात्र लीडर का नाम (Team Lead Name)
              </label>
              <input
                type="text"
                value={teamLeadName}
                onChange={(e) => setTeamLeadName(e.target.value)}
                placeholder="उदा. Priya Murmu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#a5b9ad] font-bold">
                  छात्र रोल नंबर / आईडी (Roll / Student ID)
                </label>
                <span className="text-[10px] text-[#8ea598] font-mono">[DEMO: BITM-2023-ENV-04]</span>
              </div>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-mono"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1e382b] bg-[#0d1e17] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-mono"
                />
                <Lock className="w-4 h-4 text-[#8ea598] absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-student-login"
              className="w-full py-3 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-cyan-950 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>छात्र पोर्टल में प्रवेश करें (Enter Dashboard)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-[#1e382b] text-center text-[11px] text-[#8ea598]">
            <span>पंजीकरण या संकाय मार्गदर्शन में सहायता हेतु: </span>
            <span className="text-cyan-400 font-semibold">innovation@jharkhand.gov.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
