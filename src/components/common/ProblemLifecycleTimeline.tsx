import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Check,
  RefreshCw,
  Clock,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Building2,
  Wrench,
  MapPin,
  UserCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface LifecycleStepInfo {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  actorEn: string;
  actorHi: string;
  evidenceEn: string;
  evidenceHi: string;
  icon: React.ReactNode;
}

export const LIFECYCLE_STEPS: LifecycleStepInfo[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    titleEn: 'Problem Submitted',
    titleHi: 'समस्या दर्ज',
    descEn: 'Citizen reports grassroots issue with GPS location and photo/video evidence.',
    descHi: 'नागरिक द्वारा फोटो, वीडियो साक्ष्य और सटीक जीपीएस लोकेशन के साथ समस्या दर्ज।',
    actorEn: 'Local Citizen / Gram Panchayat',
    actorHi: 'स्थानीय नागरिक / ग्राम पंचायत',
    evidenceEn: 'Geotagged photographs, voice description, and village ward coordinates.',
    evidenceHi: 'जियोटैग्ड तस्वीरें, वॉयस ट्रांसक्रिप्शन और वार्ड का विवरण।',
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: 'step-2',
    stepNumber: 2,
    titleEn: 'AI Verification',
    titleHi: 'एआई सत्यापन',
    descEn: 'Automated NLP categorizes domain, checks duplicates, and computes urgency score.',
    descHi: 'एआई इंजन द्वारा श्रेणी का निर्धारण, डुप्लीकेट की पहचान और प्राथमिकता गणना।',
    actorEn: 'State Innovation AI Engine',
    actorHi: 'राज्य एआई नवाचार प्रणाली',
    evidenceEn: 'Similarity hash score (0.92), domain classification, and priority index.',
    evidenceHi: 'समानता स्कोर (0.92), विभाग मैपिंग और प्राथमिकता निर्धारण।',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'step-3',
    stepNumber: 3,
    titleEn: 'Admin Approval',
    titleHi: 'प्रशासनिक स्वीकृति',
    descEn: 'District nodal officer conducts physical field inspection and elevates issue to a challenge.',
    descHi: 'जिला नोडल अधिकारी द्वारा स्थल निरीक्षण और समस्या को आधिकारिक चुनौती का दर्जा।',
    actorEn: 'District Nodal Department (DWSD / RDD)',
    actorHi: 'जिला विभागीय नोडल (पेयजल / ग्रामीण विकास)',
    evidenceEn: 'Junior Engineer site report and institutional verification certificate.',
    evidenceHi: 'कनिष्ठ अभियंता का निरीक्षण प्रतिवेदन एवं सत्यापन प्रमाण।',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    id: 'step-4',
    stepNumber: 4,
    titleEn: 'Student Adoption',
    titleHi: 'छात्र टीम अंगीकरण',
    descEn: 'University engineering team adopts challenge as capstone research project with faculty mentor.',
    descHi: 'विश्वविद्यालय इंजीनियरिंग टीम द्वारा संकाय मार्गदर्शक के अधीन परियोजना अंगीकृत।',
    actorEn: 'Collegiate Student Innovators & Faculty Mentor',
    actorHi: 'इंजीनियरिंग छात्र टीम व संकाय मार्गदर्शक',
    evidenceEn: 'Adoption charter, project blueprint, and faculty endorsement letter.',
    evidenceHi: 'अंगीकरण अनुबंध, तकनीकी रूपरेखा और संकाय अनुशंसा पत्र।',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'step-5',
    stepNumber: 5,
    titleEn: 'CSR Support',
    titleHi: 'सीएसआर सहयोग',
    descEn: 'Industry corporate partners allocate targeted milestone-based grant for materials and fabrication.',
    descHi: 'उद्योग साझीदारों (टाटा स्टील, सीसीएल आदि) द्वारा सामग्री व निर्माण हेतु अनुदान स्वीकृत।',
    actorEn: 'Corporate CSR Foundation',
    actorHi: 'कॉर्पोरेट सीएसआर फाउंडेशन',
    evidenceEn: 'Milestone escrow commitment (₹60,000) and grant disbursement schedule.',
    evidenceHi: 'माइलस्टोन एस्क्रो अनुबंध (₹60,000) और किस्त भुगतान सारणी।',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    id: 'step-6',
    stepNumber: 6,
    titleEn: 'Solution Development',
    titleHi: 'समाधान विकास',
    descEn: 'Engineering team builds and tests functional hardware prototype in university maker lab.',
    descHi: 'छात्र दल द्वारा कॉलेज प्रयोगशाला में भौतिक प्रोटोटाइप का निर्माण एवं लैब परीक्षण।',
    actorEn: 'University Maker Lab & Student Builders',
    actorHi: 'विश्वविद्यालय मेकर लैब व छात्र निर्माणकर्ता',
    evidenceEn: 'CAD models, laboratory assay test reports, and bench testing videos.',
    evidenceHi: 'सीएडी मॉडल, लैब परीक्षण रिपोर्ट और कार्यशील वीडियो साक्ष्य।',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: 'step-7',
    stepNumber: 7,
    titleEn: 'Ground Deployment',
    titleHi: 'जमीनी अधिष्ठापन',
    descEn: 'Completed unit installed at grassroots site with telemetry sensors and community training.',
    descHi: 'तैयार उपकरण का गांव में अधिष्ठापन, सेंसर स्थापना और ग्रामीणों को संचालन प्रशिक्षण।',
    actorEn: 'Student Team, District Tech Squad & Panchayat',
    actorHi: 'छात्र टीम, जिला तकनीकी दस्ता व ग्राम पंचायत',
    evidenceEn: 'Installation photograph, GPS stamp, baseline water quality/flow test.',
    evidenceHi: 'अधिष्ठापन फोटो, जीपीएस साक्ष्य और प्रारंभिक जल गुणवत्ता रिपोर्ट।',
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: 'step-8',
    stepNumber: 8,
    titleEn: 'Citizen Verification',
    titleHi: 'नागरिक सत्यापन',
    descEn: 'Local beneficiary community verifies physical operation and signs off through social audit.',
    descHi: 'स्थानीय लाभार्थी ग्रामीणों द्वारा उपयोग कर संतोषजनक समाधान की पुष्टि।',
    actorEn: 'Beneficiary Citizens & Gram Sabha',
    actorHi: 'लाभार्थी ग्रामीण एवं ग्राम सभा',
    evidenceEn: 'Citizen verification feedback via portal/SMS and Gram Sabha resolution.',
    evidenceHi: 'नागरिक सत्यापन प्रतिक्रिया और ग्राम सभा संतुष्टि प्रस्ताव।',
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    id: 'step-9',
    stepNumber: 9,
    titleEn: 'Resolved',
    titleHi: 'सफलतापूर्वक निस्तारित',
    descEn: 'Challenge marked as sustainably resolved and permanently recorded on public social audit ledger.',
    descHi: 'समस्या का स्थायी निवारण प्रमाणित कर सार्वजनिक ऑडिट लेज़र में स्थायी प्रविष्टि।',
    actorEn: 'State Grievance Authority & Public Ledger',
    actorHi: 'राज्य जनसुनवाई प्राधिकरण व सार्वजनिक लेज़र',
    evidenceEn: 'Official completion certificate, impact metrics, and warranty guarantee.',
    evidenceHi: 'पूर्णता प्रमाण पत्र, लाभान्वित परिवारों का ब्यौरा और अनुरक्षण गारंटी।',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
];

interface ProblemLifecycleTimelineProps {
  currentStageIndex?: number; // 0 to 8 (0 = Step 1 submitted, 8 = Resolved)
  isInteractive?: boolean;
  onSelectStage?: (index: number) => void;
  className?: string;
}

export const ProblemLifecycleTimeline: React.FC<ProblemLifecycleTimelineProps> = ({
  currentStageIndex = 5, // Default to Solution Development (Stage 6, 0-indexed = 5)
  isInteractive = true,
  onSelectStage,
  className = '',
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const shouldReduceMotion = useReducedMotion();
  const [selectedStage, setSelectedStage] = useState<number>(currentStageIndex);

  const handleStageClick = (index: number) => {
    setSelectedStage(index);
    if (onSelectStage) {
      onSelectStage(index);
    }
  };

  const selectedInfo = LIFECYCLE_STEPS[selectedStage];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e382b] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isHi ? '9-चरणीय समाधान जीवनचक्र' : '9-Stage Resolution Lifecycle'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isHi ? 'समस्या से स्थायी समाधान की यात्रा' : 'Problem Lifecycle Timeline'}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#0c1c14] border border-[#1e382b] px-3.5 py-1.5 rounded-xl text-[#a5b9ad]">
          <span className="text-[#8ea598]">{isHi ? 'वर्तमान चरण:' : 'Current Stage:'}</span>
          <strong className="text-amber-400 font-mono">
            {currentStageIndex + 1}/9 {isHi ? LIFECYCLE_STEPS[currentStageIndex].titleHi : LIFECYCLE_STEPS[currentStageIndex].titleEn}
          </strong>
        </div>
      </div>

      {/* 9-Step Animated Timeline (Downwards / Linear Flow) */}
      <div className="space-y-2.5 max-w-4xl mx-auto">
        {LIFECYCLE_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;
          const isSelected = selectedStage === idx;

          return (
            <React.Fragment key={step.id}>
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: 'easeOut',
                }}
                onClick={() => isInteractive && handleStageClick(idx)}
                className={`w-full rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left ${
                  isInteractive ? 'cursor-pointer' : ''
                } ${
                  isSelected
                    ? 'ring-2 ring-emerald-400/50 bg-[#132a20] border-emerald-500/80 shadow-md'
                    : isCurrent
                    ? 'bg-[#12281e] border-amber-500/60 shadow-xs'
                    : isCompleted
                    ? 'bg-[#0d1e17] border-[#1e382b] hover:bg-[#12271e]'
                    : 'bg-[#091510]/80 border-[#152a1f] opacity-70 hover:opacity-90'
                }`}
              >
                {/* Left: Icon, Number, Title */}
                <div className="flex items-center gap-3.5">
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/50'
                        : 'bg-[#15281e] text-[#8ea598] border border-[#1e382b]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <span className="font-mono text-xs text-[#8ea598]">{idx + 1}</span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-bold text-emerald-400">
                        0{step.stepNumber}.
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-black ${
                          isCurrent
                            ? 'text-amber-300'
                            : isCompleted
                            ? 'text-white'
                            : 'text-[#8ea598]'
                        }`}
                      >
                        {isHi ? step.titleHi : step.titleEn}
                      </h4>
                      <span className="text-xs text-[#8ea598] font-medium hidden md:inline">
                        ({isHi ? step.titleEn : step.titleHi})
                      </span>

                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                          {isHi ? 'प्रगति में (Active)' : 'Active Stage'}
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-700/60 px-2 py-0.5 rounded-full">
                          {isHi ? 'पूर्ण ✓' : 'Completed ✓'}
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-[10px] font-medium text-[#8ea598] bg-[#0c1b14] border border-[#1e382b] px-2 py-0.5 rounded-full">
                          {isHi ? 'प्रतीक्षित' : 'Upcoming'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#a5b9ad] mt-1 line-clamp-1 sm:line-clamp-none">
                      {isHi ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>

                {/* Right: Actor & Click cue */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1e382b]/60 text-xs">
                  <span className="text-[11px] text-[#8ea598]">
                    {isHi ? 'प्रभारी पक्ष' : 'Lead Stakeholder'}
                  </span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-right">
                    {isHi ? step.actorHi : step.actorEn}
                  </span>
                </div>
              </motion.div>

              {/* Downward Arrow between steps */}
              {idx < LIFECYCLE_STEPS.length - 1 && (
                <div className="flex justify-center py-0.5 text-emerald-500/40">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Stage Detail Drawer / Deep-Dive Box */}
      <motion.div
        key={selectedInfo.id}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-[#0c1c14] rounded-2xl border border-[#1e382b] p-5 sm:p-6 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[#1e382b] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
              {selectedInfo.icon}
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                {isHi ? `चरण ${selectedInfo.stepNumber} का विस्तृत ब्यौरा` : `Stage ${selectedInfo.stepNumber} Verification Details`}
              </span>
              <h4 className="text-base sm:text-lg font-black text-white">
                {isHi ? selectedInfo.titleHi : selectedInfo.titleEn}
              </h4>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-300 bg-[#12281e] px-2.5 py-1 rounded-lg border border-emerald-700/50">
            {selectedStage < currentStageIndex
              ? isHi ? 'सत्यापित साक्ष्य ✓' : 'Verified Proof ✓'
              : selectedStage === currentStageIndex
              ? isHi ? 'कार्य प्रगति में 🔄' : 'In Progress 🔄'
              : isHi ? 'आगामी चरण ⏳' : 'Scheduled Milestone ⏳'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 bg-[#11231b] p-3.5 rounded-xl border border-[#1e382b]">
            <span className="text-[#8ea598] block">{isHi ? 'उत्तरदायी संस्थान / पक्ष:' : 'Responsible Actor:'}</span>
            <strong className="text-white text-sm block">{isHi ? selectedInfo.actorHi : selectedInfo.actorEn}</strong>
            <p className="text-[#a5b9ad] text-[11px] mt-1">{isHi ? selectedInfo.descHi : selectedInfo.descEn}</p>
          </div>

          <div className="space-y-1 bg-[#11231b] p-3.5 rounded-xl border border-[#1e382b]">
            <span className="text-[#8ea598] block">{isHi ? 'अपेक्षित सत्यापन साक्ष्य:' : 'Required Evidence / Audit:'}</span>
            <strong className="text-emerald-300 text-sm block">{isHi ? selectedInfo.evidenceHi : selectedInfo.evidenceEn}</strong>
            <p className="text-[#a5b9ad] text-[11px] mt-1">
              {isHi
                ? 'यह साक्ष्य सार्वजनिक सामाजिक ऑडिट और जिला प्रशासन लेज़र में सुरक्षित रहता है।'
                : 'This proof is published on the public ledger and certified by the district nodal officer.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
