'use client'
import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => { /* registration is optional */ })
    }
  }, [])
  return null
}
export function Providers({ children }: { children: ReactNode }) {
  const path=usePathname()
  const scope=path.startsWith('/admin')?'admin':path.startsWith('/user')?'user':'login'
  return <ThemeProvider key={scope} attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange storageKey={`padideh-theme-${scope}`}><ServiceWorkerRegistration />{children}</ThemeProvider>
}
