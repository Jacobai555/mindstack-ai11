import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Terminal, Shield, Hash, Lock, Wifi, BookOpen, ChevronDown, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/cyber-lab')({
  component: CyberLabPage,
})

// Simple hash simulation (not cryptographic, for demo only)
function simpleHash(str: string, algo: string): string {
  if (!str) return ''
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  const prefixes: Record<string, number> = { MD5: 32, 'SHA-1': 40, 'SHA-256': 64, 'SHA-512': 128 }
  const len = prefixes[algo] || 64
  return (hex.repeat(Math.ceil(len / hex.length))).slice(0, len)
}

function checkPasswordStrength(pwd: string): {
  score: number; label: string; color: string; tips: string[]
} {
  const tips: string[] = []
  let score = 0
  if (pwd.length >= 12) score += 2; else if (pwd.length >= 8) score += 1; else tips.push('Use at least 12 characters')
  if (/[A-Z]/.test(pwd)) score += 1; else tips.push('Add uppercase letters')
  if (/[a-z]/.test(pwd)) score += 1; else tips.push('Add lowercase letters')
  if (/[0-9]/.test(pwd)) score += 1; else tips.push('Add numbers')
  if (/[^A-Za-z0-9]/.test(pwd)) score += 2; else tips.push('Add special characters (!@#$%)')
  if (!/(.)\1{2,}/.test(pwd)) score += 1; else tips.push('Avoid repeating characters')
  const label = score >= 7 ? 'Very Strong' : score >= 5 ? 'Strong' : score >= 3 ? 'Moderate' : score >= 1 ? 'Weak' : 'Very Weak'
  const color = score >= 7 ? '#00ff88' : score >= 5 ? '#00f5ff' : score >= 3 ? '#febc2e' : '#ff2d78'
  return { score, label, color, tips }
}

const linuxCommands = [
  { cmd: 'ls -la', desc: 'List all files with permissions and details', category: 'Files' },
  { cmd: 'chmod 755 file', desc: 'Set file permissions (rwxr-xr-x)', category: 'Permissions' },
  { cmd: 'find / -name "*.conf"', desc: 'Search for configuration files', category: 'Search' },
  { cmd: 'netstat -tulpn', desc: 'Show active network connections and ports', category: 'Network' },
  { cmd: 'ps aux | grep proc', desc: 'List running processes and filter', category: 'Process' },
  { cmd: 'tail -f /var/log/syslog', desc: 'Monitor system logs in real-time', category: 'Logs' },
  { cmd: 'grep -r "pattern" /dir', desc: 'Recursively search text in directory', category: 'Search' },
  { cmd: 'ssh user@host -p 22', desc: 'Connect via SSH to remote server', category: 'Network' },
  { cmd: 'curl -I https://site.com', desc: 'Fetch HTTP response headers only', category: 'Network' },
  { cmd: 'awk \'{print $1}\' file', desc: 'Print first column of each line', category: 'Text' },
]

const learningCards = [
  {
    title: 'Network Fundamentals',
    icon: <Wifi size={18} />,
    color: 'var(--neon-cyan)',
    points: [
      'OSI model has 7 layers (Physical to Application)',
      'TCP ensures reliable delivery; UDP is faster but unreliable',
      'IP addresses: IPv4 (32-bit) vs IPv6 (128-bit)',
      'DNS resolves domain names to IP addresses',
    ],
  },
  {
    title: 'Web Security Basics',
    icon: <Shield size={18} />,
    color: 'var(--neon-purple)',
    points: [
      'OWASP Top 10: SQL injection, XSS, CSRF, and more',
      'HTTPS uses TLS to encrypt data in transit',
      'Same-origin policy prevents cross-site data theft',
      'Content Security Policy (CSP) blocks malicious scripts',
    ],
  },
  {
    title: 'Cryptography Essentials',
    icon: <Lock size={18} />,
    color: 'var(--neon-green)',
    points: [
      'Symmetric encryption: AES uses same key for encrypt/decrypt',
      'Asymmetric: RSA uses public/private key pairs',
      'Hashing is one-way; can\'t reverse a hash to plaintext',
      'Salting prevents rainbow table attacks on passwords',
    ],
  },
  {
    title: 'Ethical Hacking Overview',
    icon: <Terminal size={18} />,
    color: 'var(--neon-pink)',
    points: [
      'Always get written authorization before testing',
      'Reconnaissance: passive (OSINT) vs active (scanning)',
      'Penetration testing phases: Recon → Scan → Exploit → Report',
      'Bug bounty programs offer legal vulnerability disclosure',
    ],
  },
]

function TerminalLine({ cmd, delay = 0 }: { cmd: string; delay?: number }) {
  return (
    <div className="terminal-prompt" style={{ animationDelay: `${delay}ms` }}>{cmd}</div>
  )
}

function CyberLabPage() {
  const [hashInput, setHashInput] = useState('')
  const [hashAlgo, setHashAlgo] = useState('SHA-256')
  const [hashResult, setHashResult] = useState('')
  const [pwdInput, setPwdInput] = useState('')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [cmdFilter, setCmdFilter] = useState('')

  const runHash = () => setHashResult(simpleHash(hashInput, hashAlgo))
  const pwdStrength = pwdInput ? checkPasswordStrength(pwdInput) : null

  const filteredCmds = linuxCommands.filter(c =>
    !cmdFilter || c.cmd.includes(cmdFilter) || c.desc.toLowerCase().includes(cmdFilter.toLowerCase()) || c.category.toLowerCase().includes(cmdFilter.toLowerCase())
  )

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: 'var(--neon-green)' }}>
            <Shield size={11} />
            Educational Only · No Illegal Tools
          </div>
          <h1 className="text-4xl font-bold mb-3 section-title gradient-text">Cyber Lab</h1>
          <p className="text-sm mt-8 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            An educational cybersecurity environment. Learn, practice, and explore security concepts responsibly.
          </p>
        </div>

        {/* Terminal intro */}
        <div className="terminal mb-10">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#ff5f57' }} />
            <div className="terminal-dot" style={{ background: '#febc2e' }} />
            <div className="terminal-dot" style={{ background: '#28c840' }} />
            <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>mindstack-cyberlab ~ bash</span>
          </div>
          <div className="terminal-body">
            <TerminalLine cmd="Welcome to MindStack Cyber Lab" />
            <div style={{ color: '#64748b' }}>Loading educational modules...</div>
            <div style={{ color: 'var(--neon-green)' }}>✓ Hash Generator ready</div>
            <div style={{ color: 'var(--neon-green)' }}>✓ Password Analyzer loaded</div>
            <div style={{ color: 'var(--neon-green)' }}>✓ Linux Command Reference active</div>
            <div style={{ color: 'var(--neon-green)' }}>✓ Security Learning Cards ready</div>
            <div className="mt-2" style={{ color: '#64748b' }}>⚠ This lab is for educational purposes only.</div>
            <div className="terminal-prompt mt-1" style={{ color: 'var(--neon-cyan)' }}>
              Ready. Type a command or use the tools below. _
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Hash Generator */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Hash size={18} style={{ color: 'var(--neon-cyan)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Hash Generator</h2>
              <span className="text-xs px-2 py-0.5 rounded-full ml-auto"
                style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Demo Only
              </span>
            </div>
            <input
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runHash()}
              placeholder="Enter text to hash..."
              style={{
                width: '100%', background: 'rgba(13,20,40,0.9)', border: '1px solid rgba(0,245,255,0.2)',
                borderRadius: '8px', color: 'var(--text-primary)', padding: '10px 12px',
                fontSize: '13px', outline: 'none', marginBottom: '10px', fontFamily: 'monospace',
              }}
            />
            <div className="flex gap-2 mb-4">
              {['MD5', 'SHA-1', 'SHA-256', 'SHA-512'].map((algo) => (
                <button key={algo} onClick={() => setHashAlgo(algo)}
                  className="flex-1 py-1.5 text-xs rounded-lg transition-all"
                  style={{
                    background: hashAlgo === algo ? 'rgba(0,245,255,0.15)' : 'rgba(0,245,255,0.04)',
                    border: `1px solid ${hashAlgo === algo ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.1)'}`,
                    color: hashAlgo === algo ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  }}>
                  {algo}
                </button>
              ))}
            </div>
            <button onClick={runHash} disabled={!hashInput}
              className="w-full py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
              style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', color: 'var(--neon-cyan)' }}>
              Generate Hash
            </button>
            {hashResult && (
              <div className="mt-3 p-3 rounded-lg" style={{ background: '#0a0f1e', border: '1px solid rgba(0,245,255,0.15)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{hashAlgo} hash (demo):</div>
                <code className="text-xs break-all" style={{ color: 'var(--neon-green)' }}>{hashResult}</code>
              </div>
            )}
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
              ⚠ Demo hash only — not cryptographically secure. Use Node.js crypto or Python hashlib in production.
            </p>
          </div>

          {/* Password Checker */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock size={18} style={{ color: 'var(--neon-purple)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Password Strength Checker</h2>
            </div>
            <input
              type="password"
              value={pwdInput}
              onChange={(e) => setPwdInput(e.target.value)}
              placeholder="Enter a password to analyze..."
              style={{
                width: '100%', background: 'rgba(13,20,40,0.9)', border: '1px solid rgba(176,68,255,0.2)',
                borderRadius: '8px', color: 'var(--text-primary)', padding: '10px 12px',
                fontSize: '13px', outline: 'none', marginBottom: '12px',
              }}
            />
            {pwdStrength && (
              <>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: 'var(--text-muted)' }}>Strength</span>
                    <span style={{ color: pwdStrength.color, fontWeight: 600 }}>{pwdStrength.label}</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(pwdStrength.score / 8) * 100}%`, background: pwdStrength.color, boxShadow: `0 0 8px ${pwdStrength.color}` }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { check: pwdInput.length >= 12, label: `Length: ${pwdInput.length} chars (12+ recommended)` },
                    { check: /[A-Z]/.test(pwdInput), label: 'Uppercase letters' },
                    { check: /[a-z]/.test(pwdInput), label: 'Lowercase letters' },
                    { check: /[0-9]/.test(pwdInput), label: 'Numbers' },
                    { check: /[^A-Za-z0-9]/.test(pwdInput), label: 'Special characters' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                      <span style={{ color: item.check ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                        {item.check ? '✓' : '✗'}
                      </span>
                      <span style={{ color: item.check ? 'var(--text-primary)' : 'var(--text-muted)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                {pwdStrength.tips.length > 0 && (
                  <div className="mt-3 text-xs p-2 rounded-lg" style={{ background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.15)', color: 'var(--neon-pink)' }}>
                    💡 {pwdStrength.tips[0]}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Linux Commands */}
        <div className="glass-card p-6 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Terminal size={18} style={{ color: 'var(--neon-green)' }} />
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Linux Command Reference</h2>
            <input
              value={cmdFilter}
              onChange={(e) => setCmdFilter(e.target.value)}
              placeholder="Search commands..."
              className="ml-auto text-xs px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)',
                color: 'var(--text-primary)', outline: 'none', width: '160px',
              }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {filteredCmds.map((c) => (
              <div key={c.cmd} className="p-3 rounded-lg group"
                style={{ background: 'rgba(0,255,136,0.02)', border: '1px solid rgba(0,255,136,0.08)' }}>
                <div className="flex items-center justify-between mb-1">
                  <code className="text-xs font-mono" style={{ color: 'var(--neon-green)' }}>{c.cmd}</code>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)' }}>{c.category}</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning cards */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen size={18} style={{ color: 'var(--neon-purple)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Security Learning Cards</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {learningCards.map((card) => (
              <div key={card.title} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedCard(expandedCard === card.title ? null : card.title)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${card.color}12`, border: `1px solid ${card.color}25`, color: card.color }}>
                      {card.icon}
                    </div>
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{card.title}</span>
                  </div>
                  {expandedCard === card.title
                    ? <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    : <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  }
                </button>
                {expandedCard === card.title && (
                  <div className="px-5 pb-5 border-t" style={{ borderColor: `${card.color}10` }}>
                    <ul className="mt-3 space-y-2">
                      {card.points.map((pt) => (
                        <li key={pt} className="flex gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span style={{ color: card.color, flexShrink: 0 }}>▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-4 rounded-xl text-center text-xs"
          style={{ background: 'rgba(255,45,120,0.04)', border: '1px solid rgba(255,45,120,0.12)', color: 'var(--text-muted)' }}>
          <Shield size={12} className="inline mr-1.5" style={{ color: 'var(--neon-pink)' }} />
          All tools in this lab are for <strong style={{ color: 'var(--neon-pink)' }}>educational purposes only</strong>.
          Never test systems without explicit written authorization. Practice only on systems you own or have permission to test.
        </div>
      </div>
    </div>
  )
}
