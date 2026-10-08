import type { ScoreBand } from '../types';

interface ScoreCardProps {
  score: number;
  band: ScoreBand;
}

const BAND_STYLE: Record<ScoreBand, { stroke: string; text: string; label: string }> = {
  strong: { stroke: '#4FD1B0', text: 'text-mint', label: 'Strong match' },
  partial: { stroke: '#F2B94B', text: 'text-amber', label: 'Partial match' },
  weak: { stroke: '#F2735F', text: 'text-coral', label: 'Weak match' },
};

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreCard({ score, band }: ScoreCardProps) {
  const style = BAND_STYLE[band];
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <section className="flex flex-col items-center rounded-lg border border-line bg-surface p-6" aria-label="ATS score">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={`ATS score ${score} out of 100`}>
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#243038" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={style.stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display text-5xl font-bold ${style.text}`}>{score}</span>
          <span className="text-xs text-muted">out of 100</span>
        </div>
      </div>
      <p className={`mt-4 font-display text-lg font-bold ${style.text}`}>{style.label}</p>
      <p className="mt-1 text-center text-sm text-muted">Estimated ATS compatibility with this job</p>
    </section>
  );
}
