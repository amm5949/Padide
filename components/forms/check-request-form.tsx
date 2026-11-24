'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgeCheck, CheckCircle2 } from 'lucide-react'
import { checkSections, checkFields } from '@/lib/form-definitions'
import type { CheckFieldKey } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { FormFieldControl } from './form-field'
export type CheckValues=Record<CheckFieldKey,string>
const schema=z.object(Object.fromEntries(checkFields.map(x=>[x.key,z.string().refine(v=>!x.required||v.trim().length>0,`${x.label} الزامی است.`).refine(v=>!v||!['money','number'].includes(x.kind)||/^\d+$/.test(v),`مقدار ${x.label} عدد معتبر نیست.`)])) as Record<CheckFieldKey,z.ZodString>)
const defaultValues=Object.fromEntries(checkFields.map(x=>[x.key,''])) as DefaultValues<CheckValues>
export function CheckRequestForm(){
 const [preview,setPreview]=useState(false)
 const form=useForm<CheckValues>({resolver:zodResolver(schema),defaultValues,mode:'onTouched'})
 return <><PageHeader eyebrow="درخواست‌های کاربر" title="درخواست تأیید چک" description="اطلاعات پایه و تکمیلی چک را مطابق فرم فعلی سامانه تکمیل کنید."/>
 <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">وضعیت چک، وضعیت درخواست و نحوه محاسبه رأس چک باید از طریق قوانین کسب‌وکار تعریف شوند. در این نسخه چیزی ثبت نمی‌شود.</div>
 <form onSubmit={e=>{e.preventDefault();void form.handleSubmit(()=>setPreview(true))()}} noValidate className="space-y-5">{checkSections.map((section,i)=><Card key={section.title}><CardHeader><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-secondary font-bold text-primary">{i+1}</span><div><h2 className="text-lg font-bold">{section.title}</h2><p className="text-xs text-muted-foreground">{section.description}</p></div></div></CardHeader><CardContent><div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{section.fields.map(def=><FormFieldControl<CheckValues> key={def.key} definition={def} form={form}/>)}</div></CardContent></Card>)}
 <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center"><p className="text-xs text-muted-foreground">فیلدهای ستاره‌دار در این نمونه برای تست اعتبارسنجی ضروری هستند.</p><Button type="submit" disabled={preview}><BadgeCheck size={17}/>{preview?'پیش‌نمایش آماده شد':'بررسی فرم نمایشی'}</Button></div>
 {preview&&<div role="status" className="flex gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 size={20}/>اعتبارسنجی فرم موفق بود؛ داده‌ها به سرور ارسال و ثبت نشده‌اند.</div>}
 </form></>
}
