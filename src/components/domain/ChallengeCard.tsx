import React from 'react';
import { Problem } from '../../types';
import { PriorityBadge, CategoryBadge } from '../common/Badge';
import {
  Award,
  Users,
  MapPin,
  ChevronRight,
  GraduationCap,
  ThumbsUp,
  Wrench,
  Clock,
  Sparkles,
  Lock,
  Clock3,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export interface ChallengeCardProps {
  problem: Problem;
  onAdoptClick?: (problem: Problem) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ problem, onAdoptClick }) => {
  const { language } = useApp();
  const isHi = language === 'hi';

  const isAdopted = !!problem.adoptedTeam || problem.currentStage === 'STUDENT_ADOPTED';
  const isPendingFaculty = problem.facultyApprovalStatus === 'PENDING_FACULTY_APPROVAL';
  const teamName = problem.adoptedTeam?.teamName || problem.adoptionRequest?.teamName;
  const collegeName = problem.adoptedTeam?.universityName || problem.adoptionRequest?.collegeName;

  const skills = problem.requiredSkills || [
    'IoT & Embedded Systems',
    'Hardware Prototyping',
    'Applied Engineering',
  ];

  const projectReq =
    problem.estimatedProjectRequirement || (isHi ? 'हार्डवेयर प्रोटोटाइप व पायलट परीक्षण (3 माह)' : 'Hardware Prototype & Pilot Testing (3 Months)');

  const citizensCount = problem.citizensAffected || (problem.votesCount ? problem.votesCount * 12 : 350);

  const displayTitle = isHi ? problem.titleHi || problem.title : problem.title;
  const displaySecondaryTitle = isHi
    ? (problem.title !== displayTitle ? problem.title : null)
    : (problem.titleHi !== displayTitle ? problem.titleHi : null);
  const displayDistrict = isHi ? problem.districtHi || problem.district : problem.district;

  return (
    <div
      id={`challenge-card-${problem.id}`}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="p-5 sm:p-6">
        {/* Top bar: ID, Priority */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-emerald-100 text-emerald-800 rounded-md">
              <Award className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold text-slate-700 tracking-wider">
              {problem.trackingCode}
            </span>
          </div>
          <PriorityBadge priority={problem.priority} />
        </div>

        {/* Category */}
        <div className="mb-2.5">
          <CategoryBadge nameEn={problem.category.replace('_', ' ')} nameHi={problem.categoryHi} />
        </div>

        {/* Title */}
        <Link to={`/challenges/${problem.id}`} className="block group">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors leading-snug">
            {displayTitle}
          </h3>
          {displaySecondaryTitle && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">{displaySecondaryTitle}</p>
          )}
        </Link>

        {/* Location & Key Metrics */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1 font-medium text-slate-800">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {displayDistrict}, {problem.block}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              <strong>{citizensCount.toLocaleString('en-IN')}</strong> {isHi ? 'प्रभावित ग्रामीण' : 'Citizens Affected'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <ThumbsUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>{problem.votesCount}</strong> {isHi ? 'समर्थन' : 'Upvotes'}
            </span>
          </div>
        </div>

        {/* Required Skills */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 mb-1.5">
            <Wrench className="w-3 h-3 text-emerald-600" />
            <span>{isHi ? 'आवश्यक कौशल:' : 'Required Skills:'}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Estimated Project Requirement */}
        <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-xs">
          <div className="flex items-start gap-1.5 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">
                {isHi ? 'अनुमानित आवश्यकता: ' : 'Estimated Requirement: '}
              </span>
              <span className="text-slate-600">{projectReq}</span>
            </div>
          </div>
        </div>

        {/* Adoption Status Box */}
        <div className="mt-3.5">
          {isAdopted ? (
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950">
              <div className="flex items-center gap-2 font-bold text-cyan-900">
                <GraduationCap className="w-4 h-4 text-cyan-700" />
                <span>{isHi ? `अंगीकृत: ${teamName || 'विश्वविद्यालय टीम'}` : `Adopted by ${teamName || 'University Team'}`}</span>
              </div>
              {collegeName && (
                <p className="text-[11px] text-cyan-800 mt-0.5 ml-6">
                  {isHi ? `कॉलेज: ${collegeName}` : `College: ${collegeName}`}
                </p>
              )}
              <div className="mt-2 text-[11px] text-cyan-900 bg-cyan-100/70 rounded-lg p-2 flex items-start gap-1.5 font-medium">
                <Lock className="w-3 h-3 text-cyan-700 shrink-0 mt-0.5" />
                <span>
                  {isHi
                    ? 'प्रोजेक्ट सक्रिय रहने तक अन्य टीमें इस चुनौती को स्वतंत्र रूप से अंगीकार नहीं कर सकतीं।'
                    : 'Other teams cannot independently adopt this challenge while the project is active.'}
                </span>
              </div>
            </div>
          ) : isPendingFaculty ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Clock3 className="w-4 h-4 text-amber-700" />
                <span>{isHi ? 'स्थिति: मेंटर अनुमोदन लंबित' : 'Status: Pending Faculty Approval'}</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                {isHi
                  ? `टीम ${teamName || 'Tech Titans'} द्वारा प्रस्ताव जमा किया गया। मेंटर स्वीकृति प्रतीक्षित।`
                  : `Proposal submitted by team ${teamName || 'Tech Titans'}. Awaiting mentor sign-off.`}
              </p>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>
                  {isHi ? 'सत्यापित एवं कॉलेज अपनाने के लिए उपलब्ध' : 'Verified & Open for Adoption'}
                </span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                {isHi ? 'सत्यापित समस्या' : 'Verified Challenge'}
              </span>
            </div>
          )}
        </div>

        {/* Academic Credit Notice */}
        <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
          <span className="font-semibold text-slate-700">
            {isHi ? 'अकादमिक क्रेडिट मैपिंग — कॉलेज/विभागाध्यक्ष अनुमोदन के अधीन' : 'Academic Credit Mapping — Subject to College/HOD Approval'}
          </span>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <Link to={`/challenges/${problem.id}`}>
          <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
            {isHi ? 'चुनौती विवरण' : 'Details'}
          </Button>
        </Link>

        {isAdopted ? (
          <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-3 py-1.5 rounded-xl">
            {isHi ? `अंगीकृत: ${teamName || 'टीम'}` : `Adopted by ${teamName || 'Team'}`}
          </span>
        ) : isPendingFaculty ? (
          <Link to={`/challenges/${problem.id}`}>
            <Button variant="outline" size="sm" className="border-amber-400 text-amber-800 bg-amber-50">
              {isHi ? 'समीक्षा व अनुमोदन' : 'Review Approval'}
            </Button>
          </Link>
        ) : (
          <Button
            id={`btn-adopt-${problem.id}`}
            variant="primary"
            size="sm"
            icon={<GraduationCap className="w-4 h-4" />}
            onClick={() => onAdoptClick?.(problem)}
          >
            {isHi ? 'प्रोजेक्ट के रूप में अपनाएं' : 'Adopt as Project'}
          </Button>
        )}
      </div>
    </div>
  );
};
