import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/common/Badge';
import { LifecycleTimeline } from '../components/common/Timeline';
import { Button } from '../components/common/Button';
import {
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Building2,
  CheckCircle2,
  Coins,
  ThumbsUp,
  ArrowLeft,
  ArrowRight,
  FileCheck,
  Star,
} from 'lucide-react';

export const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProblemById, getProblemByTrackingCode, upvoteProblem } = useApp();

  const problem = getProblemById(id || '') || getProblemByTrackingCode(id || '');

  if (!problem) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">समस्या नहीं मिली (Problem Not Found)</h2>
        <p className="text-sm text-slate-500 mt-2">दिए गए पहचानकर्ता के लिए कोई रिकॉर्ड उपलब्ध नहीं है।</p>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="outline" size="sm">
            मुख्य पृष्ठ पर लौटें
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
        </Link>

        <Link to={`/track-problem?id=${problem.trackingCode}`}>
          <Button variant="outline" size="sm">
            लाइव स्थिति ट्रैक करें
          </Button>
        </Link>
      </div>

      {/* Main Problem Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold bg-slate-900 text-amber-300 px-3 py-1 rounded-xl border border-slate-700">
              {problem.trackingCode}
            </span>
            <PriorityBadge priority={problem.priority} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => upvoteProblem(problem.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{problem.votesCount} समर्थन (Upvotes)</span>
            </button>
            <StatusBadge stage={problem.currentStage} size="md" />
          </div>
        </div>

        <div className="mt-4">
          <CategoryBadge nameEn={problem.category.replace('_', ' ')} nameHi={problem.categoryHi} />

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-snug">
            {problem.titleHi || problem.title}
          </h1>
          <p className="text-sm text-slate-500 font-medium">{problem.title}</p>

          <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed">
            {problem.descriptionHi || problem.description}
          </p>

          {/* Location & Metadata Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">भौगोलिक स्थान (Location):</span>
                <strong className="text-slate-900 text-sm">
                  {problem.districtHi || problem.district}, {problem.block}
                </strong>
                <div className="text-[11px] text-slate-600">{problem.villageOrWard}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ({problem.coordinates.lat}° N, {problem.coordinates.lng}° E)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">नागरिक प्रविष्टि (Reported):</span>
                <strong className="text-slate-900 text-sm">{problem.citizenName}</strong>
                <div className="text-[11px] text-slate-600">
                  {new Date(problem.reportedAt).toLocaleDateString('hi-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">नोडल प्रशासनिक विभाग:</span>
                <strong className="text-slate-900 text-sm">
                  {problem.adminVerification?.departmentAssigned || 'समीक्षाधीन (Under Review)'}
                </strong>
                <div className="text-[11px] text-slate-600">
                  {problem.adminVerification?.verifiedBy || 'जिला प्रशासन झारखंड'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Photos */}
        {problem.evidence && problem.evidence.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              संलग्न नागरिक साक्ष्य (Citizen Evidence Gallery):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problem.evidence.map((ev) => (
                <div key={ev.id} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative">
                  <img
                    src={ev.url}
                    alt={ev.caption || 'Citizen Evidence Proof'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {ev.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-white p-2.5 text-xs">
                      {ev.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deep-Dive Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: AI Analysis */}
        {problem.aiAnalysis && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  एआई छंटाई व प्राथमिकता रिपोर्ट (AI Triage Analysis)
                </h3>
                <span className="text-xs text-slate-500">Natural Language & Spatial Verification</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
              <div className="flex justify-between items-center py-1 border-b border-indigo-100">
                <span className="font-semibold">पहचानी गई श्रेणी:</span>
                <span className="font-bold text-indigo-900">{problem.aiAnalysis.categorySuggested}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-indigo-100">
                <span className="font-semibold">वर्गीकरण सटीकता (Confidence):</span>
                <span className="font-mono font-bold text-emerald-700">
                  {Math.round(problem.aiAnalysis.confidenceScore * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-indigo-100">
                <span className="font-semibold">दोहराव स्थिति (Duplicate Check):</span>
                <span className="font-semibold text-emerald-700">
                  {problem.aiAnalysis.duplicateDetected ? 'डुप्लीकेट पहचाना गया' : 'अद्वितीय शिकायत (Unique Record)'}
                </span>
              </div>
              <div className="pt-1">
                <span className="font-semibold block mb-0.5">प्राथमिकता का औचित्य:</span>
                <p className="text-indigo-950 leading-relaxed">{problem.aiAnalysis.urgencyReasoning}</p>
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Ground Deployment & Social Audit */}
        {problem.groundDeployment ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  जमीनी अधिष्ठापन रिपोर्ट (Ground Deployment)
                </h3>
                <span className="text-xs text-slate-500">Field Validation & Installation</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
              <div className="flex justify-between items-center py-1 border-b border-teal-100">
                <span className="font-semibold">अधिष्ठापन तिथि:</span>
                <span className="font-bold text-teal-900">{problem.groundDeployment.deploymentDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-teal-100">
                <span className="font-semibold">लाभान्वित आबादी:</span>
                <span className="font-bold text-teal-900">{problem.groundDeployment.beneficiariesCount}+ ग्रामीण</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold block mb-0.5">सफल परिचालन मेट्रिक्स:</span>
                <p className="text-teal-950 leading-relaxed">{problem.groundDeployment.operationalMetrics}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-center text-center space-y-2">
            <FileCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">जमीनी अधिष्ठापन प्रतीक्षित</h4>
            <p className="text-xs text-slate-500">
              प्रोटोटाइप निर्माण एवं परीक्षण पूर्ण होने के उपरांत जमीनी अधिष्ठापन की रिपोर्ट यहाँ प्रदर्शित होगी।
            </p>
          </div>
        )}
      </div>

      {/* Social Audit Certification Section (If Available) */}
      {problem.socialAudit && (
        <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  नागरिक सामाजिक ऑडिट एवं प्रभाव सत्यापन (Social Audit)
                </h3>
                <span className="text-xs text-slate-500">
                  Gram Sabha & Citizen Resolution Certification
                </span>
              </div>
            </div>

            <span className="text-xs font-bold font-mono bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg border border-emerald-300">
              प्रमाण पत्र: {problem.socialAudit.certificateNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Before Photo */}
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-2">
                समस्या पूर्व स्थिति (Before Deployment):
              </span>
              <div className="aspect-video rounded-2xl overflow-hidden border border-rose-200 bg-slate-100 shadow-2xs">
                <img
                  src={problem.socialAudit.beforePhotoUrl}
                  alt="Before solution"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* After Photo */}
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                समाधान के उपरांत स्थिति (After Deployment):
              </span>
              <div className="aspect-video rounded-2xl overflow-hidden border border-emerald-300 bg-slate-100 shadow-2xs">
                <img
                  src={problem.socialAudit.afterPhotoUrl}
                  alt="After solution deployment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Citizen & Panchayat Endorsement */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-emerald-900">सत्यापनकर्ता पंचायत प्रधान: </span>
                <strong>{problem.socialAudit.panchayatPradhanName}</strong>
              </div>
              <div className="flex items-center gap-1 font-bold text-amber-600">
                <span>संतुष्टि:</span>
                <span>{'⭐'.repeat(problem.socialAudit.citizenSatisfactionScore)}</span>
              </div>
            </div>
            <p className="italic text-emerald-900 text-xs leading-relaxed">
              "{problem.socialAudit.citizenComments}"
            </p>
          </div>
        </div>
      )}

      {/* 10-Stage Lifecycle Stepper */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-black text-slate-900 mb-4 pb-3 border-b border-slate-100">
          सम्पूर्ण समाधान यात्रा (10-Stage Resolution Journey)
        </h3>
        <LifecycleTimeline currentStage={problem.currentStage} problem={problem} orientation="vertical" />
      </div>
    </div>
  );
};
