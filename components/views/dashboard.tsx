import Link from 'next/link'
import { ArrowUpLeft, ClipboardList, WalletCards, FileUp, BadgeCheck, Clock3, CheckCircle2, Files, Activity, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { StatusBadge } from '@/components/ui/status-badge'
import { PageHeader } from '@/components/page-header'
import { credits, checks, statements, allRequests } from '@/lib/mock-data'
import { faNumber } from '@/lib/utils'
import type { Role } from '@/lib/types'
function QuickLink({href,icon:Icon,title,description}:{href:string;icon:typeof WalletCards;title:string;description:string}) {
 return <Link href={href} className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary/50"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon size={20}/></span><span className="min-w-0 flex-1"><strong className="block text-sm">{title}</strong><span className="block text-xs text-muted-foreground">{description}</span></span><ArrowUpLeft className="text-primary transition-transform group-hover:-translate-x-1" size={18}/></Link>
}
export function Dashboard({role}:{role:Role}) {
 const isAdmin=role==='admin';const data=[...(isAdmin?allRequests:allRequests.filter(x=>x.ownerId==='demo-user'))].sort((a,b)=>b.date.localeCompare(a.date,'fa'))
 const pending=data.filter(x=>x.status==='pending').length;const approved=data.filter(x=>x.status==='approved').length
 const bars=[{label:'شنبه',value:38},{label:'یکشنبه',value:60},{label:'دوشنبه',value:43},{label:'سه‌شنبه',value:78},{label:'چهارشنبه',value:56},{label:'پنجشنبه',value:92},{label:'جمعه',value:22}]
 return <>
  <PageHeader eyebrow={isAdmin?'پیشخوان مدیریت':'پیشخوان کاربری'} title={isAdmin?'خوش آمدید، مدیر سامانه':'خوش آمدید به پدیده پایدار'} description={isAdmin?'بررسی وضعیت درخواست‌ها و دسترسی سریع به کارتابل مدیریت':'درخواست‌های خود را ثبت و مراحل بررسی آن‌ها را دنبال کنید.'}/>
  <section className="gradient-brand relative mb-6 overflow-hidden rounded-3xl px-6 py-7 text-white sm:px-8 sm:py-8"><div aria-hidden="true" className="absolute -left-16 -top-24 size-72 rounded-full border-[45px] border-white/5"/><div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><p className="mb-1 text-xs font-semibold text-white/80">شرکت پخش پدیده پایدار</p><h2 className="text-xl font-extrabold sm:text-2xl">{isAdmin?'کارتابل درخواست‌ها در یک نگاه':'مدیریت اعتبار، ساده و شفاف'}</h2><p className="mt-2 max-w-lg text-sm leading-7 text-white/80">{isAdmin?'برای بررسی پرونده‌ها، مدیریت چک‌ها و اسناد بانکی از گزینه‌های زیر استفاده کنید.':'ثبت درخواست، بارگذاری مدارک و مشاهده نتیجه بررسی بدون مراجعه حضوری.'}</p></div><Button asChild className="bg-white !text-indigo-900 hover:bg-indigo-50"><Link href={isAdmin?'/admin/credit':'/user/credit/new'}>{isAdmin?'بررسی درخواست‌ها':'درخواست اعتبار جدید'}<ArrowUpLeft size={16}/></Link></Button></div></section>
  <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
   <StatCard title="مجموع درخواست‌ها" value={faNumber(data.length)} note="داده‌های نمایشی" icon={ClipboardList}/>
   <StatCard title="در انتظار بررسی" value={faNumber(pending)} note="نیازمند پیگیری" icon={Clock3} kind="warning"/>
   <StatCard title="تأیید شده" value={faNumber(approved)} note="درخواست‌های ثبت‌شده" icon={CheckCircle2} kind="success"/>
   <StatCard title={isAdmin?'اسناد بانکی':'مدارک بارگذاری‌شده'} value={faNumber(isAdmin?statements.length:statements.filter(s=>s.ownerId==='demo-user').length)} note="پرونده‌های PDF نمایشی" icon={Files} kind="purple"/>
  </div>
  <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]"><Card><CardHeader><div className="flex items-center justify-between"><div><h3 className="text-base font-bold">دسترسی سریع</h3><p className="text-xs text-muted-foreground">عملیات پرکاربرد</p></div><Activity size={19} className="text-muted-foreground"/></div></CardHeader><CardContent className="grid gap-3">
   {isAdmin?<><QuickLink href="/admin/credit" icon={WalletCards} title="درخواست‌های اعتبار" description={`${faNumber(credits.length)} پرونده نمایشی`}/><QuickLink href="/admin/checks" icon={BadgeCheck} title="مدیریت چک‌ها" description={`${faNumber(checks.length)} پرونده نمایشی`}/><QuickLink href="/admin/statements" icon={FileUp} title="اسناد و پرینت حساب" description="مشاهده اطلاعات پرونده‌های بانکی"/></>:<><QuickLink href="/user/credit/new" icon={WalletCards} title="درخواست اعتبار" description="فرم مرحله‌ای و بازبینی اطلاعات"/><QuickLink href="/user/checks/new" icon={BadgeCheck} title="درخواست تأیید چک" description="ثبت اطلاعات چک و فاکتور"/><QuickLink href="/user/statements/new" icon={FileUp} title="بارگذاری پرینت حساب" description="انتخاب و اعتبارسنجی اولیه PDF"/></>}
  </CardContent></Card>
  <Card><CardHeader><div className="flex items-center justify-between"><div><h3 className="text-base font-bold">روند فعالیت</h3><p className="text-xs text-muted-foreground">نمودار صرفاً نمایشی و غیرعملیاتی</p></div><BarChart3 size={19} className="text-muted-foreground"/></div></CardHeader><CardContent><div className="flex h-48 items-end justify-between gap-2 border-b border-border pb-3" role="img" aria-label="نمودار نمونه فعالیت طی هفت روز؛ داده‌ها ساختگی هستند">{bars.map((bar,i)=><div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className={`w-full max-w-10 rounded-t-lg ${i===5?'bg-primary':'bg-primary/30'}`} style={{height:`${bar.value}%`}}/><span className="text-[10px] text-muted-foreground sm:text-xs">{bar.label}</span></div>)}</div><p className="mt-4 text-xs text-muted-foreground">پس از اتصال API، نمودار بر اساس تاریخچه واقعی بارگذاری می‌شود.</p></CardContent></Card>
  </div>
  <Card className="mt-5"><CardHeader><div className="flex items-center justify-between gap-3"><h3 className="text-base font-bold">آخرین درخواست‌ها</h3><Button asChild size="sm" variant="ghost"><Link href={isAdmin?'/admin/credit':'/user/requests'}>مشاهده همه <ArrowUpLeft size={15}/></Link></Button></div></CardHeader><CardContent><div className="divide-y divide-border">{data.slice(0,4).map(item=><div className="flex flex-wrap items-center justify-between gap-3 py-3" key={item.id}><div className="min-w-0"><p className="text-sm font-semibold">{item.title}</p><p className="text-xs text-muted-foreground"><span className="number-ltr inline-block">{item.id}</span> · {item.date}</p></div><StatusBadge status={item.status}/></div>)}</div></CardContent></Card>
 </>
}
