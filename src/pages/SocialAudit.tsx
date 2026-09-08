import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  FileCheck2,
  CheckCircle2,
  MapPin,
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Award,
  Download,
  Eye,
  Building2,
  GraduationCap,
  Sparkles,
  Lock,
  FileText,
  Clock,
  HeartHandshake,
  Check,
  Briefcase,
  Cpu,
  ChevronDown,
} from 'lucide-react';

export type IPStatus =
  | 'No IP Filed'
  | 'Under Evaluation'
  | 'Patent Filed'
  | 'Technology Transfer';

export interface PublicAuditRecord {
  problemId: string;
  category: string;
  categoryHi: string;
  district: string;
  districtHi: string;
  block: string;
  locationAnonymized: string;
  status: string;
  statusType: 'resolved' | 'deployed' | 'in_progress';
  title: string;
  titleHi: string;
  problemDescription: string;
  adoptedBy: string;
  college: string;
  csrSupport: string;
  csrPartnerName: string;
  projectProgress: number;
  deployment: string;
  citizenVerification: string;
  citizensBenefited: number;
  ipStatus: IPStatus;
  ipDetails: {
    governingAgreement: string;
    filingRef?: string;
    assigneeNotes: string;
    commercialRights: string;
  };
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  testingReportSummary: string;
  panchayatAuditCertificate: string;
  timeline: {
    title: string;
    titleHi: string;
    date: string;
    actor: string;
    status: 'completed' | 'current' | 'pending';
    summary: string;
  }[];
}

const PUBLIC_AUDIT_RECORDS: PublicAuditRecord[] = [
  {
    problemId: 'JH-1042',
    category: 'Water Supply',
    categoryHi: 'पेयजल आपूर्ति',
    district: 'Khunti',
    districtHi: 'खूंटी',
    block: 'Ormanjhi / Khunti Rural',
    locationAnonymized: 'Hesal Tola, Near Primary School Handpump',
    status: 'Resolved ✅',
    statusType: 'resolved',
    title: 'Khunti Village Drinking Water Issue',
    titleHi: 'खूंटी ग्रामीण पेयजल समस्या — सौर आधारित जल शोधन प्रणाली',
    problemDescription:
      'Community open well and defunct handpump yielded water with high dissolved iron (3.4 mg/L) and turbidity, causing recurring gastroenteritis and skin ailments across hamlet households.',
    adoptedBy: 'Tech Titans',
    college: 'R.D. Engineering College',
    csrSupport: '₹60,000',
    csrPartnerName: 'Tata Steel Foundation CSR Innovation Grant',
    projectProgress: 100,
    deployment: 'Completed',
    citizenVerification: 'Verified',
    citizensBenefited: 127,
    ipStatus: 'Under Evaluation',
    ipDetails: {
      governingAgreement:
        'Collegiate Capstone IP MoU (Ref: RDEC/IPR/2026/041) between Student Innovators, R.D. Engineering College, and Tata Steel Foundation.',
      filingRef: 'IP-PROV-2026-JH-019 (Provisional Evaluation Dossier)',
      assigneeNotes:
        'Dual-stage activated alumina adsorption column with solar backwash valve designed by Tech Titans. Evaluation underway by the Institutional Intellectual Property Rights (IPR) Cell.',
      commercialRights:
        'Public-good royalty-free license reserved for Government of Jharkhand public health and panchayat deployments.',
    },
    beforePhotoUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=800&q=80',
    testingReportSummary:
      'BIS 10500:2012 certified. Turbidity reduced from 24.8 NTU to 1.2 NTU; iron reduced to 0.08 mg/L. Lab Report #DWSD-LAB-KHT-2026-992.',
    panchayatAuditCertificate: 'JH-KHT-PAN-2026-0883',
    timeline: [
      {
        title: 'Reported',
        titleHi: 'समस्या दर्ज',
        date: '12 Aug 2026',
        actor: 'Citizen Beneficiary (Hesal Tola)',
        status: 'completed',
        summary: 'Problem logged with photographic evidence and geolocation tag.',
      },
      {
        title: 'AI Categorized',
        titleHi: 'एआई वर्गीकरण',
        date: '12 Aug 2026',
        actor: 'Jharkhand State AI Engine',
        status: 'completed',
        summary:
          'Classified under "Water Supply", assigned Priority: Critical with 0.96 confidence.',
      },
      {
        title: 'Admin Verified',
        titleHi: 'प्रशासनिक सत्यापन',
        date: '15 Aug 2026',
        actor: 'Dr. Amit Sinha, IAS (ADM Development)',
        status: 'completed',
        summary:
          'On-site field inspection conducted by DWSD Junior Engineer; approved as Societal Challenge.',
      },
      {
        title: 'Student Team Adopted',
        titleHi: 'छात्र टीम द्वारा अंगीकृत',
        date: '20 Aug 2026',
        actor: 'Tech Titans (R.D. Engineering College)',
        status: 'completed',
        summary:
          'Final year multidisciplinary engineering team adopted project under capstone innovation program.',
      },
      {
        title: 'CSR Support',
        titleHi: 'सीएसआर अनुदान स्वीकृत',
        date: '25 Aug 2026',
        actor: 'Tata Steel Foundation',
        status: 'completed',
        summary:
          '₹60,000 grant committed with phased milestone disbursement agreement.',
      },
      {
        title: 'Prototype Developed',
        titleHi: 'प्रोटोटाइप विकसित',
        date: '02 Sep 2026',
        actor: 'Tech Titans & Mentor Dr. Mahato',
        status: 'completed',
        summary:
          'Solar dual-stage bio-sand and activated alumina prototype fabricated and lab tested.',
      },
      {
        title: 'Field Deployment',
        titleHi: 'जमीनी अधिष्ठापन',
        date: '06 Sep 2026',
        actor: 'Tech Titans & DWSD Khunti',
        status: 'completed',
        summary:
          'Filtration unit installed on-site; 460 L/hr continuous flow commissioned.',
      },
      {
        title: 'Citizen Verification',
        titleHi: 'नागरिक सत्यापन',
        date: '08 Sep 2026',
        actor: '127 Hamlet Residents via SMS Gateway',
        status: 'completed',
        summary:
          'Beneficiaries responded "👍 Haan, Samasya Solve Hui" via interactive two-way SMS feedback.',
      },
      {
        title: 'Resolved',
        titleHi: 'समाधान पूर्ण एवं सत्यापित',
        date: '08 Sep 2026',
        actor: 'Government of Jharkhand Innovation Portal',
        status: 'completed',
        summary:
          'Full audit closure achieved. Digital resolution certificate issued.',
      },
    ],
  },
  {
    problemId: 'JH-1088',
    category: 'Solar Energy & Cold Storage',
    categoryHi: 'सौर ऊर्जा एवं कोल्ड स्टोरेज',
    district: 'Bokaro',
    districtHi: 'बोकारो',
    block: 'Petarwar',
    locationAnonymized: 'Kachha Tola Vegetable Farmers Co-operative',
    status: 'Resolved ✅',
    statusType: 'resolved',
    title: 'Off-Grid Solar Cold Room for Smallholder Farmers',
    titleHi: 'छोटे किसानों के लिए सौर ऊर्जा चालित माइक्रो कोल्ड स्टोरेज',
    problemDescription:
      'Marginal tribal farmers suffered post-harvest losses up to 35% for tomatoes and leafy greens due to lack of grid power and affordable localized cold storage facilities.',
    adoptedBy: 'KisanUrja Innovators',
    college: 'Birla Institute of Technology (BIT) Sindri',
    csrSupport: '₹1,20,000',
    csrPartnerName: 'SAIL Bokaro Steel Plant CSR Initiative',
    projectProgress: 100,
    deployment: 'Completed',
    citizenVerification: 'Verified',
    citizensBenefited: 215,
    ipStatus: 'Patent Filed',
    ipDetails: {
      governingAgreement:
        'Tripartite Joint Development Agreement between BIT Sindri IPR Cell and SAIL CSR R&D.',
      filingRef: 'Indian Patent Application #20263104921A',
      assigneeNotes:
        'Patent filed for "Phase Change Material (PCM) Thermal Battery with Direct-DC Solar Compressor for Modular Cold Rooms".',
      commercialRights:
        'Free perpetual non-exclusive community operating license granted to Petarwar Farmer Producers Organization (FPO).',
    },
    beforePhotoUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    testingReportSummary:
      'Maintained continuous 4°C to 8°C internal temperature across 72-hour overcast spell using PCM thermal storage without diesel backup.',
    panchayatAuditCertificate: 'JH-BKR-PAN-2026-0312',
    timeline: [
      {
        title: 'Reported',
        titleHi: 'समस्या दर्ज',
        date: '02 Jun 2026',
        actor: 'FPO Representative (Anonymized)',
        status: 'completed',
        summary: 'Reported 35% crop spoilage during peak harvest.',
      },
      {
        title: 'AI Categorized',
        titleHi: 'एआई वर्गीकरण',
        date: '02 Jun 2026',
        actor: 'State AI Triage',
        status: 'completed',
        summary: 'Tagged under Agriculture & Renewable Energy, High Priority.',
      },
      {
        title: 'Admin Verified',
        titleHi: 'प्रशासनिक सत्यापन',
        date: '08 Jun 2026',
        actor: 'District Agriculture Officer, Bokaro',
        status: 'completed',
        summary: 'Site verification conducted at Petarwar mandi node.',
      },
      {
        title: 'Student Team Adopted',
        titleHi: 'छात्र टीम द्वारा अंगीकृत',
        date: '15 Jun 2026',
        actor: 'KisanUrja Innovators (BIT Sindri)',
        status: 'completed',
        summary: 'Adopted as departmental capstone innovation.',
      },
      {
        title: 'CSR Support',
        titleHi: 'सीएसआर अनुदान स्वीकृत',
        date: '24 Jun 2026',
        actor: 'SAIL Bokaro Steel Plant CSR',
        status: 'completed',
        summary: '₹1,20,000 prototype & fabrication grant disbursed.',
      },
      {
        title: 'Prototype Developed',
        titleHi: 'प्रोटोटाइप विकसित',
        date: '18 Jul 2026',
        actor: 'KisanUrja Team',
        status: 'completed',
        summary: 'PCM thermal battery integrated with DC rotary compressor.',
      },
      {
        title: 'Field Deployment',
        titleHi: 'जमीनी अधिष्ठापन',
        date: '04 Aug 2026',
        actor: 'KisanUrja & District Agriculture Dept',
        status: 'completed',
        summary: '2-metric ton solar cold room installed on-site.',
      },
      {
        title: 'Citizen Verification',
        titleHi: 'नागरिक सत्यापन',
        date: '20 Aug 2026',
        actor: '215 Local Vegetable Farmers',
        status: 'completed',
        summary: 'FPO members confirmed zero spoilage over 14 test days.',
      },
      {
        title: 'Resolved',
        titleHi: 'समाधान पूर्ण एवं सत्यापित',
        date: '22 Aug 2026',
        actor: 'Jharkhand Innovation Council',
        status: 'completed',
        summary: 'Commissioned and handed over to local panchayat FPO.',
      },
    ],
  },
  {
    problemId: 'JH-1015',
    category: 'Healthcare Infrastructure',
    categoryHi: 'स्वास्थ्य सेवा अवसंरचना',
    district: 'Gumla',
    districtHi: 'गुमला',
    block: 'Bishunpur',
    locationAnonymized: 'Kisko Tola Primary Health Sub-Center',
    status: 'Resolved ✅',
    statusType: 'resolved',
    title: 'Low-Bandwidth Tele-Diagnostics Box for Remote Tribal Subcenter',
    titleHi: 'दूरस्थ उपकेंद्र हेतु कम-बैंडविड्थ टेली-डायग्नोस्टिक्स प्रणाली',
    problemDescription:
      'Auxiliary Nurse Midwives (ANMs) faced difficulties transmitting real-time maternal vitals, ECG, and fetal Doppler audio to district hospital doctors due to unstable 2G/spotty mobile connectivity.',
    adoptedBy: 'SwasthyaBandhu Squad',
    college: 'National Institute of Technology (NIT) Jamshedpur',
    csrSupport: '₹75,000',
    csrPartnerName: 'Usha Martin CSR Healthcare Foundation',
    projectProgress: 100,
    deployment: 'Completed',
    citizenVerification: 'Verified',
    citizensBenefited: 340,
    ipStatus: 'Technology Transfer',
    ipDetails: {
      governingAgreement:
        'Jharkhand State Health Society Tech Transfer Framework (Ref: NRHM-JH-TT-2026-11).',
      filingRef: 'TT-LIC-2026-NITJ-JH04',
      assigneeNotes:
        'Firmware and edge compression algorithm transferred under non-exclusive public license to State Rural Health Mission for pilot expansion to 25 remote sub-centers.',
      commercialRights:
        'Royalty-free public health deployment across all aspirational districts of Jharkhand.',
    },
    beforePhotoUrl:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    afterPhotoUrl:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    testingReportSummary:
      'Transmitted 12-lead ECG and fetal heart sound payloads in <18 KB packets over 28 kbps EDGE network with 99.4% packet delivery rate.',
    panchayatAuditCertificate: 'JH-GML-PAN-2026-0514',
    timeline: [
      {
        title: 'Reported',
        titleHi: 'समस्या दर्ज',
        date: '10 May 2026',
        actor: 'Community Health Worker (Anonymized)',
        status: 'completed',
        summary: 'Reported delayed maternal emergency triage.',
      },
      {
        title: 'AI Categorized',
        titleHi: 'एआई वर्गीकरण',
        date: '10 May 2026',
        actor: 'State Triage Engine',
        status: 'completed',
        summary: 'Classified: Healthcare Infrastructure, Critical.',
      },
      {
        title: 'Admin Verified',
        titleHi: 'प्रशासनिक सत्यापन',
        date: '14 May 2026',
        actor: 'Civil Surgeon Office, Gumla',
        status: 'completed',
        summary: 'Verified remote sub-center connectivity challenge.',
      },
      {
        title: 'Student Team Adopted',
        titleHi: 'छात्र टीम द्वारा अंगीकृत',
        date: '22 May 2026',
        actor: 'SwasthyaBandhu Squad (NIT Jamshedpur)',
        status: 'completed',
        summary: 'Adopted by Electronics & Biomedical students.',
      },
      {
        title: 'CSR Support',
        titleHi: 'सीएसआर अनुदान स्वीकृत',
        date: '01 Jun 2026',
        actor: 'Usha Martin Foundation',
        status: 'completed',
        summary: '₹75,000 fabrication grant sanctioned.',
      },
      {
        title: 'Prototype Developed',
        titleHi: 'प्रोटोटाइप विकसित',
        date: '28 Jun 2026',
        actor: 'SwasthyaBandhu Squad',
        status: 'completed',
        summary: 'Edge audio & ECG compression box assembled.',
      },
      {
        title: 'Field Deployment',
        titleHi: 'जमीनी अधिष्ठापन',
        date: '15 Jul 2026',
        actor: 'Team & Bishunpur PHC Medical Officer',
        status: 'completed',
        summary: 'Diagnostic box delivered to Kisko Sub-Center ANM.',
      },
      {
        title: 'Citizen Verification',
        titleHi: 'नागरिक सत्यापन',
        date: '02 Aug 2026',
        actor: '340 Expectant Mothers & Villagers',
        status: 'completed',
        summary: 'Community verified rapid triage response.',
      },
      {
        title: 'Resolved',
        titleHi: 'समाधान पूर्ण एवं सत्यापित',
        date: '05 Aug 2026',
        actor: 'Department of Health, Govt of Jharkhand',
        status: 'completed',
        summary: 'Integrated into district maternal health roster.',
      },
    ],
  },
];

export const SocialAudit: React.FC = () => {
  const { language, addNotification } = useApp();

  // Search & Filter State
  const [selectedRecordId, setSelectedRecordId] = useState<string>('JH-1042');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrictFilter, setSelectedDistrictFilter] =
    useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>('all');

  // Interactive IP Status Explorer
  const [customIPStatus, setCustomIPStatus] = useState<IPStatus | null>(null);

  // Certificate / Report Modal
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);

  // Active Selected Record
  const activeRecord =
    PUBLIC_AUDIT_RECORDS.find((r) => r.problemId === selectedRecordId) ||
    PUBLIC_AUDIT_RECORDS[0];

  // Current effective IP status (allows testing/exploring the 4 possible IP statuses requested by user)
  const currentIPStatus: IPStatus = customIPStatus || activeRecord.ipStatus;

  // Filtered list
  const filteredRecords = PUBLIC_AUDIT_RECORDS.filter((rec) => {
    const matchSearch =
      rec.problemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.adoptedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDistrict =
      selectedDistrictFilter === 'all' ||
      rec.district.toLowerCase() === selectedDistrictFilter.toLowerCase();
    const matchCategory =
      selectedCategoryFilter === 'all' ||
      rec.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
    return matchSearch && matchDistrict && matchCategory;
  });

  // Export / Print Handler
  const handleExportSummary = () => {
    addNotification({
      title: 'पारदर्शिता रिपोर्ट डाउनलोड (Audit Sheet Exported)',
      message: `समस्या ${activeRecord.problemId} की सामाजिक ऑडिट समरी पीडीएफ डाउनलोड प्रारंभ की गई।`,
      type: 'info',
    });
    setCertModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER: "Social Audit & Transparency" */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm border-b-4 border-teal-500 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Public Accountability & Civic Ledger</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Social Audit & Transparency
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Citizens should be able to understand what happened to reported problems without exposing unnecessary personal information. Track the journey from citizen report to verified ground resolution.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSummary}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs font-bold"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export Audit Summary
            </Button>
            <Link to="/ground-deployment">
              <Button
                variant="primary"
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Ground Deployment Page
              </Button>
            </Link>
          </div>
        </div>

        {/* PRIVACY CHARTER NOTICE */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="text-white font-bold">Privacy Protection Guard: </strong>
              <span>
                In accordance with state civic privacy norms, citizen mobile numbers, OTPs, and private identifying records are strictly redacted from all public audit ledgers.
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[11px] font-mono font-semibold shrink-0">
            <Lock className="w-3 h-3 text-emerald-400" />
            Zero PII Disclosed • No Phone Numbers • No OTPs
          </div>
        </div>
      </div>

      {/* QUICK RECORD SELECTOR TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Select Public Record:
          </span>
          {PUBLIC_AUDIT_RECORDS.map((rec) => (
            <button
              key={rec.problemId}
              type="button"
              onClick={() => {
                setSelectedRecordId(rec.problemId);
                setCustomIPStatus(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                selectedRecordId === rec.problemId
                  ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs ring-2 ring-teal-500/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{rec.problemId}</span>
              <span className="text-[11px] font-sans font-medium text-slate-400">
                ({rec.district})
              </span>
              {rec.problemId === 'JH-1042' && (
                <span className="text-[10px] bg-teal-600 text-white font-sans px-1.5 py-0.2 rounded font-bold">
                  Featured
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Global Prototype Demo Data Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Prototype Demo Data</span>
        </div>
      </div>

      {/* 2. PRIMARY PUBLIC PROBLEM RECORD (FEATURED: JH-1042) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* Record Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-black bg-slate-900 text-amber-300 px-3 py-1 rounded-lg">
                Problem ID: {activeRecord.problemId}
              </span>
              <span className="text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
                Category: {activeRecord.category}
              </span>
              <span className="text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-600" />
                District: {activeRecord.district}
              </span>
              <span className="text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Status: {activeRecord.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {activeRecord.title}
              </h2>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Location: {activeRecord.locationAnonymized}, Block: {activeRecord.block}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {activeRecord.problemDescription}
            </p>
          </div>

          {/* Quick Actions & Privacy Indicator */}
          <div className="lg:w-72 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 shrink-0 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Public Audit Dossier</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                Audited
              </span>
            </div>

            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Citizen Privacy:</span>
                <strong className="text-emerald-700 font-semibold">Redacted / Safe</strong>
              </div>
              <div className="flex justify-between">
                <span>Gram Panchayat Sign-off:</span>
                <strong className="text-slate-900 font-mono text-[11px]">
                  {activeRecord.panchayatAuditCertificate}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Verification Method:</span>
                <strong className="text-slate-900">Interactive SMS Audit</strong>
              </div>
            </div>

            <Link to="/ground-deployment" className="block pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold text-teal-800 bg-white"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Inspect Deployment Proofs
              </Button>
            </Link>
          </div>
        </div>

        {/* 3. SHOW METRICS & KEY INFORMATION CARDS */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Project & Deployment Accountability Parameters:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Adopted By */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Adopted By:</span>
              </div>
              <strong className="text-slate-900 text-sm font-black block">
                {activeRecord.adoptedBy}
              </strong>
              <span className="text-[11px] text-slate-500">Student Innovation Team</span>
            </div>

            {/* College */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>College:</span>
              </div>
              <strong className="text-slate-900 text-sm font-black block truncate" title={activeRecord.college}>
                {activeRecord.college}
              </strong>
              <span className="text-[11px] text-slate-500">Academic Institution</span>
            </div>

            {/* CSR Support */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-purple-600" />
                <span>CSR Support:</span>
              </div>
              <strong className="text-purple-900 text-sm font-black block">
                {activeRecord.csrSupport}
              </strong>
              <span className="text-[11px] text-slate-500 truncate block" title={activeRecord.csrPartnerName}>
                {activeRecord.csrPartnerName}
              </span>
            </div>

            {/* Project Progress */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
                <span>Project Progress:</span>
                <span className="font-bold text-emerald-700">{activeRecord.projectProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeRecord.projectProgress}%` }}
                />
              </div>
              <strong className="text-emerald-800 text-xs font-bold block">
                Milestones Fulfilled (100%)
              </strong>
            </div>

            {/* Deployment */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                <span>Deployment:</span>
              </div>
              <strong className="text-teal-900 text-sm font-black block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                {activeRecord.deployment}
              </strong>
              <span className="text-[11px] text-slate-500">Commissioned On-Site</span>
            </div>

            {/* Citizen Verification */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Citizen Verification:</span>
              </div>
              <strong className="text-emerald-700 text-sm font-black block flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {activeRecord.citizenVerification}
              </strong>
              <span className="text-[11px] text-slate-500">Two-Way SMS Sign-off</span>
            </div>
          </div>
        </div>

        {/* 4. IMPACT PANEL */}
        <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-slate-50 rounded-2xl border border-emerald-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Audited Social Impact</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Ground Transformation & Beneficiary Reach
              </h3>
            </div>

            {/* User Request Required Tag: "Prototype Demo Data" */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Prototype Demo Data</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Citizens Benefited Card */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Citizens Benefited:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-700">
                {activeRecord.citizensBenefited}
              </div>
              <span className="text-xs text-slate-600 block">
                Verified rural residents with daily access to safe potable water.
              </span>
              <div className="pt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
                <span>Source:</span>
                <span className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Prototype Demo Data
                </span>
              </div>
            </div>

            {/* Quality Standard */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Technical Quality Assay:
              </span>
              <div className="text-xl font-black text-slate-900">
                BIS 10500:2012 Cleared
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeRecord.testingReportSummary}
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Departmental Water Testing Lab</span>
              </div>
            </div>

            {/* Community Endorsement */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Gram Sabha Social Audit:
              </span>
              <div className="text-xl font-black text-slate-900">
                100% Satisfaction
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gram Panchayat executive meeting resolution passed. Local youth trained for preventive bio-sand maintenance.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <span>Resolution Certificate:</span>
                <span className="font-mono text-slate-900">{activeRecord.panchayatAuditCertificate}</span>
              </div>
            </div>
          </div>

          {/* Visual Proof Comparison */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>Public Photographic Evidence (Side-by-Side Audit):</span>
              <span className="text-[11px] text-slate-500 font-normal">
                Field photos uploaded by civic inspection team
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-rose-200 bg-rose-50/20 relative group">
                <div className="aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={activeRecord.beforePhotoUrl}
                    alt="Before deployment condition"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 text-xs bg-white border-t border-rose-100 flex items-center justify-between">
                  <span className="font-bold text-rose-700">Before Intervention: Contaminated Baseline</span>
                  <span className="text-[11px] text-slate-500">Turbidity: 24.8 NTU</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50/20 relative group">
                <div className="aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={activeRecord.afterPhotoUrl}
                    alt="After deployment condition"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 text-xs bg-white border-t border-emerald-100 flex items-center justify-between">
                  <span className="font-bold text-emerald-700">After Resolution: Deployed & Commissioned</span>
                  <span className="text-[11px] text-slate-500">Turbidity: 1.2 NTU</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 10-STEP TIMELINE WITH DOWNWARD ARROWS */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Governance Lifecycle Audit
            </div>
            <h3 className="text-xl font-black text-slate-900">
              End-to-End Problem Resolution Timeline
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Transparent, chronological audit trail tracking each handoff from citizen inception to final social closure.
            </p>
          </div>

          {/* Timeline Cards with Downward Arrows (↓) */}
          <div className="space-y-2.5 max-w-4xl mx-auto py-2">
            {activeRecord.timeline.map((step, idx) => {
              const isLast = idx === activeRecord.timeline.length - 1;
              return (
                <React.Fragment key={step.title}>
                  <div className="bg-slate-50 hover:bg-slate-100/80 transition-all rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      {/* Step Number Circle */}
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-slate-900">
                            {step.title}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium">
                            ({step.titleHi})
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Completed
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                          {step.summary}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/80 text-xs">
                      <div className="font-semibold text-slate-900 flex items-center sm:justify-end gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{step.date}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Actor: {step.actor}
                      </div>
                    </div>
                  </div>

                  {/* Downward Arrow (↓) between steps */}
                  {!isLast && (
                    <div className="flex justify-center my-0.5">
                      <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-black text-sm shadow-2xs">
                        ↓
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 6. IP SECTION: "IP / Patent Status" */}
        <div className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/40 via-white to-slate-50 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-700" />
                <span>Intellectual Property Governance</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                IP / Patent Status
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Documenting innovation ownership, student invention credits, and commercialization licensing in strict adherence with university and state frameworks.
              </p>
            </div>

            <div className="shrink-0">
              <span className="text-xs text-slate-500 font-bold block mb-1">
                Current Registered IP Status:
              </span>
              <div className="px-4 py-2 rounded-2xl bg-purple-900 text-white font-black text-sm flex items-center gap-2 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{currentIPStatus}</span>
              </div>
            </div>
          </div>

          {/* CRITICAL POLICY NOTICE REQUIRED BY USER SPEC */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 flex items-start gap-3 text-xs text-amber-950">
            <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold text-amber-900 block">
                Official IP Ownership & Governance Mandate:
              </strong>
              <p className="leading-relaxed">
                The Government of Jharkhand societal innovation platform does{' '}
                <strong>NOT</strong> automatically claim ownership or patent rights over student inventions. All intellectual property ownership, patent filings, and subsequent commercialization are strictly governed by bilateral or tripartite agreements established between the student inventors, participating college/university IPR cells, and CSR/industry funding partners.
              </p>
            </div>
          </div>

          {/* Interactive Selector to view the 4 possible IP statuses */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700">
              Explore IP Status Classifications:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  'No IP Filed',
                  'Under Evaluation',
                  'Patent Filed',
                  'Technology Transfer',
                ] as IPStatus[]
              ).map((statusOption) => {
                const isSelected = currentIPStatus === statusOption;
                return (
                  <button
                    key={statusOption}
                    type="button"
                    onClick={() => setCustomIPStatus(statusOption)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-100/60 ring-2 ring-purple-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      {isSelected && (
                        <span className="text-[10px] font-bold text-purple-800 bg-purple-200 px-1.5 py-0.2 rounded">
                          Active View
                        </span>
                      )}
                    </div>
                    <strong className="text-xs font-bold text-slate-900 block">
                      {statusOption}
                    </strong>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      {statusOption === 'No IP Filed'
                        ? 'Open public design domain'
                        : statusOption === 'Under Evaluation'
                        ? 'Institutional IPR cell review'
                        : statusOption === 'Patent Filed'
                        ? 'Provisional/Complete patent pending'
                        : 'Transferred to public agency / licensee'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Status Governance Breakdown */}
          <div className="p-5 rounded-2xl bg-white border border-purple-200 space-y-4 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-slate-500 font-semibold block">
                  Status Case Summary:
                </span>
                <strong className="text-base font-bold text-purple-950">
                  {currentIPStatus} — {activeRecord.adoptedBy} ({activeRecord.college})
                </strong>
              </div>
              <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                Ref: {activeRecord.ipDetails.filingRef || 'N/A'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">Governing Agreement:</span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {activeRecord.ipDetails.governingAgreement}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">IPR Cell & Assignee Terms:</span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {currentIPStatus === 'No IP Filed'
                    ? 'Solution released under open hardware public good license for unhindered reproduction by panchayats.'
                    : currentIPStatus === 'Under Evaluation'
                    ? activeRecord.ipDetails.assigneeNotes
                    : currentIPStatus === 'Patent Filed'
                    ? 'Inventorship credited 100% to student team. R.D. Engineering College designated as institutional applicant.'
                    : 'Licensed non-exclusively to State Drinking Water Department for district-wide rollout.'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">Public & Commercial Rights:</span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {activeRecord.ipDetails.commercialRights}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. ALL PUBLIC AUDIT RECORDS SEARCH & BROWSER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Public Ledger Explorer
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Search All Verified Civic Problem Audits
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore public dossiers across all Jharkhand districts with complete privacy redaction.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Total Public Audit Records: {PUBLIC_AUDIT_RECORDS.length}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Problem ID, district, or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="relative">
            <select
              value={selectedDistrictFilter}
              onChange={(e) => setSelectedDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
            >
              <option value="all">All Districts (सभी जिले)</option>
              <option value="Khunti">Khunti (खूंटी)</option>
              <option value="Bokaro">Bokaro (बोकारो)</option>
              <option value="Gumla">Gumla (गुमला)</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
            >
              <option value="all">All Categories (सभी श्रेणियाँ)</option>
              <option value="Water">Water Supply</option>
              <option value="Solar">Solar Energy & Cold Storage</option>
              <option value="Healthcare">Healthcare Infrastructure</option>
            </select>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Problem ID</th>
                <th className="py-3 px-4">Problem & Category</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Adopted By / College</th>
                <th className="py-3 px-4">CSR Grant</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">IP / Patent Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => (
                <tr
                  key={rec.problemId}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    rec.problemId === selectedRecordId ? 'bg-teal-50/40 font-medium' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {rec.problemId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{rec.title}</div>
                    <div className="text-[11px] text-slate-500">{rec.category}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800">{rec.district}</span>
                    <div className="text-[11px] text-slate-400">{rec.block}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-purple-900">{rec.adoptedBy}</div>
                    <div className="text-[11px] text-slate-500">{rec.college}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900">{rec.csrSupport}</span>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                      {rec.csrPartnerName}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 text-[11px]">
                      {rec.ipStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecordId(rec.problemId);
                        setCustomIPStatus(null);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded bg-slate-900 text-white hover:bg-slate-800 font-semibold text-[11px]"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. CERTIFICATE & AUDIT SHEET MODAL */}
      <Modal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        title={`Social Audit Certificate — ${activeRecord.problemId}`}
        size="lg"
      >
        <div className="space-y-5 text-xs text-slate-700">
          <div className="border-4 border-double border-teal-700 p-6 rounded-2xl bg-gradient-to-b from-amber-50/20 via-white to-teal-50/20 space-y-4">
            <div className="text-center space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-teal-800">
                Government of Jharkhand • Societal Innovation Exchange
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Official Social Audit Completion Certificate
              </h3>
              <div className="font-mono text-xs text-slate-500">
                Resolution Number: {activeRecord.panchayatAuditCertificate}
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-3 space-y-2">
              <div className="flex justify-between">
                <span>Problem ID:</span>
                <strong className="font-mono text-slate-900">{activeRecord.problemId}</strong>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <strong className="text-slate-900">{activeRecord.category}</strong>
              </div>
              <div className="flex justify-between">
                <span>District & Block:</span>
                <strong className="text-slate-900">
                  {activeRecord.district} ({activeRecord.block})
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Student Engineering Team:</span>
                <strong className="text-purple-900">{activeRecord.adoptedBy}</strong>
              </div>
              <div className="flex justify-between">
                <span>Institution:</span>
                <strong className="text-slate-900">{activeRecord.college}</strong>
              </div>
              <div className="flex justify-between">
                <span>CSR Grant Allocation:</span>
                <strong className="text-slate-900">{activeRecord.csrSupport} ({activeRecord.csrPartnerName})</strong>
              </div>
              <div className="flex justify-between">
                <span>Verified Beneficiaries:</span>
                <strong className="text-emerald-700">{activeRecord.citizensBenefited} Citizens</strong>
              </div>
              <div className="flex justify-between">
                <span>IP / Patent Status:</span>
                <strong className="text-purple-900">{currentIPStatus}</strong>
              </div>
            </div>

            <div className="text-[11px] leading-relaxed text-slate-600">
              Certified that the reported civic challenge has undergone formal field deployment and two-way citizen SMS satisfaction verification. In accordance with platform privacy regulations, no citizen phone numbers or OTPs are recorded on public certificates.
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-center">
              <div>
                <div className="font-bold text-slate-900">Dr. Amit Sinha, IAS</div>
                <div className="text-[10px] text-slate-500">Additional District Magistrate</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Er. Birendra Toppo</div>
                <div className="text-[10px] text-slate-500">Junior Engineer, DWSD Khunti</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCertModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold"
              onClick={() => {
                alert('Downloading signed Public Audit Certificate PDF...');
                setCertModalOpen(false);
              }}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
