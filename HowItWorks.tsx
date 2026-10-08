import { ClipboardPaste, FileUp, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: FileUp, title: 'Upload your resume', text: 'Drop a PDF. Text is extracted on the server and never stored.' },
  { icon: ClipboardPaste, title: 'Paste the job description', text: 'The more complete the posting, the sharper the keyword match.' },
  { icon: Sparkles, title: 'Get a tailored analysis', text: 'Score, skill gaps, ranked fixes, and a summary written for that role.' },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">How it works</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-raised text-amber">
                <Icon className="h-5 w-5" aria-hidden />
                <span className="sr-only">Step {i + 1}</span>
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
