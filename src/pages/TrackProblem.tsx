import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import {
  Search,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Check,
  Phone,
  MessageSquare,
  Mail,
  Bell,
  Smartphone,
  Send,
  Settings,
  RefreshCw,
  Circle,
  ExternalLink,
  Sparkles,
  Users,
  GraduationCap,
  HeartHandshake,
  Lock,
  ChevronRight,
  Info,
  RotateCcw,
} from 'lucide-react';

export type NotificationChannel = 'all' | 'sms' | 'whatsapp' | 'email';

export interface CitizenNotification {
  id: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  timestamp: string;
  channels: ('sms' | 'whatsapp' | 'email')[];
  status: 'delivered' | 'action_required';
  actionLabel?: string;
  actionLink?: string;
  senderSms?: string;
  senderWhatsApp?: string;
  senderEmail?: string;
}

export const TrackProblem: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { problems, getProblemByTrackingCode, addNotification } = useApp();

  // Allow citizen to enter: "Problem ID / Ticket ID" (Example: JH-1042)
  const initialCode = searchParams.get('id') || 'JH-1042';
  const [queryCode, setQueryCode] = useState(initialCode);
  const [activeTrackingCode, setActiveTrackingCode] = useState(initialCode);
  const [hasSearched, setHasSearched] = useState(true);

  // Active channel filter for notification preview: 'all' | 'sms' | 'whatsapp' | 'email'
  const [selectedChannel, setSelectedChannel] = useState<NotificationChannel>('all');

  // Interactive phone preview card state
  const [selectedPreviewNotifId, setSelectedPreviewNotifId] = useState<string>('notif-5');

  // Notification Preferences (UI-only for prototype as requested)
  const [prefs, setPrefs] = useState({
    smsEnabled: true,
    smsNumber: '+91 94315-XXXXX',
    whatsappEnabled: true,
    whatsappNumber: '+91 94315-XXXXX',
    emailEnabled: true,
    emailAddress: 'citizen.khunti@jharkhand.in',
    preferredLanguage: 'hi',
    instantMilestoneAlerts: true,
  });
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempPhone, setTempPhone] = useState(prefs.smsNumber);
  const [tempEmail, setTempEmail] = useState(prefs.emailAddress);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Citizen verification interactive feedback state: can resolve or reopen problem
  const [citizenFeedbackState, setCitizenFeedbackState] = useState<'resolved' | 'reopened' | null>(null);
  const [citizenFeedbackTimestamp, setCitizenFeedbackTimestamp] = useState<string>('');

  const handleCitizenFeedback = (action: 'resolved' | 'reopened') => {
    setCitizenFeedbackState(action);
    const nowStr = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setCitizenFeedbackTimestamp(nowStr);

    if (action === 'resolved') {
      addNotification({
        title: 'समस्या का समाधान सत्यापित (Problem Resolved)',
        message:
          'आपने पुष्टि की कि चापाकल से स्वच्छ व पीने योग्य पानी मिल रहा है। टिकट स्थिति: Resolved ✅ (नागरिक सत्यापित)।',
        type: 'success',
      });
    } else {
      addNotification({
        title: 'समस्या पुनः खुली (Issue Reopened)',
        message:
          'आपने रिपोर्ट किया कि समस्या अभी भी बनी हुई है। टिकट पुनः खोला गया तथा जिला नोडल अधिकारी को तत्काल समीक्षा हेतु भेजा गया।',
        type: 'error',
      });
    }
  };

  const handleResetFeedback = () => {
    setCitizenFeedbackState(null);
    setCitizenFeedbackTimestamp('');
    addNotification({
      title: 'डेमो रीसेट (Feedback Reset)',
      message: 'नागरिक सत्यापन स्थिति प्रारंभिक "In Progress" अवस्था में रीसेट कर दी गई।',
      type: 'info',
    });
  };

  // Look up searched problem from context
  const searchedProblem = getProblemByTrackingCode(activeTrackingCode);

  // Default fallback data for JH-1042 if not resolved from context
  const problemTitle = searchedProblem
    ? searchedProblem.title.includes('Handpump')
      ? 'Village Handpump Not Working'
      : searchedProblem.title
    : 'Village Handpump Not Working';

  const currentProblemStatus = citizenFeedbackState === 'resolved'
    ? 'Resolved ✅'
    : citizenFeedbackState === 'reopened'
    ? 'Reopened ⚠️'
    : 'In Progress';

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setQueryCode(id);
      setActiveTrackingCode(id);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryCode.trim()) return;
    const clean = queryCode.trim().toUpperCase();
    setSearchParams({ id: clean });
    setActiveTrackingCode(clean);
    setHasSearched(true);
  };

  const handleQuickSelect = (code: string) => {
    setQueryCode(code);
    setSearchParams({ id: code });
    setActiveTrackingCode(code);
    setHasSearched(true);
  };

  // 7-step Timeline explicitly requested in prompt:
  // ✓ Submitted
  // ✓ AI Processed
  // ✓ Admin Verified
  // ✓ Student Team Adopted
  // 🔄 Prototype Development
  // ○ Field Deployment
  // ○ Citizen Verification
  const timelineMilestones = [
    {
      id: 'step-1',
      title: 'Submitted',
      titleHi: 'समस्या दर्ज (Submitted)',
      symbol: '✓',
      state: 'completed' as const,
      date: '12 Aug 2026, 10:14 AM',
      description: 'Problem reported by citizen with GPS location tag and handpump photos.',
      actor: 'Local Citizen (Hesal Tola)',
    },
    {
      id: 'step-2',
      title: 'AI Processed',
      titleHi: 'एआई द्वारा संसाधित (AI Processed)',
      symbol: '✓',
      state: 'completed' as const,
      date: '12 Aug 2026, 10:16 AM',
      description: 'State AI NLP triage tagged category as Water Supply & assessed High Priority with 0.95 confidence.',
      actor: 'State Innovation AI Engine',
    },
    {
      id: 'step-3',
      title: 'Admin Verified',
      titleHi: 'प्रशासनिक सत्यापन (Admin Verified)',
      symbol: '✓',
      state: 'completed' as const,
      date: '15 Aug 2026, 11:30 AM',
      description: 'Junior Engineer DWSD inspected broken piston cylinder & verified as societal engineering challenge.',
      actor: 'Er. R. K. Tigga, DWSD Khunti',
    },
    {
      id: 'step-4',
      title: 'Student Team Adopted',
      titleHi: 'छात्र टीम द्वारा अंगीकृत (Student Team Adopted)',
      symbol: '✓',
      state: 'completed' as const,
      date: '20 Aug 2026, 04:15 PM',
      description: 'Tech Titans from R.D. Engineering College adopted challenge for final-year hardware capstone.',
      actor: 'Team Tech Titans & Mentor Dr. Mahato',
    },
    {
      id: 'step-5',
      title: 'Prototype Development',
      titleHi: 'प्रोटोटाइप विकास जारी (Prototype Development)',
      symbol: citizenFeedbackState ? '✓' : '🔄',
      state: citizenFeedbackState ? ('completed' as const) : ('current' as const),
      date: citizenFeedbackState ? '02 Sep 2026 (Completed)' : '02 Sep 2026 – Ongoing',
      description: 'Solar dual-stage filtration chamber assembled with ₹60,000 CSR funding from Tata Steel Foundation.',
      actor: 'R.D. Engineering College Hardware Lab',
    },
    {
      id: 'step-6',
      title: 'Field Deployment',
      titleHi: 'जमीनी अधिष्ठापन (Field Deployment)',
      symbol: citizenFeedbackState ? '✓' : '○',
      state: citizenFeedbackState ? ('completed' as const) : ('upcoming' as const),
      date: citizenFeedbackState ? '06 Sep 2026 (Installed)' : 'Scheduled: 06 Sep 2026',
      description: 'On-site installation near primary school handpump and baseline lab water testing.',
      actor: 'Tech Titans & District Water Squad',
    },
    {
      id: 'step-7',
      title: 'Citizen Verification',
      titleHi: 'नागरिक सत्यापन (Citizen Verification)',
      symbol: citizenFeedbackState === 'resolved' ? '✓' : citizenFeedbackState === 'reopened' ? '⚠️' : '○',
      state: citizenFeedbackState === 'resolved' ? ('completed' as const) : citizenFeedbackState === 'reopened' ? ('current' as const) : ('upcoming' as const),
      date: citizenFeedbackTimestamp ? `Verified Today (${citizenFeedbackTimestamp})` : 'Awaiting Citizen Response',
      description: citizenFeedbackState === 'resolved'
        ? 'Beneficiary verified clean, potable water flowing from handpump. Grievance resolved!'
        : citizenFeedbackState === 'reopened'
        ? 'Beneficiary flagged that water issues persist. Automatically reopened for district re-inspection.'
        : 'Hamlet beneficiaries test water output and confirm problem resolution via two-way SMS feedback.',
      actor: 'Citizen Beneficiaries of Khunti',
    },
  ];

  // Exactly the 5 requested notification cards:
  // 1. "Your problem has been verified."
  // 2. "Tech Titans has adopted your challenge."
  // 3. "Prototype development has started."
  // 4. "Field pilot completed."
  // 5. "Please verify whether the solution works."
  const notificationCards: CitizenNotification[] = [
    {
      id: 'notif-1',
      title: 'Your problem has been verified.',
      titleHi: 'आपकी समस्या का सत्यापन पूर्ण हो गया है।',
      message:
        'Government of Jharkhand admin has officially verified your reported handpump issue. The problem has been categorized under Drinking Water & Sanitation and opened for collegiate adoption.',
      messageHi:
        'झारखंड सरकार प्रशासन द्वारा आपके दर्ज चापाकल मुद्दे का स्थलीय सत्यापन कर लिया गया है। इसे आधिकारिक रूप से स्वीकृत किया गया है।',
      timestamp: '15 Aug 2026, 11:30 AM',
      channels: ['sms', 'whatsapp', 'email'],
      status: 'delivered',
      senderSms: 'VM-JHGOVT',
      senderWhatsApp: 'Govt of Jharkhand Citizen Alerts',
      senderEmail: 'alerts@samadhan.jharkhand.gov.in',
    },
    {
      id: 'notif-2',
      title: 'Tech Titans has adopted your challenge.',
      titleHi: 'टेक टाइटन्स (Tech Titans) ने आपकी चुनौती को अंगीकृत किया है।',
      message:
        'Student engineering team "Tech Titans" from R.D. Engineering College (guided by Dr. S. K. Mahato) has adopted your problem to design a low-cost solar-assisted water purification solution.',
      messageHi:
        'आर.डी. इंजीनियरिंग कॉलेज की छात्र टीम "Tech Titans" ने आपकी समस्या को गोद लेकर सौर जल शोधन समाधान निर्माण शुरू किया है।',
      timestamp: '20 Aug 2026, 04:15 PM',
      channels: ['sms', 'whatsapp', 'email'],
      status: 'delivered',
      senderSms: 'VM-JHGOVT',
      senderWhatsApp: 'Govt of Jharkhand Citizen Alerts',
      senderEmail: 'alerts@samadhan.jharkhand.gov.in',
    },
    {
      id: 'notif-3',
      title: 'Prototype development has started.',
      titleHi: 'प्रोटोटाइप विकास कार्य प्रारंभ हो चुका है।',
      message:
        'With ₹60,000 CSR funding from Tata Steel Foundation, the team has begun hardware fabrication and CAD sizing of the filtration chamber at the university innovation lab.',
      messageHi:
        'टाटा स्टील फाउंडेशन से ₹60,000 सीएसआर अनुदान प्राप्त होने के बाद कॉलेज लैब में हार्डवेयर प्रोटोटाइप निर्माण प्रारंभ हो गया है।',
      timestamp: '02 Sep 2026, 10:00 AM',
      channels: ['sms', 'whatsapp', 'email'],
      status: 'delivered',
      senderSms: 'VM-JHGOVT',
      senderWhatsApp: 'Govt of Jharkhand Citizen Alerts',
      senderEmail: 'alerts@samadhan.jharkhand.gov.in',
    },
    {
      id: 'notif-4',
      title: 'Field pilot completed.',
      titleHi: 'जमीनी पायलट अधिष्ठापन पूरा हुआ।',
      message:
        'The solar water filtration unit has been successfully mounted and tested at your village handpump site. Water testing report confirms turbidity reduced from 24.8 NTU to 1.2 NTU.',
      messageHi:
        'सौर जल शोधक इकाई आपके गांव के चापाकल पर सफलतापूर्वक स्थापित कर दी गई है। प्रयोगशाला जांच में पानी पीने योग्य प्रमाणित हुआ है।',
      timestamp: '06 Sep 2026, 02:45 PM',
      channels: ['sms', 'whatsapp', 'email'],
      status: 'delivered',
      senderSms: 'VM-JHGOVT',
      senderWhatsApp: 'Govt of Jharkhand Citizen Alerts',
      senderEmail: 'alerts@samadhan.jharkhand.gov.in',
    },
    {
      id: 'notif-5',
      title: 'Please verify whether the solution works.',
      titleHi: 'कृपया सत्यापित करें कि क्या समाधान से समस्या हल हुई।',
      message:
        'Important Citizen Feedback Request: The collegiate engineering squad and local administration have deployed the solution. Please inspect the water output and verify whether the issue is resolved.',
      messageHi:
        'नागरिक सत्यापन अनुरोध: छात्र टीम द्वारा चापाकल पर समाधान स्थापित कर दिया गया है। कृपया पानी की जांच कर बताएं कि क्या समस्या हल हुई?',
      timestamp: '08 Sep 2026, 09:15 AM',
      channels: ['sms', 'whatsapp', 'email'],
      status: 'action_required',
      actionLabel: 'Verify Solution (नागरिक सत्यापन करें)',
      actionLink: '/ground-deployment',
      senderSms: 'VM-JHGOVT',
      senderWhatsApp: 'Govt of Jharkhand Citizen Alerts',
      senderEmail: 'alerts@samadhan.jharkhand.gov.in',
    },
  ];

  // Filter notifications by channel
  const filteredNotifications = notificationCards.filter((notif) => {
    if (selectedChannel === 'all') return true;
    return notif.channels.includes(selectedChannel);
  });

  // Selected notification for simulator preview
  const activeSimulatorNotif =
    notificationCards.find((n) => n.id === selectedPreviewNotifId) || notificationCards[4];

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefs((prev) => ({
      ...prev,
      smsNumber: tempPhone,
      whatsappNumber: tempPhone,
      emailAddress: tempEmail,
    }));
    setIsEditingPhone(false);
    setIsEditingEmail(false);
    setSaveSuccessMessage('Notification Preferences Updated Successfully! (UI Prototype Confirmed)');
    addNotification({
      title: 'अधिसूचना प्राथमिकताएँ सहेजी गईं (Preferences Saved)',
      message: `टिकट ${activeTrackingCode} के लिए SMS, WhatsApp एवं Email सूचना प्राथमिकताएँ सक्रिय हैं।`,
      type: 'success',
    });
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TRACK PROBLEM PAGE HEADER & SEARCH INPUT */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm border-b-4 border-teal-500 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span>Citizen Tracking & Real-Time Alerts</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Track Problem & Citizen Notifications
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter your Problem ID / Ticket ID to view verified lifecycle progress, adoption milestones by collegiate engineering teams, and real-time citizen notification alerts.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
            Problem ID / Ticket ID (समस्या संख्या / टिकट आईडी)
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-teal-400" />
              </div>
              <input
                type="text"
                value={queryCode}
                onChange={(e) => setQueryCode(e.target.value)}
                placeholder="Problem ID / Ticket ID (Example: JH-1042)"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 text-white pl-11 pr-4 py-3.5 text-sm sm:text-base font-mono font-bold placeholder:text-slate-500 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 shadow-xs"
              icon={<Search className="w-4 h-4" />}
            >
              Track Status (स्थिति देखें)
            </Button>
          </div>

          {/* Example Hint Chips */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1">
            <span className="text-slate-300 font-semibold">Example / डेमो टिकट आईडी:</span>
            <button
              type="button"
              onClick={() => handleQuickSelect('JH-1042')}
              className={`font-mono px-3 py-1 rounded-xl border transition-all ${
                activeTrackingCode === 'JH-1042'
                  ? 'bg-teal-600 text-white border-teal-500 font-bold shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
              }`}
            >
              JH-1042 (Featured Example)
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('JH-RNC-2026-0814')}
              className={`font-mono px-2.5 py-1 rounded-xl border transition-all ${
                activeTrackingCode === 'JH-RNC-2026-0814'
                  ? 'bg-teal-600 text-white border-teal-500 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              JH-RNC-2026-0814
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('JH-BKR-2026-0492')}
              className={`font-mono px-2.5 py-1 rounded-xl border transition-all ${
                activeTrackingCode === 'JH-BKR-2026-0492'
                  ? 'bg-teal-600 text-white border-teal-500 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              JH-BKR-2026-0492
            </button>
          </div>
        </form>

        {/* Privacy Assurance Bar */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Citizen privacy protected: Personal phone numbers are masked on public displays.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            End-to-End Encrypted Notifications
          </span>
        </div>
      </div>

      {/* 2. PROBLEM SUMMARY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-black bg-slate-900 text-amber-300 px-3.5 py-1 rounded-xl shadow-2xs">
                Problem ID: {activeTrackingCode}
              </span>
              <span className="text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
                Water Supply & Sanitation
              </span>
              <span className="text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-600" />
                Khunti District (Rural)
              </span>
              {/* Requested exact status display */}
              <span
                className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  citizenFeedbackState === 'resolved'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : citizenFeedbackState === 'reopened'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-300'
                }`}
              >
                {citizenFeedbackState === 'resolved' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                ) : citizenFeedbackState === 'reopened' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                ) : (
                  <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                )}
                Status: {currentProblemStatus}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Problem:
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {problemTitle}
              </h2>
              <div className="text-xs text-slate-500 font-medium mt-1">
                गांव में चापाकल खराब — Hesal Tola, Khunti (Near Anganwadi Handpump)
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Community handpump cylinder broken down and yielding contaminated groundwater with high dissolved iron. Adopted by student innovators for solar-powered automated biofiltration and flow-sensor telemetry.
            </p>

            {/* Interactive Citizen Verification Banner (Can Resolve or Reopen) */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                citizenFeedbackState === 'resolved'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : citizenFeedbackState === 'reopened'
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-teal-50 border-teal-200 text-teal-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider">
                      {citizenFeedbackState === 'resolved'
                        ? '✅ Citizen Verified & Closed'
                        : citizenFeedbackState === 'reopened'
                        ? '⚠️ Reopened for Department Review'
                        : '📢 Citizen Action Required (नागरिक सत्यापन)'}
                    </span>
                    {citizenFeedbackTimestamp && (
                      <span className="text-[10px] font-mono opacity-80">
                        ({citizenFeedbackTimestamp})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {citizenFeedbackState === 'resolved'
                      ? 'आपने प्रमाणित किया है कि चापाकल से स्वच्छ जल मिल रहा है। यह शिकायत अब "Resolved" है और सार्वजनिक सामाजिक ऑडिट लेज़र पर दर्ज है।'
                      : citizenFeedbackState === 'reopened'
                      ? 'आपने रिपोर्ट किया है कि समस्या का निवारण नहीं हुआ। शिकायत पुनः खोली गई है तथा जिला अभियंता को त्वरित समीक्षा का निर्देश दिया गया है।'
                      : 'छात्र टीम व प्रशासन ने सौर जल शोधक अधिष्ठापित किया है। क्या चापाकल से स्वच्छ व पर्याप्त पानी मिल रहा है?'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {citizenFeedbackState === null ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCitizenFeedback('resolved')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      >
                        👍 Haan (Resolve Issue)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCitizenFeedback('reopened')}
                        className="bg-white border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs"
                        icon={<AlertCircle className="w-3.5 h-3.5" />}
                      >
                        ⚠️ Nahi (Reopen Issue)
                      </Button>
                    </>
                  ) : (
                    <>
                      {citizenFeedbackState === 'resolved' ? (
                        <Link to="/social-audit">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            View on Social Audit
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/ground-deployment">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            Inspect Ground Telemetry
                          </Button>
                        </Link>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetFeedback}
                        className="text-xs text-slate-600 bg-white"
                        icon={<RotateCcw className="w-3 h-3" />}
                      >
                        Reset Demo State
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Dossier */}
          <div className="lg:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3 shrink-0 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between pb-2 border-b border-slate-200">
              <span>Solution Squad</span>
              <span className="text-teal-800 bg-teal-100 px-2 py-0.5 rounded text-[10px] font-bold">
                Active Capstone
              </span>
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Adopted By:</span>
                <strong className="text-slate-900 font-bold text-right">
                  Tech Titans
                </strong>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">College:</span>
                <strong className="text-slate-900 text-right">
                  R.D. Engineering College
                </strong>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">CSR Sponsor:</span>
                <strong className="text-purple-900 font-bold text-right">
                  Tata Steel Foundation (₹60,000)
                </strong>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Beneficiary Citizens:</span>
                <strong className="text-emerald-700 font-bold text-right">
                  127 Residents
                </strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <Link to="/ground-deployment" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[11px] font-bold text-teal-800 bg-white"
                  icon={<ExternalLink className="w-3 h-3" />}
                >
                  Deployment Proofs
                </Button>
              </Link>
              <Link to="/social-audit" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[11px] font-bold text-slate-700 bg-white"
                >
                  Social Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. TIMELINE (EXACT SPECIFICATION) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Lifecycle Progress</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                TIMELINE
              </h3>
            </div>
            <div className="text-xs text-slate-500">
              Current Stage: <strong className="text-amber-700">Prototype Development (5/7)</strong>
            </div>
          </div>

          {/* 7-Step Milestones Table/Cards */}
          <div className="space-y-3 max-w-4xl mx-auto py-2">
            {timelineMilestones.map((step, idx) => {
              const isCompleted = step.state === 'completed';
              const isCurrent = step.state === 'current';
              const isUpcoming = step.state === 'upcoming';

              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-slate-50/60 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Status Symbol Icon */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-2xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
                          : 'bg-slate-200 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {step.symbol === '✓' ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : step.symbol === '🔄' ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          0{idx + 1}.
                        </span>
                        <h4
                          className={`text-base font-black ${
                            isCurrent
                              ? 'text-amber-950'
                              : isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-600'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          ({step.titleHi})
                        </span>

                        {isCurrent && (
                          <span className="text-[11px] font-black uppercase tracking-wider bg-amber-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                            Active Stage (प्रगति में)
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/80 text-xs">
                    <div className="font-bold text-slate-900 flex items-center sm:justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{step.date}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Actor: {step.actor}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. NOTIFICATIONS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-teal-600" />
              <span>Real-Time Citizen Dispatch</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Notifications
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Live citizen alerts triggered at every key milestone of your reported issue.
            </p>
          </div>

          {/* Channel Filter Pills with "Notification Preview" Notice */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setSelectedChannel('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedChannel === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Alerts ({notificationCards.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('sms')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                selectedChannel === 'sms'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3 h-3" />
              SMS Preview
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('whatsapp')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                selectedChannel === 'whatsapp'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              WhatsApp Preview
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('email')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                selectedChannel === 'email'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3 h-3" />
              Email Preview
            </button>
          </div>
        </div>

        {/* User Request Required Tag for Preview Environment */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Notification Preview: </strong>
              Displaying simulated SMS, WhatsApp, and Email dispatches configured for ticket <strong>{activeTrackingCode}</strong>.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-bold shrink-0">
            Prototype Preview Mode
          </span>
        </div>

        {/* 2-Column Layout: Notification Cards List + Interactive Phone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: The 5 Notification Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Notification Stream (5 Milestone Dispatches):
            </div>

            {filteredNotifications.map((notif, index) => {
              const isSelected = selectedPreviewNotifId === notif.id;
              const isActionRequired = notif.status === 'action_required';

              return (
                <div
                  key={notif.id}
                  onClick={() => setSelectedPreviewNotifId(notif.id)}
                  className={`cursor-pointer rounded-2xl border transition-all p-5 space-y-3 ${
                    isSelected
                      ? 'bg-teal-50/60 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      {/* Notification Channel Labels */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-100/80 text-teal-800 text-[10px] font-bold border border-teal-200">
                          <Phone className="w-2.5 h-2.5" />
                          SMS Notification Preview
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          <MessageSquare className="w-2.5 h-2.5" />
                          WhatsApp Preview
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-800 text-[10px] font-bold border border-blue-200">
                          <Mail className="w-2.5 h-2.5" />
                          Email Preview
                        </span>
                      </div>

                      {/* Exact Notification Title */}
                      <h4 className="text-base font-black text-slate-900 pt-1">
                        "{notif.title}"
                      </h4>
                      <div className="text-xs text-slate-500 font-medium">
                        {notif.titleHi}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-500 font-medium block">
                        {notif.timestamp}
                      </span>
                      {isActionRequired ? (
                        <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full">
                          Action Required
                        </span>
                      ) : (
                        <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {notif.message}
                  </p>

                  {/* Interactive Footer & Action */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <span className="text-[11px] text-slate-500">
                      Click to preview in simulated device →
                    </span>

                    <div className="flex items-center gap-2">
                      {notif.id === 'notif-5' && (
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleCitizenFeedback('resolved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-2xs flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            👍 Haan (Resolve)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCitizenFeedback('reopened')}
                            className="bg-slate-100 hover:bg-rose-50 text-rose-700 border border-rose-300 text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            ⚠️ Nahi (Reopen)
                          </button>
                        </div>
                      )}

                      {notif.actionLabel && notif.actionLink && notif.id !== 'notif-5' && (
                        <Link to={notif.actionLink} onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            {notif.actionLabel}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Device Simulator Preview (SMS / WhatsApp / Email) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Interactive Device Simulator</span>
              <span className="text-[11px] text-teal-700 font-semibold">
                Previewing: {activeSimulatorNotif.title}
              </span>
            </div>

            {/* Smartphone Mockup */}
            <div className="bg-slate-950 rounded-3xl p-3 border-4 border-slate-800 shadow-xl max-w-sm mx-auto text-white">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Screen Content */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                {/* Header App Bar */}
                <div className="bg-slate-800/90 px-3.5 py-2.5 border-b border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-[10px] font-bold">
                      JH
                    </div>
                    <div>
                      <div className="font-bold text-white text-[11px]">
                        {selectedChannel === 'whatsapp'
                          ? 'Govt of Jharkhand'
                          : selectedChannel === 'email'
                          ? 'Samadhan Jharkhand'
                          : 'VM-JHGOVT'}
                      </div>
                      <div className="text-[9px] text-emerald-400 font-mono">
                        {selectedChannel === 'whatsapp'
                          ? 'Official Business Account ✓'
                          : selectedChannel === 'email'
                          ? 'Official Civic Dispatch'
                          : 'e-Sampark Govt Gateway'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activeSimulatorNotif.timestamp.split(',')[1]}
                  </span>
                </div>

                {/* Message Bubble Container */}
                <div className="p-4 space-y-3 min-h-[290px] bg-slate-950/60 text-xs">
                  <div className="text-center">
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      Ticket #{activeTrackingCode} • Encrypted Dispatch
                    </span>
                  </div>

                  {/* Bubble */}
                  <div className="bg-teal-950 border border-teal-800/80 rounded-2xl rounded-tl-sm p-3.5 space-y-2 text-slate-100 shadow-sm">
                    <div className="flex items-center justify-between border-b border-teal-800/60 pb-1.5">
                      <strong className="text-amber-300 font-bold text-xs">
                        {activeSimulatorNotif.title}
                      </strong>
                      <span className="text-[10px] text-teal-300">Govt Alert</span>
                    </div>

                    <p className="text-[11px] leading-relaxed text-slate-200">
                      {activeSimulatorNotif.message}
                    </p>

                    <div className="pt-1 text-[10px] text-slate-400 border-t border-teal-800/40 flex items-center justify-between">
                      <span>Ref: {activeTrackingCode}</span>
                      <span className="text-emerald-400 font-mono">Status: Verified ✓</span>
                    </div>
                  </div>

                  {/* Verification Prompt for Card #5 */}
                  {activeSimulatorNotif.id === 'notif-5' && (
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2 text-center">
                      <div className="text-[11px] font-bold text-amber-300">
                        Citizen Feedback Required (नागरिक प्रतिक्रिया)
                      </div>
                      <p className="text-[10px] text-slate-300">
                        "Kya handpump se peene yogya paani mil raha hai?"
                      </p>
                      {citizenFeedbackState === null ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleCitizenFeedback('resolved')}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors shadow-2xs"
                          >
                            👍 Haan (Yes)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCitizenFeedback('reopened')}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1.5 rounded-lg text-[11px] transition-colors"
                          >
                            ⚠️ Nahi (No)
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5 pt-1">
                          <div
                            className={`text-[11px] font-bold py-1 px-2 rounded-md ${
                              citizenFeedbackState === 'resolved'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {citizenFeedbackState === 'resolved'
                              ? '✓ Verified: Problem Resolved'
                              : '⚠️ Flagged: Issue Reopened'}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-[10px]">
                            <button
                              type="button"
                              onClick={handleResetFeedback}
                              className="text-slate-400 hover:text-white underline cursor-pointer"
                            >
                              Reset feedback
                            </button>
                            <span className="text-slate-600">•</span>
                            <Link
                              to="/ground-deployment"
                              className="text-teal-400 hover:text-teal-300 underline"
                            >
                              Ground Proofs →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Input Bar */}
                <div className="bg-slate-900 p-2.5 border-t border-slate-800 flex items-center gap-2 text-xs">
                  <input
                    type="text"
                    disabled
                    placeholder="Two-way SMS / WhatsApp reply active..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-slate-400 cursor-not-allowed"
                  />
                  <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-500">
              Simulated citizen device showing real-time gateway formatting.
            </div>
          </div>
        </div>
      </div>

      {/* 5. NOTIFICATION PREFERENCES SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-teal-600" />
              <span>Subscriber Management</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Notification Preferences
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Configure how and where you receive citizen alerts, verification requests, and milestone digests for Ticket #{activeTrackingCode}.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
            Prototype UI • Preferences Localized
          </span>
        </div>

        {saveSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        <form onSubmit={handleSavePreferences} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OPTION 1: SMS */}
            <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
              prefs.smsEnabled ? 'border-teal-300 bg-teal-50/20' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">SMS</h4>
                    <span className="text-[11px] text-slate-500">Carrier Text Gateway</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.smsEnabled}
                    onChange={(e) => setPrefs((prev) => ({ ...prev, smsEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-slate-600 font-semibold">
                  Registered Mobile Number:
                </label>
                {isEditingPhone ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-3 py-2 rounded-xl border border-teal-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditingPhone(false)}
                      className="px-2.5 py-1 bg-teal-600 text-white text-xs rounded-lg font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-mono font-bold text-slate-900">{prefs.smsNumber}</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingPhone(true)}
                      className="text-[11px] font-bold text-teal-700 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                )}
                <span className="text-[11px] text-slate-500 block">
                  Dispatches verification SMS and OTP verification requests.
                </span>
              </div>
            </div>

            {/* OPTION 2: WhatsApp */}
            <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
              prefs.whatsappEnabled ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">WhatsApp</h4>
                    <span className="text-[11px] text-slate-500">Interactive Chatbot</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.whatsappEnabled}
                    onChange={(e) => setPrefs((prev) => ({ ...prev, whatsappEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-slate-600 font-semibold">
                  WhatsApp Messaging Line:
                </label>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-mono font-bold text-slate-900">{prefs.whatsappNumber}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Linked
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Includes photo updates of student fabrication and 1-click verification prompts.
                </span>
              </div>
            </div>

            {/* OPTION 3: Email */}
            <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
              prefs.emailEnabled ? 'border-blue-300 bg-blue-50/20' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Email</h4>
                    <span className="text-[11px] text-slate-500">Official Audit Ledger</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.emailEnabled}
                    onChange={(e) => setPrefs((prev) => ({ ...prev, emailEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-slate-600 font-semibold">
                  Email Address:
                </label>
                {isEditingEmail ? (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-3 py-2 rounded-xl border border-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="px-2.5 py-1 bg-blue-600 text-white text-xs rounded-lg font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-mono text-slate-900 truncate" title={prefs.emailAddress}>
                      {prefs.emailAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(true)}
                      className="text-[11px] font-bold text-blue-700 hover:underline shrink-0 ml-1"
                    >
                      Change
                    </button>
                  </div>
                )}
                <span className="text-[11px] text-slate-500 block">
                  Formal milestone sign-off sheets, lab testing certificates, and audit PDF dossiers.
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-teal-600 shrink-0" />
              <span>You can update or disable notification channels at any point during problem lifecycle.</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold"
              icon={<Check className="w-4 h-4 text-emerald-400" />}
            >
              Save Notification Preferences (प्राथमिकताएँ सहेजें)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TrackProblem;
