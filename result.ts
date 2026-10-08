import type { ATSResult, ResumeAnalysis, ScoreBand } from '../types';

export function getScoreBand(score: number): ScoreBand {
  if (score >= 75) return 'strong';
  if (score >= 50) return 'partial';
  return 'weak';
}

/** Splits "Almost Ready - reason" into label + reason. */
export function toATSResult(analysis: ResumeAnalysis): ATSResult {
  const [label, ...rest] = analysis.hiringReadiness.split(/\s[-–—]\s/);
  return {
    ...analysis,
    scoreBand: getScoreBand(analysis.atsScore),
    readinessLabel: (label ?? '').trim() || 'Assessment',
    readinessReason: rest.join(' - ').trim(),
  };
}
