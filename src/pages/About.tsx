import React from 'react';
import { PLATFORM_STAGES } from '../data/jharkhandData';
import { Button } from '../components/common/Button';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  GraduationCap,
  Building2,
  Phone,
  HelpCircle,
  Award,
  FileCheck2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Platform Vision */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border-b-4 border-emerald-600">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>समाधान झारखंड की संकल्पना (The Samadhan Vision)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black leading-tight">
          पारंपरिक शिकायत निवारण से आगे — जनसमस्या का स्थायी तकनीकी समाधान
        </h1>

        <p className="text-xs sm:text-base text-slate-300 mt-4 leading-relaxed">
          अक्सर सरकारी जनसुनवाई पोर्टल केवल फाइलों के आदान-प्रदान तक सीमित रह जाते हैं। 'समाधान झारखंड' एक क्रांतिकारी प्रतिमान स्थापित करता है: नागरिक साक्ष्य के आधार पर समस्या दर्ज होती है, एआई और जिला प्रशासन उसे तकनीकी चुनौती में बदलते हैं, राज्य के शीर्ष इंजीनियरिंग छात्र व प्रोफेसर उसका प्रोटोटाइप बनाते हैं, उद्योग सीएसआर राशि से निर्माण वित्तपोषित करते हैं और अंत में नागरिक स्वयं समाधान का सत्यापन करते हैं।
        </p>
      </div>

      {/* 10-Stage Lifecycle Detailed Guide */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            कार्यप्रवाह निर्देशिका
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            10-चरणीय संपूर्ण समाधान चक्र (The 10-Stage Resolution Cycle)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            प्रत्येक समस्या को इन 10 अनिवार्य चरणों से गुजरना होता है ताकि जवाबदेही और पारदर्शिता सुनिश्चित रहे।
          </p>
        </div>

        <div className="space-y-3">
          {PLATFORM_STAGES.map((s) => (
            <div
              key={s.stage}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-start gap-4 text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-mono font-black flex items-center justify-center shrink-0">
                {s.stepNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{s.labelHi}</h4>
                  <span className="font-mono text-slate-500 text-[11px] uppercase bg-slate-200/80 px-2 py-0.5 rounded">
                    {s.labelEn}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {s.shortDescHi} — <span className="text-slate-500">{s.shortDescEn}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholders Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            पारिस्थितिकी तंत्र (Ecosystem Roles)
          </span>
          <h2 className="text-xl font-black text-slate-900">
            मंच के चार मुख्य स्तंभ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">आम नागरिक एवं ग्राम सभा</h4>
            <p className="text-slate-600 leading-relaxed">
              फोटो/वीडियो व जीपीएस लोकेशन के साथ वास्तविक समस्या दर्ज करते हैं। समाधान के बाद ग्राम स्तर पर ऑडिट कर अंतिम संतुष्टि प्रमाण पत्र देते हैं।
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">जिला प्रशासन व विभागीय नोडल</h4>
            <p className="text-slate-600 leading-relaxed">
              एआई छंटाई के बाद समस्या की भौतिक सत्यता परखते हैं, दोहराव की जांच करते हैं और इसे राज्य नवाचार चुनौती के रूप में प्रकाशित करते हैं।
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">विश्वविद्यालय एवं छात्र अनुसंधान दल</h4>
            <p className="text-slate-600 leading-relaxed">
              इंजीनियरिंग छात्र संकाय मार्गदर्शन में समस्या को अंगीकार करते हैं, लैब प्रोटोटाइप तैयार करते हैं और माइलस्टोन पूरा करते हैं।
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm">उद्योग साझीदार एवं सीएसआर फंड</h4>
            <p className="text-slate-600 leading-relaxed">
              टाटा स्टील, सीसीएल, सेल आदि उद्योग प्रोटोटाइप निर्माण एवं फील्ड अधिष्ठापन हेतु वित्तीय अनुदान प्रदान करते हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Emergency & FAQ */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-amber-300">आपातकालीन संपर्क एवं सहायता (Helplines)</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          यदि समस्या अति-संवेदनशील या आपातकालीन (जान-माल का संकट, बाढ़, विद्युत दुर्घटना) है, तो ऑनलाइन चुनौती दर्ज करने के स्थान पर तुरंत राज्य आपातकालीन सेवा पर कॉल करें:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">मुख्यमंत्री जनसंवाद:</span>
            <strong className="text-emerald-400 text-sm">181 (Toll Free)</strong>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">झारखंड आपातकालीन सेवा:</span>
            <strong className="text-emerald-400 text-sm">112</strong>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">महिला हेल्पलाइन:</span>
            <strong className="text-emerald-400 text-sm">1091</strong>
          </div>
        </div>
      </div>

      {/* Quick CTAs */}
      <div className="flex items-center justify-between pt-2">
        <Link to="/report-issue">
          <Button variant="citizen-large" size="md">
            समस्या दर्ज करें (Report Problem)
          </Button>
        </Link>
        <Link to="/challenges">
          <Button variant="primary" size="md">
            चुनौतियाँ देखें (View Challenges)
          </Button>
        </Link>
      </div>
    </div>
  );
};
