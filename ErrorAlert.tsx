import { AlertTriangle, X } from 'lucide-react';
import type { ErrorState } from '../types';

interface ErrorAlertProps {
  error: ErrorState;
  onDismiss?: () => void;
}

export default function ErrorAlert({ error, onDismiss }: ErrorAlertProps) {
  return (
    <div role="alert" className="flex gap-3 rounded-lg border border-coral/40 bg-coral-dim p-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-fg">{error.title}</p>
        <p className="mt-1 text-sm text-fg/80">{error.message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="h-8 w-8 shrink-0 rounded-md text-fg/70 hover:bg-white/5 hover:text-fg"
          aria-label="Dismiss error"
        >
          <X className="mx-auto h-4 w-4" />
        </button>
      )}
    </div>
  );
}
