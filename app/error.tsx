'use client'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center p-4"><div className="rounded-2xl border border-border bg-card p-8 text-center"><AlertTriangle className="mx-auto mb-3 text-danger" size={34}/><h1 className="text-lg font-bold">خطا در نمایش صفحه</h1><p className="mb-5 text-sm text-muted-foreground">بارگذاری صفحه با مشکل مواجه شد. لطفاً دوباره تلاش کنید.</p><Button onClick={reset}>تلاش مجدد</Button></div></main>}
