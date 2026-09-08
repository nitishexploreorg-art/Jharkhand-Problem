import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/domain/ChallengeCard';
import { JHARKHAND_CATEGORIES, JHARKHAND_DISTRICTS } from '../data/jharkhandData';
import { Problem } from '../types';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { TextInput, SelectInput, TextArea } from '../components/common/FormFields';
import {
  Award,
  Filter,
  Search,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
  SlidersHorizontal,
  Clock,
  Lock,
  Building2,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';

const SKILL_OPTIONS = [
  'All Skills',
  'Water Filtration & Chemistry',
  'IoT & Telemetry',
  'CAD & Mechanical Design',
  'Solar PV Systems',
  'Air Quality Sensors',
  'Machine Design',
  'Structural Engineering',
  'Embedded Systems',
];

const PROJECT_TYPE_OPTIONS = [
  'All Types',
  'Final Year B.Tech / Capstone Innovation',
  'M.Tech / University Research Lab',
  'Polytechnic / Diploma Final Year Project',
  'Interdisciplinary B.Tech / Civil & Electronics Capstone',
  'Student Innovation Grant & Prototype',
];

export const Challenges: React.FC = () => {
  const { problems, submitAdoptionRequest, approveFacultyAdoption, addNotification } = useApp();

  // Filters
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('All Skills');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  // Adoption modal state
  const [adoptingProblem, setAdoptingProblem] = useState<Problem | null>(null);
  const [collegeName, setCollegeName] = useState('R.D. Engineering College');
  const [teamName, setTeamName] = useState('Tech Titans');
  const [teamLeader, setTeamLeader] = useState('Ankit Kumar');
  const [teamMembers, setTeamMembers] = useState('Priya Singh, Rahul Verma, Sneha Soren');
  const [facultyMentor, setFacultyMentor] = useState('Dr. S. K. Mahato, Professor (Mechanical)');
  const [projectType, setProjectType] = useState('Final Year B.Tech Capstone Project');
  const [formError, setFormError] = useState('');

  // Quick helper: Apply requested example filter (District: Khunti, Category: Water & Sanitation)
  const applyExampleFilter = () => {
    setSelectedDistrict('Khunti');
    setSelectedCategory('water_sanitation');
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSelectedSkill('All Skills');
    setSelectedProjectType('All Types');
    setSearchQuery('');
    addNotification({
      title: 'फ़िल्टर लागू (Filter Applied)',
      message: 'Example Filter Applied: District = Khunti • Category = Water & Sanitation',
      type: 'info',
    });
  };

  const resetAllFilters = () => {
    setSelectedDistrict('all');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSelectedSkill('All Skills');
    setSelectedProjectType('All Types');
    setSearchQuery('');
  };

  // Filter problems for student challenges
  const filteredChallenges = useMemo(() => {
    return problems.filter((p) => {
      // Eligible stages: from verified onwards
      const isChallengeEligible = [
        'ADMIN_VERIFIED',
        'CHALLENGE_PUBLISHED',
        'STUDENT_ADOPTED',
        'CSR_FUNDED',
        'IN_DEVELOPMENT',
        'GROUND_DEPLOYED',
        'CITIZEN_AUDIT',
        'RESOLVED',
      ].includes(p.currentStage);

      if (!isChallengeEligible) return false;

      // District Filter
      if (
        selectedDistrict !== 'all' &&
        p.district.toLowerCase() !== selectedDistrict.toLowerCase()
      ) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Priority Filter
      if (selectedPriority !== 'all' && p.priority !== selectedPriority) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'all') {
        const isAdopted = !!p.adoptedTeam || p.currentStage === 'STUDENT_ADOPTED';
        const isPending = p.facultyApprovalStatus === 'PENDING_FACULTY_APPROVAL';

        if (selectedStatus === 'open' && (isAdopted || isPending)) return false;
        if (selectedStatus === 'pending_faculty' && !isPending) return false;
        if (selectedStatus === 'adopted' && !isAdopted) return false;
        if (
          selectedStatus === 'resolved' &&
          !['GROUND_DEPLOYED', 'CITIZEN_AUDIT', 'RESOLVED'].includes(p.currentStage)
        ) {
          return false;
        }
      }

      // Required Skill Filter
      if (selectedSkill !== 'All Skills') {
        const skills = p.requiredSkills || [];
        const hasSkill = skills.some((s) =>
          s.toLowerCase().includes(selectedSkill.toLowerCase())
        );
        if (!hasSkill) return false;
      }

      // Project Type Filter
      if (selectedProjectType !== 'All Types') {
        const pType = p.projectType || '';
        if (
          !pType.toLowerCase().includes(selectedProjectType.toLowerCase().slice(0, 10))
        ) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          p.title.toLowerCase().includes(q) || (p.titleHi && p.titleHi.toLowerCase().includes(q));
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCode = p.trackingCode.toLowerCase().includes(q);
        const matchSkills = (p.requiredSkills || []).some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCode && !matchSkills) return false;
      }

      return true;
    });
  }, [
    problems,
    selectedDistrict,
    selectedCategory,
    selectedPriority,
    selectedStatus,
    selectedSkill,
    selectedProjectType,
    searchQuery,
  ]);

  // Open adoption modal
  const handleOpenAdoptModal = (problem: Problem) => {
    setAdoptingProblem(problem);
    setFormError('');
  };

  // Prefill Example Data
  const prefillExampleTeam = () => {
    setCollegeName('R.D. Engineering College');
    setTeamName('Tech Titans');
    setTeamLeader('Ankit Kumar');
    setTeamMembers('Priya Singh, Rahul Verma, Sneha Soren');
    setFacultyMentor('Dr. S. K. Mahato, Professor (Mechanical)');
    setProjectType('Final Year B.Tech Capstone Project');
  };

  // Submit Adoption Form
  const handleAdoptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adoptingProblem) return;

    if (!collegeName.trim() || !teamName.trim() || !teamLeader.trim() || !facultyMentor.trim()) {
      setFormError('Please complete all required fields (College, Team, Leader, Mentor).');
      return;
    }

    const membersArray = teamMembers
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    submitAdoptionRequest(adoptingProblem.id, {
      collegeName: collegeName.trim(),
      teamName: teamName.trim(),
      teamLeader: teamLeader.trim(),
      teamMembers: membersArray,
      facultyMentor: facultyMentor.trim(),
      projectType: projectType.trim(),
    });

    setAdoptingProblem(null);
  };

  const isExampleFilterActive =
    selectedDistrict === 'Khunti' && selectedCategory === 'water_sanitation';

  const hasAnyFilterActive =
    selectedDistrict !== 'all' ||
    selectedCategory !== 'all' ||
    selectedPriority !== 'all' ||
    selectedStatus !== 'all' ||
    selectedSkill !== 'All Skills' ||
    selectedProjectType !== 'All Types' ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            <span>झारखंड राज्य विश्वविद्यालय नवाचार पोर्टल • Academic Innovation Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Open Societal Challenges
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
            Discover verified societal challenges triaged by Jharkhand District Administration and adopt them as your academic capstone, thesis, or innovation project.
          </p>

          {/* Academic credit disclosure */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Academic Credit Mapping — Subject to College/HOD Approval</span>
          </div>

          {/* Search Bar + Example Filter Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges by title, skills, keywords (e.g., water, solar, lac, IoT)..."
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Example Filter Button */}
            <button
              onClick={applyExampleFilter}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                isExampleFilterActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400'
                  : 'bg-emerald-800/70 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/60'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Example Filter: Khunti + Water & Sanitation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Filter Console with All 6 Requested Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>Filter Challenges ({filteredChallenges.length} available)</span>
          </div>

          {hasAnyFilterActive && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* 6 Grid Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* 1. District */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              District (जिला):
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">All 24 Districts</option>
              <option value="Khunti">Khunti (खूंटी)</option>
              {JHARKHAND_DISTRICTS.filter((d) => d.nameEn !== 'Khunti').map((d) => (
                <option key={d.id} value={d.nameEn}>
                  {d.nameEn} ({d.nameHi})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Category */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Category (श्रेणी):
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">All Categories</option>
              {JHARKHAND_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Priority */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Priority (प्राथमिकता):
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">All Priorities</option>
              <option value="critical">🚨 Critical (गंभीर)</option>
              <option value="high">⚠️ High (उच्च)</option>
              <option value="medium">Medium (मध्यम)</option>
              <option value="low">Low (सामान्य)</option>
            </select>
          </div>

          {/* 4. Status */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Status (स्थिति):
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open for College Adoption</option>
              <option value="pending_faculty">Pending Faculty Approval</option>
              <option value="adopted">Adopted by Team</option>
              <option value="resolved">Deployed / Resolved</option>
            </select>
          </div>

          {/* 5. Required Skill */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Required Skill:
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {SKILL_OPTIONS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Project Type */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Project Type:
            </label>
            <select
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {PROJECT_TYPE_OPTIONS.map((ptype) => (
                <option key={ptype} value={ptype}>
                  {ptype}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Tag Pills */}
        {hasAnyFilterActive && (
          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Active Filters:</span>
            {selectedDistrict !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-lg font-semibold">
                District: {selectedDistrict}
                <button onClick={() => setSelectedDistrict('all')}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-lg font-semibold">
                Category: {selectedCategory.replace('_', ' ')}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 hover:text-emerald-950" />
                </button>
              </span>
            )}
            {selectedPriority !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-lg font-semibold">
                Priority: {selectedPriority}
                <button onClick={() => setSelectedPriority('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-lg font-semibold">
                Status: {selectedStatus}
                <button onClick={() => setSelectedStatus('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSkill !== 'All Skills' && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-lg font-semibold">
                Skill: {selectedSkill}
                <button onClick={() => setSelectedSkill('All Skills')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedProjectType !== 'All Types' && (
              <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-lg font-semibold">
                Project: {selectedProjectType}
                <button onClick={() => setSelectedProjectType('All Types')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((problem) => (
            <ChallengeCard
              key={problem.id}
              problem={problem}
              onAdoptClick={handleOpenAdoptModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <Award className="w-12 h-12 text-slate-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-800">No Matching Challenges Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No verified challenges match the current filter selection. Try adjusting or clearing your filters.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetAllFilters}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Adoption Flow Modal */}
      {adoptingProblem && (
        <Modal
          isOpen={!!adoptingProblem}
          onClose={() => setAdoptingProblem(null)}
          title="Adopt Societal Challenge as Project"
          titleHi="परियोजना के रूप में चुनौती अंगीकरण"
          maxWidth="lg"
        >
          <form onSubmit={handleAdoptionSubmit} className="space-y-4">
            {/* Selected Challenge Context */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs">
              <span className="font-mono text-emerald-800 font-bold">
                {adoptingProblem.trackingCode}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                {adoptingProblem.title}
              </h4>
              <p className="text-slate-500 mt-1">
                District: <strong>{adoptingProblem.district}</strong> • Citizens Affected:{' '}
                <strong>{adoptingProblem.citizensAffected || 650}</strong>
              </p>
            </div>

            {/* Quick prefill button */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <div className="text-xs">
                <span className="font-bold text-emerald-900">Demo Quick-Fill:</span>
                <span className="text-emerald-700 ml-1">Team: Tech Titans • R.D. Engineering College</span>
              </div>
              <button
                type="button"
                onClick={prefillExampleTeam}
                className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-lg shadow-2xs hover:bg-emerald-100/60"
              >
                Auto Fill
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
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
                placeholder="e.g. R.D. Engineering College, BIT Mesra, NIT Jamshedpur"
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
                placeholder="e.g. Tech Titans, JalShakti Innovations"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Team Leader & Faculty Mentor in 2 Cols */}
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
                  placeholder="e.g. Dr. S. K. Mahato, Professor"
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
                <option value="Student Startup Incubator Prototype">
                  Student Startup Incubator Prototype
                </option>
              </select>
            </div>

            {/* Academic Credit Disclosure Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Academic Credit Mapping — Subject to College/HOD Approval</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Academic credits are not automatically awarded by this portal. Formal credit integration is subject to your department head (HOD) and university curriculum evaluation guidelines.
              </p>
            </div>

            {/* Form Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAdoptingProblem(null)}
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
    </div>
  );
};
