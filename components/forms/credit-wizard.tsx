'use client'
import { useMemo, useState } from 'react'
import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ClipboardCheck, AlertCircle } from 'lucide-react'
import { creditSteps, creditFields } from '@/lib/form-definitions'
import type { CreditFieldKey } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormFieldControl } from './form-field'
import { formatMoneyInput } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
export type CreditValues=Record<CreditFieldKey,string>
const shape=Object.fromEntries(creditFields.map(field=>[field.key, z.string().refine(v=>!field.required||v.trim().length>0,`${field.label} را وارد کنید.`).refine(v=>!v||!['number','money'].includes(field.kind)||/^\d+$/.test(v),`برای ${field.label} عدد معتبر وارد کنید.`)])) as Record<CreditFieldKey,z.ZodString>
const schema=z.object(shape)
const defaultValues=Object.fromEntries(creditFields.map(field=>[field.key,''])) as DefaultValues<CreditValues>
export function CreditWizard() {
 const [step,setStep]=useState(0);const [preview,setPreview]=useState(false);const [busy,setBusy]=useState(false)
 const form=useForm<CreditValues>({resolver:zodResolver(schema),defaultValues,mode:'onTouched',shouldUnregister:false})
 const total=creditSteps.length+1;const isReview=step===creditSteps.length
 const current=creditSteps[step]
 const filled=useMemo(()=>creditSteps.map(s=>s.fields.length),[])
 async function forward(){if(isReview)return;const keys=current.fields.map(x=>x.key);if(await form.trigger(keys)){setStep(i=>i+1);window.scrollTo({top:0,behavior:'smooth'})}}
 function backward(){setStep(i=>Math.max(0,i-1));setPreview(false)}
 function sendPreview(){if(busy||preview)return;setBusy(true);setPreview(true);setBusy(false)}
 const values=form.watch()
 return <>
  <PageHeader eyebrow="درخواست‌های کاربر" title="ثبت درخواست اعتبار" description="اطلاعات را در چند مرحله تکمیل و پیش از ثبت نهایی بازبینی کنید."/>
  <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">قوانین الزامی بودن فیلدها صرفاً برای نمونه رابط کاربری تنظیم شده‌اند؛ در نسخه واقعی باید با کارفرما تأیید شوند. ثبت واقعی به API متصل نیست.</div>
  <Card className="overflow-hidden"><div className="border-b border-border p-5 sm:p-6"><div className="mb-3 flex items-center justify-between text-xs font-bold text-muted-foreground"><span>مرحله {step+1} از {total}</span><span>{Math.round(((step+1)/total)*100)}٪</span></div><div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="پیشرفت فرم" aria-valuenow={step+1} aria-valuemin={0} aria-valuemax={total}><div className="h-full rounded-full bg-primary transition-all" style={{width:`${((step+1)/total)*100}%`}}/></div><div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-3">{[...creditSteps.map(s=>s.title),'بازبینی'].map((title,i)=><button key={title} type="button" disabled={i>step} onClick={()=>{setStep(i);setPreview(false)}} aria-current={i===step?'step':undefined} className={`flex min-w-0 flex-col items-center gap-2 text-center text-[10px] font-semibold sm:text-xs ${i<=step?'text-primary':'text-muted-foreground'}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full border sm:size-9 ${i<step?'border-primary bg-primary text-primary-foreground':i===step?'border-primary bg-secondary text-primary':'border-border bg-muted'}`}>{i<step?<Check size={16}/>:i+1}</span><span className="max-w-full leading-4">{title}</span></button>)}</div></div>
   <CardContent className="!pt-6"><form onSubmit={e=>{e.preventDefault();void form.handleSubmit(sendPreview)()}} noValidate>
    {!isReview?<><div className="mb-6"><h2 className="text-lg font-bold">{current.title}</h2><p className="text-sm text-muted-foreground">{current.description}</p></div><div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">{current.fields.map(def=><FormFieldControl<CreditValues> key={def.key} definition={def} form={form}/>)}</div></>:<><h2 className="mb-2 text-lg font-bold">بازبینی اطلاعات درخواست</h2><p className="mb-6 text-sm text-muted-foreground">اطلاعات هر بخش را بررسی کنید. مقدار «—» به معنی تکمیل‌نشدن فیلد اختیاری است.</p><div className="space-y-5">{creditSteps.map((group,i)=><section key={group.title} className="rounded-xl border border-border p-4"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold">{group.title}</h3><Button size="sm" variant="ghost" type="button" onClick={()=>setStep(i)}>ویرایش بخش</Button></div><dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{group.fields.map(field=><div key={field.key}><dt className="text-xs text-muted-foreground">{field.label}</dt><dd className="break-words text-sm font-semibold">{values[field.key]?(field.kind==='money'?formatMoneyInput(values[field.key]):values[field.key]):'—'}</dd></div>)}</dl></section>)}</div></>}
    {preview&&<div role="status" className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 size={20} className="mt-1 shrink-0"/><div><strong>پیش‌نمایش درخواست آماده است.</strong><p>درخواست به سرور ارسال نشده و هیچ رکوردی ثبت نشده است. برای ثبت واقعی باید API و مجوزها پیاده‌سازی شوند.</p></div></div>}
    {Object.keys(form.formState.errors).length>0&&<div role="alert" className="mt-5 flex gap-2 text-xs text-danger"><AlertCircle size={16}/><span>برخی اطلاعات معتبر نیستند؛ فیلدهای مشخص‌شده را بررسی کنید.</span></div>}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"><Button variant="outline" type="button" onClick={backward} disabled={step===0}><ArrowRight size={16}/>مرحله قبل</Button><span className="text-xs text-muted-foreground">{isReview?'آماده بررسی':'فیلدهای این مرحله: '+filled[step]}</span>{!isReview?<Button type="button" onClick={()=>void forward()}>مرحله بعد<ArrowLeft size={16}/></Button>:<Button type="submit" disabled={busy||preview}><ClipboardCheck size={17}/>{preview?'پیش‌نمایش ایجاد شد':'تأیید پیش‌نمایش'}</Button>}</div>
   </form></CardContent>
  </Card>
  <p className="mt-4 text-xs text-muted-foreground">برای مشاهده درخواست‌های نمایشی موجود به <Link href="/user/requests" className="font-semibold text-primary underline underline-offset-4">سوابق درخواست‌ها</Link> بروید.</p>
 </>
}
