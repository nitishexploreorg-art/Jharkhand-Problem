import React from 'react';
import { PLATFORM_STAGES } from '../data/jharkhandData';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
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
  const { language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Platform Vision */}
      <div className="bg-[#091510] border border-[#1e382b] text-white rounded-3xl p-6 sm:p-10 shadow-xl border-b-4 border-emerald-600">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11231b] border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isHi ? 'समाधान झारखंड की संकल्पना' : 'The Samadhan Vision'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white">
          {isHi
            ? 'पारंपरिक शिकायत निवारण से आगे — जनसमस्या का स्थायी तकनीकी समाधान'
            : 'Beyond Traditional Grievance Redressal — Sustainable Engineering Solutions for Grassroots Needs'}
        </h1>

        <p className="text-xs sm:text-base text-[#a5b9ad] mt-4 leading-relaxed">
          {isHi
            ? "अक्सर सरकारी जनसुनवाई पोर्टल केवल फाइलों के आदान-प्रदान तक सीमित रह जाते हैं। 'समाधान झारखंड' एक क्रांतिकारी प्रतिमान स्थापित करता है: नागरिक साक्ष्य के आधार पर समस्या दर्ज होती है, एआई और जिला प्रशासन उसे तकनीकी चुनौती में बदलते हैं, राज्य के शीर्ष इंजीनियरिंग छात्र व प्रोफेसर उसका प्रोटोटाइप बनाते हैं, उद्योग सीएसआर राशि से निर्माण वित्तपोषित करते हैं और अंत में नागरिक स्वयं समाधान का सत्यापन करते हैं।"
            : "Traditional public grievance portals often end at bureaucratic paperwork and status updates. 'Samadhan Jharkhand' pioneers a transformative model: citizen grievances backed by photographic evidence are converted by AI and district authorities into innovation challenges, top university engineering teams engineer robust working hardware prototypes, corporate CSR funds the pilots through milestone escrows, and local communities verify the outcomes on the ground."}
        </p>
      </div>

      {/* 10-Stage Lifecycle Detailed Guide */}
      <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            {isHi ? 'कार्यप्रवाह निर्देशिका' : 'Workflow Architecture'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isHi ? '10-चरणीय संपूर्ण समाधान चक्र' : 'The 10-Stage Resolution Lifecycle'}
          </h2>
          <p className="text-xs text-[#8ea598] mt-1">
            {isHi
              ? 'प्रत्येक समस्या को इन 10 अनिवार्य चरणों से गुजरना होता है ताकि जवाबदेही और पारदर्शिता सुनिश्चित रहे।'
              : 'Every problem progresses through these 10 structured stages ensuring transparency, verification, and accountability.'}
          </p>
        </div>

        <div className="space-y-3">
          {PLATFORM_STAGES.map((s) => (
            <div
              key={s.stage}
              className="p-4 rounded-2xl border border-[#1e382b] bg-[#0d1e17] flex items-start gap-4 text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-mono font-black flex items-center justify-center shrink-0 shadow-xs">
                {s.stepNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <h4 className="font-bold text-white text-sm">{isHi ? s.labelHi : s.labelEn}</h4>
                  <span className="font-mono text-emerald-300 text-[11px] uppercase bg-[#112a1f] border border-[#1e4834] px-2 py-0.5 rounded">
                    {s.stage}
                  </span>
                </div>
                <p className="text-[#a5b9ad] leading-relaxed">
                  {isHi ? s.shortDescHi : s.shortDescEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholders Matrix */}
      <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            {isHi ? 'पारिस्थितिकी तंत्र' : 'Ecosystem Pillars'}
          </span>
          <h2 className="text-xl font-black text-white">
            {isHi ? 'मंच के चार मुख्य स्तंभ' : 'The Four Pillars of Samadhan'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl border border-[#1e382b] bg-[#0d1e17] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'आम नागरिक एवं ग्राम सभा' : 'Citizens & Gram Panchayats'}
            </h4>
            <p className="text-[#8ea598] leading-relaxed">
              {isHi
                ? 'फोटो/वीडियो व जीपीएस लोकेशन के साथ वास्तविक समस्या दर्ज करते हैं। समाधान के बाद ग्राम स्तर पर ऑडिट कर अंतिम संतुष्टि प्रमाण पत्र देते हैं।'
                : 'Report grassroots issues with photo/video proof and automatic GPS tagging. Following deployment, villagers conduct a social audit and certify final satisfaction.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e382b] bg-[#0d1e17] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-300 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'जिला प्रशासन व विभागीय नोडल' : 'District Administration & Nodal Officers'}
            </h4>
            <p className="text-[#8ea598] leading-relaxed">
              {isHi
                ? 'एआई छंटाई के बाद समस्या की भौतिक सत्यता परखते हैं, दोहराव की जांच करते हैं और इसे राज्य नवाचार चुनौती के रूप में प्रकाशित करते हैं।'
                : 'Vets grievances after AI duplicate and severity triage, conducts physical verification, and elevates validated problems to official innovation challenges.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e382b] bg-[#0d1e17] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'विश्वविद्यालय एवं छात्र अनुसंधान दल' : 'Universities & Student Research Teams'}
            </h4>
            <p className="text-[#8ea598] leading-relaxed">
              {isHi
                ? 'इंजीनियरिंग छात्र संकाय मार्गदर्शन में समस्या को अंगीकार करते हैं, लैब प्रोटोटाइप तैयार करते हैं और माइलस्टोन पूरा करते हैं।'
                : 'Engineering and polytechnic students adopt challenges under faculty guidance, build functional hardware prototypes, and test them rigorously in labs.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#1e382b] bg-[#0d1e17] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-300 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'उद्योग साझीदार एवं सीएसआर फंड' : 'Industry Partners & CSR Grants'}
            </h4>
            <p className="text-[#8ea598] leading-relaxed">
              {isHi
                ? 'टाटा स्टील, सीसीएल, सेल आदि उद्योग प्रोटोटाइप निर्माण एवं फील्ड अधिष्ठापन हेतु वित्तीय अनुदान प्रदान करते हैं।'
                : 'Corporate CSR leaders like Tata Steel, CCL, and SAIL provide targeted milestone-based grants directly to student teams for prototype development and deployment.'}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency & FAQ */}
      <div className="bg-[#091510] border border-[#1e382b] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-amber-300">
          {isHi ? 'आपातकालीन संपर्क एवं सहायता' : 'Emergency Assistance & Helplines'}
        </h3>
        <p className="text-xs text-[#a5b9ad] leading-relaxed">
          {isHi
            ? 'यदि समस्या अति-संवेदनशील या आपातकालीन (जान-माल का संकट, बाढ़, विद्युत दुर्घटना) है, तो ऑनलाइन चुनौती दर्ज करने के स्थान पर तुरंत राज्य आपातकालीन सेवा पर कॉल करें:'
            : 'If your problem involves an immediate life-threatening emergency, flood danger, or live electrical hazards, contact state emergency services immediately:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 bg-[#11231b] rounded-xl border border-[#1e382b]">
            <span className="text-[#8ea598] block">{isHi ? 'मुख्यमंत्री जनसंवाद:' : 'CM Helpline:'}</span>
            <strong className="text-emerald-400 text-sm">181 (Toll Free)</strong>
          </div>
          <div className="p-3 bg-[#11231b] rounded-xl border border-[#1e382b]">
            <span className="text-[#8ea598] block">{isHi ? 'झारखंड आपातकालीन सेवा:' : 'Emergency Response:'}</span>
            <strong className="text-emerald-400 text-sm">112</strong>
          </div>
          <div className="p-3 bg-[#11231b] rounded-xl border border-[#1e382b]">
            <span className="text-[#8ea598] block">{isHi ? 'महिला हेल्पलाइन:' : 'Women Helpline:'}</span>
            <strong className="text-emerald-400 text-sm">1091</strong>
          </div>
        </div>
      </div>

      {/* Quick CTAs */}
      <div className="flex items-center justify-between pt-2">
        <Link to="/report-issue">
          <Button variant="citizen-large" size="md">
            {isHi ? 'अपनी समस्या दर्ज करें' : 'Report a Problem'}
          </Button>
        </Link>
        <Link to="/challenges">
          <Button variant="primary" size="md">
            {isHi ? 'चुनौतियाँ देखें' : 'View Challenges'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
