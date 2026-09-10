import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  MapPin,
  Users,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
  Smartphone,
  RotateCcw,
  Check,
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  Download,
  Eye,
  Building2,
  GraduationCap,
  X,
  Radio,
} from 'lucide-react';

type OverallStatus =
  | 'pilot_completed'
  | 'deployment_verified'
  | 'resolved_deployed'
  | 'reopened_persists';

type CitizenVote = 'yes' | 'no' | null;

export const GroundDeployment: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { language, addNotification } = useApp();

  // Core state
  const [deploymentStatus, setDeploymentStatus] =
    useState<OverallStatus>('pilot_completed');
  const [officerVerified, setOfficerVerified] = useState<boolean>(false);
  const [officerVerificationDate, setOfficerVerificationDate] = useState<string>('');
  const [citizenFeedback, setCitizenFeedback] = useState<CitizenVote>(null);
  const [citizenFeedbackTime, setCitizenFeedbackTime] = useState<string>('');
  const [citizenCommentText, setCitizenCommentText] = useState<string>('');

  // Interactive Verification Modal
  const [verifyModalOpen, setVerifyModalOpen] = useState<boolean>(false);
  const [officerName, setOfficerName] = useState<string>('Er. Birendra Toppo');
  const [officerRole, setOfficerRole] = useState<string>(
    'Junior Engineer, Drinking Water & Sanitation Dept (DWSD), Khunti'
  );
  const [officerRemarks, setOfficerRemarks] = useState<string>(
    'Field inspection conducted on-site. Solar dual-stage biofilter unit operates at 460 L/hr. Water clarity tested and verified compliant with BIS:10500 standards.'
  );

  // Testing Report Modal
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  // Comparison View Mode
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider'>('side-by-side');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // SMS Simulator State
  const [smsDelivered, setSmsDelivered] = useState<boolean>(true);
  const [smsPhoneInput, setSmsPhoneInput] = useState<string>('+91 98721 54890');

  // Handle Admin/Local Officer Approval
  const handleVerifyDeployment = () => {
    setOfficerVerified(true);
    setOfficerVerificationDate('2026-09-08 14:15');
    setDeploymentStatus('deployment_verified');
    setVerifyModalOpen(false);

    addNotification({
      title: 'जमीनी अधिष्ठापन सत्यापित (Deployment Verified)',
      message: `${officerName} (DWSD Khunti) द्वारा तकनीकी व भौतिक निरीक्षण स्वीकृत। नागरिक एसएमएस सत्यापन सक्रिय।`,
      type: 'success',
    });
  };

  // Handle Citizen Response
  const handleCitizenResponse = (response: 'yes' | 'no') => {
    setCitizenFeedback(response);
    const timeStr = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setCitizenFeedbackTime(timeStr);

    if (response === 'yes') {
      setDeploymentStatus('resolved_deployed');
      addNotification({
        title: 'नागरिक सत्यापन सफल (Problem Resolved)',
        message:
          'नागरिक द्वारा पुष्टि: समस्या का स्थायी समाधान हो गया है। स्थिति: Resolved & Deployed ✅',
        type: 'success',
      });
    } else {
      setDeploymentStatus('reopened_persists');
      addNotification({
        title: 'समस्या पुनः खुली (Issue Reopened)',
        message:
          'नागरिक ने रिपोर्ट किया कि समस्या अभी भी बनी हुई है। टीम और ब्लॉक अधिकारी को तत्काल समीक्षा हेतु सूचित किया गया।',
        type: 'error',
      });
    }
  };

  // Reset to initial test state
  const handleResetDemo = () => {
    setDeploymentStatus('pilot_completed');
    setOfficerVerified(false);
    setOfficerVerificationDate('');
    setCitizenFeedback(null);
    setCitizenFeedbackTime('');
    setCitizenCommentText('');
    addNotification({
      title: 'डेमो रीसेट (State Reset)',
      message: 'फील्ड पायलट प्रारंभिक स्थिति में रीसेट किया गया।',
      type: 'info',
    });
  };

  // Citizen Timeline Steps definition
  const getTimelineSteps = () => {
    return [
      {
        id: 1,
        title: 'Problem Reported',
        titleHi: 'समस्या दर्ज',
        date: '12 Aug 2026',
        actor: 'Budhram Munda (Citizen)',
        status: 'completed',
        details: 'Photo evidence and geolocation tagged at Hesal Tola community well.',
      },
      {
        id: 2,
        title: 'Verified',
        titleHi: 'सत्यापित',
        date: '15 Aug 2026',
        actor: 'Dr. Amit Sinha, IAS (ADM)',
        status: 'completed',
        details: 'Administrative inspection confirmed iron contamination (3.4 mg/L).',
      },
      {
        id: 3,
        title: 'Adopted',
        titleHi: 'अंगीकृत',
        date: '20 Aug 2026',
        actor: 'Tech Titans (R.D. Engineering College)',
        status: 'completed',
        details: 'Adopted as collegiate capstone challenge with faculty guidance.',
      },
      {
        id: 4,
        title: 'Developed',
        titleHi: 'विकसित',
        date: '02 Sep 2026',
        actor: 'Tech Titans & Mentor Dr. Mahato',
        status: 'completed',
        details: 'Dual-stage solar biofiltration unit fabricated and bench tested.',
      },
      {
        id: 5,
        title: 'Deployed',
        titleHi: 'अधिष्ठापित',
        date: '06 Sep 2026',
        actor: 'Tech Titans & DWSD Khunti',
        status: officerVerified ? 'completed' : 'active',
        details: officerVerified
          ? 'Deployment verified by DWSD Junior Engineer on-site.'
          : 'Hardware installed on-site. Field pilot completed, pending official audit sign-off.',
      },
      {
        id: 6,
        title: 'Citizen Verified',
        titleHi: 'नागरिक सत्यापित',
        date: citizenFeedback ? '08 Sep 2026' : 'Pending',
        actor: 'Budhram Munda & 180 Hamlet Households',
        status:
          citizenFeedback === 'yes'
            ? 'completed'
            : citizenFeedback === 'no'
            ? 'failed'
            : officerVerified
            ? 'active'
            : 'pending',
        details:
          citizenFeedback === 'yes'
            ? 'Citizen confirmed via SMS: "👍 Haan, Samasya Solve Hui". Clean water accessible.'
            : citizenFeedback === 'no'
            ? 'Citizen flagged issue persists via SMS. Automatic escalation triggered.'
            : 'Interactive SMS dispatched to beneficiary phone for field feedback.',
      },
      {
        id: 7,
        title: 'Resolved',
        titleHi: 'समाधान पूर्ण',
        date:
          deploymentStatus === 'resolved_deployed'
            ? '08 Sep 2026'
            : deploymentStatus === 'reopened_persists'
            ? 'Reopened'
            : 'Pending',
        actor: 'Government of Jharkhand Innovation Exchange',
        status:
          deploymentStatus === 'resolved_deployed'
            ? 'completed'
            : deploymentStatus === 'reopened_persists'
            ? 'failed'
            : 'pending',
        details:
          deploymentStatus === 'resolved_deployed'
            ? 'Final state: Resolved & Deployed ✅. Formal social audit certificate generated.'
            : deploymentStatus === 'reopened_persists'
            ? 'Status: Reopened — Citizen Reported Issue Persists. Team dispatch requested.'
            : 'Final closure step after citizen verification confirms solution efficacy.',
      },
    ];
  };

  const timelineSteps = getTimelineSteps();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* QUICK PRESETS & DEMO NOTICE */}
      <div className="bg-slate-900 text-slate-200 px-4 py-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">Full-Circle Citizen Verification Experience:</span>
          <span className="text-slate-400 hidden sm:inline">
            Closing the loop between citizen complaint, engineering deployment, and final SMS resolution.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDemo}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo
          </button>
          <span className="text-slate-500">•</span>
          <button
            type="button"
            onClick={() => {
              setOfficerVerified(true);
              setOfficerVerificationDate('2026-09-08 14:15');
              setDeploymentStatus('deployment_verified');
            }}
            className="px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 font-semibold text-[11px]"
          >
            Simulate Officer Approval
          </button>
          <button
            type="button"
            onClick={() => handleCitizenResponse('yes')}
            className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold text-[11px]"
          >
            Simulate Citizen "YES"
          </button>
        </div>
      </div>

      {/* OVERALL SYSTEM STATUS BANNER */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border transition-all ${
          deploymentStatus === 'resolved_deployed'
            ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-emerald-300 text-emerald-950'
            : deploymentStatus === 'reopened_persists'
            ? 'bg-gradient-to-r from-rose-50 via-amber-50 to-rose-100 border-rose-300 text-rose-950'
            : deploymentStatus === 'deployment_verified'
            ? 'bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 border-blue-300 text-blue-950'
            : 'bg-gradient-to-r from-amber-50 via-slate-50 to-amber-100 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>Current Platform Deployment State</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              {deploymentStatus === 'resolved_deployed' ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <span>Status: Resolved & Deployed ✅</span>
                </>
              ) : deploymentStatus === 'reopened_persists' ? (
                <>
                  <AlertTriangle className="w-8 h-8 text-rose-600" />
                  <span>Status: Reopened — Citizen Reported Issue Persists</span>
                </>
              ) : deploymentStatus === 'deployment_verified' ? (
                <>
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  <span>Status: Deployment Verified — Pending Citizen Sign-Off</span>
                </>
              ) : (
                <>
                  <Clock className="w-8 h-8 text-amber-700" />
                  <span>Status: Field Pilot Completed — Awaiting Officer Sign-Off</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              {deploymentStatus === 'resolved_deployed'
                ? 'The loop has been successfully closed! The original citizen verified clean water flow via SMS feedback, and the grievance is resolved.'
                : deploymentStatus === 'reopened_persists'
                ? 'Citizen has flagged that water issues persist. The system has automatically reopened this grievance and flagged it on the District Nodal Officer dashboard.'
                : deploymentStatus === 'deployment_verified'
                ? 'DWSD Junior Engineer has approved physical installation. Notification and SMS prompt have been dispatched to the citizen.'
                : 'Physical filtration hardware has been assembled and installed on-site. Ready for formal departmental verification.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Link to="/project-lifecycle">
              <Button variant="outline" size="sm" className="bg-white/80 text-xs">
                View Project Lifecycle
              </Button>
            </Link>
            <Link to="/social-audit">
              <Button variant="outline" size="sm" className="bg-white/80 text-xs">
                Social Audit Ledger
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. GROUND DEPLOYMENT ESSENTIALS HEADER */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-slate-900 text-amber-300 px-2.5 py-1 rounded">
                JH-KHT-2026-0388
              </span>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                Phase 5: Ground Deployment & Social Closure
              </span>
              <span className="text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full">
                Deployment Status: {officerVerified ? 'Deployment Verified' : 'Field Pilot Completed'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Original Verified Problem:
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Khunti Village Drinking Water Issue
              </h1>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-purple-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Deployed Collegiate Solution:
              </div>
              <div className="text-xl sm:text-2xl font-black text-purple-900">
                Low-Cost Water Purification System
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Solar-powered continuous filtration unit featuring dual-stage bio-sand and activated alumina columns, eliminating toxic iron precipitations and pathogen turbidity.
              </p>
            </div>
          </div>

          {/* Student Team & Mentorship Card */}
          <div className="lg:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5 shrink-0">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Student Engineering Team</span>
            </div>

            <div>
              <div className="text-lg font-black text-slate-900">Tech Titans</div>
              <div className="text-xs text-slate-600 font-medium">
                R.D. Engineering College
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Dept of Mechanical & Environmental Engineering
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Faculty Mentor:</span>
                <strong className="text-slate-900">Dr. S. K. Mahato</strong>
              </div>
              <div className="flex justify-between">
                <span>CSR Grant Sponsor:</span>
                <strong className="text-purple-900">Tata Steel Foundation</strong>
              </div>
              <div className="flex justify-between">
                <span>Grant Amount:</span>
                <strong className="text-emerald-700">₹60,000 (100% Deployed)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* METADATA GRID: Deployment Date, Location, Local Verification Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-slate-500 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Deployment Date:</span>
            </div>
            <strong className="text-slate-900 block text-sm font-bold">
              06 September 2026
            </strong>
            <span className="text-slate-500 text-[11px]">Installed & Commissioned</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-slate-500 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Location:</span>
            </div>
            <strong className="text-slate-900 block text-sm font-bold">
              Hesal Tola, Khunti
            </strong>
            <span className="text-slate-500 text-[11px]">Near Primary School Handpump</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-slate-500 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Testing Report:</span>
            </div>
            <div className="flex items-center justify-between">
              <strong className="text-emerald-700 block text-sm font-bold">
                TDS: 110 ppm (Safe)
              </strong>
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="text-purple-700 underline font-semibold text-[11px] hover:text-purple-900"
              >
                View Report
              </button>
            </div>
            <span className="text-slate-500 text-[11px]">BIS:10500 Potable Water Cleared</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-slate-500 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Local Verification Status:</span>
            </div>
            <strong
              className={`block text-sm font-bold ${
                officerVerified ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {officerVerified ? 'Deployment Verified ✓' : 'Awaiting Officer Audit ⏳'}
            </strong>
            <span className="text-slate-500 text-[11px]">
              {officerVerified
                ? `Signed by DWSD on ${officerVerificationDate}`
                : 'Pending Er. Birendra Toppo physical check'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. BEFORE & AFTER PHOTO EVIDENCE SHOWCASE */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Ground Transformation Evidence</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Before & After Field Verification</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Visual proof uploaded by field engineers and citizen auditors.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'slider'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Slider
            </button>
          </div>
        </div>

        {/* Photo Viewers */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Photo Card */}
            <div className="group rounded-2xl border border-rose-200 bg-rose-50/20 overflow-hidden space-y-3">
              <div className="relative aspect-video sm:aspect-4/3 bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80"
                  alt="Before - Contaminated water sample from Khunti community well"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-rose-600/90 backdrop-blur-xs text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-xs">
                  Before Deployment
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs">
                  <div className="font-bold flex items-center justify-between">
                    <span>Turbid Well Water Baseline</span>
                    <span className="text-rose-400 font-mono">Turbidity: 24.8 NTU</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    High iron oxide (3.4 mg/L) with reddish precipitation and pathogen count.
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">Date Captured:</span>
                  <span>12 Aug 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">Verified By:</span>
                  <span>Citizen Budhram Munda & JE DWSD</span>
                </div>
              </div>
            </div>

            {/* After Photo Card */}
            <div className="group rounded-2xl border border-emerald-200 bg-emerald-50/20 overflow-hidden space-y-3">
              <div className="relative aspect-video sm:aspect-4/3 bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=800&q=80"
                  alt="After - Installed solar water filtration unit delivering clean water"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-xs text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  After Deployment
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs">
                  <div className="font-bold flex items-center justify-between">
                    <span>Solar Bio-Filter Deployed</span>
                    <span className="text-emerald-400 font-mono">Turbidity: 1.2 NTU</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Purified potable discharge delivering 460 Liters/Hour clear water at community standpost.
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">Date Commissioned:</span>
                  <span>06 Sep 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">Verified By:</span>
                  <span>Tech Titans & Hesal Gram Panchayat</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Slider View */
          <div className="space-y-4">
            <div className="relative aspect-video sm:aspect-16/9 rounded-2xl overflow-hidden shadow-md select-none border border-slate-300">
              {/* After Image (Background) */}
              <img
                src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80"
                alt="After Deployment Clean Water"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                After (Deployed Unit)
              </div>

              {/* Before Image (Clipped Foreground with CSS clipPath for perfect responsive alignment) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80"
                  alt="Before Contaminated Water"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                  Before (Contaminated)
                </div>
              </div>

              {/* Slider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl border-2 border-purple-600 flex items-center justify-center text-purple-700 font-bold text-xs">
                  ↔
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-2">
              <span className="text-xs font-bold text-rose-700">Before</span>
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-ew-resize h-2 bg-slate-200 rounded-lg"
              />
              <span className="text-xs font-bold text-emerald-700">After</span>
            </div>
          </div>
        )}
      </section>

      {/* 3. ADMIN / LOCAL OFFICER ACTION CARD */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Administrative & Departmental Audit</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Local Nodal Officer / Admin Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Official physical inspection and technical validation required before triggering citizen feedback verification.
            </p>
          </div>

          <div className="shrink-0">
            {officerVerified ? (
              <div className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deployment Verified</span>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setVerifyModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
                icon={<ShieldCheck className="w-4 h-4" />}
              >
                Verify Field Deployment
              </Button>
            )}
          </div>
        </div>

        {/* Verification Details Box */}
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Designated Inspection Officer:</span>
            <div className="text-sm font-bold text-white">Er. Birendra Toppo</div>
            <div className="text-[11px] text-slate-300">
              Junior Engineer, DWSD Sub-Division Khunti
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Technical Standard:</span>
            <div className="text-sm font-bold text-emerald-400">BIS 10500:2012 Passed</div>
            <div className="text-[11px] text-slate-300">
              Lab Assay #DWSD-LAB-KHT-2026-992
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Field Verification Status:</span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              {officerVerified ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Deployment Verified</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">Pending Official Sign-Off</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {officerVerified
                ? `Approved on ${officerVerificationDate}`
                : 'Click "Verify Field Deployment" above to approve'}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CITIZEN FEEDBACK & SMS PREVIEW EXPERIENCE */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>Citizen Feedback & Verification Loop</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              SMS Notification & Grievance Closure
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Automated SMS dispatch delivers two-way interactive feedback via state mobile gateway.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Citizen Recipient: Budhram Munda (+91 98721XXXXX)
            </span>
          </div>
        </div>

        {/* SMS Prototype Disclaimer */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold">Prototype Notification Notice: </strong>
            This SMS interface is presented as a realistic interactive prototype preview mimicking the Government of Jharkhand e-Sampark SMS Gateway.
          </p>
        </div>

        {/* Two-Column: Interactive Phone Mockup & Citizen Action Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Mobile SMS Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-slate-950 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800 text-white relative">
              {/* Phone Speaker & Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Phone Header */}
              <div className="bg-slate-900 px-4 py-2.5 rounded-2xl mb-3 flex items-center justify-between text-xs border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                    JH
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">VM-JHGOVT</div>
                    <div className="text-[10px] text-slate-400">Jharkhand Samadhan Gateway</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">14:18</span>
              </div>

              {/* SMS Messages Feed */}
              <div className="space-y-3 p-1 min-h-[260px] text-xs">
                {/* Outgoing Initial SMS */}
                <div className="bg-slate-800 text-slate-100 p-3.5 rounded-2xl rounded-tl-xs border border-slate-700 space-y-2">
                  <div className="text-[11px] font-semibold text-purple-300">
                    प्रिय नागरिक Budhram Munda,
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200">
                    "Your reported problem has been addressed. A solution has been deployed in your area."
                  </p>
                  <p className="text-[11px] text-slate-300 italic">
                    (आपके द्वारा दर्ज खूंटी पेयजल समस्या पर Tech Titans इंजीनियरिंग टीम द्वारा सोलर वाटर फिल्टर स्थापित कर दिया गया है।)
                  </p>
                  <div className="pt-1 text-[10px] text-slate-400 text-right">Today, 14:18</div>
                </div>

                {/* Question SMS */}
                <div className="bg-purple-900/60 text-purple-100 p-3 rounded-2xl rounded-tl-xs border border-purple-700/60 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    Citizen Feedback Prompt:
                  </div>
                  <div className="text-sm font-black text-amber-300">
                    "Kya solution se problem solve hui?"
                  </div>
                  <div className="text-[10px] text-slate-300">
                    (कृपया नीचे दिए गए बटनों द्वारा अपनी प्रतिक्रिया दें)
                  </div>
                </div>

                {/* Citizen Reply Bubble (If clicked) */}
                {citizenFeedback && (
                  <div
                    className={`p-3 rounded-2xl rounded-tr-xs text-xs ml-auto max-w-[85%] border shadow-xs space-y-1 ${
                      citizenFeedback === 'yes'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-rose-600 text-white border-rose-500'
                    }`}
                  >
                    <div className="text-[10px] opacity-80 font-bold uppercase">Citizen Reply:</div>
                    <div className="font-bold text-sm">
                      {citizenFeedback === 'yes'
                        ? '👍 Haan, Samasya Solve Hui'
                        : '⚠️ Nahi, Problem Abhi Bhi Hai'}
                    </div>
                    <div className="text-[10px] text-white/80 text-right">
                      Received at {citizenFeedbackTime}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Footer Home Indicator */}
              <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-4" />
            </div>
          </div>

          {/* Right: Interactive Prompt & Resolution Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  Step 6: Citizen Response Action
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  "Kya solution se problem solve hui?"
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Clicking either response simulates the citizen's SMS response and immediately updates the state platform governance status.
                </p>
              </div>

              {/* Interactive Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleCitizenResponse('yes')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                    citizenFeedback === 'yes'
                      ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-500/30'
                      : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40'
                  }`}
                >
                  <span className="text-2xl">👍</span>
                  <div>
                    <strong className="block text-base font-black text-emerald-950">
                      Haan, Samasya Solve Hui
                    </strong>
                    <span className="text-xs text-emerald-800">
                      (हाँ, समस्या का समाधान हो गया)
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Sets Status: "Resolved & Deployed ✅"
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCitizenResponse('no')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                    citizenFeedback === 'no'
                      ? 'border-rose-600 bg-rose-50 shadow-md ring-2 ring-rose-500/30'
                      : 'border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/40'
                  }`}
                >
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <strong className="block text-base font-black text-rose-950">
                      Nahi, Problem Abhi Bhi Hai
                    </strong>
                    <span className="text-xs text-rose-800">
                      (नहीं, समस्या अभी भी बनी हुई है)
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Sets Status: "Reopened — Citizen Reported Issue Persists"
                  </div>
                </button>
              </div>

              {/* Feedback Summary Card */}
              {citizenFeedback && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
                    citizenFeedback === 'yes'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {citizenFeedback === 'yes' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      )}
                      Citizen Feedback Recorded
                    </span>
                    <span className="font-mono text-[11px]">{citizenFeedbackTime}</span>
                  </div>
                  <p className="leading-relaxed">
                    {citizenFeedback === 'yes' ? (
                      <>
                        <strong>Resolution Verified: </strong>
                        Grievance marked as <strong>"Resolved & Deployed ✅"</strong>. A digital certificate of completion has been dispatched to student team Tech Titans and the District Administration.
                      </>
                    ) : (
                      <>
                        <strong>Escalation Dispatched: </strong>
                        Grievance marked as{' '}
                        <strong>"Reopened — Citizen Reported Issue Persists"</strong>. A notification has been sent to faculty mentor Dr. S. K. Mahato and DWSD engineers to conduct immediate site maintenance.
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CITIZEN TIMELINE */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>End-to-End Governance Closure</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Final Citizen Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Visualizing the complete progression from citizen complaint to verified public resolution:
          </p>
        </div>

        {/* Stepper Display */}
        <div className="relative">
          {/* Horizontal Desktop Bar */}
          <div className="hidden xl:block absolute top-5 left-8 right-8 h-1 bg-slate-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 relative z-10">
            {timelineSteps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isActive = step.status === 'active';
              const isFailed = step.status === 'failed';

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                    isDone
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : isActive
                      ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-400/30'
                      : isFailed
                      ? 'bg-rose-50/50 border-rose-300'
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      Step {step.id}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-amber-500 text-white animate-pulse'
                          : isFailed
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isDone ? '✓' : isFailed ? '✕' : idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <div className="text-[11px] font-medium text-slate-500">{step.date}</div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-tight">{step.details}</p>

                  <div className="pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-500">
                    {step.actor}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary Ribbon */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-emerald-400 font-bold">Problem Reported</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Verified</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Adopted</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Developed</span>
            <span>→</span>
            <span className={officerVerified ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              Deployed
            </span>
            <span>→</span>
            <span
              className={
                citizenFeedback === 'yes'
                  ? 'text-emerald-400 font-bold'
                  : citizenFeedback === 'no'
                  ? 'text-rose-400 font-bold'
                  : 'text-slate-400'
              }
            >
              Citizen Verified
            </span>
            <span>→</span>
            <span
              className={
                deploymentStatus === 'resolved_deployed'
                  ? 'text-emerald-400 font-bold'
                  : deploymentStatus === 'reopened_persists'
                  ? 'text-rose-400 font-bold'
                  : 'text-slate-400'
              }
            >
              Resolved
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Audit Hash: <code className="text-purple-300">JH-HASH-9981-DEPLOY</code>
          </div>
        </div>
      </section>

      {/* OFFICER VERIFICATION MODAL */}
      <Modal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        title="Verify Field Deployment (जमीनी अधिष्ठापन सत्यापन)"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            As the designated departmental nodal officer, certify that the collegiate solution has been physically installed and verified at Hesal Tola, Khunti.
          </p>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Problem:</span>
              <strong className="text-slate-900">Khunti Village Drinking Water Issue</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Deployed Unit:</span>
              <strong className="text-purple-900">Low-Cost Water Purification System</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Student Team:</span>
              <strong className="text-slate-900">Tech Titans (R.D. Engineering College)</strong>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-slate-700">Official Field Inspection Remarks:</label>
            <textarea
              value={officerRemarks}
              onChange={(e) => setOfficerRemarks(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Confirmation of Water Assay:
            </div>
            <p className="text-[11px]">
              TDS lowered from 840 ppm to 110 ppm. Coliform bacterial absence certified by DWSD mobile testing van on 06-Sep-2026.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setVerifyModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleVerifyDeployment}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              icon={<ShieldCheck className="w-3.5 h-3.5" />}
            >
              Sign & Verify Deployment
            </Button>
          </div>
        </div>
      </Modal>

      {/* TESTING REPORT MODAL */}
      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Field Testing & Water Quality Assay Report"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-950 flex items-center justify-between">
            <div>
              <div className="font-bold">DWSD Lab Certificate: #KHT-DWSD-2026-992</div>
              <div className="text-[11px] text-purple-800">Testing Date: 06 September 2026</div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
              PASSED (BIS 10500)
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5">Before (Raw Well)</th>
                  <th className="p-2.5">After (Purified)</th>
                  <th className="p-2.5">Permissible Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-2.5 font-medium">Turbidity</td>
                  <td className="p-2.5 text-rose-700 font-mono">24.8 NTU</td>
                  <td className="p-2.5 text-emerald-700 font-mono font-bold">1.2 NTU</td>
                  <td className="p-2.5 text-slate-500">Max 5.0 NTU</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Total Dissolved Solids (TDS)</td>
                  <td className="p-2.5 text-rose-700 font-mono">840 mg/L</td>
                  <td className="p-2.5 text-emerald-700 font-mono font-bold">110 mg/L</td>
                  <td className="p-2.5 text-slate-500">500 mg/L</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Iron (as Fe)</td>
                  <td className="p-2.5 text-rose-700 font-mono">3.4 mg/L</td>
                  <td className="p-2.5 text-emerald-700 font-mono font-bold">0.08 mg/L</td>
                  <td className="p-2.5 text-slate-500">0.3 mg/L</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Total Coliform Bacteria</td>
                  <td className="p-2.5 text-rose-700 font-mono">Present (18 MPN)</td>
                  <td className="p-2.5 text-emerald-700 font-mono font-bold">0 (Absent)</td>
                  <td className="p-2.5 text-slate-500">0 MPN/100 mL</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Flow Rate Discharge</td>
                  <td className="p-2.5 text-slate-500">-</td>
                  <td className="p-2.5 text-purple-700 font-mono font-bold">460 Liters/Hour</td>
                  <td className="p-2.5 text-slate-500">Continuous Solar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setReportModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                addNotification({
                  title: 'रिपोर्ट डाउनलोड प्रारंभ (Report Download)',
                  message: 'DWSD_Water_Quality_Certificate_Khunti_2026.pdf डाउनलोड किया गया।',
                  type: 'info',
                });
                setReportModalOpen(false);
              }}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Download PDF Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
