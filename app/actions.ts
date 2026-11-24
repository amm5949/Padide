'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function enterDemo(formData: FormData) {
  const requested = formData.get('role')
  if (requested !== 'user' && requested !== 'admin') redirect('/login')
  const jar = await cookies()
  jar.set('padideh-demo-role', requested, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 })
  redirect(requested === 'admin' ? '/admin' : '/user')
}
export async function leaveDemo() {
  (await cookies()).delete('padideh-demo-role')
  redirect('/login')
}
