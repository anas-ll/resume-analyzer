import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroPreview from './HeroPreview';

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
          See your resume the way the applicant tracking system does.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Upload your PDF, paste a job description, and get a match score, the keywords you are missing, and a rewritten
          summary you can use today.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3 font-semibold text-ink transition-colors hover:bg-amber/90"
          >
            Analyze my resume
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <span className="text-sm text-muted">Free, no account needed</span>
        </div>
      </div>
      <HeroPreview />
    </section>
  );
}
