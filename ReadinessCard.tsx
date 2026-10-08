import { BadgeCheck } from 'lucide-react';

interface ReadinessCardProps {
  label: string;
  reason: string;
}

export default function ReadinessCard({ label, reason }: ReadinessCardProps) {
  return (
    <section className="flex flex-col justify-center rounded-lg border border-line bg-surface p-6" aria-label="Hiring readiness">
      <div className="flex items-center gap-2 text-sm text-muted">
        <BadgeCheck className="h-4 w-4" aria-hidden />
        Hiring readiness
      </div>
      <p className="mt-2 font-display text-3xl font-bold">{label}</p>
      {reason && <p className="mt-2 text-sm leading-relaxed text-fg/80">{reason}</p>}
    </section>
  );
}
