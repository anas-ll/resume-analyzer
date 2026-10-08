import { CheckCircle2, RotateCcw, SearchX, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react';
import ScoreCard from './ScoreCard';
import ReadinessCard from './ReadinessCard';
import SkillTags from './SkillTags';
import BulletCard from './BulletCard';
import RecommendationCard from './RecommendationCard';
import SummaryCard from './SummaryCard';
import type { ATSResult } from '../types';

interface ResultsDashboardProps {
  result: ATSResult;
  onReset: () => void;
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-bold">Your analysis</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm hover:border-muted"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Analyze another
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[18rem_1fr]">
        <ScoreCard score={result.atsScore} band={result.scoreBand} />
        <ReadinessCard label={result.readinessLabel} reason={result.readinessReason} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SkillTags title="Matching skills" icon={CheckCircle2} skills={result.matchingSkills} tone="mint" emptyText="No overlapping skills were found." />
        <SkillTags title="Missing skills" icon={SearchX} skills={result.missingSkills} tone="coral" emptyText="Nothing important is missing." />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BulletCard title="Strengths" icon={TrendingUp} items={result.strengths} tone="mint" />
        <BulletCard title="Weaknesses" icon={TrendingDown} items={result.weaknesses} tone="coral" />
      </div>

      <RecommendationCard recommendations={result.recommendations} />
      <SummaryCard summary={result.improvedSummary} />

      <p className="flex items-center gap-2 text-xs text-muted">
        <ShieldCheck className="h-4 w-4" aria-hidden />
        AI-generated feedback. Review every suggestion and keep your resume truthful.
      </p>
    </div>
  );
}
