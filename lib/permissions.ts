import type { Role, Permission } from './types'
const capabilities: Record<Role, readonly Permission[]> = {
  user: ['dashboard:read:own','profile:write:own','credit:create','check:create','statement:create','requests:read:own'],
  admin: ['dashboard:read:own','profile:write:own','credit:read:all','credit:review','check:read:all','check:review','statement:read:all','statement:review'],
}
export function can(role: Role, permission: Permission) { return capabilities[role].includes(permission) }
// IMPORTANT: demo role cookies are not trusted authentication; production MUST verify a signed session server-side.
