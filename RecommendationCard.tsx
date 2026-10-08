import { Lightbulb } from 'lucide-react';

interface RecommendationCardProps {
  recommendations: string[];
}

/** Recommendations are ordered by impact, so numbering carries real meaning here. */
export default function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <section className="rounded-lg border border-line bg-surface p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <Lightbulb className="h-5 w-5 text-amber" aria-hidden />
        What to change, highest impact first
      </h3>
      <ol className="mt-4 space-y-3">
        {recommendations.map((rec, i) => (
          <li key={rec} className="flex gap-4 rounded-md bg-raised p-4 text-sm leading-relaxed">
            <span className="font-display text-lg font-bold text-amber" aria-hidden>
              {i + 1}
            </span>
            <span>{rec}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
