import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { MAX_JOB_DESCRIPTION_CHARS } from './constants';
interface JobDescriptionFieldProps {
  registration: UseFormRegisterReturn;
  error?: FieldError;
  length: number;
  disabled?: boolean;
}

export default function JobDescriptionField({ registration, error, length, disabled }: JobDescriptionFieldProps) {
  return (
    <div>
      <label htmlFor="job-description" className="mb-2 block text-sm font-medium">
        Job description
      </label>
      <textarea
        id="job-description"
        rows={11}
        disabled={disabled}
        placeholder="Paste the full job posting, including responsibilities and requirements."
        aria-invalid={!!error}
        aria-describedby="jd-meta"
        className={`w-full resize-y rounded-lg border bg-surface p-4 text-sm leading-relaxed placeholder:text-muted/70 disabled:opacity-60 ${
          error ? 'border-coral' : 'border-line focus:border-muted'
        }`}
        {...registration}
      />
      <div id="jd-meta" className="mt-2 flex justify-between gap-4 text-xs">
        <span className={error ? 'text-coral' : 'text-transparent'} role={error ? 'alert' : undefined}>
          {error?.message ?? '.'}
        </span>
        <span className="text-muted">
          {length.toLocaleString()} / {MAX_JOB_DESCRIPTION_CHARS.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
