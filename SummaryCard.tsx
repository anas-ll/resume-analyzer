import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: ignore */
    }
  };

  return (
    <section className="rounded-lg border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold">Rewritten professional summary</h3>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm text-fg/80 hover:border-muted hover:text-fg"
        >
          {copied ? <Check className="h-4 w-4 text-mint" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? 'Copied' : 'Copy summary'}
        </button>
      </div>
      <p className="mt-4 max-w-prose rounded-md border-l-2 border-amber bg-raised p-4 text-[15px] leading-relaxed">
        {summary || 'No summary was generated.'}
      </p>
    </section>
  );
}
