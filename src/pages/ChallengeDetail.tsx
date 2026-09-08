import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  Award,
  MapPin,
  Calendar,
  Building2,
  Users,
  Coins,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  ThumbsUp,
  Cpu,
  Target,
  Layers,
  Copy,
  Clock,
  Clock3,
  Lock,
  FileText,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    problems,
    getProblemById,
    getProblemByTrackingCode,
    submitAdoptionRequest,
    approveFacultyAdoption,
    updateProblemStage,
    addNotification,
  } = useApp();

  const problem = getProblemById(id || '') || getProblemByTrackingCode(id || '');

  // Adoption modal state
  const [adoptModalOpen, setAdoptModalOpen] = useState(false);
  const [collegeName, setCollegeName] = useState('R.D. Engineering College');
  const [teamName, setTeamName] = useState('Tech Titans');
  const [teamLeader, setTeamLeader] = useState('Ankit Kumar');
  const [teamMembers, setTeamMembers] = useState('Priya Singh, Rahul Verma, Sneha Soren');
  const [facultyMentor, setFacultyMentor] = useState('Dr. S. K. Mahato, Professor (Mechanical)');
  const [projectType, setProjectType] = useState('Final Year B.Tech Capstone Project');
  const [formError, setFormError] = useState('');

  // CSR modal state
  const [csrModalOpen, setCsrModalOpen] = useState(false);
  const [corporateName, setCorporateName] = useState('Tata Steel Foundation');
  const [grantAmount, setGrantAmount] = useState('150000');

  if (!problem) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <Award className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Challenge Not Found</h2>
        <p className="text-sm text-slate-500">The requested societal challenge could not be found.</p>
        <Link to="/challenges" className="inline-block">
          <Button variant="outline" size="sm">
            Back to Open Challenges
          </Button>
        </Link>
      </div>
    );
  }

  const isAdopted = !!problem.adoptedTeam || problem.currentStage === 'STUDENT_ADOPTED';
  const isPendingFaculty = problem.facultyApprovalStatus === 'PENDING_FACULTY_APPROVAL';
  const isFunded = !!problem.csrSponsorship;

  const currentTeamName = problem.adoptedTeam?.teamName || problem.adoptionRequest?.teamName;
  const currentCollegeName = problem.adoptedTeam?.universityName || problem.adoptionRequest?.collegeName;

  // Find similar problems based on AI candidate or same category
  const similarProblems = problems.filter((p) => {
    if (p.id === problem.id) return false;
    if (problem.aiAnalysis?.duplicateCandidateId === p.id) return true;
    if (p.aiAnalysis?.duplicateCandidateId === problem.id) return true;
    return p.category === problem.category;
  });

  const citizensCount = problem.citizensAffected || (problem.votesCount ? problem.votesCount * 12 : 650);

  const prefillExample = () => {
    setCollegeName('R.D. Engineering College');
    setTeamName('Tech Titans');
    setTeamLeader('Ankit Kumar');
    setTeamMembers('Priya Singh, Rahul Verma, Sneha Soren');
    setFacultyMentor('Dr. S. K. Mahato, Professor (Mechanical)');
    setProjectType('Final Year B.Tech Capstone Project');
  };

  const handleAdoptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim() || !teamName.trim() || !teamLeader.trim() || !facultyMentor.trim()) {
      setFormError('Please fill in all mandatory fields.');
      return;
    }

    const membersArray = teamMembers
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    submitAdoptionRequest(problem.id, {
      collegeName: collegeName.trim(),
      teamName: teamName.trim(),
      teamLeader: teamLeader.trim(),
      teamMembers: membersArray,
      facultyMentor: facultyMentor.trim(),
      projectType: projectType.trim(),
    });

    setAdoptModalOpen(false);
  };

  const handleApproveFaculty = () => {
    approveFacultyAdoption(problem.id);
  };

  const handleCsrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(grantAmount) || 150000;

    updateProblemStage(problem.id, 'CSR_FUNDED', {
      csrSponsorship: {
        partnerId: `csr-${Date.now()}`,
        corporateName,
        programName: 'Jharkhand Societal Innovation Grant',
        fundedAmountInr: amount,
        totalGrantRequiredInr: amount,
        mouSignedDate: new Date().toISOString().split('T')[0],
        representativeName: 'CSR Operations Head',
        status: 'fully_funded',
      },
    });

    addNotification({
      title: 'CSR Grant Committed',
      message: `Grant of ₹${amount.toLocaleString('en-IN')} committed by ${corporateName}.`,
      type: 'success',
      trackingCode: problem.trackingCode,
    });

    setCsrModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/challenges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Societal Challenges</span>
        </Link>

        {/* Academic credit mapping notice */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Academic Credit Mapping — Subject to College/HOD Approval</span>
        </div>
      </div>

      {/* Main Challenge Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-slate-900 text-amber-300 px-3 py-1 rounded-xl">
              {problem.trackingCode}
            </span>
            <PriorityBadge priority={problem.priority} />
            <CategoryBadge nameEn={problem.category.replace('_', ' ')} nameHi={problem.categoryHi} />
          </div>

          <StatusBadge stage={problem.currentStage} size="lg" />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {problem.title}
          </h1>
          {problem.titleHi && (
            <p className="text-sm text-slate-500 font-medium mt-1">{problem.titleHi}</p>
          )}
        </div>

        {/* Academic Credit Banner */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900">
              Academic Credit Mapping — Subject to College/HOD Approval
            </span>
            <p className="text-amber-800 text-[11px] mt-0.5">
              Academic credits are not automatically awarded by this portal. Official degree credits or elective exemptions require formal sign-off by your college faculty mentor or Head of Department (HOD).
            </p>
          </div>
        </div>

        {/* Adoption Status Notification Banner */}
        {isAdopted ? (
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-300 text-xs text-cyan-950 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-900">
                <GraduationCap className="w-5 h-5 text-cyan-700" />
                <span>Adopted by {currentTeamName || 'Tech Titans'}</span>
              </div>
              <span className="px-2.5 py-0.5 bg-cyan-200/80 text-cyan-900 font-bold rounded-lg text-[11px]">
                Active Project
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-cyan-200 text-cyan-900">
              <div>
                <strong>College / Institution:</strong> {currentCollegeName || 'R.D. Engineering College'}
              </div>
              <div>
                <strong>Faculty Mentor:</strong> {problem.adoptedTeam?.facultyMentor || 'Dr. S. K. Mahato'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-100/70 text-cyan-950 font-bold flex items-center gap-2 mt-2">
              <Lock className="w-4 h-4 text-cyan-800 shrink-0" />
              <span>Other teams cannot independently adopt this challenge while the project is active.</span>
            </div>

            <div className="pt-2">
              <Link to="/project-lifecycle">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-cyan-800 hover:bg-cyan-900 text-white font-bold"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  View Project Lifecycle & Milestone Dashboard (प्रोजेक्ट लाइफसाइकिल देखें)
                </Button>
              </Link>
            </div>
          </div>
        ) : isPendingFaculty ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <Clock3 className="w-5 h-5 text-amber-700" />
                <span>Status: Pending Faculty Approval</span>
              </div>
              <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 font-bold rounded-lg text-[11px]">
                Awaiting Mentor Sign-off
              </span>
            </div>

            <p className="text-amber-900 text-xs">
              Adoption proposal submitted by team <strong>{currentTeamName || 'Tech Titans'}</strong> (
              {currentCollegeName || 'R.D. Engineering College'}) under faculty mentor{' '}
              <strong>{problem.adoptionRequest?.facultyMentor || 'Dr. S. K. Mahato'}</strong>.
            </p>

            {/* Simulated Faculty Approval Control for Evaluators */}
            <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-amber-800 italic">
                (Evaluator Demo Simulator: Trigger faculty review sign-off)
              </span>
              <Button
                variant="primary"
                size="sm"
                className="bg-amber-700 hover:bg-amber-800 text-white"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleApproveFaculty}
              >
                Approve as Faculty / HOD
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span>Status: Open for College Adoption</span>
              </div>
              <p className="text-emerald-800 text-xs">
                Verified challenge ready to be adopted by student & faculty engineering teams.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={<GraduationCap className="w-4 h-4" />}
              onClick={() => {
                setFormError('');
                setAdoptModalOpen(true);
              }}
            >
              Adopt as Project
            </Button>
          </div>
        )}

        {/* 1. Problem Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            1. Problem Description (समस्या विवरण):
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {problem.description}
          </p>
          {problem.descriptionHi && (
            <p className="text-xs text-slate-500 italic pl-1">{problem.descriptionHi}</p>
          )}
        </div>

        {/* 2. Multimedia Evidence */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            2. Multimedia Evidence (जमीनी साक्ष्य एवं तस्वीरें):
          </h3>
          {problem.evidence && problem.evidence.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problem.evidence.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative group"
                >
                  <img
                    src={ev.url}
                    alt={ev.caption || 'Field evidence photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {ev.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-xs text-white p-2.5 text-xs">
                      <span className="font-semibold">{ev.caption}</span>
                      <div className="text-[10px] text-slate-300 mt-0.5">
                        Uploaded: {new Date(ev.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No media evidence uploaded.</p>
          )}
        </div>

        {/* 3. Location Details */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            3. Location Details (भौगोलिक स्थान):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">District (जिला):</span>
              <strong className="text-slate-900 text-sm">{problem.district}</strong>
              <div className="text-slate-500 text-[11px]">Block: {problem.block}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Village / Ward:</span>
              <strong className="text-slate-900 text-sm">{problem.villageOrWard}</strong>
              <div className="text-slate-500 text-[11px]">Tola / Hamlet Level</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Coordinates:</span>
              <strong className="text-slate-900 text-sm font-mono">
                {problem.coordinates?.lat.toFixed(3)}° N, {problem.coordinates?.lng.toFixed(3)}° E
              </strong>
              <div className="text-emerald-700 text-[11px] font-semibold">GPS Verified</div>
            </div>
          </div>
        </div>

        {/* 4. Citizen Impact */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            4. Citizen Impact (नागरिक प्रभाव व जनसमर्थन):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200 text-blue-950">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                <Users className="w-4 h-4" />
                <span>Citizens Affected:</span>
              </div>
              <div className="text-xl font-black text-blue-900">
                {citizensCount.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-blue-800 mt-0.5">
                Local villagers and school children directly impacted daily.
              </p>
            </div>

            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-amber-950">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
                <ThumbsUp className="w-4 h-4" />
                <span>Citizen Upvotes:</span>
              </div>
              <div className="text-xl font-black text-amber-900">
                {problem.votesCount} Endorsements
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Co-signed by local Gram Panchayat residents and Anganwadi.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-emerald-950">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                <Coins className="w-4 h-4" />
                <span>Estimated Grant:</span>
              </div>
              <div className="text-xl font-black text-emerald-900">
                ₹{(problem.adminVerification?.estimatedBudgetInr || 150000).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                CSR prototyping grant earmarked for adoption team.
              </p>
            </div>
          </div>
        </div>

        {/* 5. AI Category & Analysis */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            5. AI Category & Analysis (एआई विश्लेषण):
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-900">
                  AI Category: {problem.aiAnalysis?.categorySuggested || problem.category}
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded-full text-[11px]">
                Confidence: {Math.round((problem.aiAnalysis?.confidenceScore || 0.95) * 100)}%
              </span>
            </div>

            {problem.aiAnalysis?.keyKeywords && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="font-semibold text-slate-600">Extracted Keywords:</span>
                {problem.aiAnalysis.keyKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded-md font-mono text-[11px] text-slate-700"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 6. Priority & Urgency */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            6. Priority & Administrative Urgency:
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PriorityBadge priority={problem.priority} />
                <span className="font-bold text-slate-900">
                  {problem.priority.toUpperCase()} PRIORITY
                </span>
              </div>
              <p className="text-slate-600 text-xs">
                {problem.aiAnalysis?.urgencyReasoning ||
                  'Essential civil need affecting health and wellbeing of local population.'}
              </p>
            </div>
            {problem.adminVerification && (
              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                <span className="text-[11px] text-slate-500 block">Verified By:</span>
                <strong className="text-slate-900">{problem.adminVerification.verifiedBy}</strong>
                <div className="text-[11px] text-slate-500">
                  {problem.adminVerification.officerDesignation}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7. Current Status & Workflow */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            7. Current Status & Lifecycle:
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Platform Stage:</span>
              <StatusBadge stage={problem.currentStage} size="lg" />
            </div>
            <div className="text-right text-slate-600">
              <span className="text-slate-500 block mb-0.5">Last Updated:</span>
              <strong className="text-slate-900">
                {new Date(problem.reportedAt).toLocaleDateString()}
              </strong>
            </div>
          </div>
        </div>

        {/* 8. Expected Outcome */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            8. Expected Outcome (अपेक्षित परिणाम व परिणाम-मानक):
          </h3>
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <div className="font-bold text-emerald-900 flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-emerald-700" />
              <span>Measurable Solution Deliverables:</span>
            </div>
            <p className="text-emerald-900 text-xs leading-relaxed">
              {problem.expectedOutcome ||
                'A low-cost, durable hardware/software prototype addressing the core problem on the ground, validated in laboratory tests and field-tested with local Gram Panchayat sign-off.'}
            </p>
          </div>
        </div>

        {/* 9. Similar Problems & Duplicate Candidates */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              9. Similar Problems & Cluster (समान समस्याएं):
            </h3>
            {problem.aiAnalysis?.duplicateDetected && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                AI Duplicate Cluster Detected ({Math.round((problem.aiAnalysis.duplicateSimilarityScore || 0.87) * 100)}% Match)
              </span>
            )}
          </div>

          {similarProblems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {similarProblems.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/challenges/${sim.id}`}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all bg-slate-50/70 text-xs block group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono font-bold text-emerald-800 text-[11px]">
                      {sim.trackingCode}
                    </span>
                    <span className="text-[10px] text-slate-500">{sim.district}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {sim.title}
                  </h4>
                  <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">
                    {sim.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 italic">
              Unique problem profile. No direct duplicate cluster found.
            </div>
          )}
        </div>
      </div>

      {/* Stakeholder Dual Action Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Adoption Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-cyan-100 text-cyan-800 rounded-xl">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Student / University Project Adoption
                </h3>
                <span className="text-xs text-slate-500">Academic Project & Research</span>
              </div>
            </div>

            {isAdopted ? (
              <div className="p-3.5 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs space-y-1.5 text-cyan-950">
                <div className="font-bold text-cyan-900">
                  Adopted by {currentTeamName || 'Tech Titans'}
                </div>
                <div className="text-[11px] text-cyan-800">
                  College: {currentCollegeName || 'R.D. Engineering College'}
                </div>
                <div className="text-[11px] text-cyan-800">
                  Mentor: {problem.adoptedTeam?.facultyMentor || 'Dr. S. K. Mahato'}
                </div>
                <div className="pt-2 text-[11px] text-cyan-900 font-medium">
                  Other teams cannot independently adopt this challenge while the project is active.
                </div>
              </div>
            ) : isPendingFaculty ? (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-2 text-amber-950">
                <div className="font-bold text-amber-900">
                  Status: Pending Faculty Approval
                </div>
                <p className="text-[11px] text-amber-800">
                  Proposal submitted by team {currentTeamName || 'Tech Titans'}. Awaiting mentor sign-off.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  onClick={handleApproveFaculty}
                >
                  Simulate Faculty Approval
                </Button>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                Eligible for student teams from engineering colleges, polytechnics, and universities to adopt for capstone projects, final year theses, or state innovation competitions.
              </p>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            {!isAdopted && !isPendingFaculty && (
              <Button
                variant="primary"
                size="md"
                fullWidth
                icon={<GraduationCap className="w-4 h-4" />}
                onClick={() => {
                  setFormError('');
                  setAdoptModalOpen(true);
                }}
              >
                Adopt as Project
              </Button>
            )}
          </div>
        </div>

        {/* CSR Funding Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Corporate CSR Partnership
                </h3>
                <span className="text-xs text-slate-500">Industry Grant & Equipment</span>
              </div>
            </div>

            {isFunded && problem.csrSponsorship ? (
              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl text-xs space-y-1 text-purple-950">
                <div className="font-bold text-purple-900">
                  Sponsor: {problem.csrSponsorship.corporateName}
                </div>
                <div className="text-[11px] text-purple-800">
                  Committed: ₹{problem.csrSponsorship.fundedAmountInr.toLocaleString('en-IN')}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                Industry partners (Tata Steel, CCL, SAIL, NTPC) can support prototyping and deployment with CSR innovation grants.
              </p>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            {!isFunded ? (
              <Button
                variant="saffron"
                size="md"
                fullWidth
                icon={<Coins className="w-4 h-4" />}
                onClick={() => setCsrModalOpen(true)}
              >
                Pledge CSR Grant
              </Button>
            ) : (
              <Link to="/csr-portal">
                <Button variant="outline" size="md" fullWidth>
                  View in CSR Portal
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {adoptModalOpen && (
        <Modal
          isOpen={adoptModalOpen}
          onClose={() => setAdoptModalOpen(false)}
          title="Adopt Challenge as Academic Project"
          titleHi="परियोजना अंगीकरण फॉर्म"
          maxWidth="lg"
        >
          <form onSubmit={handleAdoptSubmit} className="space-y-4">
            {/* Context Box */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs">
              <span className="font-mono text-emerald-800 font-bold">
                {problem.trackingCode}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-0.5">{problem.title}</h4>
              <p className="text-slate-500 mt-1">
                District: <strong>{problem.district}</strong> • Citizens Affected:{' '}
                <strong>{citizensCount.toLocaleString('en-IN')}</strong>
              </p>
            </div>

            {/* Quick prefill button */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <div className="text-xs">
                <span className="font-bold text-emerald-900">Quick Example:</span>
                <span className="text-emerald-700 ml-1">Tech Titans • R.D. Engineering College</span>
              </div>
              <button
                type="button"
                onClick={prefillExample}
                className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-lg shadow-2xs hover:bg-emerald-100"
              >
                Auto Fill
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                {formError}
              </div>
            )}

            {/* College Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College Name *
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. R.D. Engineering College"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Team Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Team Name *
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Tech Titans"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Team Leader & Faculty Mentor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Team Leader *
                </label>
                <input
                  type="text"
                  required
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                  placeholder="e.g. Ankit Kumar"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Faculty Mentor *
                </label>
                <input
                  type="text"
                  required
                  value={facultyMentor}
                  onChange={(e) => setFacultyMentor(e.target.value)}
                  placeholder="e.g. Dr. S. K. Mahato, Professor (Mechanical)"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Team Members (Comma-separated)
              </label>
              <input
                type="text"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                placeholder="e.g. Priya Singh, Rahul Verma, Sneha Soren"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Project Type *
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Final Year B.Tech Capstone Project">
                  Final Year B.Tech Capstone Project
                </option>
                <option value="M.Tech Thesis Innovation">M.Tech Thesis Innovation</option>
                <option value="Polytechnic Diploma Final Project">
                  Polytechnic Diploma Final Project
                </option>
                <option value="Interdisciplinary Multi-Department Project">
                  Interdisciplinary Multi-Department Project
                </option>
              </select>
            </div>

            {/* Mandatory Academic Credit Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Academic Credit Mapping — Subject to College/HOD Approval</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Academic credits are not automatically awarded by this portal. Formal credit recognition is determined by your college and department HOD.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAdoptModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={<GraduationCap className="w-4 h-4" />}
              >
                Submit for Faculty Approval
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* CSR Grant Modal */}
      {csrModalOpen && (
        <Modal
          isOpen={csrModalOpen}
          onClose={() => setCsrModalOpen(false)}
          title="Pledge CSR Innovation Grant"
          titleHi="सीएसआर अनुदान पंजीकरण"
          maxWidth="md"
        >
          <form onSubmit={handleCsrSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Corporate Sponsor Name</label>
              <input
                type="text"
                required
                value={corporateName}
                onChange={(e) => setCorporateName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Grant Amount (₹)</label>
              <input
                type="number"
                required
                value={grantAmount}
                onChange={(e) => setGrantAmount(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCsrModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="saffron" size="sm" type="submit">
                Confirm Grant Pledge
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
