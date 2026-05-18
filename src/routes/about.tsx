import { createFileRoute, Link } from '@tanstack/react-router'
import { Brain, Github, Globe, Zap, Shield, BookOpen, Code2, Heart, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const pillars = [
  {
    icon: <Brain size={20} />,
    title: 'AI Engineering Lab',
    desc: 'A hands-on environment for experimenting with AI models, prompts, and multi-provider architectures. Built for engineers who want to go beyond chat interfaces.',
    color: 'var(--neon-cyan)',
  },
  {
    icon: <Zap size={20} />,
    title: 'Offline AI Experimentation',
    desc: 'MindStack AI supports fully offline operation through Ollama. Run LLaMA, Mistral, and other open models locally with zero data leaving your machine.',
    color: 'var(--neon-purple)',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Educational Platform',
    desc: 'From ML basics to transformer architecture — interactive lessons, visual explanations, and real code examples that help you build genuine AI understanding.',
    color: 'var(--neon-green)',
  },
  {
    icon: <Shield size={20} />,
    title: 'Security Learning',
    desc: 'An ethical cybersecurity lab with tools for learning hash functions, password security, Linux commands, and network fundamentals. Always educational.',
    color: 'var(--neon-pink)',
  },
]

const techStack = [
  { name: 'TanStack Start', role: 'Full-stack React framework', url: '#' },
  { name: 'TanStack Router', role: 'Type-safe file-based routing', url: '#' },
  { name: 'TanStack AI', role: 'Multi-provider AI orchestration', url: '#' },
  { name: 'Anthropic Claude', role: 'Primary AI provider', url: '#' },
  { name: 'Tailwind CSS v4', role: 'Utility-first styling', url: '#' },
  { name: 'Netlify', role: 'Deployment and edge functions', url: '#' },
  { name: 'Vite 7', role: 'Build tooling', url: '#' },
  { name: 'TypeScript 5.7', role: 'Type safety across the stack', url: '#' },
]

function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="ai-orb flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
              <Brain size={32} color="rgba(0,245,255,0.9)" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">MindStack AI</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            An open-source AI engineering lab built for developers, learners, and AI enthusiasts who want more than a chat interface.
          </p>
        </div>

        {/* Mission statement */}
        <div className="glass-card p-8 mb-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.05) 0%, transparent 70%)' }} />
          <div className="relative">
            <div className="text-xs font-mono mb-3" style={{ color: 'var(--neon-cyan)' }}>// MISSION</div>
            <blockquote className="text-xl font-medium leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--text-primary)' }}>
              "To democratize AI engineering by providing a unified, open-source platform where anyone can experiment with large language models, learn cybersecurity fundamentals, and build AI-powered tools — all from a single, offline-capable environment."
            </blockquote>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {pillars.map((p) => (
            <div key={p.title} className="glass-card tool-card p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${p.color}12`, border: `1px solid ${p.color}25`, color: p.color }}>
                {p.icon}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mb-14">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Code2 size={18} style={{ color: 'var(--neon-cyan)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Technology Stack</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(0,245,255,0.02)', border: '1px solid rgba(0,245,255,0.08)' }}>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{tech.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{tech.role}</div>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Open source CTA */}
        <div className="glass-card p-8 mb-12 text-center"
          style={{ borderColor: 'rgba(176,68,255,0.2)' }}>
          <Github size={32} className="mx-auto mb-4" style={{ color: 'var(--neon-purple)' }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Open Source Inspired</h2>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            MindStack AI is built with open-source technologies and an open-source spirit.
            Contributions, feedback, and forks are welcome.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="btn-neon btn-neon-purple">
              <Github size={15} />
              View on GitHub
            </a>
            <Link to="/learn" className="btn-neon btn-neon-cyan">
              <BookOpen size={15} />
              Read the Docs
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart size={14} style={{ color: 'var(--neon-pink)' }} />
            <span>Built with love for the AI engineering community</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <span className="flex items-center gap-1"><Globe size={12} /> Deployed on Netlify</span>
            <span className="flex items-center gap-1"><Brain size={12} /> Powered by Claude + TanStack AI</span>
            <span className="flex items-center gap-1"><Shield size={12} /> Educational use only</span>
          </div>
        </div>
      </div>
    </div>
  )
}
