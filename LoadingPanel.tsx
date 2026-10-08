import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const STEPS = [
  'Reading your resume',
  'Comparing it with the job description',
  'Scoring keywords and experience',
  'Writing your recommendations',
];

export default function LoadingPanel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-surface px-6 py-16 text-center" aria-live="polite">
      <Spinner className="h-9 w-9 text-amber" label="Analyzing" />
      <p className="font-display text-xl font-bold">{STEPS[step]}…</p>
      <p className="text-sm text-muted">This usually takes 10 to 20 seconds.</p>
    </div>
  );
}
