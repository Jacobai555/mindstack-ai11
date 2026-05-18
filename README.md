# MindStack AI

**Offline AI Engineering Lab and Intelligent Assistant Platform**

A modern, futuristic web application that combines AI chat, developer tools, cybersecurity education, and AI learning resources in a single polished interface.

## Features

- **AI Chat** — ChatGPT-style interface with multi-provider AI support (Anthropic Claude, OpenAI, Google Gemini, Ollama)
- **AI Tools** — Prompt Enhancer, Code Explainer, Linux Command Helper, Text Summarizer, AI Notes, Cybersecurity Assistant
- **Cyber Lab** — Educational terminal with hash generator demo, password strength checker, Linux command reference, and security learning cards
- **Learn AI** — Interactive modules covering AI fundamentals, machine learning, neural networks, transformers, AI agents, and offline models
- **About** — Platform overview and technology stack

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start |
| Routing | TanStack Router v1 (file-based) |
| AI | TanStack AI + Anthropic / OpenAI / Gemini / Ollama |
| Styling | Tailwind CSS v4 |
| Build | Vite 7 |
| Deployment | Netlify |
| Language | TypeScript 5.7 (strict) |

## Running Locally

```bash
# Install dependencies
npm install

# Set AI provider environment variable (at least one)
export ANTHROPIC_API_KEY=your_key_here
# or OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or OLLAMA_BASE_URL

# Start development server
npm run dev
# App runs at http://localhost:3000
```

## AI Provider Setup

The app automatically selects the best available provider:

1. **Anthropic Claude** (preferred) — set `ANTHROPIC_API_KEY`
2. **OpenAI GPT-4o** — set `OPENAI_API_KEY`
3. **Google Gemini** — set `GOOGLE_GENERATIVE_AI_API_KEY`
4. **Ollama (local/offline)** — install [Ollama](https://ollama.com) and run `ollama serve`

## Deployment

Configured for Netlify. Push to GitHub and connect the repo in Netlify dashboard, or use the Netlify CLI:

```bash
netlify deploy --prod
```

## Design

- Dark mode default with cyberpunk / AI aesthetic
- Glassmorphism panels with neon glow effects
- Particle animation background
- Floating AI orb animation
- Dark/light mode toggle in navbar
- Mobile-first responsive design
