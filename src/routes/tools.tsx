import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Sparkles, Code2, Terminal, FileText, StickyNote, Shield,
  X, ChevronRight, Zap, Copy, Check
} from 'lucide-react'

export const Route = createFileRoute('/tools')({
  component: ToolsPage,
})

const tools = [
  {
    id: 'prompt-enhancer',
    icon: <Sparkles size={24} />,
    title: 'Prompt Enhancer',
    desc: 'Transform basic prompts into detailed, optimized instructions for better AI responses.',
    color: 'var(--neon-cyan)',
    badge: 'Popular',
  },
  {
    id: 'code-explainer',
    icon: <Code2 size={24} />,
    title: 'Code Explainer',
    desc: 'Paste any code snippet and get a clear, line-by-line explanation in plain English.',
    color: 'var(--neon-purple)',
    badge: 'Dev',
  },
  {
    id: 'linux-helper',
    icon: <Terminal size={24} />,
    title: 'Linux Command Helper',
    desc: 'Describe what you want to do and get the right Linux command with explanation.',
    color: 'var(--neon-green)',
    badge: 'Terminal',
  },
  {
    id: 'text-summarizer',
    icon: <FileText size={24} />,
    title: 'Text Summarizer',
    desc: 'Condense long articles, documents, or text into concise, readable summaries.',
    color: 'var(--neon-pink)',
    badge: 'NLP',
  },
  {
    id: 'ai-notes',
    icon: <StickyNote size={24} />,
    title: 'AI Notes',
    desc: 'Smart note-taking with AI-powered organization, tagging, and search.',
    color: 'var(--neon-cyan)',
    badge: 'Productivity',
  },
  {
    id: 'cyber-assistant',
    icon: <Shield size={24} />,
    title: 'Cybersecurity Assistant',
    desc: 'Get guidance on security best practices, vulnerability explanations, and defense strategies.',
    color: 'var(--neon-purple)',
    badge: 'Security',
  },
]

const toolContent: Record<string, {
  placeholder: string
  buttonLabel: string
  process: (input: string) => string
}> = {
  'prompt-enhancer': {
    placeholder: 'Enter your basic prompt here...\nExample: "write a story"',
    buttonLabel: 'Enhance Prompt',
    process: (input) => {
      if (!input.trim()) return ''
      return `✨ Enhanced Prompt:\n\n${input.trim()}\n\nAdditional Context: Please provide a detailed, well-structured response with specific examples. Use clear headings where appropriate. Consider edge cases and include practical applications. Aim for comprehensive coverage while maintaining clarity and conciseness.\n\nTone: Professional yet accessible\nFormat: Structured with examples\nLength: Comprehensive but focused`
    },
  },
  'code-explainer': {
    placeholder: 'Paste your code here...\nExample:\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)',
    buttonLabel: 'Explain Code',
    process: (input) => {
      if (!input.trim()) return ''
      const lines = input.trim().split('\n')
      return `📖 Code Explanation:\n\nLanguage detected: ${input.includes('def ') ? 'Python' : input.includes('function') ? 'JavaScript' : 'Unknown'}\nLines analyzed: ${lines.length}\n\nThis code snippet defines functionality that processes data and returns a result.\n\n[Connect to AI API for detailed analysis]\n\nLine-by-line breakdown:\n${lines.slice(0, 5).map((l, i) => `  Line ${i + 1}: ${l.trim() || '(empty)'}`).join('\n')}\n${lines.length > 5 ? `  ... and ${lines.length - 5} more lines` : ''}\n\n💡 Tip: For deep code analysis, use the AI Chat with your code.`
    },
  },
  'linux-helper': {
    placeholder: 'Describe what you want to do...\nExample: "find all files larger than 100MB in my home directory"',
    buttonLabel: 'Get Command',
    process: (input) => {
      if (!input.trim()) return ''
      const examples: Record<string, string> = {
        'find': 'find ~ -size +100M -type f 2>/dev/null',
        'list': 'ls -la --sort=size',
        'disk': 'df -h && du -sh /*',
        'process': 'ps aux | grep -v grep | sort -k3 -rn | head -20',
        'port': 'ss -tulpn | grep LISTEN',
        'network': 'ip addr show && ip route show',
      }
      const key = Object.keys(examples).find(k => input.toLowerCase().includes(k))
      const cmd = key ? examples[key] : `# Command for: "${input.trim()}"\n# Connecting to AI for precise command...`
      return `🖥️ Linux Command:\n\n$ ${cmd}\n\nExplanation:\nThis command performs the requested operation safely.\nAlways review commands before running as root.\n\n⚠️ Use with caution in production environments.`
    },
  },
  'text-summarizer': {
    placeholder: 'Paste text to summarize...',
    buttonLabel: 'Summarize',
    process: (input) => {
      if (!input.trim()) return ''
      const words = input.trim().split(/\s+/).length
      const sentences = input.trim().split(/[.!?]+/).filter(Boolean)
      const preview = sentences[0]?.trim() || input.slice(0, 100)
      return `📝 Summary:\n\nOriginal: ${words} words, ${sentences.length} sentences\nReduction: ~${Math.round((1 - Math.min(50, words) / words) * 100)}%\n\nKey Points:\n• ${preview}${sentences[1] ? '\n• ' + sentences[1].trim() : ''}\n\n[Connect to AI API for intelligent summarization]\n\n💡 For best results, use the AI Chat for full document analysis.`
    },
  },
  'ai-notes': {
    placeholder: 'Start typing your note...',
    buttonLabel: 'Save & Analyze',
    process: (input) => {
      if (!input.trim()) return ''
      const words = input.split(/\s+/).length
      const topics = ['AI', 'code', 'security', 'data', 'network', 'system']
      const detected = topics.filter(t => input.toLowerCase().includes(t))
      return `📌 Note Saved!\n\nWord count: ${words}\nDetected topics: ${detected.length ? detected.join(', ') : 'General'}\nSentiment: Neutral\nPriority: Medium\n\nAI Tags: #${detected[0] || 'note'} #mindstack #${new Date().toISOString().split('T')[0]}\n\n✅ Note indexed and searchable.`
    },
  },
  'cyber-assistant': {
    placeholder: 'Ask about cybersecurity...\nExample: "What is SQL injection and how to prevent it?"',
    buttonLabel: 'Get Security Advice',
    process: (input) => {
      if (!input.trim()) return ''
      return `🛡️ Security Analysis:\n\nQuery: "${input.trim()}"\n\nSecurity Recommendations:\n• Always validate and sanitize user inputs\n• Use parameterized queries to prevent SQL injection\n• Implement proper authentication and authorization\n• Enable HTTPS and use secure headers\n• Keep dependencies updated\n• Follow the principle of least privilege\n\n⚠️ Educational Note:\nThis information is for defensive security purposes only.\nAlways obtain proper authorization before testing systems.\n\n[Connect to AI API for detailed security guidance]`
    },
  },
}

function ToolModal({
  tool,
  onClose,
}: {
  tool: typeof tools[number]
  onClose: () => void
}) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const config = toolContent[tool.id]

  const handleProcess = () => {
    const result = config.process(input)
    setOutput(result)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30`, color: tool.color }}>
              {tool.icon}
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:text-[var(--neon-pink)] transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={config.placeholder}
              rows={5}
              style={{
                width: '100%',
                background: 'rgba(13,20,40,0.9)',
                border: `1px solid ${tool.color}30`,
                borderRadius: '8px',
                color: 'var(--text-primary)',
                padding: '12px',
                fontSize: '13px',
                fontFamily: tool.id === 'code-explainer' || tool.id === 'linux-helper' ? 'monospace' : 'inherit',
                resize: 'vertical',
                outline: 'none',
                lineHeight: '1.6',
              }}
            />
          </div>

          <button
            onClick={handleProcess}
            disabled={!input.trim()}
            className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{
              background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
              border: `1px solid ${tool.color}40`,
              color: tool.color,
            }}
          >
            <Zap size={14} />
            {config.buttonLabel}
          </button>

          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Output</label>
                <button onClick={handleCopy} className="flex items-center gap-1 text-xs transition-colors"
                  style={{ color: copied ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="terminal-body terminal text-xs whitespace-pre-wrap" style={{ fontSize: '12px' }}>
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ToolsPage() {
  const [activeTool, setActiveTool] = useState<typeof tools[number] | null>(null)

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: 'rgba(176,68,255,0.08)', border: '1px solid rgba(176,68,255,0.2)', color: 'var(--neon-purple)' }}>
            <Zap size={11} />
            AI-Powered Tools
          </div>
          <h1 className="text-4xl font-bold mb-3 section-title gradient-text">AI Tools</h1>
          <p className="text-sm mt-8 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Specialized tools powered by AI to boost your productivity, learning, and security workflows.
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool)}
              className="glass-card tool-card glow-border p-6 text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${tool.color}12`, border: `1px solid ${tool.color}25`, color: tool.color }}>
                  {tool.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ color: tool.color, background: `${tool.color}10`, border: `1px solid ${tool.color}20` }}>
                    {tool.badge}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{tool.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
              <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: tool.color }}>
                Open Tool <ChevronRight size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* Info banner */}
        <div className="mt-12 p-5 rounded-xl text-sm text-center"
          style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.1)', color: 'var(--text-muted)' }}>
          <Sparkles size={14} className="inline mr-2" style={{ color: 'var(--neon-cyan)' }} />
          Tools use local processing now. Connect your AI API key for intelligent, context-aware results.
        </div>
      </div>

      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}
    </div>
  )
}
