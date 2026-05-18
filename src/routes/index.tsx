import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Brain, MessageSquare, Wrench, Shield, BookOpen, Cpu,
  ChevronRight, Zap, Globe, Lock, Code2, Sparkles, ArrowRight
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const features = [
  {
    icon: <MessageSquare size={22} />,
    title: 'AI Chat',
    desc: 'ChatGPT-style interface powered by real AI. Multi-provider support with streaming responses.',
    color: 'var(--neon-cyan)',
    to: '/chat',
  },
  {
    icon: <Wrench size={22} />,
    title: 'AI Tools',
    desc: 'Prompt enhancer, code explainer, text summarizer, and more specialized AI tools.',
    color: 'var(--neon-purple)',
    to: '/tools',
  },
  {
    icon: <Shield size={22} />,
    title: 'Cyber Lab',
    desc: 'Educational cybersecurity terminal with hash generators, Linux commands, and networking basics.',
    color: 'var(--neon-green)',
    to: '/cyber-lab',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Learn AI',
    desc: 'From fundamentals to transformers. Interactive lessons on ML, neural networks, and AI agents.',
    color: 'var(--neon-pink)',
    to: '/learn',
  },
]

const stats = [
  { label: 'AI Providers', value: '4+' },
  { label: 'Tools Available', value: '12+' },
  { label: 'Learning Modules', value: '6' },
  { label: 'Open Source', value: '100%' },
]

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center grid-bg">
        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.06) 0%, rgba(176,68,255,0.04) 40%, transparent 70%)'
        }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: 'var(--neon-cyan)' }}>
            <Sparkles size={12} />
            <span>AI Engineering Lab v1.0</span>
            <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
          </div>

          {/* Orb */}
          <div className="flex justify-center mb-8">
            <div className="ai-orb flex items-center justify-center">
              <Brain size={48} color="rgba(0,245,255,0.9)" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">MindStack AI</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
            Offline AI Engineering Lab and Intelligent Assistant Platform
          </p>
          <p className="text-sm sm:text-base max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-muted)' }}>
            Explore cutting-edge AI capabilities, build with multiple AI providers, learn cybersecurity,
            and master machine learning — all in one futuristic platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/chat" className="btn-neon btn-neon-solid">
              <Zap size={16} />
              Launch AI
            </Link>
            <Link to="/tools" className="btn-neon btn-neon-cyan">
              <Wrench size={16} />
              Explore Tools
            </Link>
            <Link to="/learn" className="btn-neon btn-neon-purple">
              <BookOpen size={16} />
              Learn AI
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <ChevronRight size={20} style={{ transform: 'rotate(90deg)', color: 'var(--neon-cyan)' }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y" style={{ borderColor: 'rgba(0,245,255,0.06)', background: 'rgba(0,245,255,0.01)' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 section-title">Platform Features</h2>
          <p className="text-center text-sm mt-6 mb-12" style={{ color: 'var(--text-muted)' }}>
            Everything you need to explore, build, and learn with AI
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link key={f.title} to={f.to} className="glass-card tool-card p-6 group no-underline">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: f.color }}>
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech highlight */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: 'var(--neon-cyan)' }}>// AI PROVIDERS</div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Multi-Provider AI Architecture
              </h2>
              <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
                MindStack AI intelligently routes your queries to the best available AI provider.
                Seamless fallback chain ensures you always get a response.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Anthropic Claude', badge: 'Preferred', color: 'var(--neon-cyan)' },
                  { label: 'OpenAI GPT-4o', badge: 'Fallback', color: 'var(--neon-purple)' },
                  { label: 'Google Gemini', badge: 'Fallback', color: 'var(--neon-green)' },
                  { label: 'Ollama (Local)', badge: 'Offline', color: 'var(--neon-pink)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                <div className="terminal-dot" style={{ background: '#febc2e' }} />
                <div className="terminal-dot" style={{ background: '#28c840' }} />
                <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>mindstack-ai ~ terminal</span>
              </div>
              <div className="terminal-body text-xs">
                <div className="terminal-prompt">initializing MindStack AI v1.0</div>
                <div style={{ color: '#64748b' }}>Checking providers...</div>
                <div style={{ color: 'var(--neon-green)' }}>✓ Anthropic connected</div>
                <div style={{ color: 'var(--neon-green)' }}>✓ OpenAI connected</div>
                <div style={{ color: 'var(--neon-green)' }}>✓ Gemini connected</div>
                <div style={{ color: 'var(--neon-purple)' }}>⟳ Ollama (local) ready</div>
                <div className="mt-2" style={{ color: '#64748b' }}>Loading tools...</div>
                <div style={{ color: 'var(--neon-green)' }}>✓ 12 tools loaded</div>
                <div className="mt-2 terminal-prompt" style={{ color: 'var(--neon-cyan)' }}>
                  System ready. Hello, Engineer. _
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 section-title">Start Exploring</h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {[
              { icon: <Cpu size={14} />, label: 'Cyber Lab', to: '/cyber-lab', color: 'var(--neon-green)' },
              { icon: <Code2 size={14} />, label: 'Code Explainer', to: '/tools', color: 'var(--neon-cyan)' },
              { icon: <Globe size={14} />, label: 'Learn Transformers', to: '/learn', color: 'var(--neon-purple)' },
              { icon: <Lock size={14} />, label: 'Password Checker', to: '/cyber-lab', color: 'var(--neon-pink)' },
              { icon: <Brain size={14} />, label: 'AI Agents', to: '/learn', color: 'var(--neon-cyan)' },
            ].map((item) => (
              <Link key={item.label} to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{
                  color: item.color,
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}25`,
                }}>
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t" style={{ borderColor: 'rgba(0,245,255,0.06)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain size={18} style={{ color: 'var(--neon-cyan)' }} />
            <span className="font-bold gradient-text">MindStack AI</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Open-source AI engineering platform · Educational use only
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-[var(--neon-cyan)] transition-colors">GitHub</a>
            <Link to="/about" className="hover:text-[var(--neon-cyan)] transition-colors">About</Link>
            <Link to="/learn" className="hover:text-[var(--neon-cyan)] transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
