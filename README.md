# AI Resume Analyzer

Upload a resume (PDF), paste a job description, and get an AI-generated ATS analysis: a match score, matching and missing skills, ranked recommendations, and a rewritten professional summary.

![Home page](docs/screenshots/home.png)
![Analyzer](docs/screenshots/analyzer.png)
![Results](docs/screenshots/results.png)

> Replace the placeholders in `docs/screenshots/` with your own screenshots.

## Features

- Drag-and-drop PDF upload with client and server validation
- ATS score (0-100) with a visual gauge
- Strengths, weaknesses, matching skills, missing skills
- Recommendations ordered by impact
- Rewritten, job-tailored professional summary (one-click copy)
- Hiring readiness rating
- Dark, responsive, keyboard-accessible UI
- Typed end to end on the client; validated and normalized AI output on the server

## Tech stack

| Layer    | Tools |
|----------|-------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Axios, React Hook Form, React Router, Lucide |
| Backend  | Node.js (ESM), Express, Multer, pdf-parse, OpenAI SDK, Helmet, express-rate-limit |
| Hosting  | Vercel (frontend), Render (backend) |

## Project structure

```
ai-resume-analyzer/
├── render.yaml
├── backend/
│   ├── server.js                  # Entry point, graceful shutdown
│   ├── .env.example
│   └── src/
│       ├── app.js                 # Express app: helmet, CORS, rate limit, routes
│       ├── config/env.js          # Typed, validated environment config
│       ├── routes/                # URL -> controller wiring
│       ├── controllers/           # HTTP layer: validate input, shape response
│       ├── services/
│       │   ├── pdf.service.js     # PDF signature check + text extraction
│       │   ├── prompt.js          # System and user prompts
│       │   └── openai.service.js  # OpenAI call, error mapping, output normalization
│       ├── middleware/            # upload (Multer), error handler
│       └── utils/                 # AppError, sanitizeText
└── frontend/
    ├── index.html, vite.config.ts, tailwind.config.js, vercel.json
    └── src/
        ├── pages/                 # HomePage, AnalyzerPage, NotFoundPage
        ├── components/            # Navbar, Hero, FileDropzone, ScoreCard, ResultsDashboard, ...
        ├── hooks/useAnalyzer.ts   # Async state machine: idle | loading | success | error
        ├── services/api.ts        # Axios client + error translation
        ├── types/index.ts         # ResumeAnalysis, ATSResult, APIResponse, UploadState, ErrorState
        └── utils/                 # constants, validation, result mapping
```

**Layering.** Routes call controllers, controllers call services, and services hold the logic (PDF parsing, prompting, normalization). On the client, pages compose presentational components, `useAnalyzer` owns async state, and `services/api.ts` is the only file that knows about HTTP.

## Installation

Prerequisites: Node.js 18.17+ and an [OpenAI API key](https://platform.openai.com/api-keys).

```bash
git clone https://github.com/<your-username>/ai-resume-analyzer.git
cd ai-resume-analyzer

# Backend
cd backend
npm install
cp .env.example .env        # then set OPENAI_API_KEY

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
```

## Environment variables

**backend/.env**

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | required | Your OpenAI key. Never commit it. |
| `OPENAI_MODEL` | `gpt-4o-mini` | Any chat model that supports JSON mode |
| `OPENAI_TIMEOUT_MS` | `60000` | Per-request timeout |
| `PORT` | `5000` | Server port |
| `CORS_ORIGINS` | `http://localhost:5173` | Comma-separated allowed origins |
| `MAX_FILE_SIZE_MB` | `5` | Upload limit |
| `MAX_JOB_DESCRIPTION_CHARS` | `8000` | Input cap |
| `MAX_RESUME_CHARS` | `15000` | Extracted text cap sent to the model |

**frontend/.env**

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000` | Backend base URL |

## Local development

```bash
# Terminal 1
cd backend && npm run dev     # http://localhost:5000

# Terminal 2
cd frontend && npm run dev    # http://localhost:5173
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck` (frontend); `npm start` (backend).

## API documentation

### `GET /api/health`

```json
{ "success": true, "data": { "status": "ok", "uptime": 123.4 } }
```

### `POST /api/analyze`

`multipart/form-data`

| Field | Type | Notes |
|-------|------|-------|
| `resume` | file | PDF, up to `MAX_FILE_SIZE_MB` |
| `jobDescription` | string | 50 to 8000 characters |

**200**

```json
{
  "success": true,
  "data": {
    "atsScore": 85,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "missingSkills": ["..."],
    "matchingSkills": ["..."],
    "recommendations": ["..."],
    "improvedSummary": "...",
    "hiringReadiness": "Almost Ready - ..."
  }
}
```

**Errors** share one shape: `{ "success": false, "error": { "code": "...", "message": "..." } }`

| Status | Code | Cause |
|--------|------|-------|
| 400 | `MISSING_FILE` | No resume uploaded |
| 400 | `MISSING_JOB_DESCRIPTION`, `JOB_DESCRIPTION_TOO_SHORT` | Missing or too short |
| 400 | `INVALID_FILE_TYPE`, `INVALID_PDF` | Not a PDF (MIME, extension, or file signature) |
| 413 | `FILE_TOO_LARGE` | Over the size limit |
| 422 | `PDF_PARSE_FAILED`, `PDF_NO_TEXT` | Corrupt, encrypted, or image-only PDF |
| 429 | `RATE_LIMITED` | 20 requests per 15 minutes per IP |
| 502/503/504 | `OPENAI_*`, `AI_BAD_RESPONSE` | Upstream AI problems |

## Security

- API key lives only in server environment variables
- Helmet headers, CORS allow-list, per-IP rate limiting
- Uploads held in memory only, size-limited, validated by MIME, extension, and `%PDF-` signature
- Text inputs stripped of control characters and length-capped
- Prompt treats resume and job text as untrusted data to reduce prompt injection
- AI output is parsed and normalized (clamped score, string-only arrays) before reaching the client

## Deployment

### Frontend on Netlify

The frontend files in this repository are at the repository root. Leave the
base directory empty, use `npm run build` as the build command, and publish
`dist`. The root `index.html` loads `main.tsx`, and `public/_redirects` supports
direct navigation to client-side routes such as `/analyze`.

Set `VITE_API_URL` to the separately deployed backend's base URL and include the
Netlify site's origin in the backend's `CORS_ORIGINS` setting. Rebuild the
frontend after changing `VITE_API_URL`. Without a configured backend URL, the
production frontend displays an availability notice and disables analysis
submission instead of sending requests to localhost. Local development uses
`http://localhost:5000` when `VITE_API_URL` is not set.

### Backend on Render

1. Push the repo to GitHub.
2. In Render: **New > Blueprint** and select the repo (it reads `render.yaml`), or **New > Web Service** with root directory `backend`, build `npm install`, start `npm start`.
3. Set `OPENAI_API_KEY` and `CORS_ORIGINS` (your Vercel URL, no trailing slash).
4. Deploy and note the URL, for example `https://ai-resume-analyzer-api.onrender.com`.

Free Render instances sleep when idle, so the first request can take about 30 seconds.

### Frontend on Vercel

1. **Add New > Project**, import the repo, set **Root Directory** to `frontend`.
2. Framework preset: Vite. Build `npm run build`, output `dist`.
3. Add `VITE_API_URL` set to your Render URL.
4. Deploy. `vercel.json` handles client-side routing.
5. Add the Vercel URL to `CORS_ORIGINS` on Render and redeploy the backend.

## GitHub setup

```bash
git init
git add .
git commit -m "feat: AI Resume Analyzer"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-resume-analyzer.git
git push -u origin main
```

## Future improvements

- OCR for scanned PDFs, plus DOCX support
- Streaming responses for faster perceived speed
- Zod schemas shared between client and server
- Unit tests (Vitest, Supertest) and CI with GitHub Actions
- Save and compare analyses over time (auth + database)
- Multiple job descriptions per resume, and cover letter generation
- Export the report as PDF
- Redis-backed rate limiting and response caching
- i18n and a light theme

## License

MIT
