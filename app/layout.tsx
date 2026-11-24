import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/components/providers'
export const metadata: Metadata = {
  title: { default: 'سامانه مدیریت مجوزها | پدیده پایدار', template: '%s | سامانه پدیده پایدار' },
  description: 'سامانه مدیریت درخواست‌های اعتبار، تأیید چک و پرینت حساب — نسخه نمایشی',
  applicationName: 'سامانه مجوزها',
  appleWebApp: { capable: true, title: 'پدیده پایدار', statusBarStyle: 'default' },
  icons: { icon: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/icons/icon-192.png' },
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: [{ media:'(prefers-color-scheme: light)',color:'#f5f7fb' }, { media:'(prefers-color-scheme: dark)',color:'#101727' }] }
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>
}
