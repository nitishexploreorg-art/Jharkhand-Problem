import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Award,
  GraduationCap,
  Building2,
  MapPin,
  Coins,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Info,
  RefreshCw,
  FileCheck2,
  Eye,
  Trash2,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Users,
  Check,
  Lock,
  Play,
  RotateCcw,
} from 'lucide-react';

interface ProofItem {
  id: string;
  type: 'document' | 'image' | 'video';
  title: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  url?: string;
  notes?: string;
}

export const ProjectLifecycle: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { problems, addNotification, language } = useApp();

  // Find problem or fallback to featured Khunti problem
  const problem =
    problems.find((p) => p.id === id || p.id === 'jh-prb-007') || problems[0];

  // Lifecycle Stages definition
  const [stages, setStages] = useState([
    {
      id: 1,
      title: 'Problem Verified',
      titleHi: 'समस्या सत्यापित',
      status: 'completed' as 'completed' | 'active' | 'pending',
      symbol: '✓',
      date: '2026-09-06',
      actor: 'District Water & Sanitation Dept, Khunti',
      notes: 'Physical field inspection completed. Turbidity and mechanical pump cylinder breakdown audited.',
    },
    {
      id: 2,
      title: 'Project Adopted',
      titleHi: 'परियोजना अंगीकृत',
      status: 'completed' as 'completed' | 'active' | 'pending',
      symbol: '✓',
      date: '2026-09-06',
      actor: 'Tech Titans (R.D. Engineering College)',
      notes: 'Adopted under final year capstone innovation program with faculty mentor sign-off.',
    },
    {
      id: 3,
      title: 'CSR Support',
      titleHi: 'सीएसआर सहयोग',
      status: 'completed' as 'completed' | 'active' | 'pending',
      symbol: '✓',
      date: '2026-09-07',
      actor: 'Tata Steel Foundation',
      notes: '₹60,000 non-dilutive milestone grant committed with phased tranche agreement.',
    },
    {
      id: 4,
      title: 'Development',
      titleHi: 'विकास कार्य जारी',
      status: 'active' as 'completed' | 'active' | 'pending',
      symbol: '🔄',
      date: 'Ongoing (In Progress)',
      actor: 'Tech Titans Student Team',
      notes: 'Engineering CAD architecture done; assembling physical solar-powered filtration unit.',
    },
    {
      id: 5,
      title: 'Ground Deployment',
      titleHi: 'जमीनी अधिष्ठापन',
      status: 'pending' as 'completed' | 'active' | 'pending',
      symbol: '⏳',
      date: 'Target: Oct 2026',
      actor: 'Khunti Gram Panchayat & Team',
      notes: 'Scheduled on-site field testing and continuous telemetry installation.',
    },
    {
      id: 6,
      title: 'Citizen Verification',
      titleHi: 'नागरिक सत्यापन',
      status: 'pending' as 'completed' | 'active' | 'pending',
      symbol: '⏳',
      date: 'Target: Nov 2026',
      actor: 'Khunti Hamlet Beneficiaries',
      notes: '180 households citizen satisfaction audit and Gram Sabha social sign-off.',
    },
  ]);

  // Milestone 2 Evidence State
  const [milestone2Proofs, setMilestone2Proofs] = useState<ProofItem[]>([
    {
      id: 'proof-1',
      type: 'image',
      title: 'Dual-Stage Filter Chamber Assembly',
      fileName: 'filter_chamber_assembly_lab.jpg',
      fileSize: '2.4 MB',
      uploadedAt: '2026-09-07 14:30',
      notes: 'Activated carbon & silica gravel column assembled in R.D. Engineering FabLab.',
    },
    {
      id: 'proof-2',
      type: 'document',
      title: 'Turbidity & Flow Rate Baseline Report',
      fileName: 'turbidity_water_assay_report_v1.pdf',
      fileSize: '1.8 MB',
      uploadedAt: '2026-09-07 17:15',
      notes: 'Lab assay verified turbidity reduction from 24 NTU to 2.1 NTU (BIS:10500 compliant).',
    },
  ]);

  // Milestone 3 Evidence State
  const [milestone3Proofs, setMilestone3Proofs] = useState<ProofItem[]>([]);

  // Milestone States
  const [m1Status, setM1Status] = useState<'approved'>('approved');
  const [m2Status, setM2Status] = useState<
    'in_progress' | 'submitted' | 'approved' | 'changes_requested'
  >('in_progress');
  const [m3Status, setM3Status] = useState<'pending' | 'in_progress' | 'submitted' | 'approved'>('pending');
  const [m4Status, setM4Status] = useState<'pending' | 'in_progress' | 'approved'>('pending');

  // Mentor Review state & comments
  const [mentorComment, setMentorComment] = useState<string>('');
  const [reviewModalOpen, setReviewModalOpen] = useState<'approve' | 'request_changes' | null>(null);
  const [changeRequestNotes, setChangeRequestNotes] = useState<string>(
    'Please attach the continuous 24-hour sensor telemetry graph and ensure water output TDS is within 150-250 ppm.'
  );

  // Upload Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTargetMilestone, setUploadTargetMilestone] = useState<2 | 3>(2);
  const [uploadType, setUploadType] = useState<'document' | 'image' | 'video'>('document');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Active stage tab for detail inspector
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // default to Stage 4 (Development)

  // Calculate Overall Progress
  const calculateOverallProgress = () => {
    let progress = 20; // M1 completed (20%)
    if (m2Status === 'approved') progress += 40;
    else if (m2Status === 'submitted') progress += 25;
    else if (m2Status === 'in_progress') progress += 15;

    if (m3Status === 'approved') progress += 30;
    else if (m3Status === 'submitted') progress += 15;
    else if (m3Status === 'in_progress') progress += 10;

    if (m4Status === 'approved') progress += 10;

    return Math.min(100, progress);
  };

  // Calculate Simulated Funding Disbursal
  const calculateSimulatedFunding = () => {
    let released = 12000; // M1 20% of 60,000
    if (m2Status === 'approved') released += 24000; // M2 40%
    if (m3Status === 'approved') released += 18000; // M3 30%
    if (m4Status === 'approved') released += 6000; // M4 10%
    return released;
  };

  const totalFundInr = 60000;
  const releasedFundInr = calculateSimulatedFunding();
  const overallProgress = calculateOverallProgress();

  // Open Upload Modal with preset
  const handleOpenUpload = (targetMilestone: 2 | 3, type: 'document' | 'image' | 'video') => {
    setUploadTargetMilestone(targetMilestone);
    setUploadType(type);
    setUploadNotes('');
    setUploadProgress(0);
    setIsUploading(false);

    if (type === 'document') {
      setUploadTitle('Mechanical Sizing & Assay Report');
      setSimulatedFileName('turbidity_and_flow_rate_test_v2.pdf');
    } else if (type === 'image') {
      setUploadTitle('Prototype Solar Pumping Rig');
      setSimulatedFileName('solar_filter_prototype_live_bench.jpg');
    } else {
      setUploadTitle('Filtration Discharge Flow Demo Video');
      setSimulatedFileName('prototype_bench_demo_video.mp4');
      setVideoUrl('https://youtu.be/sample-khunti-solar-filter');
    }

    setUploadModalOpen(true);
  };

  // Handle Simulating File Upload
  const handleExecuteUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let curr = 10;
    const interval = setInterval(() => {
      curr += 30;
      setUploadProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newProof: ProofItem = {
            id: `proof-${Date.now()}`,
            type: uploadType,
            title: uploadTitle || `${uploadType.toUpperCase()} Evidence`,
            fileName: simulatedFileName || `upload_${Date.now()}.${uploadType === 'document' ? 'pdf' : uploadType === 'image' ? 'jpg' : 'mp4'}`,
            fileSize: uploadType === 'video' ? '18.4 MB' : uploadType === 'document' ? '2.1 MB' : '3.6 MB',
            uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            url: videoUrl,
            notes: uploadNotes || 'Uploaded by Tech Titans engineering team.',
          };

          if (uploadTargetMilestone === 2) {
            setMilestone2Proofs((prev) => [newProof, ...prev]);
            // If in progress or changes requested, automatically set to submitted for review
            setM2Status('submitted');
          } else {
            setMilestone3Proofs((prev) => [newProof, ...prev]);
            setM3Status('submitted');
          }

          setIsUploading(false);
          setUploadModalOpen(false);

          addNotification({
            title: 'साक्ष्य सफलतापूर्वक अपलोड (Proof Uploaded)',
            message: `"${newProof.title}" Milestone ${uploadTargetMilestone} में संलग्न कर दिया गया है। संकाय सलाहकार समीक्षा हेतु तैयार।`,
            type: 'success',
          });
        }, 500);
      }
    }, 150);
  };

  // Mentor Actions
  const handleApproveMilestone = () => {
    setM2Status('approved');
    setMentorComment('Approved by Dr. S. K. Mahato. Prototype specifications and laboratory flow testing verified.');
    setReviewModalOpen(null);

    // Advance Stage 4 progress and unlock M3
    setM3Status('in_progress');

    addNotification({
      title: 'माइलस्टोन 2 स्वीकृत (Milestone 2 Approved)',
      message: 'संकाय मार्गदर्शक द्वारा माइलस्टोन 2 स्वीकृत! द्वितीय किस्त (₹24,000) सिमुलेटेड लेजर में जारी की गई।',
      type: 'success',
    });
  };

  const handleRequestChanges = () => {
    setM2Status('changes_requested');
    setMentorComment(`Changes Requested by Dr. S. K. Mahato: ${changeRequestNotes}`);
    setReviewModalOpen(null);

    addNotification({
      title: 'संशोधन का अनुरोध (Changes Requested)',
      message: 'संकाय मार्गदर्शक ने माइलस्टोन 2 में सुधार हेतु निर्देश दर्ज किए हैं। छात्र टीम को सूचित किया गया।',
      type: 'warning',
    });
  };

  // Demo presets to test workflow states seamlessly
  const setDemoPreset = (preset: 'initial' | 'submitted' | 'approved' | 'deployed') => {
    if (preset === 'initial') {
      setM2Status('in_progress');
      setM3Status('pending');
      setM4Status('pending');
      setMentorComment('');
      setStages((prev) =>
        prev.map((s) => ({
          ...s,
          status: s.id <= 3 ? 'completed' : s.id === 4 ? 'active' : 'pending',
          symbol: s.id <= 3 ? '✓' : s.id === 4 ? '🔄' : '⏳',
        }))
      );
    } else if (preset === 'submitted') {
      setM2Status('submitted');
      setM3Status('pending');
      setM4Status('pending');
      setMentorComment('Team has submitted all required proofs. Pending Faculty Mentor review.');
    } else if (preset === 'approved') {
      setM2Status('approved');
      setM3Status('in_progress');
      setM4Status('pending');
      setMentorComment('Approved by Dr. S. K. Mahato. Flow rate and turbidity within BIS limits.');
      setStages((prev) =>
        prev.map((s) => ({
          ...s,
          status: s.id <= 4 ? 'completed' : s.id === 5 ? 'active' : 'pending',
          symbol: s.id <= 4 ? '✓' : s.id === 5 ? '🔄' : '⏳',
        }))
      );
    } else if (preset === 'deployed') {
      setM2Status('approved');
      setM3Status('approved');
      setM4Status('approved');
      setMentorComment('Complete validation signed off with Khunti Gram Panchayat.');
      setStages((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'completed',
          symbol: '✓',
        }))
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* QUICK DEMO CONTROLS BANNER */}
      <div className="bg-slate-900 text-slate-200 px-4 py-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white">Interactive Lifecycle Simulator:</span>
          <span className="text-slate-400 hidden sm:inline">
            Demonstrating how an idea moves from adoption to real-world deployment.
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px] mr-1">Quick Presets:</span>
          <button
            onClick={() => setDemoPreset('initial')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            1. M2 In-Progress
          </button>
          <button
            onClick={() => setDemoPreset('submitted')}
            className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-700/60 text-amber-300 font-semibold"
          >
            2. Submitted for Review
          </button>
          <button
            onClick={() => setDemoPreset('approved')}
            className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-semibold"
          >
            3. Mentor Approved
          </button>
          <button
            onClick={() => setDemoPreset('deployed')}
            className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-700/60 text-purple-300 font-semibold"
          >
            4. Fully Deployed
          </button>
          <Link
            to="/ground-deployment"
            className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold inline-flex items-center gap-1"
          >
            Ground Deployment & Citizen Verification →
          </Link>
        </div>
      </div>

      {/* 1. PROJECT HEADER */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-slate-900 text-amber-300 px-2.5 py-1 rounded">
                JH-KHT-2026-0388
              </span>
              <span className="text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full">
                Collegiate Innovation Capstone
              </span>
              <PriorityBadge priority="high" size="sm" />
              <span className="text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-purple-600" />
                CSR Grant Committed: ₹60,000
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Low-Cost Water Purification Solution
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Solar-powered multi-stage filtration unit designed to eliminate iron, bacteriological contamination, and seasonal turbidity for 180 tribal households in Khunti village.
            </p>

            {/* Team, College & Problem Meta Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-0.5">
                <div className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                  <span>Student Team:</span>
                </div>
                <strong className="text-slate-900 block text-sm font-bold">Tech Titans</strong>
                <span className="text-slate-500 text-[11px]">Lead: Ankit Kumar (4 Members)</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-0.5">
                <div className="text-slate-500 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>College / University:</span>
                </div>
                <strong className="text-slate-900 block text-sm font-bold">
                  R.D. Engineering College
                </strong>
                <span className="text-slate-500 text-[11px]">Dept of Mechanical & Civil Engg</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-0.5">
                <div className="text-slate-500 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Original Problem:</span>
                </div>
                <strong className="text-slate-900 block text-sm font-bold">
                  Khunti Drinking Water Challenge
                </strong>
                <span className="text-slate-500 text-[11px]">Khunti Hamlet, Ormanjhi Block</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div className="lg:w-72 bg-gradient-to-br from-purple-50 to-slate-50 border border-purple-200/80 rounded-2xl p-5 space-y-4 shrink-0">
            <div>
              <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
                Simulated Grant Ledger
              </div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                ₹{releasedFundInr.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-500">
                  / ₹{totalFundInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-purple-900 font-medium mt-0.5">
                {Math.round((releasedFundInr / totalFundInr) * 100)}% Non-dilutive Grant Released
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Overall Progress</span>
                <span className="font-mono text-purple-900 font-bold">{overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-purple-200/60 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span>CSR Sponsor:</span>
                <strong className="text-slate-900 font-semibold">Tata Steel Foundation</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Faculty Mentor:</span>
                <strong className="text-slate-900 font-semibold">Dr. S. K. Mahato</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Notice of simulated state */}
        <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-normal">
            <strong className="font-bold text-amber-950">Prototype Governance Notice: </strong>
            All fund transfers and disbursements in this system are simulated workflow states to demonstrate the governance pipeline. No actual monetary transactions take place.
          </p>
        </div>
      </section>

      {/* 2. PROJECT TIMELINE */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>End-to-End Governance Stepper</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Project Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click on any lifecycle stage to inspect verified institutional actors, evidence, and milestone criteria.
          </p>
        </div>

        {/* Stepper Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {stages.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            const isCompleted = stage.symbol === '✓';
            const isActive = stage.symbol === '🔄';

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageIndex(idx)}
                className={`text-left p-4 rounded-2xl border transition-all relative flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/30 shadow-xs'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40'
                    : isActive
                    ? 'border-amber-300 bg-amber-50/30 hover:bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Stage {stage.id}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-amber-500 text-white animate-spin'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {stage.symbol}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {stage.title}
                  </h3>
                  <div className="text-[11px] font-medium text-slate-500 mt-1">{stage.date}</div>
                </div>

                <div
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block text-center ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isActive
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? 'Verified ✓' : isActive ? 'Active 🔄' : 'Queued ⏳'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Drawer / Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>Stage {stages[selectedStageIndex].id} Deep Dive:</span>
              <strong className="text-slate-900">{stages[selectedStageIndex].title}</strong>
              <span className="text-slate-500">({stages[selectedStageIndex].symbol})</span>
            </div>
            <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
              {stages[selectedStageIndex].notes}
            </p>
            <div className="text-[11px] text-slate-500 pt-0.5">
              Key Stakeholder / Verifier: <strong>{stages[selectedStageIndex].actor}</strong>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700">
              Target: {stages[selectedStageIndex].date}
            </span>
            {stages[selectedStageIndex].id >= 5 && (
              <Link to="/ground-deployment">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Ground Deployment & Verification →
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 3. MILESTONE DASHBOARD */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Technical Milestones & Proofs</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Milestone Dashboard</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Grant capital is released incrementally upon student submission and faculty mentor technical review.
            </p>
          </div>

          {/* Quick Upload action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenUpload(2, 'document')}
              className="text-xs"
              icon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
            >
              Upload Documents
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenUpload(2, 'image')}
              className="text-xs"
              icon={<ImageIcon className="w-3.5 h-3.5 text-emerald-600" />}
            >
              Upload Images
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenUpload(2, 'video')}
              className="text-xs"
              icon={<Video className="w-3.5 h-3.5 text-rose-600" />}
            >
              Upload Demo Video
            </Button>
          </div>
        </div>

        {/* Grid of 4 Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MILESTONE 1: Design & Architecture */}
          <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-2xs space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Milestone 1
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Funding: 20% (₹12,000 Released)
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 pt-1">Design & Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                System mechanical CAD sizing, water filtration stage specs, and component selection.
              </p>
            </div>

            {/* Verification Status */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-emerald-950 font-semibold">Mentor Verification:</span>
                <span className="font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Approved
                </span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-normal">
                Approved by Dr. S. K. Mahato on 2026-09-08. CAD flow calculations and filtration staging validated against BIS:10500 standards.
              </p>
            </div>

            {/* Attached Proofs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Submitted Verification Proofs:
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">CAD_Schematics_WaterPurifier_v2.dwg</div>
                      <div className="text-[10px] text-slate-500">4.2 MB • Verified Schematics</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Chemical_Assay_Baseline_Report.pdf</div>
                      <div className="text-[10px] text-slate-500">1.5 MB • NABL Certified Lab</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MILESTONE 2: Working Prototype */}
          <div
            className={`bg-white rounded-3xl border p-6 shadow-2xs space-y-5 relative overflow-hidden transition-all ${
              m2Status === 'approved'
                ? 'border-emerald-300'
                : m2Status === 'changes_requested'
                ? 'border-rose-400 ring-2 ring-rose-200'
                : 'border-purple-400 ring-2 ring-purple-100'
            }`}
          >
            <div
              className={`absolute top-0 right-0 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 ${
                m2Status === 'approved'
                  ? 'bg-emerald-600'
                  : m2Status === 'changes_requested'
                  ? 'bg-rose-600'
                  : m2Status === 'submitted'
                  ? 'bg-blue-600'
                  : 'bg-purple-600'
              }`}
            >
              {m2Status === 'approved' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Approved
                </>
              ) : m2Status === 'changes_requested' ? (
                <>
                  <AlertCircle className="w-3 h-3" /> Changes Requested
                </>
              ) : m2Status === 'submitted' ? (
                <>
                  <Clock className="w-3 h-3" /> In Mentor Review
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" /> In Progress
                </>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  Milestone 2
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Funding: 40% (₹24,000)
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 pt-1">Working Prototype</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fabrication of solar pumping assembly, filtration chamber, and flow sensor.
              </p>
            </div>

            {/* Required Proof Checklist */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Required Proof Checklist:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    milestone2Proofs.some((p) => p.type === 'image')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span className="font-semibold">Prototype images</span>
                </div>

                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    milestone2Proofs.some((p) => p.type === 'document')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span className="font-semibold">Testing report</span>
                </div>

                <div
                  className={`p-2 rounded-xl border flex items-center gap-2 ${
                    milestone2Proofs.some((p) => p.type === 'video')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/80 border-amber-200 text-amber-900'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                      milestone2Proofs.some((p) => p.type === 'video')
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {milestone2Proofs.some((p) => p.type === 'video') ? '✓' : '!'}
                  </div>
                  <span className="font-semibold">Demo video</span>
                </div>
              </div>
            </div>

            {/* Submitted Proofs List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">
                  Uploaded Proofs ({milestone2Proofs.length})
                </span>
                <span className="text-[11px] text-purple-700 font-semibold">
                  {m2Status === 'approved' ? 'Verified by Mentor' : 'Live Submission'}
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {milestone2Proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                        {proof.type === 'document' ? (
                          <FileText className="w-4 h-4" />
                        ) : proof.type === 'image' ? (
                          <ImageIcon className="w-4 h-4" />
                        ) : (
                          <Video className="w-4 h-4" />
                        )}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">{proof.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {proof.fileName} • {proof.fileSize} • {proof.uploadedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Attached
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Buttons for M2 */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">Allow uploads for:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleOpenUpload(2, 'document')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" /> Documents
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpload(2, 'image')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> Images
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpload(2, 'video')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5 text-rose-600" /> Demo Video
                </button>
              </div>
            </div>
          </div>

          {/* MILESTONE 3: Field Pilot */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {m3Status === 'in_progress'
                ? 'In Progress'
                : m3Status === 'submitted'
                ? 'Under Review'
                : m3Status === 'approved'
                ? 'Completed'
                : 'Pending'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  Milestone 3
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  Funding: 30% (₹18,000)
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 pt-1">Field Pilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Testing unit under field turbidity conditions in Khunti hamlet.
              </p>
            </div>

            {/* Required Proof Checklist */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Required Proof Checklist:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-xl border bg-white border-slate-200 text-slate-600 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300 text-slate-700 flex items-center justify-center text-[10px]">
                    •
                  </div>
                  <span className="font-semibold">Deployment evidence</span>
                </div>

                <div className="p-2 rounded-xl border bg-white border-slate-200 text-slate-600 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300 text-slate-700 flex items-center justify-center text-[10px]">
                    •
                  </div>
                  <span className="font-semibold">Field testing report</span>
                </div>

                <div className="p-2 rounded-xl border bg-white border-slate-200 text-slate-600 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300 text-slate-700 flex items-center justify-center text-[10px]">
                    •
                  </div>
                  <span className="font-semibold">Local verification</span>
                </div>
              </div>
            </div>

            {/* Upload Buttons for M3 */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">Pilot uploads:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleOpenUpload(3, 'document')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" /> Documents
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpload(3, 'image')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> Images
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpload(3, 'video')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5 text-rose-600" /> Demo Video
                </button>
              </div>
            </div>
          </div>

          {/* MILESTONE 4: Final Deployment */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {m4Status === 'approved' ? 'Completed' : 'Pending'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  Milestone 4
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  Funding: 10% (₹6,000)
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 pt-1">Final Deployment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handover to Gram Panchayat with citizen audit and training local youth for maintenance.
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Final Deliverables & Handover:
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Gram Panchayat resolution and formal asset transfer certificate.</li>
                <li>Digital social audit sign-off by village beneficiary committee.</li>
                <li>Local maintenance SOP manual in Hindi with replacement spares.</li>
              </ul>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Unlocks upon completion and verified field pilot sign-off.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MENTOR APPROVAL SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Governance & Technical Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Faculty Mentor Review</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Dr. S. K. Mahato, Professor (Mechanical), R.D. Engineering College
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-900/60 border border-purple-700/60 text-purple-200">
              Evaluating: <strong>Milestone 2 (Working Prototype)</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Mentor Evaluation Rubric
                </span>
                <span className="text-emerald-400 font-semibold">2 of 3 Criteria Satisfied</span>
              </div>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Physical solar pumping assembly and filtration chamber fabricated.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Baseline water assay confirms acceptable turbidity and flow rate.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Continuous 24-hour sensor telemetry demonstration video required.</span>
                </li>
              </ul>
            </div>

            {mentorComment && (
              <div className="bg-purple-900/40 border border-purple-600/50 rounded-2xl p-4 text-xs text-purple-200 space-y-1">
                <strong className="block text-white font-bold">Latest Mentor Statement:</strong>
                <p className="leading-relaxed">{mentorComment}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 bg-slate-800/60 p-5 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
              Faculty Action on Milestone 2
            </div>

            <div className="space-y-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setReviewModalOpen('approve')}
                className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve Milestone
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => setReviewModalOpen('request_changes')}
                className="w-full justify-center text-rose-300 border-rose-500/40 hover:bg-rose-950/40 hover:text-rose-200 text-xs font-bold"
                icon={<AlertCircle className="w-4 h-4" />}
              >
                Request Changes
              </Button>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-normal pt-1">
              Approving dispatches the next 40% (₹24,000) tranche in the simulated project ledger.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL: UPLOAD EVIDENCE */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title={`Upload Milestone ${uploadTargetMilestone} Evidence`}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleExecuteUpload} className="space-y-5">
          {/* File Type Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setUploadType('document');
                setUploadTitle('Technical Testing Report');
                setSimulatedFileName('turbidity_and_flow_rate_test_v2.pdf');
              }}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                uploadType === 'document' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Document</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUploadType('image');
                setUploadTitle('Prototype Rig Photo');
                setSimulatedFileName('solar_filter_prototype_live_bench.jpg');
              }}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                uploadType === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Image</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUploadType('video');
                setUploadTitle('Operational Flow Demo Video');
                setSimulatedFileName('prototype_bench_demo_video.mp4');
                setVideoUrl('https://youtu.be/sample-khunti-solar-filter');
              }}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                uploadType === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-rose-600" />
              <span>Demo Video</span>
            </button>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Proof Title / Label *</label>
            <input
              type="text"
              required
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Video URL if video */}
          {uploadType === 'video' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Video Demo URL or File Stream (YouTube / Cloud Link)
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtu.be/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          )}

          {/* Simulated File selector / Dropzone */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50 space-y-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-purple-700">Selected Simulated File: </span>
              <strong className="text-slate-900 font-mono block mt-0.5">{simulatedFileName}</strong>
            </div>
            <p className="text-[11px] text-slate-400">
              Files are audited by R.D. Engineering College Department Head & Faculty Mentor.
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              Description / Testing Observations
            </label>
            <textarea
              rows={2}
              value={uploadNotes}
              onChange={(e) => setUploadNotes(e.target.value)}
              placeholder="e.g., Turbidity dropped from 24 to 2.1 NTU within 15 minutes of solar pump startup..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Upload Progress Bar if active */}
          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-purple-900">
                <span>Uploading to verification repository...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUploadModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isUploading || !uploadTitle}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              {isUploading ? 'Uploading...' : 'Confirm Upload'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: FACULTY APPROVE CONFIRMATION */}
      <Modal
        isOpen={reviewModalOpen === 'approve'}
        onClose={() => setReviewModalOpen(null)}
        title="Approve Milestone 2 (Working Prototype)"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Confirm Faculty Sign-Off</span>
            </div>
            <p className="leading-relaxed">
              You are approving the Working Prototype milestone for <strong>Tech Titans</strong> (R.D. Engineering College).
            </p>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200/80 font-mono text-[11px] text-emerald-950">
              <div>• Prototype Flow & Turbidity Specs: <strong>Passed</strong></div>
              <div>• Next Tranche Release: <strong>₹24,000 (40%)</strong></div>
              <div>• Next Stage: <strong>Field Pilot in Khunti Hamlet</strong></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            This action advances the simulated project state and notifies district administrative liaisons.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setReviewModalOpen(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleApproveMilestone}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirm Approval
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL: FACULTY REQUEST CHANGES */}
      <Modal
        isOpen={reviewModalOpen === 'request_changes'}
        onClose={() => setReviewModalOpen(null)}
        title="Request Changes for Milestone 2"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <strong className="block text-amber-950 font-bold">Feedback to Student Team:</strong>
            <p>
              Please specify the technical revisions or additional evidence required before milestone approval.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              Mentor Revision Instructions *
            </label>
            <textarea
              rows={4}
              value={changeRequestNotes}
              onChange={(e) => setChangeRequestNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setReviewModalOpen(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleRequestChanges}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Change Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
