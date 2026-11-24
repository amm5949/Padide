import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Role } from './types'
export async function demoRole(): Promise<Role | null> {
  const value = (await cookies()).get('padideh-demo-role')?.value
  return value === 'user' || value === 'admin' ? value : null
}
export async function requireDemoRole(role: Role) {
  const current = await demoRole()
  if (!current) redirect('/login')
  if (current !== role) redirect(current === 'admin' ? '/admin' : '/user')
}
