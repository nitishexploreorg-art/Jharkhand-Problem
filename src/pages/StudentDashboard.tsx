import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_UNIVERSITIES } from '../data/jharkhandData';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MilestoneProgressBar } from '../components/common/ProgressBar';
import { Modal } from '../components/common/Modal';
import { TextArea, TextInput } from '../components/common/FormFields';
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Upload,
  ArrowRight,
  ExternalLink,
  BookOpen,
  FileCheck,
  Users,
  FolderArchive,
  UserCheck,
  PlusCircle,
  FileText,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { problems, updateMilestoneStatus, addNotification, authSession } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab state from query parameter or default 'overview'
  const activeTab = searchParams.get('tab') || 'overview';

  const setActiveTab = (tab: string) => {
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  // Find challenges adopted by university student teams
  const adoptedProblems = problems.filter((p) => p.adoptedTeam);

  // Milestone submission modal state
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('');
  const [submissionProof, setSubmissionProof] = useState<string>('');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  // Add Team Member modal state
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRoll, setNewMemberRoll] = useState('');
  const [newMemberDept, setNewMemberDept] = useState('Mechanical Engineering');
  const [newMemberRole, setNewMemberRole] = useState('Hardware & Sensor Lead');

  // Sample Team Members state
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'Priya Murmu',
      roll: 'BITM-2023-ENV-04',
      dept: 'Environmental Engineering',
      role: 'Team Lead & Field Deployment',
      isLead: true,
    },
    {
      name: 'Ankit Kumar Singh',
      roll: 'BITM-2023-MEC-12',
      dept: 'Mechanical Engineering',
      role: 'CAD Design & Filtration Assembly',
      isLead: false,
    },
    {
      name: 'Sneha Soren',
      roll: 'BITM-2023-EEE-08',
      dept: 'Electrical & Electronics',
      role: 'Solar MPPT & Battery Inverter',
      isLead: false,
    },
    {
      name: 'Rahul Verma',
      roll: 'BITM-2023-CSE-21',
      dept: 'Computer Science & IoT',
      role: 'Water Quality Sensor Telemetry',
      isLead: false,
    },
  ]);

  // Documents state
  const [documents, setDocuments] = useState([
    {
      id: 'doc-01',
      name: 'Capstone Final Year Project Synopsis (Approved by HOD)',
      type: 'PDF',
      size: '2.4 MB',
      date: '14 Feb 2026',
      status: 'Verified by University',
    },
    {
      id: 'doc-02',
      name: 'Arsenic-Iron Adsorption Filter CAD & P&ID Drawing',
      type: 'PDF / CAD',
      size: '8.1 MB',
      date: '28 Feb 2026',
      status: 'Approved for Prototyping',
    },
    {
      id: 'doc-03',
      name: 'CSIR-NML Lab Potability & Turbidity Test Certification',
      type: 'PDF',
      size: '1.2 MB',
      date: '04 Mar 2026',
      status: 'Certified Safe Drinkable',
    },
    {
      id: 'doc-04',
      name: 'Ormanjhi Gram Panchayat Installation NOC & Land Clearance',
      type: 'PDF',
      size: '950 KB',
      date: '06 Mar 2026',
      status: 'Official Panchayat NOC',
    },
  ]);

  const [uploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('PDF');

  const handleSubmitProof = () => {
    if (!submissionProof.trim()) {
      alert('कृपया कार्य का विवरण या टेस्ट रिपोर्ट साक्ष्य लिखें।');
      return;
    }

    updateMilestoneStatus(selectedProblemId, selectedMilestoneId, 'submitted', submissionProof);

    addNotification({
      title: 'माइलस्टोन साक्ष्य जमा (Proof Submitted)',
      message: 'संकाय सलाहकार एवं जिला नोडल अधिकारी को समीक्षा हेतु साक्ष्य प्रेषित कर दिया गया है।',
      type: 'info',
    });

    setSubmitModalOpen(false);
    setSubmissionProof('');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberRoll.trim()) return;

    setTeamMembers((prev) => [
      ...prev,
      {
        name: newMemberName,
        roll: newMemberRoll,
        dept: newMemberDept,
        role: newMemberRole,
        isLead: false,
      },
    ]);

    addNotification({
      title: 'नया टीम सदस्य जोड़ा गया (Team Member Added)',
      message: `${newMemberName} (${newMemberDept}) को टीम जलशक्ति में शामिल किया गया।`,
      type: 'success',
    });

    setAddMemberModalOpen(false);
    setNewMemberName('');
    setNewMemberRoll('');
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    setDocuments((prev) => [
      {
        id: `doc-${Date.now()}`,
        name: docName,
        type: docType,
        size: '1.8 MB',
        date: 'Today',
        status: 'Submitted for Review',
      },
      ...prev,
    ]);

    addNotification({
      title: 'दस्तावेज़ सफलतापूर्वक अपलोड (Document Uploaded)',
      message: `"${docName}" को प्रोजेक्ट रिपॉजिटरी में जोड़ दिया गया है।`,
      type: 'success',
    });

    setUploadDocModalOpen(false);
    setDocName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#060d0a] via-[#0d1e17] to-[#060d0a] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#1e382b] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>छात्र एवं विश्वविद्यालय नवाचार पोर्टल (University Student Portal)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            विश्वविद्यालय नवाचार एवं कैपस्टोन प्रोजेक्ट हब
          </h1>

          <p className="text-xs sm:text-sm text-[#8ea598] mt-2 leading-relaxed font-medium">
            झारखंड के इंजीनियरिंग, पॉलिटेक्निक और विज्ञान छात्र वास्तविक ग्रामीण समस्याओं को अपने अंतिम वर्ष के प्रोजेक्ट में बदलकर जमीनी स्तर पर समाधान स्थापित करते हैं।
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-emerald-300">
            <span className="font-bold text-[#8ea598]">सक्रिय संस्थान:</span>
            <span className="bg-[#060d0a] px-2.5 py-1 rounded-lg border border-[#1e382b] text-emerald-400 font-bold">
              {authSession.org || 'BIT Mesra — Team JalShakti Innovations'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/challenges">
            <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer" icon={<Award className="w-5 h-5" />}>
              नई चुनौतियाँ खोजें (Explore Challenges)
            </Button>
          </Link>
          <Link to="/project-lifecycle">
            <Button variant="outline" size="lg" className="border-emerald-600/50 text-emerald-300 hover:bg-emerald-950/50 cursor-pointer">
              माइलस्टोन्स (Lifecycle)
            </Button>
          </Link>
        </div>
      </div>

      {/* Role Navigation In-Page Tabs (Matching Student Requirements) */}
      <div className="bg-[#11231b] rounded-2xl p-2 border border-[#1e382b] shadow-lg flex items-center gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:bg-[#172c21] hover:text-white'
          }`}
        >
          📊 डैशबोर्ड (Overview)
        </button>

        <Link
          to="/challenges"
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#8ea598] hover:bg-[#172c21] hover:text-white whitespace-nowrap transition-all flex items-center gap-1"
        >
          <span>🏆 चुनौतियाँ (Challenges)</span>
          <ExternalLink className="w-3 h-3 text-[#8ea598]" />
        </Link>

        <button
          type="button"
          onClick={() => setActiveTab('my-projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'my-projects'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:bg-[#172c21] hover:text-white'
          }`}
        >
          🛠️ मेरे प्रोजेक्ट्स (My Projects - {adoptedProblems.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my-team')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'my-team'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:bg-[#172c21] hover:text-white'
          }`}
        >
          👥 मेरी टीम व मेंटर (My Team & Mentor)
        </button>

        <Link
          to="/project-lifecycle"
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#8ea598] hover:bg-[#172c21] hover:text-white whitespace-nowrap transition-all flex items-center gap-1"
        >
          <span>🎯 माइलस्टोन्स (Milestones Tracker)</span>
          <ExternalLink className="w-3 h-3 text-[#8ea598]" />
        </Link>

        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:bg-[#172c21] hover:text-white'
          }`}
        >
          📄 दस्तावेज़ (Documents - {documents.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-[#8ea598] hover:bg-[#172c21] hover:text-white'
          }`}
        >
          👤 प्रोफ़ाइल (Profile)
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="सक्रिय छात्र प्रोटोटाइप"
              titleHi="Active Projects"
              value={adoptedProblems.length}
              subtitle="वर्तमान में विकासशील तकनीकी समाधान"
              icon={<GraduationCap className="w-5 h-5" />}
              colorScheme="blue"
            />
            <StatCard
              title="सहभागी विश्वविद्यालय"
              titleHi="Partner Universities"
              value={SAMPLE_UNIVERSITIES.length}
              subtitle="IIT, NIT, BIT, BAU व राजकीय कॉलेज"
              icon={<BookOpen className="w-5 h-5" />}
              colorScheme="purple"
            />
            <StatCard
              title="जारी कुल सीएसआर अनुदान"
              titleHi="CSR Grants Disbursed"
              value="₹3.25 Cr"
              subtitle="प्रोटोटाइप निर्माण एवं परीक्षण हेतु"
              icon={<Award className="w-5 h-5" />}
              colorScheme="amber"
            />
            <StatCard
              title="सफल जमीनी अधिष्ठापन"
              titleHi="Ground Deployments"
              value="29 Villages"
              subtitle="नागरिकों द्वारा सत्यापित एवं चालू"
              icon={<CheckCircle2 className="w-5 h-5" />}
              colorScheme="emerald"
            />
          </div>

          {/* Adopted Projects Quick Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  आपके अंगीकृत प्रोजेक्ट्स (Adopted Societal Projects)
                </span>
                <h2 className="text-xl font-bold text-white">
                  चरणबद्ध माइलस्टोन व प्रगति ट्रैकिंग
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('my-projects')}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                सभी प्रोजेक्ट्स विस्तार से देखें →
              </button>
            </div>

            <div className="space-y-4">
              {adoptedProblems.map((p) => {
                const completedMilestones = p.milestones.filter((m) => m.status === 'approved').length;
                const totalMilestones = p.milestones.length;

                return (
                  <div
                    key={p.id}
                    className="bg-[#11231b] rounded-2xl border border-[#1e382b] p-6 shadow-xl space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold bg-[#060d0a] text-amber-400 px-2.5 py-0.5 rounded border border-[#1e382b]">
                            {p.trackingCode}
                          </span>
                          <PriorityBadge priority={p.priority} />
                          <StatusBadge stage={p.currentStage} size="sm" />
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {p.titleHi || p.title}
                        </h3>
                        <p className="text-xs text-[#8ea598] font-medium">{p.title}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Link to="/project-lifecycle">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                            icon={<ExternalLink className="w-3.5 h-3.5 text-emerald-200" />}
                          >
                            लाइफसाइकिल (Lifecycle)
                          </Button>
                        </Link>
                        <Link to={`/challenges/${p.id}`}>
                          <Button variant="outline" size="sm" className="border-[#1e382b] text-[#8ea598] hover:text-white hover:bg-[#172c21] cursor-pointer">
                            प्रोजेक्ट विवरण (Details)
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Team & Mentor Banner */}
                    {p.adoptedTeam && (
                      <div className="bg-[#0d1e17] p-3.5 rounded-xl border border-[#1e382b] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#c3d5cb]">
                        <div>
                          <span className="text-[#8ea598] block">संस्थान व टीम:</span>
                          <strong className="text-white">{p.adoptedTeam.universityName}</strong>
                          <div className="text-[11px] text-emerald-400 font-semibold">{p.adoptedTeam.teamName}</div>
                        </div>
                        <div>
                          <span className="text-[#8ea598] block">टीम लीडर:</span>
                          <strong className="text-white">{p.adoptedTeam.leadStudent}</strong>
                        </div>
                        <div>
                          <span className="text-[#8ea598] block">संकाय मेंटर:</span>
                          <strong className="text-white">{p.adoptedTeam.facultyMentor}</strong>
                        </div>
                      </div>
                    )}

                    {/* Milestone Progress bar */}
                    {totalMilestones > 0 && (
                      <MilestoneProgressBar
                        completed={completedMilestones}
                        total={totalMilestones}
                        title="माइलस्टोन पूर्णता स्थिति (Milestone Completion)"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Partner Universities Directory */}
          <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                नेटवर्क भागीदार (Network Institutes)
              </span>
              <h2 className="text-lg font-bold text-white">
                झारखंड के प्रमुख नवाचार व अनुसंधान केंद्र
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAMPLE_UNIVERSITIES.map((u) => (
                <div key={u.id} className="p-4 rounded-xl border border-[#1e382b] bg-[#0d1e17] text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">{u.name}</h4>
                  <div className="text-[#8ea598]">{u.type} • {u.location}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1e382b] font-semibold text-[#c3d5cb]">
                    <span>सक्रिय टीमें: {u.activeTeams}</span>
                    <span className="text-emerald-400">सफल अधिष्ठापन: {u.solutionsDeployed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PROJECTS */}
      {activeTab === 'my-projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                अंगीकृत कैपस्टोन प्रोजेक्ट्स (Adopted Projects)
              </span>
              <h2 className="text-2xl font-black text-white">
                मेरी टीम द्वारा संचालित नागरिक समाधान
              </h2>
            </div>
            <Link to="/challenges">
              <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer" icon={<Award className="w-4 h-4 text-emerald-200" />}>
                + नई चुनौती अंगीकार करें
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {adoptedProblems.map((p) => {
              const completedMilestones = p.milestones.filter((m) => m.status === 'approved').length;
              const totalMilestones = p.milestones.length;

              return (
                <div
                  key={p.id}
                  className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1e382b] pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold bg-[#060d0a] text-amber-400 px-3 py-0.5 rounded-lg border border-[#1e382b]">
                          {p.trackingCode}
                        </span>
                        <PriorityBadge priority={p.priority} />
                        <StatusBadge stage={p.currentStage} size="sm" />
                      </div>
                      <h3 className="text-xl font-black text-white">
                        {p.titleHi || p.title}
                      </h3>
                      <p className="text-xs text-[#8ea598]">{p.title} • {p.location.district} District</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Link to="/project-lifecycle">
                        <Button
                          variant="primary"
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                          icon={<ExternalLink className="w-3.5 h-3.5 text-emerald-200" />}
                        >
                          लाइफसाइकिल मॉनिटर
                        </Button>
                      </Link>
                      <Link to={`/challenges/${p.id}`}>
                        <Button variant="outline" size="sm" className="border-[#1e382b] text-[#8ea598] hover:text-white hover:bg-[#172c21] cursor-pointer">
                          मूल समस्या विवरण
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Problem details summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-[#0d1e17] border border-[#1e382b]">
                      <span className="text-[#8ea598] block mb-1">संबंधित नागरिक प्रभाव:</span>
                      <strong className="text-white font-bold">
                        {p.affectedCount ? `${p.affectedCount} ग्रामीण नागरिक` : 'पूरा मोहल्ला'}
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1e17] border border-[#1e382b]">
                      <span className="text-[#8ea598] block mb-1">अनुमानित ग्रांट सहायता:</span>
                      <strong className="text-emerald-400 font-bold">
                        ₹{p.estimatedBudgetInr?.toLocaleString('en-IN') || '1,80,000'} (CSR Pledged)
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1e17] border border-[#1e382b]">
                      <span className="text-[#8ea598] block mb-1">अधिष्ठापन स्थान (Ground Site):</span>
                      <strong className="text-white font-bold">
                        {p.location.village || 'ग्राम टोला'}, {p.location.district}
                      </strong>
                    </div>
                  </div>

                  {/* Milestones Action Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-[#c3d5cb] uppercase tracking-wider">
                        माइलस्टोन कार्य सूची एवं साक्ष्य अपलोड (Milestone Deliverables):
                      </h4>
                      <span className="text-xs font-bold text-emerald-400">
                        {completedMilestones} / {totalMilestones} पूर्ण
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {p.milestones.map((m) => (
                        <div
                          key={m.id}
                          className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
                            m.status === 'approved'
                              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                              : m.status === 'submitted'
                              ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                              : 'bg-[#0d1e17] border-[#1e382b] text-[#c3d5cb]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold bg-[#060d0a] text-[#8ea598] px-2 py-0.5 rounded border border-[#1e382b] text-[11px]">
                                चरण {m.number}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                                  m.status === 'approved'
                                    ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                                    : m.status === 'submitted'
                                    ? 'bg-amber-900/80 text-amber-300 border border-amber-700/50'
                                    : 'bg-[#172c21] text-[#8ea598] border border-[#1e382b]'
                                }`}
                              >
                                {m.status}
                              </span>
                            </div>
                            <strong className="block text-sm leading-snug font-black text-white">{m.titleHi}</strong>
                            <p className="text-[11px] text-[#8ea598] mt-1 line-clamp-3">{m.description}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#1e382b] flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-amber-400">
                              अनुदान: {m.grantReleasePercentage}%
                            </span>
                            {m.status !== 'approved' ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProblemId(p.id);
                                  setSelectedMilestoneId(m.id);
                                  setSubmitModalOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-md cursor-pointer"
                              >
                                <Upload className="w-3 h-3" />
                                <span>साक्ष्य अपलोड</span>
                              </button>
                            ) : (
                              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>सत्यापित</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MY TEAM & MENTOR */}
      {activeTab === 'my-team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                छात्र नवाचार दल (Project Team Roster)
              </span>
              <h2 className="text-2xl font-black text-white">
                टीम जलशक्ति • बीआईटी मेसरा
              </h2>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              icon={<PlusCircle className="w-4 h-4 text-emerald-200" />}
              onClick={() => setAddMemberModalOpen(true)}
            >
              + नया सदस्य जोड़ें (Add Member)
            </Button>
          </div>

          {/* Mentor Details Card */}
          <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e382b] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0d1e17] border border-[#1e382b] flex items-center justify-center text-2xl font-black">
                  🎓
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                    संकाय सलाहकार / प्रोजेक्ट मेंटर (Faculty Advisor)
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Dr. S. K. Mahato, Ph.D.
                  </h3>
                  <p className="text-xs text-[#8ea598]">
                    Professor, Department of Environmental Engineering, BIT Mesra, Ranchi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-700/50 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>प्रमाणित मेंटर (HOD Approved)</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-[#c3d5cb]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8ea598]" />
                <span>skmahato@bitmesra.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8ea598]" />
                <span>+91 94311 08241 (Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#8ea598]" />
                <span>Lab 402, Environmental Tech Center</span>
              </div>
            </div>
          </div>

          {/* Student Team Members List */}
          <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-base font-black text-white">
              पंजीकृत छात्र सदस्य ({teamMembers.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[#1e382b] bg-[#0d1e17] hover:bg-[#172c21] transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.isLead && (
                          <span className="text-[10px] font-bold bg-amber-950 border border-amber-700/50 text-amber-300 px-2 py-0.5 rounded">
                            टीम लीड
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium">{member.role}</p>
                    </div>
                    <span className="font-mono text-[11px] text-amber-400 bg-[#060d0a] px-2 py-0.5 rounded border border-[#1e382b]">
                      {member.roll}
                    </span>
                  </div>

                  <div className="text-xs text-[#8ea598] pt-2 border-t border-[#1e382b] flex items-center justify-between">
                    <span>{member.dept}</span>
                    <span className="text-emerald-400 font-semibold">सत्यापित छात्र</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                परियोजना अभिलेख (Project Documentation Repository)
              </span>
              <h2 className="text-2xl font-black text-white">
                सिन्होप्सिस, परीक्षण रिपोर्ट एवं प्रमाण पत्र
              </h2>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              icon={<Upload className="w-4 h-4 text-emerald-200" />}
              onClick={() => setUploadDocModalOpen(true)}
            >
              + नया दस्तावेज़ अपलोड करें
            </Button>
          </div>

          <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-4">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-[#1e382b] bg-[#0d1e17] hover:border-emerald-700/60 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                      <p className="text-[#8ea598] text-[11px]">
                        प्रकार: {doc.type} • आकार: {doc.size} • दिनांक: {doc.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-bold text-[11px]">
                      {doc.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`दस्तावेज़ डाउनलोड प्रारंभ: ${doc.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#172c21] hover:bg-[#1e382b] text-emerald-300 border border-[#1e382b] font-bold text-xs transition-colors cursor-pointer"
                    >
                      डाउनलोड (PDF)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              छात्र एवं नवाचार दल प्रोफ़ाइल
            </span>
            <h2 className="text-2xl font-black text-white">
              आधिकारिक अकादमिक साख (Academic Credentials)
            </h2>
          </div>

          <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-4 border-b border-[#1e382b] pb-6">
              <div className="w-20 h-20 rounded-3xl bg-[#0d1e17] text-emerald-300 border-2 border-[#1e382b] flex items-center justify-center text-3xl font-black">
                PM
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">
                  {authSession.name || 'Priya Murmu'}
                </h3>
                <p className="text-xs sm:text-sm text-[#8ea598] font-medium">
                  {authSession.org || 'BIT Mesra — Team JalShakti Innovations'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#060d0a] text-amber-400 border border-[#1e382b] text-xs font-bold font-mono">
                    ID: {authSession.id || 'BITM-2023-ENV-04'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-xs font-bold">
                    ✓ ABC ID Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#c3d5cb]">
              <div className="space-y-1">
                <span className="text-[#8ea598] block">संस्थान का नाम (Institution):</span>
                <strong className="text-sm text-white">Birla Institute of Technology (BIT), Mesra, Ranchi</strong>
              </div>

              <div className="space-y-1">
                <span className="text-[#8ea598] block">विभाग / संकाय (Department):</span>
                <strong className="text-sm text-white">Department of Environmental Engineering (Final Year)</strong>
              </div>

              <div className="space-y-1">
                <span className="text-[#8ea598] block">अंगीकृत प्रोजेक्ट:</span>
                <strong className="text-sm text-emerald-400">
                  खूंटी जिले के लिए सोलर आर्सेनिक व आयरन जल शोधन प्रणाली
                </strong>
              </div>

              <div className="space-y-1">
                <span className="text-[#8ea598] block">प्रोजेक्ट मेंटर:</span>
                <strong className="text-sm text-white">Dr. S. K. Mahato (Professor, BIT Mesra)</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Milestone Upload Proof */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title="माइलस्टोन कार्य साक्ष्य जमा करें (Submit Milestone Proof)"
        titleHi="प्रोटोटाइप रिपोर्ट"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setSubmitModalOpen(false)} className="border-[#1e382b] text-[#8ea598] hover:text-white cursor-pointer">
              रद्द करें
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitProof} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer">
              साक्ष्य प्रेषित करें (Submit Proof)
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-[#8ea598] leading-relaxed">
            प्रयोगशाला परीक्षण परिणाम, फोटो/वीडियो लिंक, गिटहब या तकनीकी ड्राइंग का विवरण दर्ज करें। संकाय मेंटर एवं प्रशासनिक समीक्षा के उपरांत अनुदान की अगली किस्त जारी होगी।
          </p>

          <TextArea
            label="कार्य साक्ष्य एवं प्रगति विवरण (Proof of Completion)"
            rows={4}
            placeholder="उदा. लैब परीक्षण पूर्ण: टीडीएस 840 से घटकर 110 पीपीएम तक पहुंचा। सीएडी मॉडल तैयार और फैब्रिकेशन कार्य 80% पूर्ण..."
            value={submissionProof}
            onChange={(e) => setSubmissionProof(e.target.value)}
            required
          />
        </div>
      </Modal>

      {/* Modal: Add Team Member */}
      <Modal
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
        title="नया छात्र सदस्य जोड़ें (Add Team Member)"
        titleHi="टीम विस्तार"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setAddMemberModalOpen(false)} className="border-[#1e382b] text-[#8ea598] hover:text-white cursor-pointer">
              रद्द करें
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddMember} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer">
              सदस्य जोड़ें (Add Member)
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddMember} className="space-y-4 text-xs">
          <TextInput
            label="छात्र का नाम (Full Name)"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="उदा. Ankit Kumar"
            required
          />

          <TextInput
            label="संस्थान रोल नंबर (Student Roll No)"
            value={newMemberRoll}
            onChange={(e) => setNewMemberRoll(e.target.value)}
            placeholder="उदा. BITM-2023-MEC-12"
            required
          />

          <div>
            <label className="block text-[#c3d5cb] font-bold mb-1">इंजीनियरिंग शाखा (Department)</label>
            <select
              value={newMemberDept}
              onChange={(e) => setNewMemberDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#1e382b] bg-[#060d0a] text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical & Electronics">Electrical & Electronics</option>
              <option value="Civil & Environmental">Civil & Environmental</option>
              <option value="Computer Science & IoT">Computer Science & IoT</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          </div>

          <TextInput
            label="टीम में भूमिका (Role in Team)"
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value)}
            placeholder="उदा. Circuit Assembly / Sensor Calibration"
            required
          />
        </form>
      </Modal>

      {/* Modal: Upload Document */}
      <Modal
        isOpen={uploadDocModalOpen}
        onClose={() => setUploadDocModalOpen(false)}
        title="परियोजना दस्तावेज़ अपलोड करें (Upload Document)"
        titleHi="तकनीकी अभिलेख"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setUploadDocModalOpen(false)} className="border-[#1e382b] text-[#8ea598] hover:text-white cursor-pointer">
              रद्द करें
            </Button>
            <Button variant="primary" size="sm" onClick={handleUploadDoc} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer">
              अपलोड करें (Upload)
            </Button>
          </div>
        }
      >
        <form onSubmit={handleUploadDoc} className="space-y-4 text-xs">
          <TextInput
            label="दस्तावेज़ का शीर्षक (Document Title)"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="उदा. Sensor Calibration & Potability Test Report"
            required
          />

          <div>
            <label className="block text-[#c3d5cb] font-bold mb-1">फ़ाइल प्रकार (File Type)</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#1e382b] bg-[#060d0a] text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="PDF">PDF Document (.pdf)</option>
              <option value="CAD / DWG">CAD Drawing (.dwg / .step)</option>
              <option value="DOCX">Word Document (.docx)</option>
              <option value="XLSX">Test Data Spreadsheet (.xlsx)</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-[#1e382b] rounded-2xl p-6 text-center text-[#8ea598] bg-[#0d1e17]">
            <Upload className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
            <span className="font-bold block text-white">फ़ाइल चुनें या यहाँ ड्रैग करें</span>
            <span className="text-[11px] text-[#8ea598]">अधिकतम फ़ाइल आकार: 25 MB</span>
          </div>
        </form>
      </Modal>
    </div>
  );
};
