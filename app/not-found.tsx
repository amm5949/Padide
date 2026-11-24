import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function NotFound(){return <main className="grid min-h-screen place-items-center p-4"><div className="w-full max-w-md rounded-2xl border border-border bg-card p-10 text-center"><SearchX className="mx-auto mb-4 text-primary" size={40}/><h1 className="text-xl font-extrabold">صفحه یا پرونده یافت نشد</h1><p className="mt-2 text-sm text-muted-foreground">این مورد وجود ندارد یا در دسترس نقش فعلی نیست.</p><Button asChild className="mt-6"><Link href="/">بازگشت به صفحه اصلی</Link></Button></div></main>}
