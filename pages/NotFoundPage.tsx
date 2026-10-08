import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber">404 / Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold">This page isn't here.</h1>
      <p className="mt-4 text-muted">Return home to start a new resume analysis.</p>
      <Link to="/" className="mt-8 inline-block rounded-lg bg-amber px-6 py-3 font-semibold text-ink hover:bg-amber/90">Back to home</Link>
    </section>
  );
}
