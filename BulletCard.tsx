import type { LucideIcon } from 'lucide-react';

interface BulletCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  tone: 'mint' | 'coral';
}

export default function BulletCard({ title, icon: Icon, items, tone }: BulletCardProps) {
  const color = tone === 'mint' ? 'text-mint' : 'text-coral';
  return (
    <section className="rounded-lg border border-line bg-surface p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <Icon className={`h-5 w-5 ${color}`} aria-hidden />
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'mint' ? 'bg-mint' : 'bg-coral'}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
