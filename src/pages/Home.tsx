import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  GraduationCap,
  Rocket,
  Search,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  FileCheck,
  Building2,
  ThumbsUp,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { DemoJourneyHomeSection } from '../components/common/DemoJourneyGuide';

interface DemoDistrictLocation {
  id: string;
  name: string;
  nameHi: string;
  regionDesc: string;
  status: 'resolved' | 'in_progress' | 'open';
  resolvedCount: number;
  inProgressCount: number;
  openCount: number;
  highlightProblem: string;
  highlightCategory: string;
  // SVG coordinates for visual map positioning (percentage based 0-100)
  mapX: number;
  mapY: number;
}

export const Home: React.FC = () => {
  // Demo locations requested
  const demoLocations: DemoDistrictLocation[] = [
    {
      id: 'ranchi',
      name: 'Ranchi',
      nameHi: 'राँची',
      regionDesc: 'राजधानी क्षेत्र • अनगड़ा व कांके ब्लॉक',
      status: 'resolved',
      resolvedCount: 16,
      inProgressCount: 9,
      openCount: 5,
      highlightProblem: 'सोलर मिनी जल शोधन संयंत्र अधिष्ठापित व चालू',
      highlightCategory: 'पेयजल एवं स्वच्छता',
      mapX: 47,
      mapY: 54,
    },
    {
      id: 'khunti',
      name: 'Khunti',
      nameHi: 'खूंटी',
      regionDesc: 'तोरपा व मुरहू ब्लॉक • जनजातीय क्षेत्र',
      status: 'in_progress',
      resolvedCount: 8,
      inProgressCount: 12,
      openCount: 4,
      highlightProblem: 'लाह (Lac) किसानों हेतु सौर ऊर्जा चालित प्रोसेसिंग मशीन',
      highlightCategory: 'कृषि एवं आजीविका',
      mapX: 44,
      mapY: 67,
    },
    {
      id: 'dhanbad',
      name: 'Dhanbad',
      nameHi: 'धनबाद',
      regionDesc: 'कोयलांचल • झरिया व कतरास',
      status: 'in_progress',
      resolvedCount: 7,
      inProgressCount: 14,
      openCount: 8,
      highlightProblem: 'कोयला डस्ट शमन एवं वायु गुणवत्ता सेंसर नेटवर्क',
      highlightCategory: 'पर्यावरण एवं प्रदूषण',
      mapX: 74,
      mapY: 42,
    },
    {
      id: 'jamshedpur',
      name: 'Jamshedpur',
      nameHi: 'जमशेदपुर (पूर्वी सिंहभूम)',
      regionDesc: 'घाटशिला व पोटका ग्रामीण क्षेत्र',
      status: 'resolved',
      resolvedCount: 11,
      inProgressCount: 8,
      openCount: 3,
      highlightProblem: 'स्मार्ट वाटर प्यूरिफायर एवं वेस्ट प्लास्टिक पेवर ब्लॉक',
      highlightCategory: 'अपशिष्ट प्रबंधन',
      mapX: 78,
      mapY: 76,
    },
    {
      id: 'hazaribagh',
      name: 'Hazaribagh',
      nameHi: 'हजारीबाग',
      regionDesc: 'बड़कागांव व पदमा ब्लॉक',
      status: 'open',
      resolvedCount: 6,
      inProgressCount: 5,
      openCount: 11,
      highlightProblem: 'ग्रामीण पुलिया क्षतिग्रस्त • छात्र टीम अंगीकार हेतु सूचीबद्ध',
      highlightCategory: 'सड़क व आवागमन',
      mapX: 52,
      mapY: 34,
    },
  ];

  const [activeDistrict, setActiveDistrict] = useState<DemoDistrictLocation>(demoLocations[0]);
  const [mapFilter, setMapFilter] = useState<'all' | 'resolved' | 'in_progress' | 'open'>('all');

  const filteredDistricts =
    mapFilter === 'all'
      ? demoLocations
      : demoLocations.filter((d) => d.status === mapFilter);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION (Citizen-First: "Aapki Samasya, Hamara Samadhan") */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-12 pb-16 sm:pt-20 sm:pb-24 border-b-4 border-emerald-600">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold mb-6 shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>झारखण्ड सरकार • समाधान मंच (Samadhan Jharkhand)</span>
          </div>

          {/* Large Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Aapki Samasya, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              Hamara Samadhan
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
            Jharkhand ki local problem report karein aur use solution tak pahunchte dekhein.
          </p>

          <p className="text-xs sm:text-sm text-emerald-300/90 mt-2 font-normal">
            (आपकी समस्या को विश्वविद्यालयी छात्र और सीएसआर सहयोग से असली समाधान में बदलें)
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md mx-auto">
            {/* Primary CTA: /report-issue */}
            <Link to="/report-issue" className="flex-1">
              <Button
                variant="citizen-large"
                size="xl"
                fullWidth
                subText="निःशुल्क नागरिक प्रपत्र (100% Free)"
              >
                + Samasya Darj Karein
              </Button>
            </Link>

            {/* Secondary CTA: /track-problem */}
            <Link to="/track-problem" className="flex-1">
              <Button
                variant="outline"
                size="xl"
                fullWidth
                className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white"
                subText="शिकायत कोड से खोजें"
              >
                🔍 Meri Samasya Track Karein
              </Button>
            </Link>
          </div>

          {/* Quick Demo Helper for Evaluators */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 flex-wrap">
            <span className="text-slate-300">त्वरित जांच हेतु डेमो कोड:</span>
            {['JH-RNC-2026-0814', 'JH-DHN-2026-0422', 'JH-GML-2026-0041'].map((code) => (
              <Link
                key={code}
                to={`/track-problem?id=${code}`}
                className="font-mono bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] transition-colors"
              >
                {code}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THREE FEATURE CARDS (Report, Adopt, Resolve) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Report */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 text-2xl shadow-xs group-hover:scale-105 transition-transform">
                📷
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>1. Report</span>
                <span className="text-xs font-normal text-slate-500">(समस्या दर्ज करें)</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                "Photo, voice aur location ke saath problem submit karein."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-amber-800 font-semibold flex items-center gap-1">
              <span>सरल 2 मिनट प्रपत्र</span>
              <span>• जीपीएस ऑटो लोकेशन</span>
            </div>
          </div>

          {/* Card 2: Adopt */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-4 text-2xl shadow-xs group-hover:scale-105 transition-transform">
                🎓
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>2. Adopt</span>
                <span className="text-xs font-normal text-slate-500">(छात्र अंगीकार)</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                "Students aur universities real-world problems par kaam karein."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-cyan-800 font-semibold flex items-center gap-1">
              <span>IIT, NIT व राज्य संस्थान</span>
              <span>• लैब प्रोटोटाइप</span>
            </div>
          </div>

          {/* Card 3: Resolve */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 text-2xl shadow-xs group-hover:scale-105 transition-transform">
                🚀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>3. Resolve</span>
                <span className="text-xs font-normal text-slate-500">(जमीनी समाधान)</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                "Industry support ke saath solution ground par deploy ho."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center gap-1">
              <span>टाटा व सीसीएल सीएसआर ग्रांट</span>
              <span>• ग्राम सत्यापन</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 HACKATHON EVALUATOR 10-STEP DEMO JOURNEY */}
      <DemoJourneyHomeSection />

      {/* 3. HOW IT WORKS (Simple 4-Step Visual Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              सरल कार्यप्रणाली (How It Works)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              4 आसान चरणों में समस्या से समाधान तक
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              आम नागरिक की समस्या को तकनीकी व वित्तीय समर्थन के साथ जमीन पर उतारने का पारदर्शी प्रवाह
            </p>
          </div>

          {/* 4-step responsive timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 01 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative hover:bg-emerald-50/50 transition-colors">
              <div>
                <span className="font-mono text-2xl font-black text-emerald-700 block mb-2">
                  01
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Report Problem
                </h4>
                <div className="text-xs font-semibold text-emerald-800 mt-0.5 mb-2">
                  समस्या दर्ज करें
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  नागरिक फोटो, ऑडियो अथवा विवरण के साथ गांव या वार्ड की समस्या सबमिट करते हैं।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                ✓ तत्काल शिकायत ट्रैकिंग कोड
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative hover:bg-emerald-50/50 transition-colors">
              <div>
                <span className="font-mono text-2xl font-black text-blue-700 block mb-2">
                  02
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Verify
                </h4>
                <div className="text-xs font-semibold text-blue-800 mt-0.5 mb-2">
                  प्रशासनिक सत्यापन
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  एआई डुप्लीकेट जांच और जिला प्रशासन द्वारा सत्यापन कर इसे तकनीकी चुनौती घोषित किया जाता है।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                ✓ तकनीकी प्राथमिकता व बजट
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative hover:bg-emerald-50/50 transition-colors">
              <div>
                <span className="font-mono text-2xl font-black text-cyan-700 block mb-2">
                  03
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Student Adoption
                </h4>
                <div className="text-xs font-semibold text-cyan-800 mt-0.5 mb-2">
                  छात्र टीम अंगीकार
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  विश्वविद्यालयों के इंजीनियरिंग छात्र टीम इसे अपना प्रोजेक्ट बनाते हैं व सीएसआर ग्रांट मिलती है।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                ✓ लैब टेस्टिंग व माइलस्टोन
              </div>
            </div>

            {/* Step 04 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative hover:bg-emerald-50/50 transition-colors">
              <div>
                <span className="font-mono text-2xl font-black text-amber-600 block mb-2">
                  04
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Ground Resolution
                </h4>
                <div className="text-xs font-semibold text-amber-800 mt-0.5 mb-2">
                  जमीनी समाधान व ऑडिट
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  मशीन या तकनीक को गांव में स्थापित कर ग्रामीणों व पंचायत द्वारा सामाजिक ऑडिट से प्रमाणित किया जाता है।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                ✓ ग्राम प्रधान संतुष्टि प्रमाण पत्र
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. JHARKHAND IMPACT MAP SECTION (Visual heatmap-style with requested demo locations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                नक्शा एवं क्षेत्रीय स्थिति (Jharkhand Impact Map)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                झारखंड के प्रमुख जिलों में समाधान प्रभाव
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                डेमो लोकेशन पर क्लिक कर क्षेत्रवार समस्याओं और स्थापित समाधानों की स्थिति देखें
              </p>
            </div>

            {/* Legend as requested: 🟢 Resolved, 🟡 In Progress, 🔴 Open Problems */}
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs flex-wrap">
              <span className="font-bold text-slate-700 text-[11px] uppercase">संकेत (Legend):</span>
              <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-2xs" />
                <span>🟢 Resolved (समाधान पूर्ण)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-amber-800">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-2xs" />
                <span>🟡 In Progress (प्रगति पर)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-rose-800">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-2xs" />
                <span>🔴 Open (खुली समस्याएं)</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Canvas + Details Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Stylized Map of Jharkhand */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[360px] flex flex-col justify-between border border-slate-800 shadow-inner">
              {/* Top Banner inside Map */}
              <div className="flex items-center justify-between z-10">
                <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>झारखंड राज्य विजुअल हीटमैप</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Demo Interactive Map
                </span>
              </div>

              {/* Stylized SVG Map Representation */}
              <div className="relative my-4 w-full aspect-[4/3] max-h-[320px] mx-auto flex items-center justify-center">
                {/* SVG Outline for Jharkhand Boundary representation */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full opacity-40 filter drop-shadow-md"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  {/* Stylized polygon matching Jharkhand contour */}
                  <polygon
                    points="60,90 120,40 220,50 310,90 350,150 320,240 260,270 170,260 100,220 50,160"
                    className="fill-emerald-950/80 stroke-emerald-500/60 stroke-2"
                  />
                  {/* Regional dividing contours */}
                  <line x1="120" y1="40" x2="220" y2="150" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                  <line x1="220" y1="150" x2="320" y2="240" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                  <line x1="170" y1="260" x2="220" y2="150" stroke="#047857" strokeDasharray="3,3" opacity="0.5" />
                </svg>

                {/* Pins for Demo Locations (Ranchi, Khunti, Dhanbad, Jamshedpur, Hazaribagh) */}
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
                      className={`group flex flex-col items-center transition-all z-20 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                      }`}
                    >
                      {/* Pin Ring */}
                      <span
                        className={`w-4 h-4 rounded-full border-2 shadow-lg ring-4 transition-all ${dotColor} ${
                          isSelected ? 'animate-bounce' : ''
                        }`}
                      />
                      {/* Label */}
                      <span
                        className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white border border-emerald-400'
                            : 'bg-slate-900/90 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {loc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Note */}
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                <span>📍 क्लिक करें: राँची, खूंटी, धनबाद, जमशेदपुर, हजारीबाग</span>
                <span className="text-amber-400 font-semibold">5 Demo Districts</span>
              </div>
            </div>

            {/* Selected District Details Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase">
                      चयनित जिला विवरण (District Spotlight)
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <span>{activeDistrict.name}</span>
                      <span className="text-sm font-normal text-slate-600">({activeDistrict.nameHi})</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{activeDistrict.regionDesc}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-2xs ${
                      activeDistrict.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : activeDistrict.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
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
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-700 font-black text-lg block font-mono">
                      {activeDistrict.resolvedCount}
                    </span>
                    <span className="text-slate-600 text-[11px]">हल समाधान (Resolved)</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-amber-600 font-black text-lg block font-mono">
                      {activeDistrict.inProgressCount}
                    </span>
                    <span className="text-slate-600 text-[11px]">प्रगति पर (Active)</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-rose-600 font-black text-lg block font-mono">
                      {activeDistrict.openCount}
                    </span>
                    <span className="text-slate-600 text-[11px]">खुली (Open)</span>
                  </div>
                </div>

                {/* Highlight Problem */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-500">हाल का प्रमुख नवाचार:</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {activeDistrict.highlightCategory}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm leading-snug">
                    {activeDistrict.highlightProblem}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex gap-2">
                  <Link to="/challenges" className="flex-1">
                    <Button variant="primary" size="sm" fullWidth>
                      इस जिले की चुनौतियाँ देखें
                    </Button>
                  </Link>
                  <Link to="/report-issue" className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>
                      यहाँ समस्या दर्ज करें
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick district selector buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-semibold shrink-0">अन्य जिले:</span>
                {demoLocations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDistrict(d)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                      activeDistrict.id === d.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT NUMBERS (With "Prototype Demo Data" label as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                मंच का अब तक का प्रभाव (Platform Impact)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                झारखंड भर से प्राप्त नागरिक शिकायतों और विकसित समाधानों का प्रदर्शन
              </p>
            </div>

            {/* Requested label: "Prototype Demo Data" */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold tracking-wide">
              <span>⚠️</span>
              <span>Prototype Demo Data</span>
            </span>
          </div>

          {/* 4 requested demo statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1,240+ Problems Reported */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                1,240+
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                Problems Reported
              </h4>
              <p className="text-xs text-slate-400">
                नागरिकों द्वारा दर्ज स्थानीय समस्याएं
              </p>
            </div>

            {/* 486 Problems Verified */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-blue-300 font-mono">
                486
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                Problems Verified
              </h4>
              <p className="text-xs text-slate-400">
                जिला प्रशासन द्वारा सत्यापित चुनौतियाँ
              </p>
            </div>

            {/* 128 Projects Adopted */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono">
                128
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                Projects Adopted
              </h4>
              <p className="text-xs text-slate-400">
                छात्र एवं विश्वविद्यालय अनुसंधान टीमें
              </p>
            </div>

            {/* 42 Solutions Deployed */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                42
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                Solutions Deployed
              </h4>
              <p className="text-xs text-slate-400">
                गांवों में स्थापित एवं संतुष्टि ऑडिटेड
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL-TO-ACTION (Citizen-First Simple Touch Banner) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-sm space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            क्या आपके गांव या मोहल्ले में कोई समस्या है?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            झिझकिए मत! फोटो खींचे, अपनी बात रिकॉर्ड करें और तुरंत समाधान झारखंड पर अपलोड करें। आपकी आवाज से राज्य का भविष्य बदलेगा।
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/report-issue" className="w-full sm:w-auto">
              <Button
                variant="citizen-large"
                size="lg"
                fullWidth
                subText="100% Free Grievance Registration"
              >
                + समस्या दर्ज करें (Report Problem)
              </Button>
            </Link>
            <Link to="/track-problem" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="bg-emerald-900 text-white border-emerald-600 hover:bg-emerald-950"
              >
                स्थिति जांचें (Track Issue)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
