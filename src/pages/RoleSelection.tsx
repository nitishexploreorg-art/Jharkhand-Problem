import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const RoleSelection: React.FC = () => {
  const { login, language, t } = useApp();
  const navigate = useNavigate();
  const isHi = language === 'hi';

  const handleCitizenEnter = () => {
    login('citizen');
    navigate('/');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#060d0a] via-[#091f16] to-[#060d0a] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0e271c] border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>झारखंड शासन • समाधान पोर्टल प्रवेश (Portal Entry)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            “आप किस रूप में प्रवेश करना चाहते हैं?”
          </h1>

          <p className="text-sm sm:text-base text-[#a5b9ad] leading-relaxed font-medium">
            झारखंड सरकार के समाधान मंच पर अपनी उपयुक्त भूमिका का चयन करें। प्रत्येक उपयोगकर्ता वर्ग के लिए विशेष समर्पित कार्यप्रणाली एवं सुविधाएं उपलब्ध हैं।
          </p>
        </div>

        {/* The 4 Specified Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Citizen */}
          <div
            id="role-card-citizen"
            className="group relative bg-[#11231b] rounded-3xl border-2 border-[#1e382b] hover:border-emerald-500 hover:shadow-2xl transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0d261b] border border-emerald-700/50 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Public Citizen Access
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>👤</span>
                  <span>Citizen (नागरिक)</span>
                </h2>
                <p className="text-sm font-bold text-emerald-300 mt-1">
                  समस्या दर्ज करें और ट्रैक करें
                </p>
              </div>

              <p className="text-xs text-[#a5b9ad] leading-relaxed">
                फोटो, वीडियो या बोलकर स्थानीय समस्या बताएं। बिना किसी शुल्क के अपनी शिकायत की वर्तमान प्रगति लाइव ट्रैक करें।
              </p>

              <div className="space-y-1.5 text-[11px] text-[#8ea598] pt-2 border-t border-[#1e382b]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>समस्या दर्ज करना (Photo/Video/Voice)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>लाइव स्टेटस ट्रैकिंग (Tracking ID)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>नागरिक अंतिम सत्यापन (Citizen Audit)</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                id="btn-enter-citizen"
                onClick={handleCitizenEnter}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950 group-hover:shadow-lg transition-all cursor-pointer"
              >
                <span>नागरिक पोर्टल प्रवेश</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. Student / University */}
          <div
            id="role-card-student"
            className="group relative bg-[#11231b] rounded-3xl border-2 border-[#1e382b] hover:border-cyan-500 hover:shadow-2xl transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0d222b] border border-cyan-700/50 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Academic Innovation
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>🎓</span>
                  <span>Student / Univ</span>
                </h2>
                <p className="text-sm font-bold text-cyan-300 mt-1">
                  समस्या को प्रोजेक्ट के रूप में अपनाएं
                </p>
              </div>

              <p className="text-xs text-[#a5b9ad] leading-relaxed">
                सत्यापित ग्रामीण चुनौतियों को अपने कैपस्टोन/अंतिम वर्ष के प्रोजेक्ट के रूप में अंगीकार करें। संकाय सलाहकार जोड़ें और माइलस्टोन जमा करें।
              </p>

              <div className="space-y-1.5 text-[11px] text-[#8ea598] pt-2 border-t border-[#1e382b]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>सत्यापित चुनौतियाँ खोजना (Challenges)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>प्रोजेक्ट टीम व संकाय मेंटर जोड़ना</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>माइलस्टोन प्रगति व साक्ष्य अपलोड</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/student-login" className="block w-full">
                <button
                  type="button"
                  id="btn-enter-student"
                  className="w-full py-3 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-cyan-950 group-hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>छात्र लॉगिन (Student Login)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* 3. CSR Partner */}
          <div
            id="role-card-csr"
            className="group relative bg-[#11231b] rounded-3xl border-2 border-[#1e382b] hover:border-purple-500 hover:shadow-2xl transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#24132b] border border-purple-700/50 flex items-center justify-center text-purple-400 shadow-inner group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Industry CSR Support
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>🏢</span>
                  <span>CSR Partner</span>
                </h2>
                <p className="text-sm font-bold text-purple-300 mt-1">
                  समाधान को सहयोग दें
                </p>
              </div>

              <p className="text-xs text-[#a5b9ad] leading-relaxed">
                पात्र प्रोजेक्ट्स को अनुदान (Grant), तकनीकी उपकरण या मेंटरशिप दें। माइलस्टोन पूरा होने पर प्रत्यक्ष बैंक अंतरण और इम्पैक्ट रिपोर्ट देखें।
              </p>

              <div className="space-y-1.5 text-[11px] text-[#8ea598] pt-2 border-t border-[#1e382b]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>पात्र नवाचार प्रोजेक्ट्स ब्राउज़ करना</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>माइलस्टोन-आधारित ग्रांट स्वीकृति</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>जमीनी प्रभाव एवं ऑडिट प्रमाण पत्र</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/csr-login" className="block w-full">
                <button
                  type="button"
                  id="btn-enter-csr"
                  className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-950 group-hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>सीएसआर लॉगिन (CSR Login)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* 4. District Administration */}
          <div
            id="role-card-admin"
            className="group relative bg-[#11231b] rounded-3xl border-2 border-[#1e382b] hover:border-blue-500 hover:shadow-2xl transition-all duration-200 p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0e1d2b] border border-blue-700/50 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  Government Authority
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>District Admin</span>
                </h2>
                <p className="text-sm font-bold text-blue-300 mt-1">
                  समस्याओं का सत्यापन और निगरानी करें
                </p>
              </div>

              <p className="text-xs text-[#a5b9ad] leading-relaxed">
                उपायुक्त (DC) कार्यालय व विभाग नोडल अधिकारी द्वारा समस्याओं की जांच, डुप्लीकेट निवारण, प्रोजेक्ट स्वीकृति एवं जमीनी अधिष्ठापन निगरानी।
              </p>

              <div className="space-y-1.5 text-[11px] text-[#8ea598] pt-2 border-t border-[#1e382b]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>समस्या सत्यापन व अतिरिक्त जानकारी मांग</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>जिला स्तर पर प्रोजेक्ट्स व डिप्लॉयमेंट मॉनिटर</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>24 जिलों का हीटमैप एवं एनालिटिक्स</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/admin-login" className="block w-full">
                <button
                  type="button"
                  id="btn-enter-admin"
                  className="w-full py-3 px-4 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-950 group-hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>प्रशासनिक लॉगिन (Admin Login)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Fast Logins Section for Evaluators */}
        <div className="bg-[#091510] text-[#a5b9ad] rounded-3xl p-6 sm:p-8 border border-[#1e382b] space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#182e22] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 text-[11px] font-mono font-bold uppercase">
                DEMO CREDENTIALS
              </span>
              <h3 className="text-sm font-bold text-white">
                परीक्षकों एवं जजों के लिए एक-क्लिक त्वरित डेमो लॉगिन
              </h3>
            </div>
            <span className="text-xs text-[#8ea598]">
              प्रत्येक भूमिका के लिए पूर्व-सत्यापित डेमो खाते उपलब्ध हैं
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Demo Student */}
            <div className="bg-[#11231b] p-3.5 rounded-2xl border border-[#1e382b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs flex items-center gap-1">
                  <span>🎓</span> छात्र डेमो (Student)
                </span>
                <span className="text-[10px] text-[#8ea598] font-mono">DEMO</span>
              </div>
              <p className="text-[11px] text-white">
                बीआईटी मेसरा — टीम जलशक्ति (प्रिया मुर्मू)
              </p>
              <div className="text-[10px] font-mono text-[#8ea598]">
                ID: <span className="text-cyan-300">BITM-2023-ENV-04</span> | Pass: <span className="text-cyan-300">demo</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  login('student');
                  navigate('/student-dashboard');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0e2936] hover:bg-[#143a4c] border border-cyan-700/50 text-cyan-200 text-xs font-bold transition-colors cursor-pointer"
              >
                छात्र रूप में तुरंत लॉगिन करें →
              </button>
            </div>

            {/* Demo CSR */}
            <div className="bg-[#11231b] p-3.5 rounded-2xl border border-[#1e382b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-bold text-xs flex items-center gap-1">
                  <span>🏢</span> सीएसआर डेमो (CSR)
                </span>
                <span className="text-[10px] text-[#8ea598] font-mono">DEMO</span>
              </div>
              <p className="text-[11px] text-white">
                टाटा स्टील फाउंडेशन सीएसआर (सुनीता सोरेन)
              </p>
              <div className="text-[10px] font-mono text-[#8ea598]">
                ID: <span className="text-purple-300">TSF-CSR-JH09</span> | Pass: <span className="text-purple-300">demo</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  login('csr');
                  navigate('/csr-portal');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#2b1636] hover:bg-[#3d1f4d] border border-purple-700/50 text-purple-200 text-xs font-bold transition-colors cursor-pointer"
              >
                सीएसआर रूप में तुरंत लॉगिन करें →
              </button>
            </div>

            {/* Demo Admin */}
            <div className="bg-[#11231b] p-3.5 rounded-2xl border border-[#1e382b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold text-xs flex items-center gap-1">
                  <span>🏛️</span> प्रशासन डेमो (Admin)
                </span>
                <span className="text-[10px] text-[#8ea598] font-mono">DEMO</span>
              </div>
              <p className="text-[11px] text-white">
                उपायुक्त कार्यालय राँची — एडीसी नोडल अधिकारी
              </p>
              <div className="text-[10px] font-mono text-[#8ea598]">
                ID: <span className="text-blue-300">JH-ADM-RNC-01</span> | Pass: <span className="text-blue-300">demo</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  login('admin');
                  navigate('/admin');
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0f2438] hover:bg-[#153450] border border-blue-700/50 text-blue-200 text-xs font-bold transition-colors cursor-pointer"
              >
                जिला प्रशासन रूप में तुरंत लॉगिन करें →
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8ea598] hover:text-emerald-400 transition-colors"
          >
            <span>← मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
