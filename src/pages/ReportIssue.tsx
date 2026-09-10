import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JHARKHAND_CATEGORIES, JHARKHAND_DISTRICTS } from '../data/jharkhandData';
import { Button } from '../components/common/Button';
import { SuccessCheckAnimation } from '../components/common/SuccessCheckAnimation';
import { Coordinates, Problem } from '../types';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Phone,
  User,
  ShieldCheck,
  FileCheck,
  Copy,
  ExternalLink,
  Volume2,
  Info,
  Check,
  X,
  Layers,
  AlertTriangle,
  ThumbsUp,
  Edit3,
  ChevronDown,
  CheckCircle,
  Search,
} from 'lucide-react';

type WizardStep = 'entry' | 'photo' | 'voice' | 'location' | 'preview' | 'ai_processing' | 'result';
type DemoLanguage = 'Hindi' | 'Bhojpuri' | 'Santhali' | 'Mundari' | 'Khortha';

interface DemoAudioSample {
  lang: DemoLanguage;
  langNative: string;
  transcription: string;
  translationEn: string;
  category: string;
}

const DEMO_VOICE_SAMPLES: Record<DemoLanguage, DemoAudioSample> = {
  Bhojpuri: {
    lang: 'Bhojpuri',
    langNative: 'भोजपुरी',
    transcription: 'हमार गांव में पिछला 15 दिन से चापाकल खराब बा, पानी में बहुत लाल जंग आ बालू निकल रहल बा। मेहरारू आ लइका लोग के 2 किलोमीटर दूर जाए के पड़त बा।',
    translationEn: 'In our village for the last 15 days the handpump is broken, reddish rust and sand is coming in water. Women and children have to walk 2km.',
    category: 'water_sanitation',
  },
  Hindi: {
    lang: 'Hindi',
    langNative: 'हिंदी',
    transcription: 'हमारे गांव के प्राइमरी स्कूल की छत पूरी तरह टपक रही है और बिजली का ट्रांसफार्मर 2 महीने से जला हुआ है। बच्चों की पढ़ाई ठप हो गई है।',
    translationEn: 'Our village primary school roof is severely leaking and electricity transformer has been burnt for 2 months. Children education is stopped.',
    category: 'solar_electricity',
  },
  Santhali: {
    lang: 'Santhali',
    langNative: 'संथाली (Ol Chiki)',
    transcription: 'ᱟᱞᱮ ᱟᱛᱳ ᱨᱮ ᱫᱟᱜ ᱨᱮᱱᱟᱜ ᱟᱹᱰᱤ ᱢᱩᱥᱠᱤᱞ ᱢᱮᱱᱟᱜᱼᱟ, ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱟᱨᱟᱯ ᱜᱮᱭᱟ ᱟᱨ ᱠᱩᱧ ᱦᱚᱸ ᱨᱚᱦᱚᱲ ᱮᱱᱟ᱾',
    translationEn: 'There is a severe water crisis in our village, the tube well is damaged and open wells have dried up.',
    category: 'water_sanitation',
  },
  Mundari: {
    lang: 'Mundari',
    langNative: 'मुंडारी',
    transcription: 'अलेयाः हातु रे लाह (Lac) बाज़ार ते इदी लगिड पुलिया घांगुर काना। बरसा दिन रे होरा बंद होबाओआ।',
    translationEn: 'In our village the culvert to take lac produce to market is broken. During monsoons the route completely closes.',
    category: 'roads_bridges',
  },
  Khortha: {
    lang: 'Khortha',
    langNative: 'खोरठा',
    transcription: 'हमनी के टोला में जंगली हाथी मन के उपद्रव बढ़ गेल हउवे, खेत के सब धान रोंद देलथिन। तुरंते सोलर फेंसिंग या अलार्म चाहिए।',
    translationEn: 'In our hamlet wild elephant disturbance has increased, they trampled all paddy crops. We urgently need solar fencing or siren alarm.',
    category: 'forest_tribal',
  },
};

export const ReportIssue: React.FC = () => {
  const navigate = useNavigate();
  const { reportProblem, problems, upvoteProblem } = useApp();

  // Wizard state
  const [currentStep, setCurrentStep] = useState<WizardStep>('entry');

  // Step 0: Entry & Identity
  const [entryMode, setEntryMode] = useState<'mobile_otp' | 'guest'>('guest');
  const [mobileNumber, setMobileNumber] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [demoOtpValue, setDemoOtpValue] = useState('4281');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Step 1: Photo / Video
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Step 2: Voice recording
  const [selectedLanguage, setSelectedLanguage] = useState<DemoLanguage>('Hindi');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [detectedVoiceLanguage, setDetectedVoiceLanguage] = useState<string>('Hindi');
  const timerRef = useRef<any>(null);

  // Step 3: Location
  const [district, setDistrict] = useState('Khunti');
  const [block, setBlock] = useState('Ormanjhi');
  const [village, setVillage] = useState('Demo Village, Ward 3');
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 23.3441, lng: 85.3096 });
  const [locationStatus, setLocationStatus] = useState<string>('Default Demo GPS');
  const [isAutoDetectingLocation, setIsAutoDetectingLocation] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);

  // Step 5: AI Processing Simulation
  const [aiProgressStage, setAiProgressStage] = useState(0);

  // Step 6: AI Result & Duplicate Check State
  const [complaintText, setComplaintText] = useState('Handpump kharab hai aur gaon mein peene ka paani nahi mil raha.');
  const [detectedCategory, setDetectedCategory] = useState('Water Supply / Drinking Water');
  const [detectedCategoryHi, setDetectedCategoryHi] = useState('पेयजल एवं स्वच्छता');
  const [detectedPriority, setDetectedPriority] = useState<'HIGH' | 'CRITICAL' | 'MEDIUM' | 'LOW'>('HIGH');
  const [detectedReason, setDetectedReason] = useState('Drinking water issue affecting local residents.');
  const [isCategoryConfirmed, setIsCategoryConfirmed] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [categoryNotice, setCategoryNotice] = useState<string | null>(null);

  // Duplicate Check logic
  const [duplicateMode, setDuplicateMode] = useState<'similar_found' | 'no_duplicate'>('similar_found');
  const [upvoteConfirmed, setUpvoteConfirmed] = useState(false);
  const [newTicketResult, setNewTicketResult] = useState<Problem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Demo Presets for Evaluators
  const handleLoadSample = (sampleKey: DemoLanguage) => {
    const sample = DEMO_VOICE_SAMPLES[sampleKey];
    setSelectedLanguage(sampleKey);
    setDetectedVoiceLanguage(sample.langNative);
    setTranscriptionText(sample.transcription);
  };

  // Timer for recording simulation
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Voice recording toggle
  const startRecording = () => {
    setIsRecording(true);
    setTranscriptionText('');

    // Check if real Web Speech API is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = selectedLanguage === 'Hindi' ? 'hi-IN' : 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          if (current) setTranscriptionText(current);
        };

        recognition.onerror = () => {
          // Fallback seamlessly to regional sample
          const sample = DEMO_VOICE_SAMPLES[selectedLanguage];
          setTranscriptionText(sample.transcription);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        return;
      } catch (e) {
        // Fall through to simulation
      }
    }

    // Default simulation behavior: simulate transcription appearing after 2 seconds
    setTimeout(() => {
      const sample = DEMO_VOICE_SAMPLES[selectedLanguage];
      setTranscriptionText(sample.transcription);
      setDetectedVoiceLanguage(`${selectedLanguage} (${sample.langNative})`);
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (!transcriptionText) {
      const sample = DEMO_VOICE_SAMPLES[selectedLanguage];
      setTranscriptionText(sample.transcription);
      setDetectedVoiceLanguage(`${selectedLanguage} (${sample.langNative})`);
    }
  };

  // Step 1: File handling
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEvidencePhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectDemoImage = (url: string, label: string) => {
    setEvidencePhoto(url);
    setPhotoCaption(label);
  };

  // Step 3: Location auto-detection
  const handleAutoDetectLocation = () => {
    setIsAutoDetectingLocation(true);
    setLocationStatus('Searching GPS signals / टावर सिग्नल खोज रहा है...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lng = parseFloat(pos.coords.longitude.toFixed(4));
          setCoordinates({ lat, lng });
          setLocationStatus(`✓ GPS Fixed (Accuracy: ±${Math.round(pos.coords.accuracy || 12)}m)`);
          setDistrict('Khunti');
          setBlock('Ormanjhi');
          setVillage('Demo Village, Ward 3');
          setIsAutoDetectingLocation(false);
        },
        () => {
          // Graceful simulated fallback with official Khunti/Ranchi coords
          setTimeout(() => {
            setCoordinates({ lat: 23.3441, lng: 85.3096 });
            setLocationStatus('✓ Simulated GPS: Khunti District (Accuracy: ±8 meters)');
            setDistrict('Khunti');
            setBlock('Ormanjhi');
            setVillage('Demo Village, Ward 3');
            setIsAutoDetectingLocation(false);
          }, 800);
        },
        { timeout: 4000 }
      );
    } else {
      setTimeout(() => {
        setCoordinates({ lat: 23.3441, lng: 85.3096 });
        setLocationStatus('✓ Simulated GPS: Khunti District (Accuracy: ±8 meters)');
        setDistrict('Khunti');
        setBlock('Ormanjhi');
        setVillage('Demo Village, Ward 3');
        setIsAutoDetectingLocation(false);
      }, 800);
    }
  };

  // Trigger submission and realistic AI progress flow
  const handleSubmitProblem = () => {
    setCurrentStep('ai_processing');
    setAiProgressStage(1); // 1. Understanding citizen description
    setUpvoteConfirmed(false);
    setNewTicketResult(null);
    setIsCategoryConfirmed(false);
    setShowCategoryPicker(false);
    setCategoryNotice(null);

    // Formulate actual complaint text from citizen input or default example
    const actualComplaint = transcriptionText.trim() || 'Handpump kharab hai aur gaon mein peene ka paani nahi mil raha.';
    setComplaintText(actualComplaint);

    const lower = actualComplaint.toLowerCase();
    if (lower.includes('electric') || lower.includes('transformer') || lower.includes('solar') || lower.includes('बिजली')) {
      setDetectedCategory('Rural Electricity & Solar Microgrids');
      setDetectedCategoryHi('विद्युत एवं सौर ऊर्जा');
      setDetectedPriority('HIGH');
      setDetectedReason('Electrical transformer failure disrupting village essential lighting and school.');
      setDuplicateMode('no_duplicate');
    } else if (lower.includes('road') || lower.includes('bridge') || lower.includes('सड़क') || lower.includes('पुल')) {
      setDetectedCategory('Rural Roads & Culverts');
      setDetectedCategoryHi('सड़क एवं पुलिया');
      setDetectedPriority('HIGH');
      setDetectedReason('Inaccessible road culvert risking emergency transit and essential health access.');
      setDuplicateMode('no_duplicate');
    } else if (lower.includes('elephant') || lower.includes('lac') || lower.includes('हाथी') || lower.includes('लाह')) {
      setDetectedCategory('Tribal Livelihood & Forest Produce');
      setDetectedCategoryHi('वनोत्पाद एवं जनजातीय आजीविका');
      setDetectedPriority('CRITICAL');
      setDetectedReason('Acute human-wildlife conflict and primary tribal income disruption.');
      setDuplicateMode('no_duplicate');
    } else {
      // Default / Water issue as in prompt:
      setDetectedCategory('Water Supply / Drinking Water');
      setDetectedCategoryHi('पेयजल एवं स्वच्छता');
      setDetectedPriority('HIGH');
      setDetectedReason('Drinking water issue affecting local residents.');
      setDuplicateMode('similar_found');
    }

    // Sequence of 5 exact milestones:
    // ✓ Understanding citizen description
    // ✓ Detecting problem category
    // ✓ Checking similar problems
    // ✓ Calculating priority
    // ✓ Preparing verification
    setTimeout(() => setAiProgressStage(2), 600);
    setTimeout(() => setAiProgressStage(3), 1200);
    setTimeout(() => setAiProgressStage(4), 1800);
    setTimeout(() => setAiProgressStage(5), 2400);

    setTimeout(() => {
      setCurrentStep('result');
    }, 3100);
  };

  // Upvote the existing duplicate without creating a new ticket
  const handleUpvoteDuplicate = () => {
    const existing = problems.find((p) => p.id === 'jh-prb-007') || problems[0];
    if (existing) {
      upvoteProblem(existing.id);
    }
    setUpvoteConfirmed(true);
  };

  // Create an independent problem ticket
  const handleCreateIndependentProblem = () => {
    let catId = 'water_sanitation';
    if (detectedCategory.toLowerCase().includes('electr')) catId = 'solar_electricity';
    else if (detectedCategory.toLowerCase().includes('road')) catId = 'roads_bridges';
    else if (detectedCategory.toLowerCase().includes('forest') || detectedCategory.toLowerCase().includes('tribal')) catId = 'forest_tribal';
    else if (detectedCategory.toLowerCase().includes('agri')) catId = 'agri_irrigation';

    const problem = reportProblem({
      title: complaintText.slice(0, 75) + (complaintText.length > 75 ? '...' : ''),
      description: complaintText,
      category: catId,
      categoryHi: detectedCategoryHi,
      citizenName: citizenName || 'Aam Nagrik (आम नागरिक)',
      citizenPhoneMasked: mobileNumber ? `+91 ******${mobileNumber.slice(-4)}` : '+91 987XXXXXXX',
      district,
      block,
      villageOrWard: village,
      coordinates,
      priority: detectedPriority.toLowerCase() as any,
      evidence: evidencePhoto
        ? [
            {
              id: `ev-${Date.now()}`,
              url: evidencePhoto,
              type: 'image',
              caption: photoCaption || 'Citizen submitted visual evidence',
              uploadedAt: new Date().toISOString(),
            },
          ]
        : [
            {
              id: `ev-default`,
              url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
              type: 'image',
              caption: 'Citizen reported ground evidence',
              uploadedAt: new Date().toISOString(),
            },
          ],
    });
    setNewTicketResult(problem);
  };

  const copyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectCategory = (catNameEn: string, catNameHi: string, reason: string) => {
    setDetectedCategory(catNameEn);
    setDetectedCategoryHi(catNameHi);
    setDetectedReason(reason);
    setIsCategoryConfirmed(true);
    setShowCategoryPicker(false);
    setCategoryNotice(`✓ श्रेणी को बदल कर "${catNameEn}" कर दिया गया है।`);
    setTimeout(() => setCategoryNotice(null), 4000);
  };

  return (
    <div className="min-h-[85vh] bg-[#060d0a] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-3xl mx-auto">
        {/* Top Header & Context */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d2218] border border-[#1e4231] text-emerald-300 text-xs font-bold mb-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>नागरिक प्रपत्र • Citizen Problem Submission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            अपनी समस्या दर्ज करें
          </h1>
          <p className="text-xs sm:text-sm text-[#8ea598] mt-1 max-w-md mx-auto">
            कम से कम टाइपिंग: केवल फोटो लें, बोलकर बताएं और लोकेशन ऑटो-डिटेक्ट करें।
          </p>
        </div>

        {/* Step Progress Tracker (Steps 0 to 4) */}
        {currentStep !== 'ai_processing' && currentStep !== 'result' && (
          <div className="bg-[#11231b] rounded-2xl p-3 sm:p-4 border border-[#1e382b] shadow-xs mb-6">
            <div className="flex items-center justify-between text-xs">
              {[
                { id: 'entry', num: '0', label: 'प्रवेश (Entry)' },
                { id: 'photo', num: '1', label: 'फोटो (Photo)' },
                { id: 'voice', num: '2', label: 'आवाज (Voice)' },
                { id: 'location', num: '3', label: 'स्थान (Location)' },
                { id: 'preview', num: '4', label: 'जांचें (Preview)' },
              ].map((s, idx) => {
                const stepOrder: WizardStep[] = ['entry', 'photo', 'voice', 'location', 'preview'];
                const currentIndex = stepOrder.indexOf(currentStep);
                const isPassed = idx < currentIndex;
                const isCurrent = currentStep === s.id;

                return (
                  <div key={s.id} className="flex-1 flex flex-col items-center text-center px-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-md font-black'
                          : 'bg-[#081510] border border-[#1e382b] text-[#5d7c6d]'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1 font-semibold truncate max-w-full ${
                        isCurrent ? 'text-emerald-300 font-bold' : isPassed ? 'text-[#8ea598]' : 'text-[#5d7c6d]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 0: ENTRY (Mobile Number vs Guest Mode) */}
        {/* ========================================================================= */}
        {currentStep === 'entry' && (
          <div className="bg-[#11231b] rounded-3xl p-6 sm:p-8 border border-[#1e382b] shadow-xl space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                शुरुआत करें (Step 0: Choose Entry Mode)
              </h2>
              <p className="text-xs text-[#8ea598]">
                सुविधा अनुसार मोबाइल नंबर से जारी रखें या बिना अकाउंट के अतिथि मोड में तुरंत रिपोर्ट करें।
              </p>
            </div>

            {/* Selection Mode Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEntryMode('guest')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                  entryMode === 'guest'
                    ? 'border-emerald-500 bg-[#0d2319] shadow-sm'
                    : 'border-[#1e382b] hover:border-[#2a4d3c] bg-[#0c1a14]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-800/80 px-2 py-0.5 rounded-md inline-block mb-2">
                    अनुशंसित (Recommended)
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Guest Mode — Account ke bina Problem Report Karein
                  </h3>
                  <p className="text-xs text-[#8ea598] mt-1">
                    कोई ओटीपी या पासवर्ड नहीं। केवल नाम और संपर्क नंबर भरें।
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-emerald-400">
                  {entryMode === 'guest' ? '✓ चयनित (Selected)' : 'चुनें'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setEntryMode('mobile_otp')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                  entryMode === 'mobile_otp'
                    ? 'border-emerald-500 bg-[#0d2319] shadow-sm'
                    : 'border-[#1e382b] hover:border-[#2a4d3c] bg-[#0c1a14]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-blue-300 bg-blue-950/90 border border-blue-800/80 px-2 py-0.5 rounded-md inline-block mb-2">
                    एसएमएस अलर्ट
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Mobile Number se Continue
                  </h3>
                  <p className="text-xs text-[#8ea598] mt-1">
                    ओटीपी सत्यापन के साथ स्थिति अपडेट सीधे आपके फोन पर।
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-emerald-400">
                  {entryMode === 'mobile_otp' ? '✓ चयनित (Selected)' : 'चुनें'}
                </div>
              </button>
            </div>

            {/* Guest Mode Fields */}
            {entryMode === 'guest' && (
              <div className="p-4 bg-[#0c1a14] rounded-2xl border border-[#1e382b] space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>आपका नाम (Your Name) *</span>
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="उदा. बिरसा मुंडा / Birsa Munda"
                    className="w-full px-4 py-3 rounded-xl border border-[#1e382b] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm bg-[#081510] text-white placeholder-[#527060]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>मोबाइल नंबर (Mobile Number) *</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="w-full px-4 py-3 rounded-xl border border-[#1e382b] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm bg-[#081510] text-white placeholder-[#527060]"
                  />
                  <span className="text-[11px] text-[#8ea598]">
                    ट्रैकिंग कोड एसएमएस द्वारा भेजने हेतु उपयोग किया जाएगा।
                  </span>
                </div>
              </div>
            )}

            {/* Mobile OTP Simulation Fields */}
            {entryMode === 'mobile_otp' && (
              <div className="p-4 bg-[#0a1824] rounded-2xl border border-blue-900/60 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-200">
                    मोबाइल नंबर दर्ज करें (Enter Mobile Number)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="उदा. 9872144810"
                      className="flex-1 px-4 py-3 rounded-xl border border-blue-800/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm bg-[#061018] text-white placeholder-[#4e6c80]"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      {otpSent ? 'ओटीपी पुनः भेजें' : 'ओटीपी भेजें'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="p-3 bg-[#0d2217] rounded-xl border border-emerald-700/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-emerald-300 font-bold">
                      <span>📱 डेमो एसएमएस (Demo Simulated OTP):</span>
                      <span className="font-mono bg-emerald-950 px-2 py-0.5 rounded text-sm text-emerald-200 font-black border border-emerald-800">
                        {demoOtpValue}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8ea598]">
                      प्रोटोटाइप परीक्षण हेतु यह ओटीपी नीचे दर्ज करें:
                    </p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => {
                          setOtpInput(e.target.value);
                          if (e.target.value === demoOtpValue) {
                            setIsOtpVerified(true);
                          }
                        }}
                        placeholder="4281"
                        className="w-32 px-3 py-2 text-center font-mono font-bold text-lg rounded-lg border border-[#1e382b] bg-[#081510] text-white focus:border-emerald-500"
                      />
                      {isOtpVerified ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> सत्यापित (Verified)
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpInput(demoOtpValue);
                            setIsOtpVerified(true);
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                        >
                          स्वचालित भरें (Auto-Fill)
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Continue Button */}
            <div className="pt-2">
              <Button
                variant="citizen-large"
                size="xl"
                fullWidth
                onClick={() => {
                  if (!citizenName && entryMode === 'guest') {
                    setCitizenName('झारखंड नागरिक (Citizen)');
                  }
                  if (!mobileNumber) {
                    setMobileNumber('9872144810');
                  }
                  setCurrentStep('photo');
                }}
              >
                आगे बढ़ें (Continue to Step 1: Photo) →
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: PHOTO / VIDEO */}
        {/* ========================================================================= */}
        {currentStep === 'photo' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase">चरण 1 / 4 (Step 1)</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                <span>📷 Photo / Video Add Karein</span>
              </h2>
              <p className="text-xs text-slate-500">
                समस्या की तस्वीर खींचें या फोन से चुनें (कम से कम 1 स्पष्ट फोटो अनिवार्य है)
              </p>
            </div>

            {/* Hidden native inputs for real device camera / upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Upload Buttons */}
            {!evidencePhoto ? (
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-3xl p-6 sm:p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center text-3xl shadow-xs">
                  📸
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    तस्वीर या वीडियो अपलोड करें
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    खराब चापाकल, टूटा पुल, जला ट्रांसफार्मर अथवा सड़क की तस्वीर
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                  {/* Button 1: Open Camera */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera</span>
                  </button>

                  {/* Button 2: Upload from Device */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>Upload from Device</span>
                  </button>
                </div>

                {/* Quick 1-click sample photos for demo testing */}
                <div className="pt-4 border-t border-emerald-200/60">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">
                    💡 हैकाथॉन त्वरित परीक्षण हेतु नमूना फोटो चुनें (Click sample to test):
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        selectDemoImage(
                          'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
                          'जंग युक्त चापाकल एवं दूषित लाल पानी (Rust Handpump)'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-[11px] font-medium hover:border-emerald-600 text-slate-700 shadow-2xs"
                    >
                      🚰 चापाकल जंग (Handpump)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectDemoImage(
                          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
                          'टूटी हुई ग्रामीण पुलिया (Damaged Culvert)'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-[11px] font-medium hover:border-emerald-600 text-slate-700 shadow-2xs"
                    >
                      🌉 क्षतिग्रस्त पुलिया (Bridge)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectDemoImage(
                          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
                          'जला हुआ विद्युत ट्रांसफार्मर (Burnt Transformer)'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-[11px] font-medium hover:border-emerald-600 text-slate-700 shadow-2xs"
                    >
                      ⚡ जला ट्रांसफार्मर (Solar/Power)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Photo Preview with Remove & Replace controls */
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md aspect-video bg-black flex items-center justify-center">
                  <img
                    src={evidencePhoto}
                    alt="Problem Evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold">{photoCaption || 'साक्ष्य फोटो संलग्न (Photo Attached)'}</span>
                    </div>
                    <span className="text-[10px] text-slate-300">GPS & Timestamp Signal Captured</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setEvidencePhoto(null);
                      setPhotoCaption('');
                    }}
                    className="px-3 py-2 rounded-xl text-rose-700 bg-rose-50 border border-rose-200 font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> फोटो हटाएं (Remove)
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl text-slate-700 bg-slate-100 border border-slate-300 font-bold hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> फोटो बदलें (Replace)
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="md"
                onClick={() => setCurrentStep('entry')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                वापस (Back)
              </Button>

              <Button
                variant="citizen-large"
                size="lg"
                disabled={!evidencePhoto}
                onClick={() => setCurrentStep('voice')}
              >
                आगे बढ़ें (Next: Voice) →
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: VOICE (Bol Kar Batayein) */}
        {/* ========================================================================= */}
        {currentStep === 'voice' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase">चरण 2 / 4 (Step 2)</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                <span>🎙️ Bol Kar Batayein</span>
              </h2>
              <p className="text-sm font-semibold text-emerald-800">
                "Apni bhasha mein problem batayein"
              </p>
              <p className="text-xs text-slate-500">
                टाइप करने की जरूरत नहीं! माइक बटन दबाकर अपनी भाषा में समस्या बोलें।
              </p>
            </div>

            {/* Language Selection Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block text-center">
                अपनी भाषा चुनें (Choose Your Language):
              </label>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {(['Hindi', 'Bhojpuri', 'Santhali', 'Mundari', 'Khortha'] as DemoLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLoadSample(lang)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedLanguage === lang
                        ? 'bg-emerald-700 text-white shadow-xs scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{lang}</span>
                    <span className="text-[10px] ml-1 font-normal opacity-80">
                      ({DEMO_VOICE_SAMPLES[lang].langNative})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Big Interactive Microphone Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 border border-slate-800 shadow-inner">
              {/* Pulsing Recording State Indicator */}
              {isRecording ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40 animate-pulse">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>रिकॉर्डिंग चालू है... (Recording Active) • {recordingSeconds}s</span>
                  </div>

                  {/* Visual Soundwave Animation */}
                  <div className="flex items-center justify-center gap-1.5 h-12">
                    {[35, 75, 45, 95, 60, 85, 40, 90, 65, 50, 80].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1.5 bg-emerald-400 rounded-full animate-pulse transition-all duration-150"
                      />
                    ))}
                  </div>

                  {/* Stop Button */}
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 mx-auto"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>Stop Recording (रोकें)</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Big Microphone Tap Button */}
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-xl ring-8 ring-emerald-500/30 hover:scale-105 transition-all group cursor-pointer"
                    aria-label="Start Voice Recording"
                  >
                    <Mic className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" />
                  </button>

                  <div>
                    <h4 className="font-bold text-base text-slate-100">
                      माइक दबाएं और बोलना शुरू करें
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      (Tap the mic to record your grievance)
                    </p>
                  </div>
                </div>
              )}

              {/* Demo Language Placeholder Note */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 text-left">
                <span className="font-bold text-amber-300 block mb-0.5">
                  उदा. (Example for {selectedLanguage}):
                </span>
                <p className="italic text-[11px] text-slate-300">
                  "{DEMO_VOICE_SAMPLES[selectedLanguage].transcription}"
                </p>
              </div>
            </div>

            {/* Transcription Preview Box (Editable) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>ऑटो-ट्रांसक्रिप्शन पूर्वावलोकन (Transcribed Text):</span>
                </label>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  पहचानी गई भाषा: {detectedVoiceLanguage}
                </span>
              </div>

              <textarea
                rows={3}
                value={transcriptionText}
                onChange={(e) => setTranscriptionText(e.target.value)}
                placeholder="बोलने पर आपकी आवाज यहां स्वतः लिख जाएगी (या आप हाथ से भी लिख सकते हैं)..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm bg-slate-50"
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="md"
                onClick={() => setCurrentStep('photo')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                वापस (Back)
              </Button>

              <Button
                variant="citizen-large"
                size="lg"
                disabled={!transcriptionText.trim()}
                onClick={() => setCurrentStep('location')}
              >
                आगे बढ़ें (Next: Location) →
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: LOCATION (Meri Location) */}
        {/* ========================================================================= */}
        {currentStep === 'location' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase">चरण 3 / 4 (Step 3)</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                <span>📍 Meri Location</span>
              </h2>
              <p className="text-xs text-slate-500">
                समस्या का सही स्थान निर्धारित करें ताकि जिला अधिकारी व छात्र टीमें मौके पर पहुंच सकें।
              </p>
            </div>

            {/* Primary Button: Auto-Detect My Location */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-300 text-center space-y-3">
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={isAutoDetectingLocation}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <MapPin className={`w-5 h-5 ${isAutoDetectingLocation ? 'animate-spin' : ''}`} />
                <span>
                  {isAutoDetectingLocation ? 'स्थान खोजा जा रहा है...' : 'Auto-Detect My Location (मेरा स्थान स्वतः खोजें)'}
                </span>
              </button>

              {/* Status & Coordinates Readout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs pt-1">
                <div className="bg-white p-3 rounded-xl border border-emerald-200">
                  <span className="text-slate-500 text-[11px] block">जीपीएस स्थिति (Accuracy Status):</span>
                  <strong className="text-emerald-800 font-bold">{locationStatus}</strong>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono">
                  <span className="text-slate-500 text-[11px] block font-sans">अक्षांश / देशांतर (Coordinates):</span>
                  <strong className="text-slate-900 text-xs">
                    {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                  </strong>
                </div>
              </div>

              {/* Selected village / location display */}
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-left text-xs">
                <span className="text-slate-500 text-[11px] block">पहचाना गया गांव / मोहल्ला:</span>
                <span className="font-black text-slate-900 text-sm">
                  {village}, {block}, {district}
                </span>
              </div>
            </div>

            {/* EXIF GPS Signal Security Notice as Requested */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[11px]">
                <strong>प्रशासनिक निर्देश:</strong> फोटो मेटाडेटा (EXIF) को केवल एक अतिरिक्त सत्यापन संकेत माना जाता है, एकमात्र प्रमाण नहीं। अंतिम भौतिक सत्यापन पंचायत एवं जिला मजिस्ट्रेट टीम द्वारा किया जाता है।
              </div>
            </div>

            {/* Fallback Option: Location manually choose karein */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowManualLocation(!showManualLocation)}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{showManualLocation ? '▲ मैन्युअल चयन छुपाएं' : '▼ Location manually choose karein (हाथ से चुनें)'}</span>
              </button>

              {showManualLocation && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        District (जिला):
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                      >
                        <option value="Khunti">Khunti (खूंटी)</option>
                        <option value="Ranchi">Ranchi (राँची)</option>
                        <option value="Dhanbad">Dhanbad (धनबाद)</option>
                        <option value="East Singhbhum">East Singhbhum (पूर्वी सिंहभूम)</option>
                        <option value="Hazaribagh">Hazaribagh (हजारीबाग)</option>
                        <option value="Bokaro">Bokaro (बोकारो)</option>
                        <option value="Gumla">Gumla (गुमला)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        Block/Panchayat (प्रखंड / पंचायत):
                      </label>
                      <input
                        type="text"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        placeholder="उदा. Ormanjhi"
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Village/Mohalla (गांव / टोला / वार्ड):
                    </label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder="उदा. Demo Village, Ward 3"
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="md"
                onClick={() => setCurrentStep('voice')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                वापस (Back)
              </Button>

              <Button
                variant="citizen-large"
                size="lg"
                onClick={() => setCurrentStep('preview')}
              >
                पूर्वावलोकन देखें (Preview) →
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: PREVIEW (Check Before Submit) */}
        {/* ========================================================================= */}
        {currentStep === 'preview' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase">चरण 4 / 4 (Final Step)</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                समस्या सारांश पूर्वावलोकन (Preview)
              </h2>
              <p className="text-xs text-slate-500">
                कृपया विवरण जांच लें। जमा करने के बाद एआई स्वचालित रूप से डुप्लीकेट जांच और प्राथमिकता तय करेगा।
              </p>
            </div>

            {/* Summary Card with Required Elements: Photo, Problem description, Location, Detected language */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
              {/* Photo Preview */}
              <div className="p-4 bg-slate-50 flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
                  {evidencePhoto ? (
                    <img src={evidencePhoto} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Photo</div>
                  )}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">संलग्न साक्ष्य (Evidence Attached):</span>
                  <p className="font-semibold text-slate-900 mt-0.5">1 फोटो / वीडियो साक्ष्य संलग्न</p>
                  <span className="text-emerald-700 text-[11px] font-medium">✓ जीपीएस टैग शामिल</span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  समस्या विवरण (Problem Description):
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                  "{transcriptionText}"
                </p>
              </div>

              {/* Detected Language */}
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500">पहचानी गई भाषा (Detected Language):</span>
                <span className="font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {detectedVoiceLanguage || selectedLanguage}
                </span>
              </div>

              {/* Location */}
              <div className="p-4 space-y-1 text-xs">
                <span className="font-bold text-slate-500">स्थान (Location):</span>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{village}, Block: {block}, District: {district}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Coordinates: {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                </div>
              </div>

              {/* Reporter Identity */}
              <div className="p-4 flex items-center justify-between text-xs bg-slate-50">
                <span className="text-slate-500">रिपोर्टर (Citizen):</span>
                <span className="font-bold text-slate-800">
                  {citizenName || 'Aam Nagrik'} (मो. ******{mobileNumber.slice(-4) || '4810'})
                </span>
              </div>
            </div>

            {/* Actions: Submit Button */}
            <div className="pt-2 space-y-3">
              <Button
                variant="citizen-large"
                size="xl"
                fullWidth
                onClick={handleSubmitProblem}
                subText="कोई अतिरिक्त फॉर्म नहीं • तुरंत एआई जांच"
              >
                Problem Submit Karein (समस्या सबमिट करें) 🚀
              </Button>

              <button
                type="button"
                onClick={() => setCurrentStep('voice')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700 py-1"
              >
                ← किसी विवरण में बदलाव हेतु वापस जाएं
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: AI PROCESSING SCREEN (Realistic Professional Animation) */}
        {/* ========================================================================= */}
        {currentStep === 'ai_processing' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-8 animate-in fade-in duration-300">
            {/* Animated High-Tech Scanning Pulse Core */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-100/60 animate-ping" />
              <div className="absolute -inset-2 rounded-full border-2 border-emerald-400/40 border-dashed animate-spin" style={{ animationDuration: '6s' }} />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Sparkles className="w-10 h-10 animate-pulse text-amber-300" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Samadhan AI Engine • Active Triage</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                AI Problem Analysis
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                झारखंड समाधान एआई इंजन आपके विवरण, फोटो, भाषा व जीपीएस स्थान का बहुभाषी विश्लेषण कर रहा है...
              </p>
            </div>

            {/* Exact 5 Steps Checklist */}
            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3.5 text-left text-xs sm:text-sm shadow-inner">
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                {aiProgressStage >= 1 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-slate-300 animate-spin shrink-0" />
                )}
                <span className={aiProgressStage >= 1 ? 'font-bold text-slate-900' : 'text-slate-400'}>
                  ✓ Understanding citizen description (नागरिक विवरण विश्लेषण)
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                {aiProgressStage >= 2 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                ) : aiProgressStage === 1 ? (
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-300 flex items-center justify-center shrink-0 text-xs">2</span>
                )}
                <span className={aiProgressStage >= 2 ? 'font-bold text-slate-900' : aiProgressStage === 1 ? 'font-semibold text-emerald-700' : 'text-slate-400'}>
                  ✓ Detecting problem category (समस्या श्रेणी निर्धारण)
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                {aiProgressStage >= 3 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                ) : aiProgressStage === 2 ? (
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-300 flex items-center justify-center shrink-0 text-xs">3</span>
                )}
                <span className={aiProgressStage >= 3 ? 'font-bold text-slate-900' : aiProgressStage === 2 ? 'font-semibold text-emerald-700' : 'text-slate-400'}>
                  ✓ Checking similar problems (दोहराव एवं निकटवर्ती शिकायत जांच)
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3">
                {aiProgressStage >= 4 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                ) : aiProgressStage === 3 ? (
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-300 flex items-center justify-center shrink-0 text-xs">4</span>
                )}
                <span className={aiProgressStage >= 4 ? 'font-bold text-slate-900' : aiProgressStage === 3 ? 'font-semibold text-emerald-700' : 'text-slate-400'}>
                  ✓ Calculating priority (तीव्रता एवं प्राथमिकता स्कोरिंग)
                </span>
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-3">
                {aiProgressStage >= 5 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-4 h-4" />
                  </span>
                ) : aiProgressStage === 4 ? (
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-300 flex items-center justify-center shrink-0 text-xs">5</span>
                )}
                <span className={aiProgressStage >= 5 ? 'font-bold text-slate-900' : aiProgressStage === 4 ? 'font-semibold text-emerald-700' : 'text-slate-400'}>
                  ✓ Preparing verification (प्रशासनिक सत्यापन तैयारी)
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>झारखंड राज्य डेटा सेंटर द्वारा सुरक्षित व एन्क्रिप्टेड विश्लेषण</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: AI RESULT & DUPLICATE CHECK EXPERIENCE */}
        {/* ========================================================================= */}
        {currentStep === 'result' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW 1: Citizen clicked "👍 Sahmati Dein / Upvote" */}
            {/* ------------------------------------------------------------- */}
            {upvoteConfirmed ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-300 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                    <ThumbsUp className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Aapki sahmati existing problem mein add ho gayi.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    आपकी आवाज को पूर्व दर्ज समस्या में <strong>+1 नागरिक समर्थक (Upvote)</strong> के रूप में जोड़ दिया गया है। डुप्लीकेट टिकट नहीं बनाया गया है ताकि प्रशासनिक कार्रवाई तेजी से हो सके।
                  </p>
                </div>

                {/* The Upvoted Existing Problem Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md">
                      Already Reported • Triage in Progress
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      ट्रैकिंग कोड: JH-KHT-2026-0388
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Khunti Village Handpump Not Working
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                      <span><strong>दूरी / स्थान:</strong> 0.4 km away • Ormanjhi, Khunti</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span><strong>दर्ज तिथि:</strong> 3 days ago (5 Sep 2026)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>वर्तमान स्थिति:</strong> Field Inspection Scheduled (DWSD)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-purple-600 shrink-0" />
                      <span className="text-emerald-700 font-bold">
                        <strong>समर्थक नागरिक:</strong> 43 Citizens Supported (+ आपकी सहमति)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Why this matters callout */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                  <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>💡 सहमति (Upvote) क्यों बेहतर है?</strong>
                    <p className="text-emerald-800 mt-0.5 leading-relaxed">
                      एक ही चापाकल या सड़क पर अलग-अलग 20 टिकट बनाने से प्रशासन में भ्रम होता है। नागरिक सहमति से जिला प्रशासन के डैशबोर्ड पर प्राथमिकता स्वतः बढ़ जाती है और विभाग त्वरित संज्ञान लेता है।
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link to="/track-problem?id=JH-KHT-2026-0388" className="w-full sm:flex-1">
                    <Button variant="citizen-large" size="lg" fullWidth>
                      🔍 इस समस्या को ट्रैक करें (Track Problem)
                    </Button>
                  </Link>
                  <Link to="/problem/jh-prb-007" className="w-full sm:flex-1">
                    <Button variant="outline" size="lg" fullWidth>
                      केस प्रोफाइल देखें (View Dossier)
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('entry');
                      setEvidencePhoto(null);
                      setTranscriptionText('');
                      setUpvoteConfirmed(false);
                      setNewTicketResult(null);
                    }}
                    className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 text-center"
                  >
                    + नई समस्या दर्ज करें
                  </button>
                </div>
              </div>
            ) : newTicketResult ? (
              /* ------------------------------------------------------------- */
              /* SUB-VIEW 2: Citizen clicked "New Problem Continue Karein" OR no duplicate */
              /* ------------------------------------------------------------- */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    समस्या सफलतापूर्वक दर्ज हुई!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    आपकी नई समस्या आधिकारिक रूप से झारखंड सरकार के समाधान पोर्टल पर पंजीकृत कर प्रशासनिक सत्यापन पंक्ति में जोड़ दी गई है।
                  </p>
                </div>

                {/* Generated Official Tracking Code Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <div className="text-center sm:text-left">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                      आधिकारिक ट्रैकिंग कोड (Official Tracking ID)
                    </span>
                    <div className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white mt-0.5">
                      {newTicketResult.trackingCode}
                    </div>
                    <span className="text-[11px] text-slate-300">
                      एसएमएस द्वारा आपके मोबाइल ({mobileNumber || '987XXXXXXX'}) पर भी भेज दिया गया है
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyTrackingCode(newTicketResult.trackingCode)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-xs font-bold flex items-center gap-1.5 transition-all text-emerald-200"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'कोड कॉपी हुआ!' : 'कोड कॉपी करें'}</span>
                  </button>
                </div>

                {/* AI Triaged Summary Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">एआई श्रेणी (Category):</span>
                    <strong className="text-slate-900 font-bold block mt-0.5 text-sm">
                      {detectedCategory}
                    </strong>
                    <span className="text-[11px] text-slate-600">{detectedCategoryHi}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">प्राथमिकता (Priority):</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs mt-1 uppercase">
                      🚨 {detectedPriority} Priority
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {detectedReason}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">अगला चरण (Next Step):</span>
                    <strong className="text-blue-800 font-bold block mt-0.5 text-sm">
                      प्रशासनिक सत्यापन (Admin Triage)
                    </strong>
                    <span className="text-[10px] text-slate-500">अधिसूचना: 24 घंटे में</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200">
                  <Link to={`/track-problem?id=${newTicketResult.trackingCode}`} className="w-full sm:flex-1">
                    <Button variant="citizen-large" size="lg" fullWidth>
                      🔍 Meri Samasya Track Karein
                    </Button>
                  </Link>

                  <Link to={`/problem/${newTicketResult.id}`} className="w-full sm:flex-1">
                    <Button variant="outline" size="lg" fullWidth>
                      केस प्रोफाइल देखें (View Dossier)
                    </Button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('entry');
                      setEvidencePhoto(null);
                      setTranscriptionText('');
                      setUpvoteConfirmed(false);
                      setNewTicketResult(null);
                    }}
                    className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 text-center"
                  >
                    + नई समस्या दर्ज करें
                  </button>
                </div>
              </div>
            ) : (
              /* ------------------------------------------------------------- */
              /* SUB-VIEW 3: PRIMARY AI RESULT & DUPLICATE CHECK REVIEW */
              /* ------------------------------------------------------------- */
              <div className="space-y-6">
                {/* 1. AI RESULT SECTION */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
                  {/* Top Bar with Evaluator Mode Switcher */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-slate-900">
                          AI Result
                        </h2>
                        <span className="text-xs text-slate-500">
                          झारखंड समाधान एआई विश्लेषण निष्कर्ष
                        </span>
                      </div>
                    </div>

                    {/* Evaluator Simulation Toggle */}
                    <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                      <button
                        type="button"
                        onClick={() => setDuplicateMode('similar_found')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                          duplicateMode === 'similar_found'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ⚠️ Similar Found (87% Demo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuplicateMode('no_duplicate')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                          duplicateMode === 'no_duplicate'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ✓ No Duplicate Found
                      </button>
                    </div>
                  </div>

                  {/* Citizen Complaint Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      Example Citizen Complaint (नागरिक द्वारा दर्ज शिकायत):
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 italic">
                      "{complaintText}"
                    </p>
                  </div>

                  {/* The 3 Core AI Findings: Category, Priority, Reason */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Finding 1: Category */}
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                        Category (श्रेणी)
                      </span>
                      <strong className="text-base font-black text-slate-900 block">
                        {detectedCategory}
                      </strong>
                      <span className="text-xs text-slate-600 font-medium block">
                        {detectedCategoryHi}
                      </span>
                    </div>

                    {/* Finding 2: Priority */}
                    <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1">
                      <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                        Priority (प्राथमिकता)
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-0.5 rounded-md bg-rose-600 text-white font-black text-sm uppercase shadow-xs">
                          {detectedPriority}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        नागरिक स्वास्थ्य व तत्काल प्रभाव
                      </span>
                    </div>

                    {/* Finding 3: Reason */}
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                        Reason (कारण)
                      </span>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        "{detectedReason}"
                      </p>
                    </div>
                  </div>

                  {/* Assistive AI Banner & Category Correction */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-300">
                            AI Detected: {detectedCategory}
                          </span>
                          {isCategoryConfirmed && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-700">
                              <Check className="w-3 h-3" /> नागरिक द्वारा पुष्ट (Confirmed)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300">
                          AI must be assistive, not the final authority. Allow category correction where appropriate.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCategoryConfirmed(true);
                            setShowCategoryPicker(false);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isCategoryConfirmed
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-400/40'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Correct (सही है)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-700" />
                          <span>Change Category (श्रेणी बदलें)</span>
                        </button>
                      </div>
                    </div>

                    {categoryNotice && (
                      <div className="text-xs text-emerald-300 bg-emerald-900/50 p-2 rounded-lg border border-emerald-700 font-semibold animate-in fade-in">
                        {categoryNotice}
                      </div>
                    )}

                    {/* Category Selector Dropdown when toggled */}
                    {showCategoryPicker && (
                      <div className="pt-3 border-t border-slate-700 space-y-2">
                        <span className="text-[11px] text-slate-300 block font-semibold">
                          सही श्रेणी का चयन करें (Select Correct Departmental Category):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Water Supply / Drinking Water',
                                'पेयजल एवं स्वच्छता',
                                'Drinking water issue affecting local residents.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>💧 Water Supply / Drinking Water</span>
                            <span className="text-slate-400 text-[11px]">पेयजल</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Rural Electricity & Solar Microgrids',
                                'विद्युत एवं सौर ऊर्जा',
                                'Transformer or wiring breakdown disrupting village illumination.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>⚡ Rural Electricity & Solar</span>
                            <span className="text-slate-400 text-[11px]">विद्युत</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Rural Roads & Culverts',
                                'सड़क एवं पुलिया',
                                'Monsoon washout or damaged bridge isolating villages.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>🛣️ Rural Roads & Culverts</span>
                            <span className="text-slate-400 text-[11px]">सड़क</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Agriculture & Minor Irrigation',
                                'कृषि एवं लघु सिंचाई',
                                'Check-dam or borewell failure causing seasonal crop distress.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>🌾 Agriculture & Minor Irrigation</span>
                            <span className="text-slate-400 text-[11px]">कृषि</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Healthcare & Malnutrition',
                                'स्वास्थ्य एवं पोषण',
                                'Sub-health center closure and essential child immunization access.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>🏥 Healthcare & Malnutrition</span>
                            <span className="text-slate-400 text-[11px]">स्वास्थ्य</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectCategory(
                                'Tribal Livelihood & Forest Produce',
                                'वनोत्पाद एवं जनजातीय आजीविका',
                                'Forest minor produce and wildlife conflict causing income distress.'
                              )
                            }
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-600 flex items-center justify-between"
                          >
                            <span>🌳 Tribal Livelihood & Forest</span>
                            <span className="text-slate-400 text-[11px]">आजीविका</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. DUPLICATE CHECK SECTION */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-5">
                  {duplicateMode === 'similar_found' ? (
                    /* CASE: Similar Problem Found */
                    <div className="space-y-5">
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                          <span>Similar Problem Found</span>
                        </div>
                        <p className="text-sm font-bold text-amber-800">
                          87% similarity with an existing problem
                        </p>
                        <div className="text-[11px] text-amber-900/80 bg-amber-100/70 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0 text-amber-800" />
                          <span>
                            <strong>* Important Notice:</strong> The 87% similarity is <em>DEMO DATA</em> for prototype demonstration. AI is assistive, not the final authority.
                          </span>
                        </div>
                      </div>

                      {/* Existing Problem Card */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono text-slate-500">
                            पूर्व दर्ज समस्या (Existing Problem) • कोड: JH-KHT-2026-0388
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-xs">
                            Already Reported
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900">
                          Khunti Village Handpump Not Working
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              <strong>Distance / Location:</strong> 0.4 km away • Ormanjhi, Khunti
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>
                              <strong>Date Reported:</strong> 3 days ago (5 Sep 2026)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              <strong>Current Status:</strong> Already Reported • Field Inspection Scheduled
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-600 shrink-0" />
                            <span className="font-bold text-purple-800">
                              <strong>Upvote / Support Count:</strong> 42 Citizens Supported
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 pt-1 border-t border-slate-200 leading-relaxed">
                          विवरण: प्राथमिक विद्यालय के समीप का चापाकल 15 दिनों से बंद है। पेयजल एवं स्वच्छता विभाग द्वारा संज्ञान लिया गया है।
                        </p>
                      </div>

                      {/* Two Action Buttons as Requested */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Button 1: Upvote */}
                        <button
                          type="button"
                          onClick={handleUpvoteDuplicate}
                          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex flex-col items-center justify-center gap-0.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                        >
                          <span className="flex items-center gap-1.5">
                            <ThumbsUp className="w-4 h-4" />
                            <span>👍 Sahmati Dein / Upvote</span>
                          </span>
                          <span className="text-[11px] font-normal text-emerald-100">
                            पूर्व दर्ज समस्या में अपनी आवाज जोड़ें • कोई नया टिकट नहीं बनेगा
                          </span>
                        </button>

                        {/* Button 2: New Problem Continue */}
                        <button
                          type="button"
                          onClick={handleCreateIndependentProblem}
                          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold text-sm flex flex-col items-center justify-center gap-0.5 transition-all hover:border-slate-400"
                        >
                          <span>New Problem Continue Karein</span>
                          <span className="text-[11px] font-normal text-slate-500">
                            यदि यह एक अलग या स्वतंत्र समस्या है • नया टिकट बनाएं
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CASE: No Duplicate Found */
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <strong className="block text-base font-black text-emerald-900">
                            No significant duplicate found.
                          </strong>
                          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                            आपके 5 किलोमीटर के दायरे में कोई समान सक्रिय शिकायत नहीं मिली। यह एक अनोखी नई समस्या है।
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleCreateIndependentProblem}
                          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                        >
                          <span>Continue to Admin Verification (प्रशासनिक सत्यापन जारी रखें)</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
