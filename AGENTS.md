# AGENTS.md

Project overview for AI agents and developers working on MindStack AI.

## Architecture

TanStack Start (React 19 + Vite 7) with file-based routing. The app is a single-page application deployed on Netlify with server-side API routes for AI streaming.

## Directory Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Fixed top nav with mobile menu, dark/light toggle
│   └── ParticleBackground.tsx  # Canvas particle animation (fixed, z-0)
├── lib/
│   ├── ai-hook.ts          # useAIChat hook wrapping TanStack AI's useChat
│   └── weather-tools.ts    # TanStack AI tool definition for getWeather
├── routes/
│   ├── __root.tsx          # Root layout: HTML shell, Navbar, ParticleBackground
│   ├── index.tsx           # Home page: hero, feature cards, stats
│   ├── chat.tsx            # AI Chat: sidebar + streaming chat UI
│   ├── tools.tsx           # AI Tools: tool cards with modal dialogs
│   ├── cyber-lab.tsx       # Cyber Lab: hash demo, password checker, linux cmds
│   ├── learn.tsx           # Learn AI: expandable learning modules
│   ├── about.tsx           # About: mission, tech stack, open source info
│   └── api.chat.ts         # POST /api/chat: AI streaming endpoint
└── styles.css              # Global styles: Tailwind v4, cyberpunk theme vars
```

## Key Conventions

### Routing
- File = route. `chat.tsx` → `/chat`, `cyber-lab.tsx` → `/cyber-lab`
- API routes use `api.*.ts` naming (e.g., `api.chat.ts` → `/api/chat`)
- Root layout in `__root.tsx` must render `<Outlet />`

### Styling
- CSS custom properties in `:root` for theme tokens (`--neon-cyan`, `--bg-dark`, etc.)
- `[data-theme="light"]` overrides for light mode; toggled via `data-theme` on `<html>`
- Reusable CSS classes in `styles.css`: `.glass-card`, `.btn-neon`, `.terminal`, `.gradient-text`, `.ai-orb`
- Tailwind v4 utility classes inline; `@source` directive needed for third-party packages

### AI Integration
- `useAIChat()` in `src/lib/ai-hook.ts` — wraps TanStack AI's `useChat`
- API endpoint `/api/chat` in `src/routes/api.chat.ts` handles provider selection
- Provider fallback: Anthropic → OpenAI → Gemini → Ollama (env var detection)
- System prompt in `api.chat.ts` defines MindStack AI persona

### TypeScript
- Strict mode; `@/` path alias for `src/`
- Type-only imports with `import type`

## Non-Obvious Decisions

- `ParticleBackground` is `position: fixed` at `z-index: 0`; all content sits in a `z-10` wrapper
- The navbar dark/light toggle sets `data-theme` on `document.documentElement` — CSS variables handle theming without JS state for each component
- `clearMessages` in `useAIChat` maps to TanStack AI's `clear()` method
- Tool modals in `tools.tsx` use local simulated processing; connect to `/api/chat` for real AI results
- Hash generator in `cyber-lab.tsx` is a demo only — not cryptographically secure; documented in UI

## Environment Variables

```
ANTHROPIC_API_KEY      # Anthropic Claude (preferred)
OPENAI_API_KEY         # OpenAI GPT-4o
GOOGLE_GENERATIVE_AI_API_KEY  # Google Gemini
OLLAMA_BASE_URL        # Ollama local server (default: http://localhost:11434)
```
