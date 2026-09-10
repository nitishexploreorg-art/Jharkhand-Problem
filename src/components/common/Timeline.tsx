import React from 'react';
import { PlatformStage, Problem } from '../../types';
import { PLATFORM_STAGES } from '../../data/jharkhandData';
import { Check, Clock, Circle, ArrowRight } from 'lucide-react';

export interface LifecycleTimelineProps {
  currentStage: PlatformStage;
  problem?: Problem;
  orientation?: 'horizontal' | 'vertical';
  showDetails?: boolean;
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({
  currentStage,
  problem,
  orientation = 'vertical',
  showDetails = true,
}) => {
  const currentStageIndex = PLATFORM_STAGES.findIndex((s) => s.stage === currentStage);
  const activeIdx = currentStageIndex >= 0 ? currentStageIndex : 0;

  if (orientation === 'horizontal') {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-auto pb-4 pt-2">
        <div className="flex items-center min-w-[680px] lg:min-w-full justify-between px-2">
          {PLATFORM_STAGES.map((s, idx) => {
            const isCompleted = idx < activeIdx;
            const isCurrent = idx === activeIdx;

            return (
              <React.Fragment key={s.stage}>
                <div className="flex flex-col items-center text-center group cursor-pointer max-w-[90px]">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-200 scale-110 shadow-sm'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-semibold leading-tight line-clamp-2 ${
                      isCurrent
                        ? 'text-amber-800 font-bold'
                        : isCompleted
                        ? 'text-emerald-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.labelHi}
                  </span>
                  <span className="text-[9px] text-slate-500 mt-0.5">{s.labelEn}</span>
                </div>

                {idx < PLATFORM_STAGES.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 rounded transition-colors ${
                      idx < activeIdx ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical Stepper (Comprehensive detail view)
  return (
    <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6 my-2">
      {PLATFORM_STAGES.map((s, idx) => {
        const isCompleted = idx < activeIdx;
        const isCurrent = idx === activeIdx;
        const isUpcoming = idx > activeIdx;

        return (
          <div key={s.stage} className="relative group">
            {/* Step Icon Node */}
            <div
              className={`absolute -left-[27px] sm:-left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isCurrent
                  ? 'bg-amber-500 text-white ring-4 ring-amber-100 scale-110 shadow-sm'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : s.stepNumber}
            </div>

            {/* Content Box */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                  : isCompleted
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-50/50 border-slate-200/60 opacity-70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    चरण 0{s.stepNumber} (Step {s.stepNumber})
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? 'सत्यापित (Completed)' : isCurrent ? 'सक्रिय (Active Stage)' : 'प्रतीक्षित (Upcoming)'}
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {s.labelHi} <span className="font-normal text-slate-600 text-xs sm:text-sm">({s.labelEn})</span>
              </h4>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {s.shortDescHi} • {s.shortDescEn}
              </p>

              {/* Dynamic Contextual Artifacts if provided */}
              {showDetails && problem && (
                <>
                  {s.stage === 'REPORTED' && (
                    <div className="mt-2 text-xs bg-slate-100 p-2 rounded-lg text-slate-700">
                      <strong>दर्जकर्ता:</strong> {problem.citizenName} ({problem.district}, {problem.block})
                    </div>
                  )}

                  {s.stage === 'AI_PROCESSED' && problem.aiAnalysis && (
                    <div className="mt-2 text-xs bg-indigo-50 border border-indigo-200/80 p-2.5 rounded-lg text-indigo-950 space-y-1">
                      <div><strong>AI वर्गीकरण:</strong> {problem.aiAnalysis.categorySuggested} ({Math.round(problem.aiAnalysis.confidenceScore * 100)}% Confidence)</div>
                      <div><strong>तर्क (Triage Reason):</strong> {problem.aiAnalysis.urgencyReasoning}</div>
                    </div>
                  )}

                  {s.stage === 'ADMIN_VERIFIED' && problem.adminVerification && (
                    <div className="mt-2 text-xs bg-blue-50 border border-blue-200/80 p-2.5 rounded-lg text-blue-950">
                      <div><strong>सत्यापनकर्ता अधिकारी:</strong> {problem.adminVerification.verifiedBy} ({problem.adminVerification.officerDesignation})</div>
                      <div className="mt-0.5 text-blue-800">"{problem.adminVerification.adminNotes}"</div>
                    </div>
                  )}

                  {s.stage === 'STUDENT_ADOPTED' && problem.adoptedTeam && (
                    <div className="mt-2 text-xs bg-cyan-50 border border-cyan-200/80 p-2.5 rounded-lg text-cyan-950">
                      <div><strong>अंगीकृत संस्थान व टीम:</strong> {problem.adoptedTeam.universityName} — {problem.adoptedTeam.teamName}</div>
                      <div><strong>टीम लीडर:</strong> {problem.adoptedTeam.leadStudent} | <strong>मार्गदर्शक:</strong> {problem.adoptedTeam.facultyMentor}</div>
                    </div>
                  )}

                  {s.stage === 'CSR_FUNDED' && problem.csrSponsorship && (
                    <div className="mt-2 text-xs bg-purple-50 border border-purple-200/80 p-2.5 rounded-lg text-purple-950">
                      <div><strong>उद्योग सहयोग:</strong> {problem.csrSponsorship.corporateName}</div>
                      <div><strong>अनुदान राशि:</strong> ₹{problem.csrSponsorship.fundedAmountInr.toLocaleString('en-IN')} ({problem.csrSponsorship.programName})</div>
                    </div>
                  )}

                  {s.stage === 'GROUND_DEPLOYED' && problem.groundDeployment && (
                    <div className="mt-2 text-xs bg-teal-50 border border-teal-200/80 p-2.5 rounded-lg text-teal-950">
                      <div><strong>जमीनी अधिष्ठापन स्थल:</strong> {problem.groundDeployment.pilotLocation}</div>
                      <div><strong>लाभार्थी:</strong> {problem.groundDeployment.beneficiariesCount}+ ग्रामीण | <strong>मेट्रिक्स:</strong> {problem.groundDeployment.operationalMetrics}</div>
                    </div>
                  )}

                  {s.stage === 'CITIZEN_AUDIT' && problem.socialAudit && (
                    <div className="mt-2 text-xs bg-rose-50 border border-rose-200/80 p-2.5 rounded-lg text-rose-950">
                      <div><strong>सामाजिक ऑडिट:</strong> {problem.socialAudit.panchayatPradhanName || 'ग्राम सभा एवं पंचायत'}</div>
                      <div><strong>नागरिक संतुष्टि रेटिंग:</strong> {'⭐'.repeat(problem.socialAudit.citizenSatisfactionScore)}</div>
                      <div className="italic">"{problem.socialAudit.citizenComments}"</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
