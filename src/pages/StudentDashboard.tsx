import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_UNIVERSITIES } from '../data/jharkhandData';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MilestoneProgressBar } from '../components/common/ProgressBar';
import { Modal } from '../components/common/Modal';
import { TextArea } from '../components/common/FormFields';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { problems, updateMilestoneStatus, addNotification } = useApp();

  // Find challenges adopted by university student teams
  const adoptedProblems = problems.filter((p) => p.adoptedTeam);

  // Milestone submission modal
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('');
  const [submissionProof, setSubmissionProof] = useState<string>('');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>छात्र एवं विश्वविद्यालय नवाचार पोर्टल (University Student Portal)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black">
            विश्वविद्यालय नवाचार एवं कैपस्टोन प्रोजेक्ट हब
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            झारखंड के इंजीनियरिंग, पॉलिटेक्निक और विज्ञान छात्र वास्तविक ग्रामीण समस्याओं को अपने अंतिम वर्ष के प्रोजेक्ट में बदलकर जमीनी स्तर पर समाधान स्थापित करते हैं।
          </p>
        </div>

        <Link to="/challenges">
          <Button variant="primary" size="lg" icon={<Award className="w-5 h-5" />}>
            नई चुनौतियाँ खोजें (Explore Challenges)
          </Button>
        </Link>
      </div>

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

      {/* Active Adopted Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              आपके अंगीकृत प्रोजेक्ट्स (Adopted Societal Projects)
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              चरणबद्ध माइलस्टोन व प्रगति ट्रैकिंग
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {adoptedProblems.map((p) => {
            const completedMilestones = p.milestones.filter((m) => m.status === 'approved').length;
            const totalMilestones = p.milestones.length;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded border border-slate-700">
                        {p.trackingCode}
                      </span>
                      <PriorityBadge priority={p.priority} />
                      <StatusBadge stage={p.currentStage} size="sm" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {p.titleHi || p.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{p.title}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Link to="/project-lifecycle">
                      <Button
                        variant="primary"
                        size="sm"
                        className="bg-cyan-800 hover:bg-cyan-900 text-white"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        लाइफसाइकिल (Lifecycle)
                      </Button>
                    </Link>
                    <Link to="/ground-deployment">
                      <Button
                        variant="primary"
                        size="sm"
                        className="bg-teal-700 hover:bg-teal-800 text-white"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        ग्राउंड डिप्लॉयमेंट (Deployment)
                      </Button>
                    </Link>
                    <Link to={`/challenges/${p.id}`}>
                      <Button variant="outline" size="sm">
                        प्रोजेक्ट विवरण (Details)
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Team & Mentor Banner */}
                {p.adoptedTeam && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-500 block">संस्थान व टीम:</span>
                      <strong>{p.adoptedTeam.universityName}</strong>
                      <div className="text-[11px] text-cyan-800 font-semibold">{p.adoptedTeam.teamName}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 block">टीम लीडर:</span>
                      <strong>{p.adoptedTeam.leadStudent}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">संकाय मेंटर:</span>
                      <strong>{p.adoptedTeam.facultyMentor}</strong>
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

                {/* Milestones Action List */}
                {totalMilestones > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      माइलस्टोन कार्य सूची:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {p.milestones.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                            m.status === 'approved'
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                              : m.status === 'submitted'
                              ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold">चरण {m.number}</span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                  m.status === 'approved'
                                    ? 'bg-emerald-200 text-emerald-900'
                                    : m.status === 'submitted'
                                    ? 'bg-amber-200 text-amber-900'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {m.status}
                              </span>
                            </div>
                            <strong className="block leading-snug">{m.titleHi}</strong>
                            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{m.description}</p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-semibold text-purple-900">
                              अनुदान: {m.grantReleasePercentage}%
                            </span>
                            {m.status !== 'approved' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProblemId(p.id);
                                  setSelectedMilestoneId(m.id);
                                  setSubmitModalOpen(true);
                                }}
                                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                              >
                                <Upload className="w-3 h-3" />
                                <span>साक्ष्य अपलोड</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Universities Directory */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            नेटवर्क भागीदार (Network Institutes)
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            झारखंड के प्रमुख नवाचार व अनुसंधान केंद्र
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_UNIVERSITIES.map((u) => (
            <div key={u.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
              <div className="text-slate-500">{u.type} • {u.location}</div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-semibold text-slate-700">
                <span>सक्रिय टीमें: {u.activeTeams}</span>
                <span className="text-emerald-700">सफल अधिष्ठापन: {u.solutionsDeployed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Upload Proof Modal */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title="माइलस्टोन कार्य साक्ष्य जमा करें (Submit Milestone Proof)"
        titleHi="प्रोटोटाइप रिपोर्ट"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setSubmitModalOpen(false)}>
              रद्द करें
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitProof}>
              साक्ष्य प्रेषित करें (Submit Proof)
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
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
    </div>
  );
};
