import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Sparkles,
  CopyCheck,
  ShieldCheck,
  GraduationCap,
  Building2,
  Cpu,
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Info,
  X,
  Play,
  RotateCcw,
  Check,
  Smartphone,
  FileCheck2,
} from 'lucide-react';
import { Button } from './Button';

export interface DemoStep {
  stepNumber: number;
  title: string;
  titleHi: string;
  role: 'citizen' | 'ai' | 'admin' | 'student' | 'csr' | 'public';
  roleLabel: string;
  route: string;
  summary: string;
  summaryHi: string;
  keyHighlights: string[];
  icon: React.ReactNode;
  actionText: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Citizen: Report Problem',
    titleHi: 'नागरिक: समस्या दर्ज करें',
    role: 'citizen',
    roleLabel: 'Aam Nagrik (Citizen)',
    route: '/report-issue',
    summary:
      'A rural citizen snaps a photo of a dysfunctional village handpump and submits it with voice/text description and automatic GPS location.',
    summaryHi:
      'ग्रामीण नागरिक खराब चापाकल की फोटो खींचकर, आवाज व विवरण और स्वचालित जीपीएस लोकेशन के साथ समस्या दर्ज करता है।',
    keyHighlights: [
      'Photo upload with real image preview',
      'Voice input simulation & GPS geolocation tagging',
      '100% Free citizen form with Hindi/English bilingual UI',
    ],
    icon: <User className="w-5 h-5" />,
    actionText: 'Go to Report Problem (समस्या दर्ज करें)',
  },
  {
    stepNumber: 2,
    title: 'AI Analysis',
    titleHi: 'एआई द्वारा त्वरित विश्लेषण',
    role: 'ai',
    roleLabel: 'State AI NLP Engine',
    route: '/report-issue',
    summary:
      'Platform AI parses the unstructured grievance, categorizes it into "Water Supply", assesses High severity, and extracts engineering parameters.',
    summaryHi:
      'एआई शिकायत को "पेयजल एवं स्वच्छता" में वर्गीकृत करता है, उच्च प्राथमिकता निर्धारित करता है और तकनीकी मापदंड तैयार करता है।',
    keyHighlights: [
      'Simulated NLP category detection (95% confidence score)',
      'Automated priority assignment: HIGH severity',
      'Bilingual translation & technical scope extraction',
    ],
    icon: <Sparkles className="w-5 h-5" />,
    actionText: 'View AI Analysis (एआई विश्लेषण देखें)',
  },
  {
    stepNumber: 3,
    title: 'Duplicate Check',
    titleHi: 'एआई डुप्लिकेट जांच (क्लस्टरिंग)',
    role: 'ai',
    roleLabel: 'Civic Clustering AI',
    route: '/report-issue',
    summary:
      'AI detects an 87% similar existing complaint within 0.4 km (Khunti Handpump) and allows the citizen to upvote the existing ticket or file a unique issue.',
    summaryHi:
      'एआई 0.4 किमी के दायरे में 87% समानता वाली पूर्व दर्ज समस्या ढूंढता है और नागरिक को समर्थन (Upvote) या नई शिकायत का विकल्प देता है।',
    keyHighlights: [
      'Prevents civic ticket inflation and duplicates',
      'Shows cluster distance (0.4 km) and similarity score (87%)',
      'Citizens can upvote existing ticket or proceed with unique issue',
    ],
    icon: <CopyCheck className="w-5 h-5" />,
    actionText: 'Test Duplicate Check (डुप्लिकेट मॉडल देखें)',
  },
  {
    stepNumber: 4,
    title: 'Admin Verification',
    titleHi: 'प्रशासनिक स्थलीय सत्यापन',
    role: 'admin',
    roleLabel: 'District / Dept Admin',
    route: '/admin',
    summary:
      'DWSD Junior Engineer inspects the reported handpump site, verifies physical cylinder breakdown, and elevates it to an open collegiate challenge.',
    summaryHi:
      'पेयजल एवं स्वच्छता विभाग (DWSD) के कनिष्ठ अभियंता स्थल निरीक्षण कर भौतिक खराबी सत्यापित करते हैं और इसे छात्र चुनौती में बदलते हैं।',
    keyHighlights: [
      'Official departmental validation with inspection notes',
      'Categorizes issue as societal engineering challenge',
      'Opens problem for collegiate innovation adoption',
    ],
    icon: <ShieldCheck className="w-5 h-5" />,
    actionText: 'Open Admin Dashboard (प्रशासनिक सत्यापन)',
  },
  {
    stepNumber: 5,
    title: 'Student Adoption',
    titleHi: 'छात्र टीम द्वारा अंगीकार',
    role: 'student',
    roleLabel: 'University Student Innovators',
    route: '/challenges',
    summary:
      'Team "Tech Titans" from R.D. Engineering College (guided by Dr. S. K. Mahato) adopts the Khunti water challenge for their final-year hardware capstone.',
    summaryHi:
      'आर.डी. इंजीनियरिंग कॉलेज की टीम "Tech Titans" इस समस्या को अपने अंतिम वर्ष हार्डवेयर कैपस्टोन प्रोजेक्ट के रूप में अंगीकार करती है।',
    keyHighlights: [
      'Real-world learning replacing artificial classroom projects',
      'Faculty mentorship sign-off & multidisciplinary engineering team',
      'Clear problem definition: Solar-powered biofiltration retrofit',
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    actionText: 'Explore Open Challenges (चुनौतियां देखें)',
  },
  {
    stepNumber: 6,
    title: 'CSR Support',
    titleHi: 'सीएसआर उद्योग अनुदान',
    role: 'csr',
    roleLabel: 'Industry / CSR Sponsor',
    route: '/csr-portal',
    summary:
      'Tata Steel Foundation commits a ₹60,000 milestone-based grant into transparent escrow to fund the student team\'s component fabrication.',
    summaryHi:
      'टाटा स्टील फाउंडेशन छात्र टीम के हार्डवेयर निर्माण हेतु ₹60,000 का सीएसआर अनुदान पारदर्शी एस्क्रो में स्वीकृत करता है।',
    keyHighlights: [
      'Direct link between industry CSR funds and grassroots university talent',
      '100% transparent milestone-linked tranche escrow releases',
      'Auditable social impact metrics per invested rupee',
    ],
    icon: <Building2 className="w-5 h-5" />,
    actionText: 'Open CSR Portal (सीएसआर पोर्टल देखें)',
  },
  {
    stepNumber: 7,
    title: 'Milestone Development',
    titleHi: 'प्रोटोटाइप निर्माण एवं माइलस्टोन',
    role: 'student',
    roleLabel: 'Innovation Lab Engineering',
    route: '/project-lifecycle',
    summary:
      'Students build the dual-stage biofiltration chamber in the college hardware lab, uploading CAD schematics, bill of materials, and initial water tests.',
    summaryHi:
      'छात्र कॉलेज प्रयोगशाला में सौर जल शोधन इकाई का निर्माण करते हैं और सीएडी चित्र, परीक्षण रिपोर्ट अपलोड करते हैं।',
    keyHighlights: [
      'Structured milestone timeline with transparent progress',
      'Verifiable engineering proofs: CAD drawings and lab assays',
      'Escrow fund release triggered on mentor milestone review',
    ],
    icon: <Cpu className="w-5 h-5" />,
    actionText: 'View Project Lifecycle (प्रोजेक्ट लाइफसाइकिल)',
  },
  {
    stepNumber: 8,
    title: 'Ground Deployment',
    titleHi: 'जमीनी अधिष्ठापन एवं फील्ड पायलट',
    role: 'student',
    roleLabel: 'Field Pilot & District Squad',
    route: '/ground-deployment',
    summary:
      'The solar water filtration system is installed on-site at Hesal Tola village. Water testing confirms turbidity reduction from 24.8 NTU down to 1.2 NTU.',
    summaryHi:
      'सौर जल शोधक इकाई को खूंटी के हेसल टोला चापाकल पर स्थापित किया गया। जांच में टर्बिडिटी 24.8 से घटकर 1.2 NTU (पीने योग्य) प्रमाणित हुई।',
    keyHighlights: [
      'Physical installation photos with side-by-side comparison',
      'BIS 10500 compliant laboratory certified water quality report',
      'District officer on-site deployment verification sign-off',
    ],
    icon: <MapPin className="w-5 h-5" />,
    actionText: 'Inspect Ground Deployment (जमीनी अधिष्ठापन देखें)',
  },
  {
    stepNumber: 9,
    title: 'Citizen Verification',
    titleHi: 'नागरिक संतुष्टि सत्यापन',
    role: 'citizen',
    roleLabel: 'Citizen Beneficiaries',
    route: '/track-problem?id=JH-1042',
    summary:
      'The loop is closed when village residents receive SMS/WhatsApp alerts, test the water output, and confirm via two-way feedback that the problem is solved.',
    summaryHi:
      'ग्रामवासियों को एसएमएस/व्हाट्सएप सूचना मिलती है। वे पानी पीकर पुष्टि करते हैं कि समस्या का समाधान हो गया है।',
    keyHighlights: [
      'Citizen holds final veto: Grievance cannot close without citizen approval',
      'Simulated SMS & WhatsApp two-way feedback prompt',
      'Citizen can mark "Resolved" or "Reopen" if issue persists',
    ],
    icon: <Smartphone className="w-5 h-5" />,
    actionText: 'Track Problem & Verify (नागरिक सत्यापन करें)',
  },
  {
    stepNumber: 10,
    title: 'Resolved: Social Audit',
    titleHi: 'समाधान पूर्ण: सार्वजनिक ऑडिट',
    role: 'public',
    roleLabel: 'Open Public Ledger',
    route: '/social-audit',
    summary:
      'The verified resolution is published on the open Social Audit ledger with complete timeline, before/after photos, panchayat certificate, and IP rights notes.',
    summaryHi:
      'सत्यापित समाधान को पूर्ण पारदर्शिता के साथ सार्वजनिक सामाजिक ऑडिट लेज़र पर प्रकाशित किया जाता है।',
    keyHighlights: [
      'Public transparency ledger accessible to every citizen',
      'Complete end-to-end timeline from complaint to resolution',
      'Anonymized citizen privacy with open-access innovation IP',
    ],
    icon: <FileCheck2 className="w-5 h-5" />,
    actionText: 'View Social Audit Ledger (सामाजिक ऑडिट लेज़र)',
  },
];

export const DemoJourneyGuideModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const activeStep = DEMO_STEPS[currentStepIdx];

  const handleNavigateToStep = (route: string) => {
    onClose();
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white p-5 sm:p-6 flex items-center justify-between border-b-4 border-teal-500 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full font-mono">
                ⚡ 3–5 Min Hackathon Judge Walkthrough
              </span>
              <span className="text-teal-300 text-xs font-semibold hidden sm:inline">
                End-to-End Civic Innovation Loop
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Samadhan Jharkhand: 10-Step Journey
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Step Indicator Chips */}
        <div className="bg-slate-900 px-4 py-2.5 overflow-x-auto border-b border-slate-800 shrink-0 flex items-center gap-1.5 scrollbar-thin">
          {DEMO_STEPS.map((step, idx) => {
            const isSelected = idx === currentStepIdx;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setCurrentStepIdx(idx)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span className="font-mono text-[11px] opacity-80">
                  {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                </span>
                <span>{step.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-sm">
                  {activeStep.stepNumber}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  Role: {activeStep.roleLabel}
                </span>
                <span className="text-xs font-bold text-teal-700">
                  Step {activeStep.stepNumber} of 10
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                {activeStep.title}
              </h3>
              <div className="text-sm font-semibold text-slate-500">
                {activeStep.titleHi}
              </div>
            </div>

            {/* Prototype Demo Data Notice */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-900 max-w-xs shrink-0 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <span>⚠️</span>
                <span>Prototype Demo Data</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Simulated for hackathon evaluation. Does not claim real government sanctions, real escrow, or legally binding contracts.
              </p>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {activeStep.summary}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Features Evaluated in this Step:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeStep.keyHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStepIdx === 0}
              onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Step
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentStepIdx === DEMO_STEPS.length - 1}
              onClick={() => setCurrentStepIdx((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-slate-600"
            >
              Close Guide
            </Button>

            {/* Jump to this step in application */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavigateToStep(activeStep.route)}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              {activeStep.actionText} →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DemoJourneyHomeSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border-b-4 border-teal-500 shadow-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>For Hackathon Evaluators & Judges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The 10-Step Civic Innovation Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore how a grassroots civic complaint transforms into an engineering capstone, secures industry CSR funding, and closes with verified ground deployment in under 5 minutes.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold">
              <span>⚠️</span>
              <span>Prototype Demo Data</span>
            </span>

            <Button
              variant="primary"
              size="md"
              onClick={() => setModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-xs whitespace-nowrap"
              icon={<Play className="w-4 h-4" />}
            >
              Start 3-Min Walkthrough
            </Button>
          </div>
        </div>

        {/* 10-Step Visual Flow Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {DEMO_STEPS.map((step) => (
            <Link
              key={step.stepNumber}
              to={step.route}
              className="group bg-slate-900/90 hover:bg-slate-800 p-3.5 rounded-2xl border border-slate-800 hover:border-teal-500 transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                    Step {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                  </span>
                  <div className="text-slate-400 group-hover:text-teal-300 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-teal-200 transition-colors line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {step.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] font-semibold text-teal-400 flex items-center justify-between">
                <span>{step.roleLabel.split(' ')[0]}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <DemoJourneyGuideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
