import type { ReactNode } from 'react'
import { requireDemoRole } from '@/lib/demo-auth'
import { AppShell } from '@/components/app-shell'
export default async function AdminLayout({children}:{children:ReactNode}){await requireDemoRole('admin');return <AppShell role="admin">{children}</AppShell>}
