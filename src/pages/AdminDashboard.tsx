import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { TextInput, TextArea, SelectInput } from '../components/common/FormFields';
import { Problem, PlatformStage } from '../types';
import { JHARKHAND_CATEGORIES } from '../data/jharkhandData';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  Building2,
  FileCheck,
  Eye,
  MapPin,
  Clock,
  User,
  ThumbsUp,
  ArrowRight,
  X,
  HelpCircle,
  RotateCcw,
  Check,
  ExternalLink,
  Layers,
  Activity,
  ChevronRight,
  Info,
  Radio,
  FileText,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

// Demo Heatmap Data for Jharkhand Districts
interface DistrictHeatmapData {
  id: string;
  nameEn: string;
  nameHi: string;
  status: 'RESOLVED' | 'IN_PROGRESS' | 'OPEN';
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
  featuredIssue: string;
}

const DISTRICT_HEATMAP_DATA: DistrictHeatmapData[] = [
  {
    id: 'khunti',
    nameEn: 'Khunti District',
    nameHi: 'खूंटी जिला',
    status: 'OPEN',
    openCount: 12,
    inProgressCount: 3,
    resolvedCount: 4,
    featuredIssue: 'Community handpump dysfunctional & solar microgrid fault',
  },
  {
    id: 'ranchi',
    nameEn: 'Ranchi',
    nameHi: 'राँची',
    status: 'IN_PROGRESS',
    openCount: 8,
    inProgressCount: 14,
    resolvedCount: 19,
    featuredIssue: 'Angara solar water filtration pilot deployment',
  },
  {
    id: 'dumka',
    nameEn: 'Dumka',
    nameHi: 'दुमका',
    status: 'OPEN',
    openCount: 16,
    inProgressCount: 5,
    resolvedCount: 8,
    featuredIssue: 'Solar irrigation pump inverter breakdown',
  },
  {
    id: 'dhanbad',
    nameEn: 'Dhanbad',
    nameHi: 'धनबाद',
    status: 'IN_PROGRESS',
    openCount: 11,
    inProgressCount: 12,
    resolvedCount: 15,
    featuredIssue: 'Coal dust mist cannon prototype with BIT Sindri',
  },
  {
    id: 'east_singhbhum',
    nameEn: 'East Singhbhum',
    nameHi: 'पूर्वी सिंहभूम',
    status: 'RESOLVED',
    openCount: 4,
    inProgressCount: 8,
    resolvedCount: 21,
    featuredIssue: 'Subarnarekha catchment IoT flood telemetry',
  },
  {
    id: 'bokaro',
    nameEn: 'Bokaro',
    nameHi: 'बोकारो',
    status: 'IN_PROGRESS',
    openCount: 7,
    inProgressCount: 6,
    resolvedCount: 11,
    featuredIssue: 'Fly-ash lightweight rural paving tiles',
  },
  {
    id: 'hazaribagh',
    nameEn: 'Hazaribagh',
    nameHi: 'हजारीबाग',
    status: 'RESOLVED',
    openCount: 3,
    inProgressCount: 4,
    resolvedCount: 16,
    featuredIssue: 'Vegetable farmer solar cold micro-storage',
  },
  {
    id: 'west_singhbhum',
    nameEn: 'West Singhbhum',
    nameHi: 'पश्चिमी सिंहभूम',
    status: 'OPEN',
    openCount: 19,
    inProgressCount: 4,
    resolvedCount: 6,
    featuredIssue: 'Saranda forest produce solar drying poly-house',
  },
  {
    id: 'deoghar',
    nameEn: 'Deoghar',
    nameHi: 'देवघर',
    status: 'RESOLVED',
    openCount: 2,
    inProgressCount: 7,
    resolvedCount: 18,
    featuredIssue: 'Shravani Mela smart bio-toilet management',
  },
  {
    id: 'palamu',
    nameEn: 'Palamu',
    nameHi: 'पलामू',
    status: 'OPEN',
    openCount: 24,
    inProgressCount: 6,
    resolvedCount: 9,
    featuredIssue: 'Drought-prone check dam desiltation monitoring',
  },
  {
    id: 'gumla',
    nameEn: 'Gumla',
    nameHi: 'गुमला',
    status: 'IN_PROGRESS',
    openCount: 6,
    inProgressCount: 5,
    resolvedCount: 7,
    featuredIssue: 'Ragi millet solar mechanical de-husker',
  },
  {
    id: 'simdega',
    nameEn: 'Simdega',
    nameHi: 'सिमडेगा',
    status: 'RESOLVED',
    openCount: 1,
    inProgressCount: 3,
    resolvedCount: 12,
    featuredIssue: 'Rural hockey field high-mast solar illumination',
  },
];

export const AdminDashboard: React.FC = () => {
  const { problems, updateProblemStage, addNotification, resetProblems } = useApp();

  // District filter - Default to Khunti District as requested
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Khunti');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Track dynamic admin statuses locally (e.g. "More Info Requested", "Rejected", "Verified & Open for College Adoption")
  const [adminStatusOverrides, setAdminStatusOverrides] = useState<Record<string, string>>({});
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({});

  // Modals state
  const [detailModalProblem, setDetailModalProblem] = useState<Problem | null>(null);
  const [moreInfoProblem, setMoreInfoProblem] = useState<Problem | null>(null);
  const [infoRequestText, setInfoRequestText] = useState('');
  const [rejectProblem, setRejectProblem] = useState<Problem | null>(null);
  const [rejectReason, setRejectReason] = useState('duplicate');
  const [rejectNotes, setRejectNotes] = useState('');

  // Officer Verification Modal
  const [verifyModalProblem, setVerifyModalProblem] = useState<Problem | null>(null);
  const [officerName, setOfficerName] = useState('Dr. Amit Sinha, IAS');
  const [designation, setDesignation] = useState('Sub-Divisional Officer (SDO), Khunti');
  const [assignedDept, setAssignedDept] = useState('Drinking Water & Sanitation Department (DWSD)');
  const [estimatedBudget, setEstimatedBudget] = useState('150000');
  const [officerNotes, setOfficerNotes] = useState('Technical scope verified. Eligible for college innovation challenge.');

  // Helper to determine the effective verification status of a problem
  const getProblemVerificationStatus = (p: Problem): { label: string; badgeClass: string; isPending: boolean } => {
    if (adminStatusOverrides[p.id]) {
      const override = adminStatusOverrides[p.id];
      if (override === 'Verified & Open for College Adoption') {
        return {
          label: 'Verified & Open for College Adoption',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          isPending: false,
        };
      }
      if (override === 'More Info Requested') {
        return {
          label: 'More Info Requested (अतिरिक्त जानकारी मांगी)',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
          isPending: true,
        };
      }
      if (override === 'Rejected') {
        return {
          label: 'Rejected (अस्वीकृत)',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          isPending: false,
        };
      }
    }

    if (p.currentStage === 'REPORTED' || p.currentStage === 'AI_PROCESSED') {
      return {
        label: 'Pending Admin Verification',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        isPending: true,
      };
    }

    if (p.currentStage === 'ADMIN_VERIFIED' || p.currentStage === 'CHALLENGE_PUBLISHED') {
      return {
        label: 'Verified & Open for College Adoption',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        isPending: false,
      };
    }

    if (
      ['STUDENT_ADOPTED', 'CSR_FUNDED', 'IN_DEVELOPMENT', 'GROUND_DEPLOYED', 'CITIZEN_AUDIT'].includes(
        p.currentStage
      )
    ) {
      return {
        label: 'In Progress (समाधान विकास जारी)',
        badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
        isPending: false,
      };
    }

    if (p.currentStage === 'RESOLVED') {
      return {
        label: 'Resolved & Audited (समाधान पूर्ण)',
        badgeClass: 'bg-green-100 text-green-900 border-green-300',
        isPending: false,
      };
    }

    return {
      label: 'Pending Admin Verification',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      isPending: true,
    };
  };

  // Filter problems by district, search, category, and status
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // District filter
      if (selectedDistrict !== 'ALL') {
        const matchesDistrict =
          p.district.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
          (p.districtHi && p.districtHi.includes(selectedDistrict));
        if (!matchesDistrict) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(q) ||
          p.trackingCode.toLowerCase().includes(q) ||
          p.block.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter !== 'ALL' && p.category !== categoryFilter) {
        return false;
      }

      // Status filter
      const statusInfo = getProblemVerificationStatus(p);
      if (statusFilter === 'PENDING') {
        return statusInfo.isPending;
      }
      if (statusFilter === 'VERIFIED') {
        return statusInfo.label === 'Verified & Open for College Adoption';
      }
      if (statusFilter === 'IN_PROGRESS') {
        return ['STUDENT_ADOPTED', 'CSR_FUNDED', 'IN_DEVELOPMENT', 'GROUND_DEPLOYED', 'CITIZEN_AUDIT'].includes(
          p.currentStage
        );
      }
      if (statusFilter === 'RESOLVED') {
        return p.currentStage === 'RESOLVED';
      }

      return true;
    });
  }, [problems, selectedDistrict, searchQuery, categoryFilter, statusFilter, adminStatusOverrides]);

  // Calculate 5 Top KPIs dynamically
  const kpiStats = useMemo(() => {
    const districtScope =
      selectedDistrict === 'ALL'
        ? problems
        : problems.filter((p) =>
            p.district.toLowerCase().includes(selectedDistrict.toLowerCase())
          );

    const newProblemsCount = districtScope.filter(
      (p) => p.currentStage === 'REPORTED' || p.currentStage === 'AI_PROCESSED'
    ).length;

    const pendingVerificationCount = districtScope.filter((p) => {
      const info = getProblemVerificationStatus(p);
      return info.isPending;
    }).length;

    const verifiedProblemsCount = districtScope.filter((p) => {
      const info = getProblemVerificationStatus(p);
      return info.label === 'Verified & Open for College Adoption';
    }).length;

    const inProgressCount = districtScope.filter((p) =>
      ['STUDENT_ADOPTED', 'CSR_FUNDED', 'IN_DEVELOPMENT', 'GROUND_DEPLOYED', 'CITIZEN_AUDIT'].includes(
        p.currentStage
      )
    ).length;

    const resolvedCount = districtScope.filter((p) => p.currentStage === 'RESOLVED').length;

    return {
      newProblems: newProblemsCount,
      pendingVerification: pendingVerificationCount,
      verifiedProblems: verifiedProblemsCount,
      inProgress: inProgressCount,
      resolved: resolvedCount,
    };
  }, [problems, selectedDistrict, adminStatusOverrides]);

  // Handler: Verify problem directly or open verify dialog
  const handleVerifyDirect = (problem: Problem) => {
    setAdminStatusOverrides((prev) => ({
      ...prev,
      [problem.id]: 'Verified & Open for College Adoption',
    }));

    updateProblemStage(problem.id, 'CHALLENGE_PUBLISHED', {
      adminVerification: {
        verifiedBy: officerName,
        officerDesignation: designation,
        departmentAssigned: assignedDept,
        adminNotes: 'Field verified by district administration. Eligible for college adoption.',
        verifiedAt: new Date().toISOString(),
        challengeEligibility: true,
        estimatedBudgetInr: 150000,
      },
    });

    addNotification({
      title: 'सत्यापन संपन्न (Problem Verified)',
      message: `समस्या ${problem.trackingCode} को "Verified & Open for College Adoption" के रूप में स्वीकृत किया गया।`,
      type: 'success',
      trackingCode: problem.trackingCode,
    });
  };

  // Handler: Request More Information
  const handleConfirmMoreInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moreInfoProblem) return;

    setAdminStatusOverrides((prev) => ({
      ...prev,
      [moreInfoProblem.id]: 'More Info Requested',
    }));

    setActionNotes((prev) => ({
      ...prev,
      [moreInfoProblem.id]: infoRequestText || 'अतिरिक्त स्पष्टीकरण व लैंडमार्क फोटो अपेक्षित है।',
    }));

    addNotification({
      title: 'नागरिक से जानकारी मांगी गई',
      message: `शिकायत ${moreInfoProblem.trackingCode} पर नागरिक को एसएमएस सूचना प्रेषित की गई।`,
      type: 'warning',
      trackingCode: moreInfoProblem.trackingCode,
    });

    setMoreInfoProblem(null);
    setInfoRequestText('');
  };

  // Handler: Reject
  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectProblem) return;

    setAdminStatusOverrides((prev) => ({
      ...prev,
      [rejectProblem.id]: 'Rejected',
    }));

    setActionNotes((prev) => ({
      ...prev,
      [rejectProblem.id]: `अस्वीकृत: ${rejectReason} - ${rejectNotes}`,
    }));

    addNotification({
      title: 'समस्या अस्वीकृत की गई',
      message: `शिकायत ${rejectProblem.trackingCode} को प्रशासनिक समीक्षा उपरांत बंद किया गया।`,
      type: 'alert',
      trackingCode: rejectProblem.trackingCode,
    });

    setRejectProblem(null);
    setRejectNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ========================================================================= */}
        {/* 1. DASHBOARD HEADER */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-b-4 border-emerald-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>झारखंड सरकार • समाधान प्रशासनिक कंसोल</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              District Administration Dashboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              नागरिक जनसमस्याओं का सत्यापन, एआई छंटाई समीक्षा, तकनीकी प्राथमिकता निर्धारण एवं इंजीनियरिंग संस्थानों व सीएसआर हेतु चुनौती अनुमोदन।
            </p>
          </div>

          {/* Demo District Selector & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            {/* Demo District Indicator & Switcher */}
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>सक्रिय जिला (Demo District)</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-900/90 text-white font-black text-sm px-3 py-1.5 rounded-xl border border-white/30 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              >
                <option value="Khunti">Khunti District (खूंटी - Demo)</option>
                <option value="Ranchi">Ranchi (राँची)</option>
                <option value="Dumka">Dumka (दुमका)</option>
                <option value="Dhanbad">Dhanbad (धनबाद)</option>
                <option value="East Singhbhum">East Singhbhum (जमशेदपुर)</option>
                <option value="Bokaro">Bokaro (बोकारो)</option>
                <option value="Hazaribagh">Hazaribagh (हजारीबाग)</option>
                <option value="West Singhbhum">West Singhbhum (चाईबासा)</option>
                <option value="ALL">All Districts (समस्त झारखंड)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={resetProblems}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              title="Reset sample problems to initial state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट डेटा</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP KPI CARDS (Exact 5 cards requested) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* KPI 1: New Problems */}
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
              statusFilter === 'ALL'
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
              <span>New Problems</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {kpiStats.newProblems}
            </div>
            <span className="text-[11px] text-blue-700 font-semibold block mt-1">
              नई प्राप्त शिकायतें
            </span>
          </button>

          {/* KPI 2: Pending Verification */}
          <button
            type="button"
            onClick={() => setStatusFilter('PENDING')}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
              statusFilter === 'PENDING'
                ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-1">
              <span>Pending Verification</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
              {kpiStats.pendingVerification}
            </div>
            <span className="text-[11px] text-amber-800 font-semibold block mt-1">
              सत्यापन हेतु लंबित
            </span>
          </button>

          {/* KPI 3: Verified Problems */}
          <button
            type="button"
            onClick={() => setStatusFilter('VERIFIED')}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
              statusFilter === 'VERIFIED'
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1">
              <span>Verified Problems</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              {kpiStats.verifiedProblems}
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold block mt-1">
              स्वीकृत तकनीकी चुनौतियां
            </span>
          </button>

          {/* KPI 4: In Progress */}
          <button
            type="button"
            onClick={() => setStatusFilter('IN_PROGRESS')}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
              statusFilter === 'IN_PROGRESS'
                ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-400/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-purple-800 font-bold mb-1">
              <span>In Progress</span>
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-700 font-mono">
              {kpiStats.inProgress}
            </div>
            <span className="text-[11px] text-purple-800 font-semibold block mt-1">
              छात्र/सीएसआर विकास जारी
            </span>
          </button>

          {/* KPI 5: Resolved */}
          <button
            type="button"
            onClick={() => setStatusFilter('RESOLVED')}
            className={`p-4 sm:p-5 rounded-2xl text-left border transition-all col-span-2 lg:col-span-1 ${
              statusFilter === 'RESOLVED'
                ? 'bg-green-50 border-green-400 ring-2 ring-green-400/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-green-900 font-bold mb-1">
              <span>Resolved</span>
              <ShieldCheck className="w-4 h-4 text-green-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-green-800 font-mono">
              {kpiStats.resolved}
            </div>
            <span className="text-[11px] text-green-800 font-semibold block mt-1">
              जमीनी अधिष्ठापन व ऑडिट
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. PROBLEM QUEUE & FILTER CONTROLS */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          {/* Header Bar with Search & Filters */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>District Problem Queue</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                  {filteredProblems.length} Records
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedDistrict === 'ALL'
                  ? 'झारखंड के सभी जिलों की सत्यापन कतार'
                  : `${selectedDistrict} जिले की सक्रिय जनसमस्याएं एवं प्रशासनिक कार्रवाई सूची`}
              </p>
            </div>

            {/* Search & Category Pickers */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="खोजें (Search ID, Village...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Categories (सभी विभाग)</option>
                {JHARKHAND_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameEn}
                  </option>
                ))}
              </select>

              {statusFilter !== 'ALL' && (
                <button
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>फिल्टर हटाएं</span>
                </button>
              )}
            </div>
          </div>

          {/* List of Problem Cards */}
          <div className="p-4 sm:p-6 space-y-4">
            {filteredProblems.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="font-semibold text-sm">इस फिल्टर में कोई समस्या उपलब्ध नहीं है।</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDistrict('ALL');
                    setStatusFilter('ALL');
                    setSearchQuery('');
                    setCategoryFilter('ALL');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  सभी समस्याएं देखें
                </button>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const statusInfo = getProblemVerificationStatus(problem);
                const isHandpumpHighlight =
                  problem.id === 'jh-prb-007' ||
                  problem.title.toLowerCase().includes('handpump') ||
                  problem.trackingCode === 'JH-KHT-2026-0388';

                return (
                  <div
                    key={problem.id}
                    className={`rounded-2xl border p-4 sm:p-6 transition-all space-y-4 ${
                      isHandpumpHighlight
                        ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Problem Card Header: ID, Category, Location, Priority */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Problem ID */}
                        <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-slate-900 text-white shadow-xs">
                          {problem.trackingCode}
                        </span>

                        {/* Category */}
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-bold text-xs flex items-center gap-1">
                          <span>{problem.categoryHi || problem.category}</span>
                          <span className="text-[10px] text-blue-500 font-normal">
                            ({problem.category.replace('_', ' ')})
                          </span>
                        </span>

                        {/* Location */}
                        <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>
                            {problem.district} ({problem.block} Block)
                          </span>
                        </span>

                        {/* Priority */}
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-[11px] uppercase border border-rose-200">
                          🚨 {problem.priority} Priority
                        </span>
                      </div>

                      {/* Verification Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${statusInfo.badgeClass}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {problem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>

                    {/* Metadata Strip: Upvotes, Submitted Date, AI Similarity Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      {/* Upvotes */}
                      <div className="flex items-center gap-1.5 font-semibold text-purple-900">
                        <ThumbsUp className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>
                          <strong>Upvotes:</strong> {problem.votesCount} Citizens Supported
                        </span>
                      </div>

                      {/* Submitted date */}
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>
                          <strong>Submitted:</strong>{' '}
                          {new Date(problem.reportedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* AI Duplicate Status */}
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>
                          <strong>AI Similarity:</strong>{' '}
                          {problem.aiAnalysis?.duplicateDetected ? (
                            <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                              {Math.round((problem.aiAnalysis.duplicateSimilarityScore || 0.87) * 100)}% (Similar Found)
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Unique / No Duplicate
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Admin Action Feedback (if any active note) */}
                    {actionNotes[problem.id] && (
                      <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          <strong>प्रशासनिक टिप्पणी:</strong> {actionNotes[problem.id]}
                        </span>
                      </div>
                    )}

                    {/* ========================================================================= */}
                    {/* 4. ADMIN ACTIONS (View Details, Verify, Request More Info, Reject) */}
                    {/* ========================================================================= */}
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      {/* Button 1: View Details */}
                      <button
                        type="button"
                        onClick={() => setDetailModalProblem(problem)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>View Details (विवरण देखें)</span>
                      </button>

                      {/* Button 2: Request More Information */}
                      <button
                        type="button"
                        onClick={() => {
                          setMoreInfoProblem(problem);
                          setInfoRequestText(
                            `नागरिक महोदय, कृपया ${problem.villageOrWard} स्थित समस्या का नजदीकी लैंडमार्क व स्थल का स्पष्ट फोटो पुनः साझा करें ताकि ब्लॉक टीम तुरंत पहुंच सके।`
                          );
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>Request More Information</span>
                      </button>

                      {/* Button 3: Reject */}
                      <button
                        type="button"
                        onClick={() => {
                          setRejectProblem(problem);
                          setRejectNotes('समान समस्या पूर्व से पंजीकृत है अथवा विभागीय सीमा से परे है।');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <X className="w-3.5 h-3.5 text-rose-600" />
                        <span>Reject</span>
                      </button>

                      {/* Button 4: Verify */}
                      {statusInfo.isPending ? (
                        <button
                          type="button"
                          onClick={() => handleVerifyDirect(problem)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                          <span>Verify (सत्यापित करें)</span>
                        </button>
                      ) : (
                        <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-300">
                          <Check className="w-3.5 h-3.5" />
                          <span>Verified & Open for College Adoption</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. DISTRICT HEATMAP (Jharkhand District Visualization with Demo Statuses) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-700" />
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  Jharkhand District Status Heatmap
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                झारखंड के 24 जिलों में जनसमस्या समाधान एवं नवाचार चुनौतियों की लाइव स्थिति
              </p>
            </div>

            {/* Explicit Prototype Demo Data Disclaimer */}
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                * Prototype Demo Data • Do not imply real government data.
              </span>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              संकेतक (Status Legend):
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
              <span>🟢 Resolved (समाधान पूर्ण)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
              <span>🟡 In Progress (समाधान प्रगति पर)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs" />
              <span>🔴 Open (सत्यापन लंबित / खुली समस्या)</span>
            </span>
          </div>

          {/* Interactive District Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {DISTRICT_HEATMAP_DATA.map((district) => {
              const isSelected = selectedDistrict.toLowerCase() === district.nameEn.toLowerCase() ||
                (selectedDistrict === 'Khunti' && district.id === 'khunti');

              const statusColor =
                district.status === 'RESOLVED'
                  ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                  : district.status === 'IN_PROGRESS'
                  ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                  : 'border-rose-200 bg-rose-50/50 hover:bg-rose-50';

              const badgeIcon =
                district.status === 'RESOLVED'
                  ? '🟢'
                  : district.status === 'IN_PROGRESS'
                  ? '🟡'
                  : '🔴';

              return (
                <button
                  key={district.id}
                  type="button"
                  onClick={() => setSelectedDistrict(district.nameEn.replace(' District', ''))}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${statusColor} ${
                    isSelected ? 'ring-2 ring-emerald-600 shadow-md' : 'hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {district.nameEn}
                      </h4>
                      <span className="text-[11px] text-slate-500">{district.nameHi}</span>
                    </div>
                    <span className="text-base">{badgeIcon}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-1 italic">
                    "{district.featuredIssue}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200/60">
                    <span>
                      खुली: <strong className="text-rose-700">{district.openCount}</strong>
                    </span>
                    <span>
                      प्रगति: <strong className="text-amber-700">{district.inProgressCount}</strong>
                    </span>
                    <span>
                      सफल: <strong className="text-emerald-700">{district.resolvedCount}</strong>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. ADMIN DETAIL MODAL (With Audit Timeline, Evidence, Similar Problems) */}
      {/* ========================================================================= */}
      {detailModalProblem && (
        <Modal
          isOpen={!!detailModalProblem}
          onClose={() => setDetailModalProblem(null)}
          title="प्रशासनिक समस्या केस फ़ाइल (Admin Case Dossier)"
          titleHi={detailModalProblem.trackingCode}
          size="xl"
          footer={
            <div className="flex flex-wrap items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailModalProblem(null)}
              >
                बंद करें (Close)
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMoreInfoProblem(detailModalProblem);
                  setDetailModalProblem(null);
                }}
              >
                Request More Information
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setRejectProblem(detailModalProblem);
                  setDetailModalProblem(null);
                }}
              >
                Reject
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleVerifyDirect(detailModalProblem);
                  setDetailModalProblem(null);
                }}
              >
                ✓ Verify & Open for College Adoption
              </Button>
            </div>
          }
        >
          <div className="space-y-6 text-xs text-slate-700 max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                  Problem Dossier ID
                </span>
                <span className="text-xl font-mono font-black text-white">
                  {detailModalProblem.trackingCode}
                </span>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">
                  {detailModalProblem.title}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">सत्यापन स्थिति:</span>
                <span className="text-xs font-bold text-amber-300">
                  {getProblemVerificationStatus(detailModalProblem).label}
                </span>
              </div>
            </div>

            {/* AUDIT TIMELINE AS REQUESTED:
                Citizen Submitted
                ↓
                AI Processed
                ↓
                Admin Reviewed
                ↓
                Verified
                ↓
                Open for Adoption
            */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Audit Timeline (प्रशासनिक ऑडिट एवं जीवन चक्र टाइमलाइन)</span>
              </h4>

              {/* Connected Timeline Progress */}
              <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-300">
                {/* Node 1: Citizen Submitted */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                  <div className="font-bold text-slate-900">1. Citizen Submitted (नागरिक द्वारा दर्ज)</div>
                  <div className="text-[11px] text-slate-500">
                    दर्जकर्ता: {detailModalProblem.citizenName} • मोबाइल: {detailModalProblem.citizenPhoneMasked} •{' '}
                    {new Date(detailModalProblem.reportedAt).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Node 2: AI Processed */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                  <div className="font-bold text-slate-900">2. AI Processed (एआई वर्गीकरण व प्राथमिकता)</div>
                  <div className="text-[11px] text-slate-500">
                    श्रेणी: {detailModalProblem.categoryHi} • डुप्लीकेट जांच संपन्न • प्राथमिकता:{' '}
                    {detailModalProblem.priority.toUpperCase()}
                  </div>
                </div>

                {/* Node 3: Admin Reviewed */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                    3
                  </span>
                  <div className="font-bold text-blue-900">3. Admin Reviewed (जिला प्रशासन समीक्षा)</div>
                  <div className="text-[11px] text-slate-500">
                    खूंटी जिला नोडल कार्यालय द्वारा तकनीकी व्यवहार्यता व स्थल जांच समीक्षा सक्रिय है।
                  </div>
                </div>

                {/* Node 4: Verified */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[9px] text-slate-400 font-bold">
                    4
                  </span>
                  <div className="font-semibold text-slate-600">4. Verified (प्रशासनिक सत्यापन)</div>
                  <div className="text-[11px] text-slate-400">
                    अधिशासी अभियंता द्वारा औचित्य मुहर व बजट आवंटन अनुशंसा।
                  </div>
                </div>

                {/* Node 5: Open for Adoption */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[9px] text-slate-400 font-bold">
                    5
                  </span>
                  <div className="font-semibold text-slate-600">
                    5. Open for Adoption (विश्वविद्यालय नवाचार मंच पर सूचीबद्ध)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    राज्य तकनीकी विश्वविद्यालयों (BIT/IIT/NIT) के छात्र दलों हेतु समाधान प्रस्ताव आमंत्रित।
                  </div>
                </div>
              </div>
            </div>

            {/* Citizen Description & Photo Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  नागरिक विवरण (Citizen Description):
                </span>
                <p className="text-slate-900 font-medium leading-relaxed">
                  "{detailModalProblem.description}"
                </p>
                {detailModalProblem.descriptionHi && (
                  <p className="text-slate-600 text-[11px] italic">
                    "{detailModalProblem.descriptionHi}"
                  </p>
                )}
              </div>

              {/* Photo / Video evidence */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  प्रत्यक्ष साक्ष्य (Photo / Video Evidence):
                </span>
                {detailModalProblem.evidence && detailModalProblem.evidence.length > 0 ? (
                  <div className="space-y-1">
                    <img
                      src={detailModalProblem.evidence[0].url}
                      alt="Ground Evidence"
                      className="w-full h-36 object-cover rounded-xl border border-slate-300"
                    />
                    <span className="text-[10px] text-slate-500 block">
                      कैप्शन: {detailModalProblem.evidence[0].caption || 'नागरिक द्वारा प्रस्तुत साक्ष्य'}
                    </span>
                  </div>
                ) : (
                  <div className="h-28 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                    कोई साक्ष्य फोटो संलग्न नहीं
                  </div>
                )}
              </div>
            </div>

            {/* Location & AI Findings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-bold">स्थान (Location):</span>
                <strong className="text-slate-900 block mt-0.5">
                  {detailModalProblem.villageOrWard}, {detailModalProblem.block}
                </strong>
                <span className="text-slate-500 text-[10px] font-mono">
                  GPS: {detailModalProblem.coordinates.lat.toFixed(4)}, {detailModalProblem.coordinates.lng.toFixed(4)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-bold">एआई श्रेणी (AI Category):</span>
                <strong className="text-blue-800 block mt-0.5">
                  {detailModalProblem.categoryHi}
                </strong>
                <span className="text-[10px] text-slate-500">
                  कॉन्फिडेंस: {Math.round((detailModalProblem.aiAnalysis?.confidenceScore || 0.94) * 100)}%
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-bold">एआई प्राथमिकता (AI Priority):</span>
                <strong className="text-rose-700 uppercase block mt-0.5">
                  🚨 {detailModalProblem.priority} Priority
                </strong>
                <span className="text-[10px] text-slate-500">
                  {detailModalProblem.aiAnalysis?.urgencyReasoning || 'Drinking water urgency'}
                </span>
              </div>
            </div>

            {/* Similar Problems & Upvotes */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>समान शिकायतें (Similar Problems Detected):</span>
                </span>
                <span className="text-amber-800 font-mono font-bold text-xs">
                  87% Similarity
                </span>
              </div>
              <p className="text-xs text-amber-800">
                एआई ने 0.4 किमी के दायरे में पूर्व दर्ज <strong>"Khunti Village Handpump Not Working"</strong> (कोड: JH-KHT-2026-0388) के साथ 87% समानता पहचानी है।
              </p>
              <div className="text-[11px] text-purple-900 font-bold flex items-center gap-1 pt-1">
                <ThumbsUp className="w-3.5 h-3.5 text-purple-600" />
                <span>समर्थक नागरिक (Upvotes): {detailModalProblem.votesCount} नागरिक सहमत</span>
              </div>
            </div>

            {/* Verification History */}
            <div className="p-3 bg-slate-100 rounded-xl space-y-1 text-[11px] text-slate-600">
              <span className="font-bold text-slate-800 block">सत्यापन इतिहास (Verification History):</span>
              <div>• {new Date(detailModalProblem.reportedAt).toLocaleDateString()}: नागरिक शिकायत पोर्टल पर पंजीकृत।</div>
              <div>• {new Date(detailModalProblem.reportedAt).toLocaleDateString()}: एआई स्वतः छंटाई एवं डुप्लीकेट मिलान संपन्न।</div>
              <div>• वर्तमान: जिला प्रशासन खूंटी द्वारा तकनीकी सत्यापन कतार में।</div>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: REQUEST MORE INFORMATION */}
      {/* ========================================================================= */}
      {moreInfoProblem && (
        <Modal
          isOpen={!!moreInfoProblem}
          onClose={() => setMoreInfoProblem(null)}
          title="नागरिक से अतिरिक्त जानकारी अनुरोध (Request More Info)"
          titleHi={moreInfoProblem.trackingCode}
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setMoreInfoProblem(null)}>
                रद्द करें
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmMoreInfo}>
                अनुरोध भेजें (Send SMS & Update)
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmMoreInfo} className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <strong className="text-blue-900 block font-bold">{moreInfoProblem.title}</strong>
              <span className="text-slate-500 text-[11px]">
                नागरिक: {moreInfoProblem.citizenName} ({moreInfoProblem.citizenPhoneMasked})
              </span>
            </div>

            <TextArea
              label="नागरिक को भेजा जाने वाला संदेश (Message for Citizen)"
              rows={4}
              value={infoRequestText}
              onChange={(e) => setInfoRequestText(e.target.value)}
              required
            />

            <div className="text-[11px] text-slate-500">
              💡 यह संदेश नागरिक के पंजीकृत मोबाइल नंबर पर एसएमएस व पोर्टल सूचना के रूप में भेजा जाएगा।
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: REJECT PROBLEM */}
      {/* ========================================================================= */}
      {rejectProblem && (
        <Modal
          isOpen={!!rejectProblem}
          onClose={() => setRejectProblem(null)}
          title="समस्या अस्वीकृत करें (Reject Problem)"
          titleHi={rejectProblem.trackingCode}
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setRejectProblem(null)}>
                रद्द करें
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmReject}>
                अस्वीकृति दर्ज करें
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <strong className="text-rose-900 block font-bold">{rejectProblem.title}</strong>
              <span className="text-slate-500 text-[11px] font-mono">
                {rejectProblem.trackingCode} • {rejectProblem.villageOrWard}
              </span>
            </div>

            <SelectInput
              label="अस्वीकृति का प्राथमिक कारण (Rejection Reason)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              options={[
                { value: 'duplicate', label: 'पूर्व दर्ज समस्या का दोहराव (Duplicate)' },
                { value: 'out_of_scope', label: 'विभागीय या जिला कार्यक्षेत्र से बाहर (Out of Scope)' },
                { value: 'incomplete', label: 'अपूर्ण या भ्रामक विवरण (Incomplete/Vague)' },
                { value: 'resolved_locally', label: 'नियमित पंचायत अनुरक्षण द्वारा पूर्व में ही निवारित' },
              ]}
            />

            <TextArea
              label="प्रशासनिक टिप्पणी (Rejection Notes)"
              rows={3}
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              required
            />
          </form>
        </Modal>
      )}
    </div>
  );
};
