import { translations, Language } from './translations';
import { Problem, CategoryInfo, StageDefinition, PriorityLevel } from '../types';

export { translations };
export type { Language };

const STORAGE_KEY = 'samadhan_jh_language';

/**
 * Get initial language from localStorage (defaults to Hindi as mandated)
 */
export function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hi') {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'hi';
}

/**
 * Save language preference locally so it persists across entire site navigation
 */
export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

/**
 * Translation function to retrieve nested keys like 'nav.home', 'report.submitBtn'
 */
export function translate(
  lang: Language,
  key: string,
  params?: Record<string, string | number>
): string {
  const dict = translations[lang] || translations.hi;
  const parts = key.split('.');
  let current: any = dict;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English dictionary if missing in target
      const fallbackDict = translations.en;
      let fallbackCurrent: any = fallbackDict;
      for (const fbPart of parts) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbPart in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fbPart];
        } else {
          fallbackCurrent = undefined;
          break;
        }
      }
      current = fallbackCurrent !== undefined ? fallbackCurrent : key;
      break;
    }
  }

  if (typeof current !== 'string') {
    return key;
  }

  // Parameter interpolation e.g. {count}
  if (params) {
    return Object.entries(params).reduce((str, [pKey, pVal]) => {
      return str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }, current);
  }

  return current;
}

/**
 * Localize a problem object dynamically based on current language
 */
export function localizeProblem(problem: Problem, lang: Language) {
  const isHi = lang === 'hi';
  return {
    ...problem,
    displayTitle: isHi ? problem.titleHi || problem.title : problem.title,
    displaySecondaryTitle: isHi ? problem.title : problem.titleHi,
    displayDescription: isHi ? problem.descriptionHi || problem.description : problem.description,
    displayCategory: isHi ? problem.categoryHi || problem.category : problem.category.replace('_', ' '),
    displayDistrict: isHi ? problem.districtHi || problem.district : problem.district,
  };
}

/**
 * Localize priority string
 */
export function localizePriority(priority: PriorityLevel, lang: Language): string {
  const isHi = lang === 'hi';
  switch (priority) {
    case 'critical':
      return isHi ? 'अति-संवेदनशील' : 'Critical';
    case 'high':
      return isHi ? 'उच्च प्राथमिकता' : 'High Priority';
    case 'medium':
      return isHi ? 'मध्यम' : 'Medium';
    case 'low':
      return isHi ? 'सामान्य' : 'Routine';
    default:
      return priority;
  }
}

/**
 * Localize category
 */
export function localizeCategory(
  category: { nameEn: string; nameHi?: string; id?: string },
  lang: Language
): string {
  if (lang === 'hi') {
    return category.nameHi || category.nameEn;
  }
  return category.nameEn;
}
