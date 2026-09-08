import React, { createContext, useContext, useState, useEffect } from 'react';
import { Problem, UserRole, NotificationItem, PlatformStage, Milestone } from '../types';
import { INITIAL_PROBLEMS } from '../data/jharkhandData';

interface AppContextType {
  problems: Problem[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  toggleLanguage: () => void;
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  dismissNotification: (id: string) => void;
  getProblemById: (id: string) => Problem | undefined;
  getProblemByTrackingCode: (code: string) => Problem | undefined;
  reportProblem: (newProblemData: Partial<Problem>) => Problem;
  upvoteProblem: (id: string) => void;
  updateProblemStage: (id: string, stage: PlatformStage, additionalData?: Partial<Problem>) => void;
  updateMilestoneStatus: (problemId: string, milestoneId: string, status: Milestone['status'], proof?: string) => void;
  submitAdoptionRequest: (
    problemId: string,
    adoptionData: {
      collegeName: string;
      teamName: string;
      teamLeader: string;
      teamMembers: string[];
      facultyMentor: string;
      projectType: string;
    }
  ) => void;
  approveFacultyAdoption: (problemId: string) => void;
  resetProblems: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [problems, setProblems] = useState<Problem[]>(() => {
    try {
      const saved = localStorage.getItem('samadhan_jh_problems');
      if (saved) {
        const parsed: Problem[] = JSON.parse(saved);
        // Ensure new seeds like jh-prb-007 are merged if missing
        const existingIds = new Set(parsed.map((p) => p.id));
        const missingSeeds = INITIAL_PROBLEMS.filter((seed) => !existingIds.has(seed.id));
        return [...parsed, ...missingSeeds];
      }
    } catch {
      // fallback
    }
    return INITIAL_PROBLEMS;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'झारखंड नवाचार चुनौती अद्यतन (Challenge Update)',
      message: 'अनगड़ा, राँची में सौर जल शोधन प्रणाली का जमीनी अधिष्ठापन पूरा हुआ। नागरिक सत्यापन आमंत्रित है।',
      type: 'success',
      timestamp: 'Just now',
      read: false,
      trackingCode: 'JH-RNC-2026-0814',
    },
    {
      id: 'notif-2',
      title: 'नई समस्या AI द्वारा सत्यापित',
      message: 'दुमका में सौर सिंचाई पंप इनवर्टर समस्या को कृषि विभाग के नवाचार पोर्टल पर सूचीबद्ध किया गया।',
      type: 'info',
      timestamp: '2 hours ago',
      read: false,
      trackingCode: 'JH-DUM-2026-0094',
    },
  ]);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_jh_problems', JSON.stringify(problems));
    } catch {
      // ignore
    }
  }, [problems]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getProblemById = (id: string) => {
    return problems.find((p) => p.id === id);
  };

  const getProblemByTrackingCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'JH-1042') {
      const found007 = problems.find(
        (p) => p.id === 'jh-prb-007' || p.trackingCode.toUpperCase() === 'JH-1042' || p.trackingCode.toUpperCase() === 'JH-KHT-2026-0388'
      );
      if (found007) return found007;
    }
    return problems.find((p) => p.trackingCode.toUpperCase() === clean || p.id.toUpperCase() === clean);
  };

  const reportProblem = (newProblemData: Partial<Problem>): Problem => {
    const districtPrefix = (newProblemData.district || 'RNC').slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `JH-${districtPrefix}-2026-${randomSuffix}`;
    const id = `jh-prb-${Date.now()}`;

    // Realistic Simulated AI Categorization & Severity Triage
    const desc = (newProblemData.description || '').toLowerCase();
    let detectedCategory = newProblemData.category || 'water_sanitation';
    let detectedCategoryHi = 'पेयजल एवं स्वच्छता';
    let suggestedPriority: 'critical' | 'high' | 'medium' | 'low' = 'high';

    if (desc.includes('electric') || desc.includes('solar') || desc.includes('transformer') || desc.includes('बिजली')) {
      detectedCategory = 'solar_electricity';
      detectedCategoryHi = 'विद्युत एवं सौर ऊर्जा';
    } else if (desc.includes('road') || desc.includes('bridge') || desc.includes('सड़क') || desc.includes('पुल')) {
      detectedCategory = 'roads_bridges';
      detectedCategoryHi = 'सड़क एवं पुलिया';
      suggestedPriority = 'high';
    } else if (desc.includes('dust') || desc.includes('mine') || desc.includes('धूल') || desc.includes('कोयला')) {
      detectedCategory = 'mining_environment';
      detectedCategoryHi = 'खनन क्षेत्र धूल व पर्यावरण सुरक्षा';
    } else if (desc.includes('elephant') || desc.includes('lac') || desc.includes('हाथी') || desc.includes('लाह')) {
      detectedCategory = 'forest_tribal';
      detectedCategoryHi = 'वनोत्पाद एवं जनजातीय आजीविका';
      suggestedPriority = 'critical';
    }

    const created: Problem = {
      id,
      trackingCode,
      title: newProblemData.title || 'Reported Societal Issue',
      titleHi: newProblemData.titleHi || newProblemData.title || 'नागरिक द्वारा दर्ज समस्या',
      description: newProblemData.description || '',
      descriptionHi: newProblemData.descriptionHi || newProblemData.description,
      category: detectedCategory,
      categoryHi: detectedCategoryHi,
      district: newProblemData.district || 'Ranchi',
      districtHi: newProblemData.districtHi || 'राँची',
      block: newProblemData.block || 'Sadar',
      villageOrWard: newProblemData.villageOrWard || 'Village Ward 1',
      coordinates: newProblemData.coordinates || { lat: 23.3441, lng: 85.3096 },
      citizenName: newProblemData.citizenName || 'Jharkhand Citizen',
      citizenPhoneMasked: newProblemData.citizenPhoneMasked || '+91 987XXXXXXX',
      reportedAt: new Date().toISOString(),
      evidence: newProblemData.evidence || [],
      currentStage: 'AI_PROCESSED',
      priority: suggestedPriority,
      votesCount: 1,
      aiAnalysis: {
        categorySuggested: detectedCategory,
        confidenceScore: 0.94,
        duplicateDetected: false,
        suggestedPriority: suggestedPriority,
        urgencyReasoning: 'AI semantic analysis checked geographic cluster and keyword severity. Problem registered in State Innovation Triage Queue.',
        keyKeywords: ['citizen report', newProblemData.district || 'Jharkhand', detectedCategory],
        processedAt: new Date().toISOString(),
      },
      milestones: [],
    };

    setProblems((prev) => [created, ...prev]);

    addNotification({
      title: 'समस्या सफलतापूर्वक दर्ज हुई (Report Registered)',
      message: `आपकी शिकायत संख्या ${trackingCode} दर्ज हो चुकी है। एआई विश्लेषण संपन्न।`,
      type: 'success',
      trackingCode,
    });

    return created;
  };

  const upvoteProblem = (id: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, votesCount: p.votesCount + 1 };
        }
        return p;
      })
    );
  };

  const updateProblemStage = (id: string, stage: PlatformStage, additionalData?: Partial<Problem>) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            currentStage: stage,
            ...(additionalData || {}),
          };
        }
        return p;
      })
    );
  };

  const updateMilestoneStatus = (
    problemId: string,
    milestoneId: string,
    status: Milestone['status'],
    proof?: string
  ) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === problemId) {
          const updatedMilestones = p.milestones.map((m) => {
            if (m.id === milestoneId) {
              return {
                ...m,
                status,
                submissionProof: proof || m.submissionProof,
                approvedAt: status === 'approved' ? new Date().toISOString() : m.approvedAt,
              };
            }
            return m;
          });
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );
  };

  const submitAdoptionRequest = (
    problemId: string,
    adoptionData: {
      collegeName: string;
      teamName: string;
      teamLeader: string;
      teamMembers: string[];
      facultyMentor: string;
      projectType: string;
    }
  ) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === problemId) {
          return {
            ...p,
            facultyApprovalStatus: 'PENDING_FACULTY_APPROVAL',
            adoptionRequest: {
              ...adoptionData,
              requestedAt: new Date().toISOString(),
            },
          };
        }
        return p;
      })
    );

    addNotification({
      title: 'प्रस्ताव संकाय अनुमोदन हेतु प्रस्तुत (Submitted for Faculty Approval)',
      message: `टीम "${adoptionData.teamName}" (${adoptionData.collegeName}) का प्रस्ताव मार्गदर्शक ${adoptionData.facultyMentor} के अनुमोदन हेतु भेजा गया।`,
      type: 'info',
    });
  };

  const approveFacultyAdoption = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === problemId) {
          const req = p.adoptionRequest;
          const teamName = req ? req.teamName : 'Tech Titans';
          const collegeName = req ? req.collegeName : 'R.D. Engineering College';
          const teamLeader = req ? req.teamLeader : 'Ankit Kumar';
          const teamMembers = req?.teamMembers || ['Priya Singh', 'Rahul Verma', 'Sneha Soren'];
          const facultyMentor = req ? req.facultyMentor : 'Dr. S. K. Mahato, Professor (Mechanical)';
          const projectType = req ? req.projectType : 'Final Year B.Tech Capstone Project';

          return {
            ...p,
            currentStage: 'STUDENT_ADOPTED',
            facultyApprovalStatus: 'APPROVED',
            adoptedTeam: {
              teamId: `team-${Date.now()}`,
              teamName,
              universityName: collegeName,
              collegeName,
              teamLeader,
              leadStudent: teamLeader,
              teamMembers,
              facultyMentor,
              projectType,
              teamSize: teamMembers.length + 1,
              proposalSummary: `Academic innovation project adopted under ${projectType} under mentorship of ${facultyMentor}.`,
              adoptedAt: new Date().toISOString(),
              facultyApprovalStatus: 'APPROVED',
            },
            milestones:
              p.milestones.length > 0
                ? p.milestones
                : [
                    {
                      id: 'm1',
                      number: 1,
                      title: 'System Design & Component Sizing',
                      titleHi: 'सिस्टम डिज़ाइन एवं कम्पोनेंट चयन',
                      description: 'Detailed schematic design, sensor selection and lab test bench setup.',
                      status: 'in_progress',
                      dueDate: '2026-10-15',
                      grantReleasePercentage: 30,
                    },
                    {
                      id: 'm2',
                      number: 2,
                      title: 'Fabrication & Lab Validation',
                      titleHi: 'प्रोटोटाइप निर्माण एवं प्रयोगशाला सत्यापन',
                      description: 'Hardware assembly and testing under simulated field conditions.',
                      status: 'pending',
                      dueDate: '2026-11-10',
                      grantReleasePercentage: 40,
                    },
                    {
                      id: 'm3',
                      number: 3,
                      title: 'Pilot Field Deployment & Social Audit',
                      titleHi: 'जमीनी अधिष्ठापन एवं नागरिक सोशल ऑडिट',
                      description: 'On-site installation at village, telemetry calibration and panchayat certification.',
                      status: 'pending',
                      dueDate: '2026-12-05',
                      grantReleasePercentage: 30,
                    },
                  ],
          };
        }
        return p;
      })
    );

    addNotification({
      title: 'परियोजना अंगीकरण स्वीकृत (Project Adopted)',
      message: `संकाय अनुमोदन पूर्ण! चुनौती आधिकारिक रूप से अंगीकृत कर ली गई है।`,
      type: 'success',
    });
  };

  const resetProblems = () => {
    try {
      localStorage.removeItem('samadhan_jh_problems');
    } catch {
      // ignore
    }
    setProblems(INITIAL_PROBLEMS);
    addNotification({
      title: 'डेमो डेटा रीसेट (Demo Data Reset)',
      message: 'सभी समस्याओं और सत्यापन कतार को प्रारंभिक स्थिति में रीसेट कर दिया गया है।',
      type: 'info',
    });
  };

  return (
    <AppContext.Provider
      value={{
        problems,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        toggleLanguage,
        notifications,
        addNotification,
        dismissNotification,
        getProblemById,
        getProblemByTrackingCode,
        reportProblem,
        upvoteProblem,
        updateProblemStage,
        updateMilestoneStatus,
        submitAdoptionRequest,
        approveFacultyAdoption,
        resetProblems,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
