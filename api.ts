import axios, { AxiosError } from 'axios';
import type { APIResponse, ErrorState, ResumeAnalysis } from '../types';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  timeout: 90_000, // AI calls can be slow
});

/** Thrown by the service layer; carries a UI-ready ErrorState. */
export class AnalyzeError extends Error {
  constructor(public readonly state: ErrorState) {
    super(state.message);
    this.name = 'AnalyzeError';
  }
}

function toErrorState(err: unknown): ErrorState {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<APIResponse<never>>;

    if (e.code === 'ECONNABORTED') {
      return {
        kind: 'network',
        title: 'The request timed out',
        message: 'The analysis took too long. Check your connection and try again.',
      };
    }
    if (!e.response) {
      return {
        kind: 'network',
        title: "Can't reach the server",
        message: 'Check your internet connection. If it is fine, the server may be waking up; retry in a few seconds.',
      };
    }

    const body = e.response.data;
    const apiError = body && 'success' in body && !body.success ? body.error : undefined;
    const status = e.response.status;
    const code = apiError?.code;
    const message = apiError?.message ?? 'Something went wrong. Please try again.';

    if (status === 429) return { kind: 'server', title: 'Too many requests', message, code };
    if (code?.startsWith('OPENAI') || code?.startsWith('AI_'))
      return { kind: 'ai', title: 'The AI service had a problem', message, code };
    if (status >= 400 && status < 500)
      return { kind: 'validation', title: 'We could not process your input', message, code };
    return { kind: 'server', title: 'Server error', message, code };
  }
  return { kind: 'unknown', title: 'Unexpected error', message: 'Something went wrong. Please try again.' };
}

export async function analyzeResume(file: File, jobDescription: string): Promise<ResumeAnalysis> {
  const form = new FormData();
  form.append('resume', file);
  form.append('jobDescription', jobDescription);

  try {
    const { data } = await http.post<APIResponse<ResumeAnalysis>>('/api/analyze', form);
    if (!data.success) {
      throw new AnalyzeError({ kind: 'server', title: 'Analysis failed', message: data.error.message, code: data.error.code });
    }
    return data.data;
  } catch (err) {
    if (err instanceof AnalyzeError) throw err;
    throw new AnalyzeError(toErrorState(err));
  }
}
