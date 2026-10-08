import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from './constants';

/** Returns an error message, or null when the file is acceptable. */
export function validateResumeFile(file: File): string | null {
  const looksLikePdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!looksLikePdf) return 'Only PDF files are supported. Export your resume as a PDF and try again.';
  if (file.size === 0) return 'This file is empty. Choose a different PDF.';
  if (file.size > MAX_FILE_SIZE_BYTES) return `This file is larger than ${MAX_FILE_SIZE_MB} MB. Compress it or remove images.`;
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
