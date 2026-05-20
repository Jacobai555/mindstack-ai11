import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Menu, X, Brain, Sun, Moon } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'AI Chat' },
  { to: '/tools', label: 'Tools' },
  { to: '/cyber-lab', label: 'Cyber Lab' },
  { to: '/learn', label: 'Learn AI' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const router = useRouterState()
  const currentPath = router.location.pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass border-b border-[rgba(0,245,255,0.1)]' : ''
      }`}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}>
              <Brain size={18} color="#080b14" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg gradient-text">MindStack AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  currentPath === link.to
                    ? 'active text-[var(--neon-cyan)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button>
              onClick={() => setDarkModeAuto (!darkMode)}
              className="p-2 rounded-lg text-[var(--text-unmuted)] hover:text-[var(--neon-cyan)] transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/chat" className="hidden md:flex btn-neon btn-neon-cyan text-xs px-4 py-2">
              Launch AI
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-[rgba(0,245,255,0.1)]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPath === link.to
                    ? 'text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.05)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/chat"
              onClick={() => setMenuOpen(false)}
              className="block btn-neon btn-neon-cyan text-center text-xs mt-2"
            >
              Launch AI
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
