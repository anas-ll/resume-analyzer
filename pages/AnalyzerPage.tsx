import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { FileText } from 'lucide-react';

interface ResumeAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  matchingSkills: string[];
  recommendations: string[];
  improvedSummary: string;
  hiringReadiness: string;
}

interface AnalysisResponse {
  success: boolean;
  data?: ResumeAnalysis;
  error?: { message?: string };
}

const apiUrl = import.meta.env.VITE_API_URL?.trim() || (import.meta.env.DEV ? 'http://localhost:5000' : '');

export default function AnalyzerPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!resume || !resume.name.toLowerCase().endsWith('.pdf') || (resume.type && resume.type !== 'application/pdf')) {
      setError('Choose a PDF resume.');
      return;
    }
    if (resume.size === 0 || resume.size > 5 * 1024 * 1024) {
      setError('Choose a non-empty PDF no larger than 5 MB.');
      return;
    }
    const description = jobDescription.trim();
    if (description.length < 50 || description.length > 8000) {
      setError('Enter a job description between 50 and 8,000 characters.');
      return;
    }
    if (!apiUrl) {
      setError('The analysis service is not configured.');
      return;
    }
    setIsLoading(true);
    setAnalysis(null);
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', description);
    try {
      const response = await axios.post<AnalysisResponse>(`${apiUrl.replace(/\/$/, '')}/api/analyze`, formData, { timeout: 90000 });
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || 'The service did not return an analysis.');
      }
      setAnalysis(response.data.data);
    } catch (caughtError: unknown) {
      if (axios.isAxiosError<AnalysisResponse>(caughtError)) {
        setError(caughtError.response?.data?.error?.message || 'Could not reach the analysis service. Please try again.');
      } else {
        setError(caughtError instanceof Error ? caughtError.message : 'Analysis failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber">Your next application</p>
      <h1 className="mt-3 text-4xl font-semibold">Find your fit.</h1>
      <p className="mt-4 max-w-2xl text-muted">Add your resume and the role you're applying for. Get specific feedback before you hit send.</p>
      {!apiUrl && <p role="status" className="mt-6 rounded-lg border border-amber/40 bg-amber-dim p-4 text-sm text-amber">Analysis is currently unavailable. The site owner needs to configure VITE_API_URL with the backend address.</p>}
      <form onSubmit={handleSubmit} aria-busy={isLoading} className="mt-8 grid gap-6 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[1fr_1.5fr] md:p-8">
        <div>
          <label htmlFor="resume" className="block font-semibold">01 / Your resume</label>
          <div className="mt-3 rounded-xl border border-dashed border-line bg-ink p-6">
            <FileText aria-hidden="true" className="mb-4 text-amber" size={28} />
            <input id="resume" name="resume" type="file" accept=".pdf,application/pdf" required disabled={isLoading} aria-describedby="resume-help" onChange={(event) => { setResume(event.target.files?.[0] ?? null); setAnalysis(null); setError(''); }} className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-raised file:px-3 file:py-2 file:text-fg" />
            <p id="resume-help" className="mt-3 text-sm text-muted">PDF only, up to 5 MB. Your file is sent to the analysis service when you submit.</p>
          </div>
        </div>
        <div>
          <label htmlFor="job-description" className="block font-semibold">02 / Job description</label>
          <textarea id="job-description" name="jobDescription" required minLength={50} maxLength={8000} rows={8} disabled={isLoading} value={jobDescription} onChange={(event) => { setJobDescription(event.target.value); setAnalysis(null); setError(''); }} aria-describedby="description-help" placeholder="Paste the responsibilities, requirements, and skills for the role…" className="mt-3 block w-full resize-y rounded-xl border border-line bg-ink p-4 text-sm leading-relaxed placeholder:text-muted" />
          <p id="description-help" className="mt-2 text-sm text-muted">50–8,000 characters · {jobDescription.length.toLocaleString()} entered</p>
        </div>
        <div className="md:col-span-2">
          {error && <p role="alert" className="mb-4 rounded-lg border border-coral/40 p-4 text-sm text-coral">{error}</p>}
          <button type="submit" disabled={isLoading || !apiUrl} className="rounded-lg bg-amber px-6 py-3 font-semibold text-ink transition-colors hover:bg-amber/90 disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? 'Analyzing your resume…' : 'Analyze resume'}</button>
          <p className="mt-3 text-sm text-muted">Only upload documents you're comfortable sharing with an AI analysis service.</p>
        </div>
      </form>
      {isLoading && <div role="status" aria-live="polite" className="mt-8 rounded-2xl border border-line bg-surface p-8"><p className="text-muted">Comparing your experience with the role. This may take a moment.</p><div aria-hidden="true" className="mt-5 h-20 animate-pulse rounded-lg bg-raised" /></div>}
      {analysis && (
        <section aria-label="Analysis results" aria-live="polite" className="mt-10 space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-8">
            <h2 className="text-2xl font-semibold">Your resume match</h2>
            <p className="mt-4 text-5xl font-semibold text-amber">{Math.round(Math.min(100, Math.max(0, analysis.atsScore)))}<span className="text-lg text-muted"> / 100</span></p>
            <p className="mt-4 text-muted">{analysis.hiringReadiness}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {([
              ['Strengths', analysis.strengths],
              ['Areas to improve', analysis.weaknesses],
              ['Matching skills', analysis.matchingSkills],
              ['Missing skills', analysis.missingSkills],
              ['Recommendations', analysis.recommendations],
            ] as [string, string[]][]).map(([title, items]) => (
              <article key={title} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="text-xl font-semibold">{title}</h3>
                {items?.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">{items.map((item, index) => <li key={`${title}-${index}`}>{item}</li>)}</ul> : <p className="mt-4 text-sm text-muted">None reported.</p>}
              </article>
            ))}
          </div>
          <article className="rounded-xl border border-line bg-surface p-6"><h3 className="text-xl font-semibold">Suggested professional summary</h3><p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted">{analysis.improvedSummary}</p></article>
        </section>
      )}
    </section>
  );
}
