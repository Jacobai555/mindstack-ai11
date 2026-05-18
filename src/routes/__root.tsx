import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { ParticleBackground } from '@/components/ParticleBackground'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'MindStack AI — Intelligent Assistant Platform' },
      { name: 'description', content: 'Offline AI Engineering Lab and Intelligent Assistant Platform. Chat, tools, cybersecurity lab, and AI learning resources.' },
      { name: 'theme-color', content: '#080b14' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main style={{ paddingTop: '64px' }}>
            <Outlet />
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
