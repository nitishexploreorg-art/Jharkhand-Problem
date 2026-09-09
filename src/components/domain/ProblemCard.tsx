import React from 'react';
import { Problem } from '../../types';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { MapPin, ThumbsUp, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export interface ProblemCardProps {
  problem: Problem;
  showActions?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, showActions = true }) => {
  const { upvoteProblem, language } = useApp();
  const isHi = language === 'hi';

  const primaryImage =
    problem.evidence && problem.evidence.length > 0
      ? problem.evidence[0].url
      : 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80';

  const displayTitle = isHi ? problem.titleHi || problem.title : problem.title;
  const displaySecondaryTitle = isHi ? (problem.title !== displayTitle ? problem.title : null) : (problem.titleHi !== displayTitle ? problem.titleHi : null);
  const displayDescription = isHi ? problem.descriptionHi || problem.description : problem.description;
  const displayDistrict = isHi ? problem.districtHi || problem.district : problem.district;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Card Media Banner */}
        <div className="relative aspect-video sm:aspect-21/9 bg-slate-100 overflow-hidden">
          <img
            src={primaryImage}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="bg-slate-900/90 text-white font-mono text-xs px-2.5 py-1 rounded-lg border border-white/20 font-bold tracking-wide">
              {problem.trackingCode}
            </span>
            <PriorityBadge priority={problem.priority} />
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {displayDistrict} ({problem.block})
              </span>
            </div>
            {problem.votesCount > 0 && (
              <div className="flex items-center gap-1 font-semibold bg-black/40 backdrop-blur-xs px-2 py-1 rounded-md">
                <ThumbsUp className="w-3 h-3 text-amber-400" />
                <span>
                  {problem.votesCount} {isHi ? 'समर्थन' : 'Upvotes'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <CategoryBadge nameEn={problem.category.replace('_', ' ')} nameHi={problem.categoryHi} />
            <StatusBadge stage={problem.currentStage} size="sm" />
          </div>

          <Link to={`/problem/${problem.id}`} className="block group-hover:text-emerald-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug line-clamp-2">
              {displayTitle}
            </h3>
            {displaySecondaryTitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">{displaySecondaryTitle}</p>
            )}
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {displayDescription}
          </p>

          {/* Key Lifecycle Highlights */}
          {problem.adoptedTeam && (
            <div className="mt-3 p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200/70 flex items-center gap-2 text-xs text-cyan-950">
              <Building2 className="w-4 h-4 text-cyan-700 shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-cyan-900">
                  {isHi ? 'संस्थान: ' : 'Adopted by: '}
                </span>
                {problem.adoptedTeam.universityName}
              </div>
            </div>
          )}

          {problem.csrSponsorship && (
            <div className="mt-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/70 flex items-center gap-2 text-xs text-purple-950">
              <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-purple-900">
                  {isHi ? 'सीएसआर ग्रांट: ' : 'CSR Grant: '}
                </span>
                ₹{problem.csrSponsorship.fundedAmountInr.toLocaleString('en-IN')} ({problem.csrSponsorship.corporateName})
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      {showActions && (
        <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              upvoteProblem(problem.id);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{isHi ? 'समर्थन दें' : 'Upvote'}</span>
          </button>

          <Link
            to={`/problem/${problem.id}`}
            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>{isHi ? 'पूर्ण विवरण देखें' : 'View Details'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
