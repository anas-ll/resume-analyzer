import { useCallback, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import { FileText, UploadCloud, X } from 'lucide-react';
import { formatFileSize, validateResumeFile } from './validation';
import { MAX_FILE_SIZE_MB } from './constants';
import type { UploadState } from './types';
``
interface FileDropzoneProps {
  value: UploadState;
  onChange: (state: UploadState) => void;
  disabled?: boolean;
}

export default function FileDropzone({ value, onChange, disabled }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      const error = validateResumeFile(file);
      onChange(error ? { file: null, error } : { file, error: null });
    },
    [onChange]
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) handleFile(e.dataTransfer.files[0]);
  };

  const openPicker = () => !disabled && inputRef.current?.click();
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPicker();
    }
  };

  const clear = () => {
    onChange({ file: null, error: null });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium" htmlFor="resume-input">
        Resume (PDF)
      </label>

      {value.file ? (
        <div className="flex items-center gap-3 rounded-lg border border-mint/40 bg-mint-dim p-4">
          <FileText className="h-6 w-6 shrink-0 text-mint" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{value.file.name}</p>
            <p className="text-xs text-muted">{formatFileSize(value.file.size)}</p>
          </div>
          <button
            type="button"
            onClick={clear}
            disabled={disabled}
            className="h-8 w-8 rounded-md text-fg/70 hover:bg-white/5 hover:text-fg disabled:opacity-50"
            aria-label="Remove file"
          >
            <X className="mx-auto h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-describedby="resume-hint"
          onClick={openPicker}
          onKeyDown={onKeyDown}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging ? 'border-amber bg-amber-dim' : 'border-line bg-surface hover:border-muted'
          } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        >
          <UploadCloud className="h-8 w-8 text-amber" aria-hidden />
          <p className="text-sm">
            <span className="font-semibold">Drop your resume here</span>
            <span className="text-muted"> or click to browse</span>
          </p>
          <p id="resume-hint" className="text-xs text-muted">
            PDF with selectable text, up to {MAX_FILE_SIZE_MB} MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        id="resume-input"
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        tabIndex={-1}
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value.error && (
        <p className="mt-2 text-sm text-coral" role="alert">
          {value.error}
        </p>
      )}
    </div>
  );
}
