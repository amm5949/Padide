'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, WalletCards, BadgeCheck, FileUp, ClipboardList, Settings, FileCheck2, ShieldCheck, Menu, X, Bell, ChevronLeft, LogOut, Building2, Files, PanelRightClose } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Role } from '@/lib/types'
import { ThemeSelector } from './theme-selector'
import { ConnectionStatus } from './connection-status'
import { leaveDemo } from '@/app/actions'
import { cn } from '@/lib/utils'
interface Item { href:string;label:string;icon:LucideIcon;exact?:boolean }
const userNav:Item[]=[
 {href:'/user',label:'نمای کلی',icon:LayoutDashboard,exact:true},
 {href:'/user/credit/new',label:'درخواست اعتبار',icon:WalletCards},
 {href:'/user/checks/new',label:'تأیید چک',icon:BadgeCheck},
 {href:'/user/statements/new',label:'پرینت حساب',icon:FileUp},
 {href:'/user/requests',label:'پیگیری درخواست‌ها',icon:ClipboardList},
 {href:'/user/settings',label:'تنظیمات',icon:Settings},
]
const adminNav:Item[]=[
 {href:'/admin',label:'نمای کلی',icon:LayoutDashboard,exact:true},
 {href:'/admin/credit',label:'درخواست‌های اعتبار',icon:WalletCards},
 {href:'/admin/checks',label:'مدیریت چک‌ها',icon:FileCheck2},
 {href:'/admin/statements',label:'اسناد بانکی',icon:Files},
 {href:'/admin/settings',label:'تنظیمات',icon:Settings},
]
function activePath(path:string,item:Item) { return item.exact ? path===item.href : path===item.href || path.startsWith(item.href+'/') }
export function AppShell({role,children}:{role:Role;children:ReactNode}) {
 const [open,setOpen]=useState(false)
 const closeButtonRef=useRef<HTMLButtonElement>(null)
 const path=usePathname();const nav=role==='admin'?adminNav:userNav
 useEffect(()=>setOpen(false),[path])
 useEffect(()=>{
  if(!open)return
  closeButtonRef.current?.focus()
  const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)}
  document.addEventListener('keydown',close)
  return()=>document.removeEventListener('keydown',close)
 },[open])
 const roleLabel=role==='admin'?'مدیر سامانه':'کاربر سامانه'
 return <div className="min-h-screen">
  {open&&<button className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" aria-label="بستن فهرست راهبری" onClick={()=>setOpen(false)}/>}
  <aside id="mobile-navigation" role={open?'dialog':undefined} aria-modal={open?true:undefined} aria-label="ناوبری اصلی" className={cn('fixed inset-y-0 right-0 z-50 flex w-[270px] flex-col border-l border-border bg-card px-4 py-5 transition-transform duration-200 lg:translate-x-0',open?'visible translate-x-0':'invisible translate-x-full lg:visible lg:translate-x-0')}>
   <div className="mb-7 flex items-center justify-between gap-3 px-2"><Link href={role==='admin'?'/admin':'/user'} className="flex items-center gap-3"><span className="gradient-brand grid size-11 shrink-0 place-items-center rounded-2xl text-white"><Building2 size={23}/></span><span className="flex flex-col"><strong className="text-sm font-black">پدیده پایدار</strong><span className="text-[11px] text-muted-foreground">سامانه مدیریت مجوزها</span></span></Link><button ref={closeButtonRef} className="grid size-11 place-items-center rounded-lg hover:bg-muted lg:hidden" onClick={()=>setOpen(false)} aria-label="بستن منو"><X size={20}/></button></div>
   <div className="mb-3 px-3 text-[11px] font-bold text-muted-foreground">فضای {role==='admin'?'مدیریت':'کاربری'}</div>
   <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto" aria-label="صفحات سامانه">{nav.map(item=><Link key={item.href} href={item.href} aria-current={activePath(path,item)?'page':undefined} className={cn('group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors',activePath(path,item)?'bg-secondary text-primary':'text-muted-foreground hover:bg-muted hover:text-foreground')}><item.icon size={19} strokeWidth={activePath(path,item)?2.35:1.9}/><span className="flex-1">{item.label}</span>{activePath(path,item)&&<span className="size-1.5 rounded-full bg-primary"/>}</Link>)}</nav>
   <div className="mt-4 space-y-3 border-t border-border pt-4"><div className="rounded-xl border border-border bg-muted/50 p-3"><p className="text-xs font-bold">حالت نمایشی</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">داده‌ها و تصمیم‌ها واقعی نیستند.</p></div><form action={leaveDemo}><button type="submit" className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><LogOut size={18}/>خروج از نسخه نمایشی</button></form></div>
  </aside>
  <div className="min-w-0 lg:mr-[270px]">
   <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md"><div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-7 lg:px-10">
    <div className="flex min-w-0 items-center gap-2"><button aria-label="باز کردن منوی ناوبری" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(true)} className="grid size-11 shrink-0 place-items-center rounded-xl text-foreground hover:bg-muted lg:hidden"><Menu size={23}/></button><span className="hidden text-muted-foreground lg:block"><PanelRightClose size={19}/></span><span className="h-5 w-px bg-border lg:block hidden"/><p className="truncate text-xs font-semibold text-muted-foreground sm:text-sm">سیستم مدیریت مجوزها <ChevronLeft className="mx-1 inline" size={13}/><span className="text-foreground">{roleLabel}</span></p></div>
    <div className="flex shrink-0 items-center gap-2"><ThemeSelector compact/><button className="relative grid size-11 place-items-center rounded-xl border border-border text-muted-foreground" aria-label="اعلان‌ها؛ در نسخه نمایشی غیرفعال" title="اتصال اعلان‌ها پس از API" disabled><Bell size={19}/></button><div className="hidden h-10 items-center gap-2 rounded-full bg-secondary ps-3 pe-1 sm:flex"><span className="text-xs font-bold text-secondary-foreground">{roleLabel}</span><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{role==='admin'?'م':'ک'}</span></div></div>
   </div></header><ConnectionStatus/>
   <div className="mx-auto max-w-[1500px] px-4 pb-28 pt-6 sm:px-7 sm:pt-8 lg:px-10 lg:pb-12"><div className="page-fade">{children}</div><footer className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">شرکت پخش پدیده پایدار · نسخه نمایشی رابط کاربری · بدون اتصال به داده‌های عملیاتی</footer></div>
  </div>
  <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[74px] items-center justify-around border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden" aria-label="دسترسی سریع موبایل">
   {(role==='admin'?[adminNav[0],adminNav[1],adminNav[2],adminNav[3]]:[userNav[0],userNav[1],userNav[2],userNav[4]]).map(item=><Link key={item.href} href={item.href} aria-current={activePath(path,item)?'page':undefined} className={cn('flex min-h-12 min-w-16 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold',activePath(path,item)?'text-primary':'text-muted-foreground')}><item.icon size={20}/><span>{item.label.replace('درخواست‌های ','').replace('درخواست ','')}</span></Link>)}
  </nav>
 </div>
}
