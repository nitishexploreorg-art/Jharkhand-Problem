import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  Search,
  ArrowRight,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ThumbsUp,
  Wrench,
  GraduationCap,
  Building2,
  FileCheck2,
  Sparkles,
  PhoneCall,
  Layers,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { DemoJourneyHomeSection } from '../components/common/DemoJourneyGuide';
import { useApp } from '../context/AppContext';

interface DemoDistrictLocation {
  id: string;
  name: string;
  nameHi: string;
  regionDescEn: string;
  regionDescHi: string;
  status: 'resolved' | 'in_progress' | 'open';
  resolvedCount: number;
  inProgressCount: number;
  openCount: number;
  highlightProblemEn: string;
  highlightProblemHi: string;
  highlightCategoryEn: string;
  highlightCategoryHi: string;
  mapX: number;
  mapY: number;
}

export const Home: React.FC = () => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [trackInputId, setTrackInputId] = useState('');

  const demoLocations: DemoDistrictLocation[] = [
    {
      id: 'ranchi',
      name: 'Ranchi',
      nameHi: 'राँची',
      regionDescEn: 'Capital District • Angara & Kanke Blocks',
      regionDescHi: 'राजधानी क्षेत्र • अनगड़ा व कांके ब्लॉक',
      status: 'resolved',
      resolvedCount: 16,
      inProgressCount: 9,
      openCount: 5,
      highlightProblemEn: 'Solar Mini Water Purification Plant Installed & Operational',
      highlightProblemHi: 'सोलर मिनी जल शोधन संयंत्र अधिष्ठापित व चालू',
      highlightCategoryEn: 'Drinking Water & Sanitation',
      highlightCategoryHi: 'पेयजल एवं स्वच्छता',
      mapX: 47,
      mapY: 54,
    },
    {
      id: 'khunti',
      name: 'Khunti',
      nameHi: 'खूंटी',
      regionDescEn: 'Torpa & Murhu Blocks • Tribal Agrarian Belt',
      regionDescHi: 'तोरपा व मुरहू ब्लॉक • जनजातीय क्षेत्र',
      status: 'in_progress',
      resolvedCount: 8,
      inProgressCount: 12,
      openCount: 4,
      highlightProblemEn: 'Solar-Powered Lac Processing Machine for Tribal Farmers',
      highlightProblemHi: 'लाह (Lac) किसानों हेतु सौर ऊर्जा चालित प्रोसेसिंग मशीन',
      highlightCategoryEn: 'Agriculture & Livelihood',
      highlightCategoryHi: 'कृषि एवं आजीविका',
      mapX: 44,
      mapY: 67,
    },
    {
      id: 'dhanbad',
      name: 'Dhanbad',
      nameHi: 'धनबाद',
      regionDescEn: 'Coal Belt • Jharia & Katras Mining Blocks',
      regionDescHi: 'कोयलांचल • झरिया व कतरास',
      status: 'in_progress',
      resolvedCount: 7,
      inProgressCount: 14,
      openCount: 8,
      highlightProblemEn: 'Coal Dust Suppression & Air Quality Sensor IoT Network',
      highlightProblemHi: 'कोयला डस्ट शमन एवं वायु गुणवत्ता सेंसर नेटवर्क',
      highlightCategoryEn: 'Environment & Pollution',
      highlightCategoryHi: 'पर्यावरण एवं प्रदूषण',
      mapX: 74,
      mapY: 42,
    },
    {
      id: 'jamshedpur',
      name: 'Jamshedpur',
      nameHi: 'जमशेदपुर (पूर्वी सिंहभूम)',
      regionDescEn: 'Ghatshila & Potka Sub-divisions',
      regionDescHi: 'घाटशिला व पोटका ग्रामीण क्षेत्र',
      status: 'resolved',
      resolvedCount: 11,
      inProgressCount: 8,
      openCount: 3,
      highlightProblemEn: 'Smart Water Filtration & Recycled Plastic Paver Tiles',
      highlightProblemHi: 'स्मार्ट वाटर प्यूरिफायर एवं वेस्ट प्लास्टिक पेवर ब्लॉक',
      highlightCategoryEn: 'Waste Management & Civics',
      highlightCategoryHi: 'अपशिष्ट प्रबंधन',
      mapX: 78,
      mapY: 76,
    },
    {
      id: 'hazaribagh',
      name: 'Hazaribagh',
      nameHi: 'हजारीबाग',
      regionDescEn: 'Barkagaon & Padma Rural Blocks',
      regionDescHi: 'बड़कागांव व पदमा ब्लॉक',
      status: 'open',
      resolvedCount: 6,
      inProgressCount: 5,
      openCount: 11,
      highlightProblemEn: 'Rural Culvert Bridge Damaged • Open for College Team Adoption',
      highlightProblemHi: 'ग्रामीण पुलिया क्षतिग्रस्त • छात्र टीम अंगीकार हेतु सूचीबद्ध',
      highlightCategoryEn: 'Roads & Infrastructure',
      highlightCategoryHi: 'सड़क व आवागमन',
      mapX: 52,
      mapY: 34,
    },
  ];

  const [activeDistrict, setActiveDistrict] = useState<DemoDistrictLocation>(demoLocations[0]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackInputId.trim();
    if (cleanId) {
      navigate(`/track-problem?id=${encodeURIComponent(cleanId)}`);
    } else {
      navigate('/track-problem');
    }
  };

  const handleSelectSampleCode = (code: string) => {
    setTrackInputId(code);
    navigate(`/track-problem?id=${encodeURIComponent(code)}`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* ========================================================================= */}
      {/* 1. HOMEPAGE HERO (CITIZEN-FOCUSED, SIMPLE & TRUSTWORTHY)                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071810] via-[#091f16] to-[#060d0a] text-white pt-10 pb-16 sm:pt-16 sm:pb-20 border-b-4 border-emerald-600 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Government Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e271c] border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {isHi
                ? 'झारखण्ड सरकार • समाधान मंच'
                : 'Government of Jharkhand • Samadhan Portal'}
            </span>
          </div>

          {/* Main Message (Exact Specification) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            {isHi ? (
              <>
                आपकी समस्या, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
                  हमारा समाधान
                </span>
              </>
            ) : (
              <>
                Your Problem, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
                  Our Solution
                </span>
              </>
            )}
          </h1>

          {/* Subtitle (Exact Specification) */}
          <p className="text-base sm:text-xl text-[#a5b9ad] font-medium max-w-2xl mx-auto leading-relaxed">
            {isHi
              ? 'झारखंड की स्थानीय समस्या आसानी से दर्ज करें और उसके समाधान की प्रगति देखें।'
              : 'Report local civic issues in Jharkhand easily and track real-time resolution progress.'}
          </p>

          {/* Action CTAs (Report Problem is Visually Dominant) */}
          <div className="pt-2 flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
            {/* Primary Button - Dominant */}
            <Link to="/report-issue" className="w-full">
              <button
                type="button"
                className="w-full py-4 sm:py-5 px-6 sm:px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl ring-4 ring-amber-400/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isHi ? '📸 अपनी समस्या दर्ज करें' : '📸 Report Problem'}</span>
              </button>
            </Link>

            {/* Supporting Text for Primary Button */}
            <p className="text-xs sm:text-sm text-emerald-300 font-medium">
              {isHi
                ? 'फोटो, वीडियो या बोलकर अपनी समस्या बताएं'
                : 'Share your problem with photo, video, or voice note'}
            </p>

            {/* Secondary Button */}
            <Link to="/track-problem" className="w-full mt-1">
              <button
                type="button"
                className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-[#0f291d] hover:bg-[#143526] text-white font-bold text-sm sm:text-base border border-[#1f4834] backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isHi ? '🔎 मेरी समस्या ट्रैक करें' : '🔎 Track My Problem'}</span>
              </button>
            </Link>
          </div>

          {/* Three Citizen Reassurance Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#8ea598]">
            <span className="flex items-center gap-1.5 bg-[#091b13]/80 px-3 py-1.5 rounded-full border border-[#1b3d2b]">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{isHi ? '100% निःशुल्क नागरिक सेवा' : '100% Free Citizen Service'}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#091b13]/80 px-3 py-1.5 rounded-full border border-[#1b3d2b]">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{isHi ? 'सीधे पंचायत व जिला से जुड़ा' : 'Direct Panchayat & District Connect'}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#091b13]/80 px-3 py-1.5 rounded-full border border-[#1b3d2b]">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{isHi ? 'बोलकर दर्ज करने की सुविधा' : 'Voice Input Supported'}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRACK PROBLEM QUICK SEARCH (DIRECT CITIZEN UTILITY)                     */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-[#11231b] rounded-3xl p-6 sm:p-8 border border-[#1e382b] shadow-2xl space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <Search className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              {isHi ? 'अपनी शिकायत की स्थिति देखें' : 'Track Your Complaint Status'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#8ea598]">
            {isHi
              ? 'समस्या दर्ज करते समय SMS द्वारा प्राप्त समस्या ID डालें और देखें कि आपकी समस्या किस चरण पर है।'
              : 'Enter the Problem ID received on your phone to see current verification and solution progress.'}
          </p>

          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#5d7a6a] absolute left-4 top-3.5" />
              <input
                type="text"
                value={trackInputId}
                onChange={(e) => setTrackInputId(e.target.value)}
                placeholder={isHi ? 'समस्या ID दर्ज करें (उदा. JH-1042)' : 'Enter Problem ID (e.g., JH-1042)'}
                className="w-full bg-[#0b1812] border-2 border-[#1e382b] rounded-2xl pl-12 pr-4 py-3 text-sm sm:text-base text-white placeholder:text-[#5d7a6a] focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHi ? 'स्थिति देखें' : 'Track Status'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Sample IDs */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#8ea598]">
            <span>{isHi ? 'त्वरित जांच हेतु डेमो ID:' : 'Sample demo codes:'}</span>
            {[
              { code: 'JH-1042', label: isHi ? 'खूंटी चापाकल' : 'Khunti Water' },
              { code: 'JH-RNC-2026-0814', label: isHi ? 'राँची सोलर' : 'Ranchi Solar' },
              { code: 'JH-DHN-2026-0422', label: isHi ? 'धनबाद' : 'Dhanbad' },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelectSampleCode(item.code)}
                className="font-mono bg-[#0d1e17] hover:bg-[#132c21] text-[#a5b9ad] hover:text-white px-2.5 py-1 rounded-lg border border-[#1e382b] hover:border-emerald-500/60 transition-colors cursor-pointer"
              >
                {item.code} <span className="text-[10px] text-[#6e8a7c] font-sans">({item.label})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS (VERY SIMPLE 4-STEP CITIZEN GUIDE)                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              {isHi ? 'सरल कार्यप्रणाली' : 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isHi ? '4 आसान चरणों में समाधान' : 'Resolution in 4 Simple Steps'}
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea598]">
              {isHi
                ? 'आपकी आवाज से लेकर गांव में मजबूत उपकरण स्थापित होने तक का पूरा सफर'
                : 'From your first report to physical installation in your village'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-[#192218] border border-amber-800/40 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-amber-400">01</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/50 text-amber-300 flex items-center justify-center text-xl shadow-2xs">
                    📸
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isHi ? 'समस्या दर्ज करें' : 'Report Problem'}
                </h3>
                <p className="text-xs sm:text-sm text-[#a5b9ad] leading-relaxed font-normal">
                  {isHi
                    ? 'गांव या मोहल्ले की समस्या की फोटो लें, बोलकर या लिखकर विवरण बताएं।'
                    : 'Take a photo of the problem and explain using voice or simple text.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#2a3826] text-[11px] font-bold text-amber-300">
                ✓ {isHi ? '2 मिनट में सबमिट' : 'Submits in 2 minutes'}
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-[#132328] border border-blue-800/40 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-400">02</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-300 flex items-center justify-center text-xl shadow-2xs">
                    📋
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isHi ? 'सत्यापन' : 'Verification'}
                </h3>
                <p className="text-xs sm:text-sm text-[#a5b9ad] leading-relaxed font-normal">
                  {isHi
                    ? 'सरकारी अधिकारी मौके की जांच करते हैं और समस्या की सत्यता प्रमाणित करते हैं।'
                    : 'Government officials verify the issue on-site and register it as an official challenge.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1b3644] text-[11px] font-bold text-blue-300">
                ✓ {isHi ? 'प्रशासनिक पुष्टि' : 'Official verification'}
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-[#0f2725] border border-cyan-800/40 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-cyan-400">03</span>
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 flex items-center justify-center text-xl shadow-2xs">
                    🛠️
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isHi ? 'छात्र समाधान बनाएंगे' : 'Students Build Solution'}
                </h3>
                <p className="text-xs sm:text-sm text-[#a5b9ad] leading-relaxed font-normal">
                  {isHi
                    ? 'इंजीनियरिंग कॉलेज के छात्र व प्रोफेसर मिलकर समस्या का मजबूत तकनीकी समाधान तैयार करते हैं।'
                    : 'College engineering teams design and fabricate the hardware prototype in their labs.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#173e3a] text-[11px] font-bold text-cyan-300">
                ✓ {isHi ? 'मजबूत प्रोटोटाइप' : 'Lab-tested prototype'}
              </div>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-[#0e271b] border border-emerald-800/40 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-emerald-400">04</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 flex items-center justify-center text-xl shadow-2xs">
                    🏡
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isHi ? 'जमीन पर समाधान' : 'Ground Deployment'}
                </h3>
                <p className="text-xs sm:text-sm text-[#a5b9ad] leading-relaxed font-normal">
                  {isHi
                    ? 'उपकरण आपके गांव में स्थापित होता है और ग्रामीण खुद देखकर समाधान की पुष्टि करते हैं।'
                    : 'The working equipment is installed in your village and verified by local residents.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#173e2b] text-[11px] font-bold text-emerald-300">
                ✓ {isHi ? 'ग्रामीणों की संतुष्टि' : 'Citizen sign-off'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMMON VILLAGE PROBLEM EXAMPLES (RELATABLE CITIZEN CATEGORIES)          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0d1e17] rounded-3xl border border-[#1e382b] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e382b] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isHi ? 'हम किन समस्याओं का समाधान करते हैं?' : 'What Kinds of Issues Can You Report?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#8ea598] mt-1">
                {isHi
                  ? 'ग्रामीण और स्थानीय जीवन से जुड़ी कोई भी वास्तविक समस्या दर्ज करें'
                  : 'Any local infrastructure or civic challenge can be submitted'}
              </p>
            </div>
            <Link to="/report-issue" className="shrink-0">
              <Button variant="primary" size="sm">
                {isHi ? '+ समस्या दर्ज करें' : '+ Report an Issue'}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#11231b] rounded-2xl border border-[#1e382b] space-y-2">
              <span className="text-2xl">💧</span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {isHi ? 'चापाकल व पेयजल' : 'Drinking Water & Handpumps'}
              </h3>
              <p className="text-xs text-[#8ea598]">
                {isHi
                  ? 'खराब चापाकल, दूषित पानी, फ्लोराइड या आयरन की समस्या।'
                  : 'Broken handpumps, muddy water, or high iron contamination.'}
              </p>
            </div>

            <div className="p-4 bg-[#11231b] rounded-2xl border border-[#1e382b] space-y-2">
              <span className="text-2xl">🛣️</span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {isHi ? 'सड़क व छोटी पुलिया' : 'Village Roads & Culverts'}
              </h3>
              <p className="text-xs text-[#8ea598]">
                {isHi
                  ? 'बरसात में कटी सड़क, टूटी पुलिया या कीचड़ वाला रास्ता।'
                  : 'Washed-out culverts, broken bridges, or damaged village roads.'}
              </p>
            </div>

            <div className="p-4 bg-[#11231b] rounded-2xl border border-[#1e382b] space-y-2">
              <span className="text-2xl">☀️</span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {isHi ? 'सौर ऊर्जा व बिजली' : 'Solar & Village Lighting'}
              </h3>
              <p className="text-xs text-[#8ea598]">
                {isHi
                  ? 'खराब सोलर लाइट, अंधेरे चौक-चौराहे या बिजली की कमी।'
                  : 'Dysfunctional solar panels, street lighting, or off-grid power.'}
              </p>
            </div>

            <div className="p-4 bg-[#11231b] rounded-2xl border border-[#1e382b] space-y-2">
              <span className="text-2xl">🌾</span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {isHi ? 'खेती व सिंचाई' : 'Farming & Irrigation'}
              </h3>
              <p className="text-xs text-[#8ea598]">
                {isHi
                  ? 'सिंचाई के पानी की कमी, लाह या फसल प्रसंस्करण में कठिनाई।'
                  : 'Irrigation pump failure, crop processing, or storage needs.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INSTITUTIONAL COLLABORATION (KEPT BELOW - DOES NOT DOMINATE CITIZEN)    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Clear Section Divider */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091510] border border-[#1e382b] text-white space-y-6">
          <div className="border-b border-[#182e22] pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11231b] border border-[#1e382b] text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>
                {isHi
                  ? 'संस्थागत व प्रशासनिक सहयोग • Institutional Ecosystem'
                  : 'Institutional & Partner Ecosystem'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isHi
                ? 'कॉलेज, उद्योग एवं प्रशासन मिलकर बनाते हैं समाधान'
                : 'Connecting Colleges, Industry CSR, and District Administration'}
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea598] mt-1 max-w-3xl">
              {isHi
                ? 'नागरिकों द्वारा दर्ज समस्याओं को इंजीनियरिंग छात्र चुनौती के रूप में अपनाते हैं, उद्योग सीएसआर राशि से निर्माण वित्तपोषित करते हैं और प्रशासन जमीन पर सत्यापन करता है।'
                : 'Student teams engineer solutions, corporate CSR grants fund fabrication, and district administration verifies physical deployment.'}
            </p>
          </div>

          {/* Partner Portals Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Link
              to="/challenges"
              className="p-4 rounded-2xl bg-[#11231b] hover:bg-[#152e23] border border-[#1e382b] hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <GraduationCap className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white text-sm">
                  {isHi ? 'छात्र चुनौतियाँ' : 'Student Challenges'}
                </h3>
                <p className="text-[11px] text-[#8ea598] mt-1">
                  {isHi ? 'कॉलेज टीमों द्वारा समस्या अंगीकरण' : 'University adoption portal'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 mt-3 flex items-center gap-1">
                <span>{isHi ? 'देखें' : 'Open'}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/project-lifecycle"
              className="p-4 rounded-2xl bg-[#11231b] hover:bg-[#152e23] border border-[#1e382b] hover:border-purple-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <Layers className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white text-sm">
                  {isHi ? 'प्रोजेक्ट लाइफसाइकिल' : 'Project Lifecycle'}
                </h3>
                <p className="text-[11px] text-[#8ea598] mt-1">
                  {isHi ? 'प्रोटोटाइप विकास के तकनीकी चरण' : 'Engineering milestones'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-purple-400 mt-3 flex items-center gap-1">
                <span>{isHi ? 'देखें' : 'Open'}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/ground-deployment"
              className="p-4 rounded-2xl bg-[#11231b] hover:bg-[#152e23] border border-[#1e382b] hover:border-teal-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <MapPin className="w-6 h-6 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white text-sm">
                  {isHi ? 'जमीनी सत्यापन' : 'Ground Deployment'}
                </h3>
                <p className="text-[11px] text-[#8ea598] mt-1">
                  {isHi ? 'तस्वीरें व पानी जांच रिपोर्ट' : 'Field pilot proofs'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-teal-400 mt-3 flex items-center gap-1">
                <span>{isHi ? 'देखें' : 'Open'}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/social-audit"
              className="p-4 rounded-2xl bg-[#11231b] hover:bg-[#152e23] border border-[#1e382b] hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <FileCheck2 className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white text-sm">
                  {isHi ? 'सामाजिक ऑडिट' : 'Social Audit'}
                </h3>
                <p className="text-[11px] text-[#8ea598] mt-1">
                  {isHi ? 'सार्वजनिक पारदर्शिता लेज़र' : 'Public audit ledger'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-blue-400 mt-3 flex items-center gap-1">
                <span>{isHi ? 'देखें' : 'Open'}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/csr-portal"
              className="p-4 rounded-2xl bg-[#11231b] hover:bg-[#152e23] border border-[#1e382b] hover:border-amber-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <Building2 className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white text-sm">
                  {isHi ? 'सीएसआर पोर्टल' : 'CSR Portal'}
                </h3>
                <p className="text-[11px] text-[#8ea598] mt-1">
                  {isHi ? 'उद्योग अनुदान सहभागिता' : 'Corporate sponsorship'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-400 mt-3 flex items-center gap-1">
                <span>{isHi ? 'देखें' : 'Open'}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. JHARKHAND DISTRICT IMPACT MAP (EXPLORATORY DETAIL)                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#11231b] rounded-3xl border border-[#1e382b] p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1e382b]">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                {isHi ? 'नक्शा एवं क्षेत्रीय स्थिति' : 'Geographic Overview'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isHi ? 'झारखंड के प्रमुख जिलों में समाधान प्रभाव' : 'Jharkhand District Impact Explorer'}
              </h2>
              <p className="text-xs text-[#8ea598] mt-1">
                {isHi
                  ? 'डेमो लोकेशन पर क्लिक कर क्षेत्रवार समस्याओं और स्थापित समाधानों की स्थिति देखें'
                  : 'Click on demo locations to explore district-wise problems and active student projects'}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 bg-[#0d1e17] p-2.5 rounded-2xl border border-[#1e382b] text-xs flex-wrap">
              <span className="font-bold text-[#8ea598] text-[11px] uppercase">
                {isHi ? 'संकेत:' : 'Legend:'}
              </span>
              <div className="flex items-center gap-1.5 font-medium text-emerald-300">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-2xs" />
                <span>🟢 {isHi ? 'समाधान पूर्ण' : 'Resolved'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-amber-300">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-2xs" />
                <span>🟡 {isHi ? 'प्रगति पर' : 'In Progress'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-rose-300">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-2xs" />
                <span>🔴 {isHi ? 'खुली समस्याएं' : 'Open'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Canvas + Details Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Stylized Map of Jharkhand */}
            <div className="lg:col-span-7 bg-[#08120d] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[360px] flex flex-col justify-between border border-[#1e382b] shadow-inner">
              <div className="flex items-center justify-between z-10">
                <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{isHi ? 'झारखंड राज्य विजुअल हीटमैप' : 'Jharkhand Geographic Heatmap'}</span>
                </div>
                <span className="text-[10px] font-mono text-[#8ea598] bg-[#0e241a] px-2 py-0.5 rounded border border-[#1d4230]">
                  Interactive Map
                </span>
              </div>

              {/* Stylized SVG Map Representation */}
              <div className="relative my-4 w-full aspect-[4/3] max-h-[320px] mx-auto flex items-center justify-center">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full opacity-40 filter drop-shadow-md"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <polygon
                    points="60,90 120,40 220,50 310,90 350,150 320,240 260,270 170,260 100,220 50,160"
                    className="fill-emerald-950/80 stroke-emerald-500/60 stroke-2"
                  />
                  <line x1="120" y1="40" x2="220" y2="150" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                  <line x1="220" y1="150" x2="320" y2="240" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                  <line x1="170" y1="260" x2="220" y2="150" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                </svg>

                {demoLocations.map((loc) => {
                  const isSelected = activeDistrict.id === loc.id;
                  const dotColor =
                    loc.status === 'resolved'
                      ? 'bg-emerald-500 border-emerald-300 ring-emerald-500/40 text-emerald-400'
                      : loc.status === 'in_progress'
                      ? 'bg-amber-400 border-amber-200 ring-amber-400/40 text-amber-300'
                      : 'bg-rose-500 border-rose-200 ring-rose-500/40 text-rose-400';

                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveDistrict(loc)}
                      style={{
                        position: 'absolute',
                        left: `${loc.mapX}%`,
                        top: `${loc.mapY}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`group flex flex-col items-center transition-all z-20 cursor-pointer ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 shadow-lg ring-4 transition-all ${dotColor} ${
                          isSelected ? 'animate-bounce' : ''
                        }`}
                      />
                      <span
                        className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white border border-emerald-400'
                            : 'bg-[#0d1e17] text-slate-200 border border-[#1e382b]'
                        }`}
                      >
                        {isHi ? loc.nameHi : loc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Note */}
              <div className="text-[11px] text-[#8ea598] border-t border-[#182e22] pt-2 flex items-center justify-between">
                <span>
                  {isHi
                    ? '📍 क्लिक करें: राँची, खूंटी, धनबाद, जमशेदपुर, हजारीबाग'
                    : '📍 Click pins: Ranchi, Khunti, Dhanbad, Jamshedpur, Hazaribagh'}
                </span>
                <span className="text-amber-400 font-semibold">5 Demo Districts</span>
              </div>
            </div>

            {/* Selected District Details Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl border-2 border-emerald-600/40 bg-[#0d1e17] space-y-4 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e382b]">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">
                      {isHi ? 'चयनित जिला विवरण' : 'District Spotlight'}
                    </span>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <span>{isHi ? activeDistrict.nameHi : activeDistrict.name}</span>
                      <span className="text-sm font-normal text-[#8ea598]">
                        ({isHi ? activeDistrict.name : activeDistrict.nameHi})
                      </span>
                    </h3>
                    <p className="text-xs text-[#8ea598] mt-0.5">
                      {isHi ? activeDistrict.regionDescHi : activeDistrict.regionDescEn}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-2xs ${
                      activeDistrict.status === 'resolved'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                        : activeDistrict.status === 'in_progress'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-700/60'
                    }`}
                  >
                    {activeDistrict.status === 'resolved'
                      ? '🟢 Resolved'
                      : activeDistrict.status === 'in_progress'
                      ? '🟡 In Progress'
                      : '🔴 Open Problems'}
                  </span>
                </div>

                {/* Mini Stats Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#11231b] p-3 rounded-xl border border-[#1e382b] shadow-2xs">
                    <span className="text-emerald-400 font-black text-lg block font-mono">
                      {activeDistrict.resolvedCount}
                    </span>
                    <span className="text-[#8ea598] text-[11px]">
                      {isHi ? 'हल समाधान' : 'Resolved'}
                    </span>
                  </div>

                  <div className="bg-[#11231b] p-3 rounded-xl border border-[#1e382b] shadow-2xs">
                    <span className="text-amber-400 font-black text-lg block font-mono">
                      {activeDistrict.inProgressCount}
                    </span>
                    <span className="text-[#8ea598] text-[11px]">
                      {isHi ? 'प्रगति पर' : 'In Progress'}
                    </span>
                  </div>

                  <div className="bg-[#11231b] p-3 rounded-xl border border-[#1e382b] shadow-2xs">
                    <span className="text-rose-400 font-black text-lg block font-mono">
                      {activeDistrict.openCount}
                    </span>
                    <span className="text-[#8ea598] text-[11px]">
                      {isHi ? 'खुली समस्याएं' : 'Open'}
                    </span>
                  </div>
                </div>

                {/* Highlight Problem */}
                <div className="bg-[#11231b] p-4 rounded-xl border border-[#1e382b] space-y-1.5 shadow-2xs text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#8ea598]">
                      {isHi ? 'हाल का प्रमुख नवाचार:' : 'Recent Highlight:'}
                    </span>
                    <span className="font-semibold text-emerald-300 bg-[#0d261b] px-2 py-0.5 rounded border border-[#1f4834]">
                      {isHi ? activeDistrict.highlightCategoryHi : activeDistrict.highlightCategoryEn}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm leading-snug">
                    {isHi ? activeDistrict.highlightProblemHi : activeDistrict.highlightProblemEn}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="pt-2 flex gap-2">
                  <Link to="/challenges" className="flex-1">
                    <Button variant="primary" size="sm" fullWidth>
                      {isHi ? 'इस जिले की चुनौतियाँ' : 'View Challenges'}
                    </Button>
                  </Link>
                  <Link to="/report-issue" className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>
                      {isHi ? 'यहाँ समस्या दर्ज करें' : 'Report Issue Here'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick district selector buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[#8ea598] font-semibold shrink-0">
                  {isHi ? 'अन्य जिले:' : 'Select District:'}
                </span>
                {demoLocations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDistrict(d)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      activeDistrict.id === d.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0d1e17] hover:bg-[#142d21] text-[#a5b9ad] border border-[#1e382b]'
                    }`}
                  >
                    {isHi ? d.nameHi : d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PLATFORM IMPACT METRICS (DEMO DATA)                                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#091510] border border-[#1e382b] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#182e22]">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isHi ? 'मंच का अब तक का प्रभाव' : 'Platform Impact Overview'}
              </h2>
              <p className="text-xs text-[#8ea598] mt-1">
                {isHi
                  ? 'झारखंड भर से प्राप्त नागरिक शिकायतों और विकसित समाधानों का प्रदर्शन'
                  : 'Demonstration metrics of citizen grievance resolution and university R&D'}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/60 text-xs font-mono font-bold tracking-wide">
              <span>⚠️</span>
              <span>Prototype Demo Data</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#11231b] p-5 rounded-2xl border border-[#1e382b] space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">1,240+</div>
              <h4 className="text-sm font-bold text-white">
                {isHi ? 'समस्याएं दर्ज' : 'Problems Reported'}
              </h4>
              <p className="text-xs text-[#8ea598]">
                {isHi ? 'नागरिकों द्वारा दर्ज स्थानीय समस्याएं' : 'Grassroots grievances submitted'}
              </p>
            </div>

            <div className="bg-[#11231b] p-5 rounded-2xl border border-[#1e382b] space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-blue-300 font-mono">486</div>
              <h4 className="text-sm font-bold text-white">
                {isHi ? 'प्रशासनिक सत्यापित' : 'Problems Verified'}
              </h4>
              <p className="text-xs text-[#8ea598]">
                {isHi ? 'जिला प्रशासन द्वारा सत्यापित चुनौतियाँ' : 'Verified by district administrations'}
              </p>
            </div>

            <div className="bg-[#11231b] p-5 rounded-2xl border border-[#1e382b] space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono">128</div>
              <h4 className="text-sm font-bold text-white">
                {isHi ? 'प्रोजेक्ट्स अंगीकृत' : 'Projects Adopted'}
              </h4>
              <p className="text-xs text-[#8ea598]">
                {isHi ? 'छात्र एवं विश्वविद्यालय अनुसंधान टीमें' : 'Adopted by university engineering teams'}
              </p>
            </div>

            <div className="bg-[#11231b] p-5 rounded-2xl border border-[#1e382b] space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">42</div>
              <h4 className="text-sm font-bold text-white">
                {isHi ? 'जमीनी समाधान स्थापित' : 'Solutions Deployed'}
              </h4>
              <p className="text-xs text-[#8ea598]">
                {isHi ? 'गांवों में स्थापित एवं संतुष्टि ऑडिटेड' : 'Deployed and certified on-ground'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HACKATHON EVALUATOR 10-STEP DEMO WALKTHROUGH (LOWER SECTION)            */}
      {/* ========================================================================= */}
      <DemoJourneyHomeSection />

      {/* ========================================================================= */}
      {/* 9. FINAL REASSURING CITIZEN CALL-TO-ACTION                                */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#0d281d] to-[#0a2318] border border-emerald-600/50 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isHi ? 'क्या आपके गांव या मोहल्ले में कोई समस्या है?' : 'Have a problem in your village or ward?'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl mx-auto leading-relaxed">
            {isHi
              ? 'झिझकिए मत! फोटो खींचे, अपनी बात बोलकर बताएं और तुरंत सबमिट करें। हम आपके साथ हैं।'
              : 'Take a photo, record a voice note, and submit. The government, student innovators, and industry partners will work to build a solution.'}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/report-issue" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full py-3.5 px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg shadow-lg ring-2 ring-amber-400/40 transition-all cursor-pointer"
              >
                {isHi ? '📸 अपनी समस्या दर्ज करें' : '📸 Report Problem'}
              </button>
            </Link>
            <Link to="/track-problem" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#091b13] hover:bg-[#0e271c] text-white font-bold text-sm sm:text-base border border-[#1f4834] transition-all cursor-pointer"
              >
                {isHi ? '🔎 समस्या ट्रैक करें' : '🔎 Track Problem'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
