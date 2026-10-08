import { ArrowRight, FileText, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
      <div>
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber">Make every application count</p>
        <h1 className="text-5xl font-semibold leading-tight md:text-6xl">Your experience.<br />A clearer match.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Compare your resume with a job description. Find the skills you already bring, the gaps to address, and the changes that matter.</p>
        <Link to="/analyze" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-amber px-6 py-3 font-semibold text-ink transition-colors hover:bg-amber/90">
          Analyze my resume <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <p className="mt-4 text-sm text-muted">PDF resume + job description. Practical feedback.</p>
      </div>
      <aside className="rounded-2xl border border-line bg-surface p-8" aria-label="How it works">
        <FileText aria-hidden="true" className="mb-8 text-amber" size={36} />
        <h2 className="text-2xl font-semibold">A focused second look.</h2>
        <ol className="mt-6 space-y-6">
          {[
            ['01', 'Bring your resume', 'Upload the PDF you plan to send.'],
            ['02', 'Add the role', 'Paste the full job description for context.'],
            ['03', 'Refine your application', 'Review your match score, skill gaps, and recommendations.'],
          ].map(([step, title, description]) => (
            <li key={step} className="flex gap-4">
              <span className="pt-1 text-sm text-amber">{step}</span>
              <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{description}</p></div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex items-center gap-2 border-t border-line pt-5 text-sm text-mint"><ListChecks aria-hidden="true" size={18} /> Feedback tailored to the role</div>
      </aside>
    </section>
  );
}
