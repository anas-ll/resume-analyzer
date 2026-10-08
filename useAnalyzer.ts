import { useCallback, useState } from 'react';
import { AnalyzeError, analyzeResume } from './api';
import { toATSResult } from './result';
import type { AnalyzerStatus, ATSResult, ErrorState } from './types';

export function useAnalyzer() {
  const [status, setStatus] = useState<AnalyzerStatus>('idle');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);

  const analyze = useCallback(async (file: File, jobDescription: string) => {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      const analysis = await analyzeResume(file, jobDescription);
      setResult(toATSResult(analysis));
      setStatus('success');
    } catch (err) {
      setError(
        err instanceof AnalyzeError
          ? err.state
          : { kind: 'unknown', title: 'Unexpected error', message: 'Something went wrong. Please try again.' }
      );
      setStatus('error');
    }
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setStatus('idle');
  }, []);

  return { status, result, error, analyze, dismissError, reset, isLoading: status === 'loading' };
}
