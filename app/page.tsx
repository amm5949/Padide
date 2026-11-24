import { redirect } from 'next/navigation'
import { demoRole } from '@/lib/demo-auth'
export default async function Home(){const role=await demoRole();redirect(role==='admin'?'/admin':role==='user'?'/user':'/login')}
