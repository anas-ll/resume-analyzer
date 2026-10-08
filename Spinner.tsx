import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  className?: string;
  label?: string;
}

export default function Spinner({ className = 'h-5 w-5', label = 'Loading' }: SpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} role="status" aria-label={label} />;
}
