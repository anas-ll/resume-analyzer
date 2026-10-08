import { FileCheck2 } from 'lucide-react';

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-bold">
      <FileCheck2 className="h-5 w-5 text-amber" aria-hidden />
      Resume Analyzer
    </span>
  );
}
