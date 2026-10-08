import type { LucideIcon } from 'lucide-react';

interface SkillTagsProps {
  title: string;
  icon: LucideIcon;
  skills: string[];
  tone: 'mint' | 'coral';
  emptyText: string;
}

const TONE = {
  mint: { chip: 'border-mint/30 bg-mint-dim text-mint', icon: 'text-mint' },
  coral: { chip: 'border-coral/30 bg-coral-dim text-coral', icon: 'text-coral' },
};

export default function SkillTags({ title, icon: Icon, skills, tone, emptyText }: SkillTagsProps) {
  return (
    <section className="rounded-lg border border-line bg-surface p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <Icon className={`h-5 w-5 ${TONE[tone].icon}`} aria-hidden />
        {title}
        <span className="text-sm font-normal text-muted">({skills.length})</span>
      </h3>
      {skills.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className={`rounded-full border px-3 py-1 text-sm ${TONE[tone].chip}`}>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
