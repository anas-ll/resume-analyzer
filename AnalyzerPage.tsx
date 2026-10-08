import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles } from 'lucide-react';
import FileDropzone from '../components/FileDropzone';
import JobDescriptionField from '../components/JobDescriptionField';
import LoadingPanel from '../components/LoadingPanel';
import ErrorAlert from '../components/ErrorAlert';
import ResultsDashboard from '../components/ResultsDashboard';
import { useAnalyzer } from '../hooks/useAnalyzer';
import { MAX_JOB_DESCRIPTION_CHARS, MIN_JOB_DESCRIPTION_CHARS } from '../utils/constants';
import type { AnalyzeFormValues, UploadState } from '../types';

export default function AnalyzerPage() {
  const { status, result, error, analyze, dismissError, reset, isLoading } = useAnalyzer();
  const [upload, setUpload] = useState<UploadState>({ file: null, error: null });
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm<AnalyzeFormValues>({ defaultValues: { jobDescription: '' } });

  const jdLength = watch('jobDescription')?.length ?? 0;

  useEffect(() => {
    if (status === 'success') resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [status]);

  const onSubmit = handleSubmit(({ jobDescription }) => {
    if (!upload.file) {
      setUpload({ file: null, error: 'Upload your resume as a PDF to continue.' });
      return;
    }
    void analyze(upload.file, jobDescription.trim());
  });

  const startOver = () => {
    reset();
    resetForm();
    setUpload({ file: null, error: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'success' && result) {
    return (
      <div ref={resultsRef} className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6">
        <ResultsDashboard result={result} onReset={startOver} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Analyze your resume</h1>
      <p className="mt-2 text-muted">Add your resume and the job you are applying for.</p>

      <div className="mt-8 space-y-6">
        {error && <ErrorAlert error={error} onDismiss={dismissError} />}

        {isLoading ? (
          <LoadingPanel />
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            <FileDropzone value={upload} onChange={setUpload} disabled={isLoading} />

            <JobDescriptionField
              length={jdLength}
              error={errors.jobDescription}
              disabled={isLoading}
              registration={register('jobDescription', {
                required: 'Paste the job description to continue.',
                minLength: {
                  value: MIN_JOB_DESCRIPTION_CHARS,
                  message: `Add more detail: at least ${MIN_JOB_DESCRIPTION_CHARS} characters.`,
                },
                maxLength: {
                  value: MAX_JOB_DESCRIPTION_CHARS,
                  message: `Shorten it to ${MAX_JOB_DESCRIPTION_CHARS.toLocaleString()} characters or fewer.`,
                },
                validate: (v) => v.trim().length >= MIN_JOB_DESCRIPTION_CHARS || 'Paste the job description to continue.',
              })}
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-amber/90 sm:w-auto"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Analyze resume
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
