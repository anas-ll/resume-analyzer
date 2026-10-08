/**
 * Decorative preview of the product's core idea: keywords from a job post
 * found (or not) in a resume. The scan line is the page's one ambient motion.
 */
export default function HeroPreview() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-surface p-6" aria-hidden>
      <div className="mb-5 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="font-display text-xl font-bold">Jordan Rivera</p>
          <p className="text-sm text-muted">Backend Engineer</p>
        </div>
        <p className="font-display text-4xl font-bold text-amber">82</p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-fg/80">
        <p>
          Built <mark className="rounded bg-mint-dim px-1 text-mint">REST APIs</mark> in{' '}
          <mark className="rounded bg-mint-dim px-1 text-mint">Node.js</mark> serving 2M requests a day, and cut p95
          latency by 38%.
        </p>
        <p>
          Migrated a monolith to <mark className="rounded bg-mint-dim px-1 text-mint">PostgreSQL</mark> with zero
          downtime; mentored three junior developers.
        </p>
        <p>
          Wanted by the job, not on the resume:{' '}
          <mark className="rounded bg-coral-dim px-1 text-coral">Kubernetes</mark>{' '}
          <mark className="rounded bg-coral-dim px-1 text-coral">Terraform</mark>
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="h-px w-full animate-sweep bg-gradient-to-r from-transparent via-amber to-transparent" />
      </div>
    </div>
  );
}
