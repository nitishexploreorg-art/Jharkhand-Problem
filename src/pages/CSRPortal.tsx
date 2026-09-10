import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Problem } from '../types';
import { SAMPLE_CSR_PARTNERS } from '../data/jharkhandData';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import {
  Building2,
  Coins,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  Clock,
  Lock,
  AlertCircle,
  HeartHandshake,
  Cpu,
  Wrench,
  Sparkles,
  Users,
  Layers,
  ArrowDown,
  Info,
  Check,
  MapPin,
  GraduationCap,
  Briefcase,
  Search,
  Filter,
  ExternalLink,
} from 'lucide-react';

interface ProjectSupportModalState {
  isOpen: boolean;
  project: {
    id: string;
    title: string;
    location: string;
    teamName: string;
    college: string;
    requiredSupport: string;
    progress: number;
  } | null;
}

export const CSRPortal: React.FC = () => {
  const { problems, addNotification, language } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tab: string) => {
    if (tab === 'overview') {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  // Search & Filter for Project Cards
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  // Support Project Modal State
  const [supportModal, setSupportModal] = useState<ProjectSupportModalState>({
    isOpen: false,
    project: null,
  });

  // Support Form Fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('corporate_csr');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([
    'Funding',
  ]);
  const [fundingPledgeInr, setFundingPledgeInr] = useState('60000');
  const [supportNotes, setSupportNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fallback / Featured example project if not already in context
  const featuredProject = problems.find((p) => p.id === 'jh-prb-007') || {
    id: 'jh-prb-007',
    trackingCode: 'JH-KHT-2026-0388',
    title: 'Low-Cost Solar Water Filter',
    titleHi: 'खूंटी गांव के लिए कम लागत वाला सौर जल शोधक',
    district: 'Khunti',
    districtHi: 'खूंटी',
    block: 'Ormanjhi',
    villageOrWard: 'Khunti Village, Tola 2',
    category: 'water_sanitation',
    categoryHi: 'पेयजल एवं स्वच्छता',
    priority: 'high' as const,
    currentStage: 'IN_DEVELOPMENT' as const,
    citizensAffected: 650,
    adoptedTeam: {
      teamId: 'team-tech-titans',
      teamName: 'Tech Titans',
      universityName: 'R.D. Engineering College',
      collegeName: 'R.D. Engineering College',
      facultyMentor: 'Dr. S. K. Mahato, Professor (Mechanical)',
      leadStudent: 'Ankit Kumar',
    },
    milestones: [
      {
        id: 'm1',
        number: 1,
        title: 'M1 Design & Architecture',
        titleHi: 'M1 डिजाइन व आर्किटेक्चर',
        description: 'System mechanical CAD sizing, water filtration stage specs, and component selection.',
        status: 'approved' as const,
        dueDate: '2026-09-10',
        grantReleasePercentage: 20,
      },
      {
        id: 'm2',
        number: 2,
        title: 'M2 Working Prototype',
        titleHi: 'M2 कार्यशील प्रोटोटाइप',
        description: 'Fabrication of solar pumping assembly, filtration chamber, and flow sensor.',
        status: 'in_progress' as const,
        dueDate: '2026-09-25',
        grantReleasePercentage: 40,
      },
      {
        id: 'm3',
        number: 3,
        title: 'M3 Field Pilot',
        titleHi: 'M3 फील्ड पायलट',
        description: 'Testing unit under field turbidity conditions in Khunti hamlet.',
        status: 'pending' as const,
        dueDate: '2026-10-15',
        grantReleasePercentage: 30,
      },
      {
        id: 'm4',
        number: 4,
        title: 'M4 Deployment & Validation',
        titleHi: 'M4 अधिष्ठापन एवं सत्यापन',
        description: 'Handover to Gram Panchayat with citizen audit and training local youth.',
        status: 'pending' as const,
        dueDate: '2026-11-05',
        grantReleasePercentage: 10,
      },
    ],
  };

  // Compile list of projects for project cards section
  // Ensure the requested example is first and prominent
  const verifiedProjectsList = [
    {
      id: featuredProject.id,
      title: 'Low-Cost Solar Water Filter',
      titleHi: 'खूंटी गांव के लिए कम लागत वाला सौर जल शोधक',
      location: 'Khunti, Jharkhand',
      district: 'Khunti',
      teamName: featuredProject.adoptedTeam?.teamName || 'Tech Titans',
      college: featuredProject.adoptedTeam?.collegeName || 'R.D. Engineering College',
      requiredSupport: '₹60,000',
      progress: 40,
      category: 'Water & Sanitation',
      priority: 'high' as const,
      citizensAffected: 650,
      stageLabel: 'In Development (M2)',
    },
    {
      id: 'jh-prb-001',
      title: 'High Arsenic & Iron Solar Water Purifier',
      titleHi: 'आदिवासी टोले के लिए सौर चालित जल शोधन यंत्र',
      location: 'Ranchi, Jharkhand',
      district: 'Ranchi',
      teamName: 'Team JalShakti Innovations',
      college: 'Birla Institute of Technology (BIT), Mesra',
      requiredSupport: '₹1,80,000',
      progress: 100,
      category: 'Water & Sanitation',
      priority: 'critical' as const,
      citizensAffected: 420,
      stageLabel: 'Ground Deployed',
    },
    {
      id: 'jh-prb-003',
      title: 'Submerged Causeway Flash Flood Sensor & Solar Beacon',
      titleHi: 'डूबे हुए पुलिया पर चेतावनी हेतु सोलर सेंसर',
      location: 'Hazaribagh, Jharkhand',
      district: 'Hazaribagh',
      teamName: 'IoT Responders',
      college: 'Government Polytechnic, Nirsa',
      requiredSupport: '₹45,000',
      progress: 25,
      category: 'Roads & Bridges',
      priority: 'high' as const,
      citizensAffected: 1200,
      stageLabel: 'Prototype Phase (M1)',
    },
    {
      id: 'jh-prb-002',
      title: 'Solar Cold Storage & Solar Lac Deseeder for Forest Produce',
      titleHi: 'लाह एवं महुआ प्रसंस्करण हेतु सौर ऊर्जा चालित मशीन',
      location: 'Dumka, Jharkhand',
      district: 'Dumka',
      teamName: 'AgriTech Pioneers',
      college: 'Birsa Agricultural University (BAU)',
      requiredSupport: '₹85,000',
      progress: 60,
      category: 'Forest & Tribal Livelihoods',
      priority: 'medium' as const,
      citizensAffected: 310,
      stageLabel: 'Pilot Testing (M3)',
    },
  ];

  // Filtered project list
  const filteredProjects = verifiedProjectsList.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict =
      selectedDistrict === 'ALL' || project.district === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const handleOpenSupport = (project: typeof verifiedProjectsList[0]) => {
    setSupportModal({
      isOpen: true,
      project,
    });
    setFundingPledgeInr(project.requiredSupport.replace(/[^\d]/g, '') || '60000');
    setIsSubmitted(false);
  };

  const handleToggleSupportType = (type: string) => {
    setSelectedSupportTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportModal.project) return;

    setIsSubmitted(true);
    addNotification({
      title: 'Support Expression Submitted (सीएसआर सहयोग प्रस्ताव दर्ज)',
      message: `Your support proposal for "${supportModal.project.title}" by ${supportModal.project.teamName} has been received for coordination.`,
      type: 'success',
      trackingCode: 'CSR-PLEDGE-2026',
    });

    setTimeout(() => {
      setSupportModal({ isOpen: false, project: null });
      setIsSubmitted(false);
      setOrgName('');
      setContactName('');
      setContactEmail('');
      setSupportNotes('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* HEADER */}
      <div className="bg-[#0d1e17] text-white rounded-3xl p-6 sm:p-10 border border-[#1e382b] shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#060d0a] border border-[#1e382b] text-emerald-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jharkhand State Innovation & Industry Exchange</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Industry & CSR Collaboration
          </h1>

          <p className="text-sm sm:text-base text-[#8ea598] leading-relaxed">
            Discover verified societal problems reported by citizens, adopted by collegiate engineering teams, and support high-impact student projects through non-dilutive milestone grants, technical mentorship, and field deployment partnerships.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-emerald-300">
            <span className="px-2.5 py-1 rounded-md bg-[#11231b] border border-[#1e382b] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Student Projects
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#11231b] border border-[#1e382b] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> District Admin Audited
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#11231b] border border-[#1e382b] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Phased Milestone Governance
            </span>
          </div>
        </div>
      </div>

      {/* CSR Navigation Tabs */}
      <div className="bg-[#11231b] rounded-2xl p-2 border border-[#1e382b] shadow-lg flex items-center gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => handleTabChange('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          📊 Dashboard (डैशबोर्ड)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('available')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'available'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          💡 Available Projects (उपलब्ध परियोजनाएं)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('supported')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'supported'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          🤝 Supported Projects (समर्थित परियोजनाएं)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('funding')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'funding'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          💰 Funding Structure (अनुदान संरचना)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('milestones')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'milestones'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          🎯 Milestones (माइलस्टोन्स)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('impact')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'impact'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          📈 Impact & Audit (प्रभाव एवं ऑडिट)
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('profile')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:text-white hover:bg-[#172c21]'
          }`}
        >
          🏢 Corporate Profile (कॉर्पोरेट प्रोफ़ाइल)
        </button>
      </div>

      {/* FUNDING SECTION: Milestone-Based CSR Funding */}
      <section className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-10 shadow-xl space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Transparent Grant Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Milestone-Based CSR Funding
          </h2>
          <p className="text-sm text-[#8ea598] max-w-3xl mt-1 leading-relaxed">
            Industry capital is protected through verified tranches. Grant funds are allocated against concrete technical milestones and released only upon joint review by faculty mentors and district administrative officials.
          </p>
        </div>

        {/* DEMO FLOW */}
        <div className="bg-[#0d1e17] rounded-2xl border border-[#1e382b] p-6">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4 text-center sm:text-left">
            Milestone Grant Allocation Workflow (Demo Flow)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-[#11231b] p-5 rounded-xl border border-[#1e382b] shadow-md flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-[#060d0a] text-amber-400 border border-[#1e382b] text-xs font-black flex items-center justify-center">
                  1
                </span>
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  CSR Commitment
                </h3>
                <p className="text-xs text-[#8ea598] mt-1 leading-normal">
                  Corporate partner or startup pledges financial or material sponsorship for the verified project.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-300 bg-[#060d0a] border border-[#1e382b] px-2 py-1 rounded">
                Intent & Agreement
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#11231b] p-5 rounded-xl border border-[#1e382b] shadow-md flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-[#060d0a] text-amber-400 border border-[#1e382b] text-xs font-black flex items-center justify-center">
                  2
                </span>
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  Fund Allocated/Locked for Project
                </h3>
                <p className="text-xs text-[#8ea598] mt-1 leading-normal">
                  Target grant capital is earmarked in the university project ledger earmarked for staged tranches.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-300 bg-[#060d0a] border border-[#1e382b] px-2 py-1 rounded">
                Earmarked Tranches
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#11231b] p-5 rounded-xl border border-[#1e382b] shadow-md flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-[#060d0a] text-amber-400 border border-[#1e382b] text-xs font-black flex items-center justify-center">
                  3
                </span>
                <FileCheck2 className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  Milestone Verified
                </h3>
                <p className="text-xs text-[#8ea598] mt-1 leading-normal">
                  Student team submits test proofs, CAD designs, or field data verified by faculty & district engineers.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-amber-300 bg-[#060d0a] border border-amber-700/40 px-2 py-1 rounded">
                Technical Evidence Audit
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#11231b] p-5 rounded-xl border border-[#1e382b] shadow-md flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-[#060d0a] text-amber-400 border border-[#1e382b] text-xs font-black flex items-center justify-center">
                  4
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  Funding Released
                </h3>
                <p className="text-xs text-[#8ea598] mt-1 leading-normal">
                  Verified milestone tranche is disbursed directly to team for prototype components and deployment.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-300 bg-[#060d0a] border border-emerald-700/40 px-2 py-1 rounded">
                Disbursed to Team
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED PROJECT FUND BREAKDOWN */}
        <div className="border border-[#1e382b] rounded-2xl p-6 bg-[#0d1e17] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1e382b]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Featured Milestone Allocation Breakdown</span>
              </div>
              <h3 className="text-xl font-black text-white mt-1">
                Project: Low-Cost Solar Water Filter
              </h3>
              <p className="text-xs text-[#8ea598] mt-0.5">
                Location: Khunti, Jharkhand • Student Team: Tech Titans (R.D. Engineering College)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#11231b] border border-[#1e382b] rounded-xl px-4 py-2.5 text-right">
                <span className="block text-[11px] font-bold text-[#8ea598] uppercase tracking-wider">
                  PROJECT FUND
                </span>
                <span className="text-2xl font-black text-amber-400">
                  ₹60,000
                </span>
              </div>
              <div className="bg-[#11231b] border border-[#1e382b] rounded-xl px-4 py-2.5 text-right">
                <span className="block text-[11px] font-bold text-[#8ea598] uppercase tracking-wider">
                  Current Progress
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  40%
                </span>
              </div>
            </div>
          </div>

          {/* MILESTONES LIST */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#c3d5cb] uppercase tracking-wider">
              Project Milestones & Disbursal Schedule
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* M1 */}
              <div className="p-4 rounded-xl border border-emerald-700/60 bg-emerald-950/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded">
                    M1
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Status: Completed
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">
                    Design & Architecture
                  </h5>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                    20% — ₹12,000
                  </div>
                </div>
                <p className="text-xs text-[#8ea598] leading-relaxed">
                  Water chemistry analysis, dual-stage filtration CAD column sizing, and sensor telemetry schematic.
                </p>
              </div>

              {/* M2 */}
              <div className="p-4 rounded-xl border border-amber-700/60 bg-amber-950/40 space-y-2.5 ring-1 ring-amber-500/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-amber-600 text-white px-2 py-0.5 rounded">
                    M2
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-700/50 animate-pulse">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Status: In Progress
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">
                    Working Prototype
                  </h5>
                  <div className="text-xs font-semibold text-amber-400 mt-0.5">
                    40% — ₹24,000
                  </div>
                </div>
                <p className="text-xs text-[#8ea598] leading-relaxed">
                  Assembly of solar pumping unit, physical filter enclosure, and flow-rate turbidity sensor microcontroller.
                </p>
              </div>

              {/* M3 */}
              <div className="p-4 rounded-xl border border-[#1e382b] bg-[#11231b] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-[#172c21] text-[#8ea598] px-2 py-0.5 rounded border border-[#1e382b]">
                    M3
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8ea598] bg-[#060d0a] px-2 py-0.5 rounded-full border border-[#1e382b]">
                    <Clock className="w-3 h-3" />
                    Status: Pending
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">
                    Field Pilot
                  </h5>
                  <div className="text-xs font-semibold text-[#8ea598] mt-0.5">
                    30% — ₹18,000
                  </div>
                </div>
                <p className="text-xs text-[#8ea598] leading-relaxed">
                  Stress testing unit under real ground conditions at Khunti village cluster with live continuous output.
                </p>
              </div>

              {/* M4 */}
              <div className="p-4 rounded-xl border border-[#1e382b] bg-[#11231b] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-[#172c21] text-[#8ea598] px-2 py-0.5 rounded border border-[#1e382b]">
                    M4
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8ea598] bg-[#060d0a] px-2 py-0.5 rounded-full border border-[#1e382b]">
                    <Clock className="w-3 h-3" />
                    Status: Pending
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">
                    Deployment & Validation
                  </h5>
                  <div className="text-xs font-semibold text-[#8ea598] mt-0.5">
                    10% — ₹6,000
                  </div>
                </div>
                <p className="text-xs text-[#8ea598] leading-relaxed">
                  Handover to Gram Panchayat with citizen audit and training local youth for long-term maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* REQUIRED PROTOTYPE NOTE */}
          <div className="bg-[#060d0a] border border-amber-700/50 rounded-xl p-4 flex items-start gap-3 text-amber-300">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold block text-amber-400">
                Notice on Financial Governance:
              </strong>
              "Prototype funding workflow — actual financial settlement requires approved payment/escrow infrastructure."
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT CARDS SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Collegiate Innovation Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Verified Student Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea598] mt-1">
              Explore university teams actively developing engineering prototypes for verified societal challenges.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8ea598] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project or college..."
                className="pl-9 pr-3 py-2 text-xs rounded-xl border border-[#1e382b] bg-[#0d1e17] text-white placeholder-[#8ea598] focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
              />
            </div>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-[#1e382b] bg-[#0d1e17] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Districts</option>
              <option value="Khunti">Khunti</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Dumka">Dumka</option>
              <option value="Hazaribagh">Hazaribagh</option>
            </select>
          </div>
        </div>

        {/* Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`bg-[#11231b] rounded-2xl border p-6 shadow-md flex flex-col justify-between transition-all hover:border-emerald-600/50 ${
                proj.title === 'Low-Cost Solar Water Filter'
                  ? 'border-emerald-600/70 ring-1 ring-emerald-500/30'
                  : 'border-[#1e382b]'
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-mono text-[11px] font-bold bg-[#060d0a] text-amber-400 border border-[#1e382b] px-2.5 py-0.5 rounded">
                    {proj.id === 'jh-prb-007' ? 'JH-KHT-2026-0388' : proj.id.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold bg-[#060d0a] text-emerald-300 border border-[#1e382b] px-2.5 py-0.5 rounded-full">
                      {proj.category}
                    </span>
                    <PriorityBadge priority={proj.priority} size="sm" />
                  </div>
                </div>

                {/* Project Title & Location */}
                <div>
                  <h3 className="font-black text-white text-lg leading-snug">
                    Project: {proj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#8ea598] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Problem Location: <strong className="text-white">{proj.location}</strong></span>
                  </div>
                </div>

                {/* Student Team & College */}
                <div className="bg-[#0d1e17] p-3.5 rounded-xl border border-[#1e382b] space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#8ea598]">Student Team:</span>
                    <strong className="text-white">{proj.teamName}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#8ea598]">College:</span>
                    <strong className="text-white">{proj.college}</strong>
                  </div>
                </div>

                {/* Financial Need & Progress */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8ea598]">Required Support:</span>
                    <strong className="text-amber-400 font-bold text-sm">
                      {proj.requiredSupport}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8ea598]">Progress:</span>
                    <strong className="text-emerald-400 font-bold">
                      {proj.progress}%
                    </strong>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#060d0a] rounded-full h-2.5 overflow-hidden border border-[#1e382b]">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#1e382b] flex items-center justify-between gap-3">
                <Link
                  to={proj.id === 'jh-prb-007' ? '/project-lifecycle' : `/challenges/${proj.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-xs"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    View Project
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenSupport(proj)}
                  className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  icon={<HeartHandshake className="w-3.5 h-3.5" />}
                >
                  Support Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRY PARTNER SECTION */}
      <section className="bg-[#0d1e17] text-white rounded-3xl p-6 sm:p-10 border border-[#1e382b] space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Corporate & Partner Engagement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Industry Partner Support Channels
          </h2>
          <p className="text-sm text-[#8ea598] max-w-3xl mt-1 leading-relaxed">
            Companies, CSR foundations, and technology startups can support collegiate innovation teams through diverse non-financial and financial modalities tailored to engineering requirements.
          </p>
        </div>

        {/* 6 SUPPORT TYPES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Funding */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-amber-400 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Funding</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Milestone-based non-dilutive prototype grants, student team stipends, and raw material sponsorship.
            </p>
          </div>

          {/* 2. Mentorship */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Mentorship</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Technical guidance from senior industry engineers, research scientists, and domain subject specialists.
            </p>
          </div>

          {/* 3. Technology */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Technology</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Cloud computing credits, IoT telemetry dashboards, proprietary APIs, and CAD software licenses.
            </p>
          </div>

          {/* 4. Equipment */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-amber-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Equipment</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Precision testing sensors, solar photovoltaic panels, water assay kits, and electronic controller hardware.
            </p>
          </div>

          {/* 5. Prototyping */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Prototyping</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Access to corporate FabLabs, metal CNC machining, 3D printing facilities, and industrial assembly setups.
            </p>
          </div>

          {/* 6. Deployment Support */}
          <div className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-5 space-y-2.5 hover:border-emerald-700/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#060d0a] border border-[#1e382b] text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Deployment Support</h3>
            <p className="text-xs text-[#8ea598] leading-relaxed">
              Field transportation, community liaison officers, safety validation, and local Gram Panchayat coordination.
            </p>
          </div>
        </div>

        {/* DISCLAIMER / NOTICE */}
        <div className="bg-[#060d0a] border border-[#1e382b] rounded-2xl p-4 text-[#8ea598] text-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white block mb-0.5">
              Engagement Note:
            </strong>
            The support modalities and corporate partnership categories shown above illustrate the platform's multi-stakeholder collaboration framework. Do not imply that real companies have committed funding unless real commitments exist. Formal grant execution requires approved bilateral MoUs and verified corporate governance protocols.
          </div>
        </div>
      </section>

      {/* CORPORATE PROFILE SECTION (When Profile tab is active) */}
      {activeTab === 'profile' && (
        <section className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Corporate Registration & Governance Dossier</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tata Steel Foundation — CSR Corporate Profile
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea598] mt-1">
              Jharkhand State Innovation Exchange Registered CSR Partner (MCA Registration: CSR00018429)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1e382b]">
            <div className="p-4 bg-[#0d1e17] rounded-2xl border border-[#1e382b] space-y-1">
              <span className="text-xs text-[#8ea598] font-bold block">Annual CSR Budget (FY 2025-26)</span>
              <span className="text-xl font-black text-white font-mono">₹45,00,00,000</span>
              <span className="text-[11px] text-emerald-400 font-semibold block">₹3.5 Cr Allocated to Student Innovation</span>
            </div>

            <div className="p-4 bg-[#0d1e17] rounded-2xl border border-[#1e382b] space-y-1">
              <span className="text-xs text-[#8ea598] font-bold block">Section 80G / 12A Status</span>
              <span className="text-base font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fully Tax Exempted
              </span>
              <span className="text-[11px] text-[#8ea598] block">Valid through March 2028</span>
            </div>

            <div className="p-4 bg-[#0d1e17] rounded-2xl border border-[#1e382b] space-y-1">
              <span className="text-xs text-[#8ea598] font-bold block">MoU with Gov of Jharkhand</span>
              <span className="text-base font-bold text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Active Tripartite Agreement
              </span>
              <span className="text-[11px] text-[#8ea598] block">Signed with Dept of Higher & Technical Edu</span>
            </div>
          </div>

          <div className="p-5 bg-[#0d1e17] border border-[#1e382b] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm">Download CSR Audit Certificate & Escrow Agreement</h4>
              <p className="text-xs text-[#8ea598] mt-0.5">
                Official utilization certificates audited by the Comptroller and District Administration.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addNotification({
                  title: 'Dossier Downloaded',
                  message: 'Tata Steel Foundation CSR compliance pack downloaded successfully.',
                  type: 'info',
                })
              }
              className="text-emerald-300 border-[#1e382b] hover:bg-[#172c21]"
            >
              📄 Download Audit Report (PDF)
            </Button>
          </div>
        </section>
      )}

      {/* SUPPORT PROJECT MODAL */}
      <Modal
        isOpen={supportModal.isOpen}
        onClose={() => setSupportModal({ isOpen: false, project: null })}
        title="Support Student Project"
        maxWidth="max-w-2xl"
      >
        {supportModal.project && (
          <form onSubmit={handleSubmitSupport} className="space-y-5">
            {/* Project Summary Banner */}
            <div className="bg-[#0d1e17] p-4 rounded-xl border border-[#1e382b] space-y-1">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Selected Innovation Challenge
              </div>
              <h4 className="font-bold text-white text-base">
                {supportModal.project.title}
              </h4>
              <div className="text-xs text-[#8ea598] flex flex-wrap gap-x-4 gap-y-1">
                <span>Location: <strong className="text-white">{supportModal.project.location}</strong></span>
                <span>Team: <strong className="text-white">{supportModal.project.teamName}</strong></span>
                <span>College: <strong className="text-white">{supportModal.project.college}</strong></span>
              </div>
              <div className="text-xs text-amber-400 pt-1 font-semibold">
                Required Support: {supportModal.project.requiredSupport}
              </div>
            </div>

            {/* Support Modality Checkboxes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#8ea598] uppercase tracking-wider">
                Support Type(s) Offered *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'Funding',
                  'Mentorship',
                  'Technology',
                  'Equipment',
                  'Prototyping',
                  'Deployment Support',
                ].map((type) => {
                  const checked = selectedSupportTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleToggleSupportType(type)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                        checked
                          ? 'bg-emerald-950/60 text-emerald-200 border-emerald-600 ring-1 ring-emerald-500'
                          : 'bg-[#0d1e17] text-[#c3d5cb] border-[#1e382b] hover:bg-[#172c21]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                          checked
                            ? 'bg-emerald-600 text-white'
                            : 'border border-[#1e382b]'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* If Funding is Selected */}
            {selectedSupportTypes.includes('Funding') && (
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8ea598]">
                  Committed Funding Grant (in INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={fundingPledgeInr}
                    onChange={(e) => setFundingPledgeInr(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-[#1e382b] bg-[#0d1e17] rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="60000"
                    min="1000"
                  />
                </div>
                <p className="text-[11px] text-[#8ea598]">
                  Subject to milestone verification and student deliverable sign-off.
                </p>
              </div>
            )}

            {/* Organization Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8ea598]">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Tata Steel Foundation, Startup Inc."
                  className="w-full px-3 py-2 border border-[#1e382b] bg-[#0d1e17] text-white placeholder-[#8ea598] rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8ea598]">
                  Organization Type
                </label>
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#1e382b] bg-[#0d1e17] text-white rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="corporate_csr">Corporate CSR Foundation</option>
                  <option value="tech_startup">Technology Startup</option>
                  <option value="industry_partner">Industry Manufacturer</option>
                  <option value="alumni_donor">University Alumni Donor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8ea598]">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g., Sanjay Choudhary"
                  className="w-full px-3 py-2 border border-[#1e382b] bg-[#0d1e17] text-white placeholder-[#8ea598] rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8ea598]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="csr@organization.com"
                  className="w-full px-3 py-2 border border-[#1e382b] bg-[#0d1e17] text-white placeholder-[#8ea598] rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#8ea598]">
                Support Details & Specific Resources
              </label>
              <textarea
                rows={3}
                value={supportNotes}
                onChange={(e) => setSupportNotes(e.target.value)}
                placeholder="Mention hardware, lab access, domain engineers available for mentorship, or grant tranche preferences..."
                className="w-full px-3 py-2 border border-[#1e382b] bg-[#0d1e17] text-white placeholder-[#8ea598] rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Disclaimer in Modal */}
            <div className="bg-[#060d0a] p-3 rounded-xl border border-[#1e382b] text-[11px] text-[#8ea598]">
              <strong className="text-amber-400">Notice:</strong> Prototype funding workflow — actual financial settlement requires approved payment/escrow infrastructure.
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSupportModal({ isOpen: false, project: null })}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmitted || selectedSupportTypes.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                {isSubmitted ? 'Recording Commitment...' : 'Submit Support Commitment'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
