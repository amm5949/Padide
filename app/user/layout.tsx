import type { ReactNode } from 'react'
import { requireDemoRole } from '@/lib/demo-auth'
import { AppShell } from '@/components/app-shell'
export default async function UserLayout({children}:{children:ReactNode}){await requireDemoRole('user');return <AppShell role="user">{children}</AppShell>}
