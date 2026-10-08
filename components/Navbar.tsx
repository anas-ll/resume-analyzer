import { FileText } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-line">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to content</a>
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="flex items-center gap-3 font-display font-semibold">
          <FileText aria-hidden="true" className="text-amber" size={24} />
          <span>Resume Analyzer</span>
        </Link>
        <NavLink to="/analyze" className={({ isActive }) => `rounded-lg border px-4 py-2 text-sm transition-colors hover:border-amber ${isActive ? 'border-amber text-amber' : 'border-line text-fg'}`}>
          Analyze resume
        </NavLink>
      </nav>
    </header>
  );
}
