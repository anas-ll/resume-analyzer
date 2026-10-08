import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link to="/" aria-label="Resume Analyzer home">
          <Logo />
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <Link
            to="/analyze"
            className="ml-2 rounded-md bg-amber px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-amber/90"
          >
            Analyze resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
