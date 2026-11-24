'use client'
import { useState } from 'react'
import { CheckCircle2, XCircle, MessageSquareWarning, ShieldAlert, History } from 'lucide-react'
import type { RequestStatus, RequestKind } from '@/lib/types'
import { can } from '@/lib/permissions'
import { ConfirmDialog } from '@/components/ui/alert-confirm'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { statusLabels } from '@/lib/status'
const choices:{value:RequestStatus;title:string;icon:typeof CheckCircle2;variant:'default'|'outline'|'destructive'}[]=[
 {value:'approved',title:'تأیید درخواست',icon:CheckCircle2,variant:'default'},
 {value:'needs_changes',title:'نیازمند اصلاح',icon:MessageSquareWarning,variant:'outline'},
 {value:'rejected',title:'رد درخواست',icon:XCircle,variant:'destructive'},
]
export function AdminDecision({kind,initialStatus,id}:{kind:RequestKind;initialStatus:RequestStatus;id:string}) {
 const [status,setStatus]=useState(initialStatus);const [reason,setReason]=useState('');const [events,setEvents]=useState<string[]>([])
 const permission=kind==='credit'?'credit:review':kind==='check'?'check:review':'statement:review'
 const allowed=can('admin',permission)
 function decide(value:RequestStatus) {setStatus(value);setEvents(old=>[`${statusLabels[value]} · تغییر نمایشی بدون ذخیره در سرور${reason.trim()?' · یادداشت: '+reason.trim():''}`,...old])}
 return <Card><CardHeader><h2 className="text-lg font-bold">بررسی و تصمیم مدیریتی</h2><p className="text-xs text-muted-foreground">شناسه پرونده: <span className="number-ltr inline-block">{id}</span></p></CardHeader><CardContent>
  <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl bg-muted p-4"><span className="text-xs text-muted-foreground">وضعیت فعلی در این نشست:</span><StatusBadge status={status}/></div>
  <label htmlFor="decision-reason" className="mb-2 block text-xs font-bold">یادداشت بررسی (اختیاری در نمونه)</label><textarea id="decision-reason" value={reason} onChange={e=>setReason(e.target.value)} rows={3} className="form-control resize-y" placeholder="توضیحات کارشناس درباره تصمیم..."/>
  {allowed?<div className="mt-4 flex flex-wrap gap-2">{choices.map(choice=><ConfirmDialog key={choice.value} trigger={<Button variant={choice.variant}><choice.icon size={16}/>{choice.title}</Button>} title={`تأیید عملیات «${choice.title}»`} description={`این عملیات صرفاً وضعیت نمایشی ${id} را در حافظه صفحه تغییر می‌دهد؛ هیچ تصمیمی در سامانه واقعی ثبت نمی‌شود.`} confirmLabel="اجرای شبیه‌سازی" onConfirm={()=>decide(choice.value)}/>)}</div>:<p role="alert" className="text-sm text-danger">مجوز بررسی این درخواست را ندارید.</p>}
  <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><ShieldAlert size={17} className="mt-1 shrink-0"/>این نسخه فقط شبیه‌ساز UI است. ذخیره تصمیم و Audit Log واقعی باید با احراز هویت معتبر و مجوز سمت سرور پیاده‌سازی شود.</div>
  <div className="mt-6 border-t border-border pt-4"><h3 className="mb-3 flex items-center gap-2 text-sm font-bold"><History size={18}/>رویدادهای همین نشست (نمایشی)</h3>{events.length===0?<p className="text-xs text-muted-foreground">تغییری در این نشست انجام نشده است.</p>:<ul className="space-y-2">{events.map((line,i)=><li key={i} className="rounded-lg bg-muted p-3 text-xs">{line}</li>)}</ul>}</div>
 </CardContent></Card>
}
