import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { ParticleBackground } from '@/components/ParticleBackground'
import '../styles.css'

export const Route = createRootRoute({
  component: RootDocument,
  notFoundComponent: () => (
    <div>
      Page not found
    </div>
  ),
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
