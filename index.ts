/** Raw analysis returned by the AI. Mirrors the backend contract. */
export interface ResumeAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  matchingSkills: string[];
  recommendations: string[];
  improvedSummary: string;
  hiringReadiness: string;
}

export type ScoreBand = 'weak' | 'partial' | 'strong';

/** Analysis enriched with values derived on the client for display. */
export interface ATSResult extends ResumeAnalysis {
  scoreBand: ScoreBand;
  readinessLabel: string;
  readinessReason: string;
}

export interface APIErrorBody {
  code: string;
  message: string;
}

export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: APIErrorBody };

export interface UploadState {
  file: File | null;
  error: string | null;
}

export type ErrorKind = 'validation' | 'network' | 'server' | 'ai' | 'unknown';

export interface ErrorState {
  kind: ErrorKind;
  title: string;
  message: string;
  code?: string;
}

export interface AnalyzeFormValues {
  jobDescription: string;
}

export type AnalyzerStatus = 'idle' | 'loading' | 'success' | 'error';
